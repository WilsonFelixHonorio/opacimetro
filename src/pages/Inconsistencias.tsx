import { useMemo, useState } from "react";
import { useLaudos } from "@/hooks/use-laudos";
import { useVeiculos } from "@/hooks/use-veiculos";
import {
  useInconsistenciaCorrecoes,
  useUpsertCorrecao,
  useDeleteCorrecao,
} from "@/hooks/use-inconsistencia-correcoes";
import { AppHeader } from "@/components/AppHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Loader2,
  Printer,
  Pencil,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseDate } from "@/lib/laudos-data";
import { toast } from "sonner";

type SortKey = "equip" | "placa" | "denominacao" | "status" | "ultimoLaudo" | "resultado";
type SortDir = "asc" | "desc";

interface InconsistenciaRow {
  equip: string;
  placa: string;
  denominacao: string;
  status: string;
  ultimoLaudo: string;
  resultado: string;
  origem: string;
  placaOriginal: string;
  corrigido: boolean;
}

const Inconsistencias = () => {
  const { data: laudos = [], isLoading: loadingLaudos } = useLaudos();
  const { data: veiculos = [], isLoading: loadingVeiculos } = useVeiculos();
  const { data: correcoes = [], isLoading: loadingCorrecoes } = useInconsistenciaCorrecoes();
  const upsertCorrecao = useUpsertCorrecao();
  const deleteCorrecao = useDeleteCorrecao();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("status");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [editingRow, setEditingRow] = useState<InconsistenciaRow | null>(null);
  const [editForm, setEditForm] = useState({ equip: "", placa: "", denominacao: "" });

  const correcoesMap = useMemo(() => {
    const map: Record<string, typeof correcoes[number]> = {};
    correcoes.forEach((c) => {
      map[c.placa_original.toUpperCase()] = c;
    });
    return map;
  }, [correcoes]);

  // applyCorrection é definida dentro do useMemo abaixo (precisa do índice de veículos)

  // Fuzzy match helpers: confusões comuns OCR (1↔I, 0↔O, 5↔S, 8↔B, 2↔Z)
  const normalizePlaca = (p: string) =>
    p
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .replace(/1/g, "I")
      .replace(/0/g, "O")
      .replace(/5/g, "S")
      .replace(/8/g, "B")
      .replace(/2/g, "Z");

  const rows = useMemo<InconsistenciaRow[]>(() => {
    const result: InconsistenciaRow[] = [];

    // Map: placa -> most recent laudo
    const laudoPorPlaca: Record<string, { data: string; resultado: string }> = {};
    laudos.forEach((l) => {
      const placa = l.placa.toUpperCase();
      const existing = laudoPorPlaca[placa];
      if (!existing || parseDate(l.data) > parseDate(existing.data)) {
        laudoPorPlaca[placa] = { data: l.data, resultado: l.resultado };
      }
    });

    // Index de veículos por placa exata e por placa normalizada (fuzzy)
    const veiculoPorPlaca: Record<string, typeof veiculos[number]> = {};
    const veiculoPorPlacaNorm: Record<string, typeof veiculos[number]> = {};
    const veiculoPorEquip: Record<string, typeof veiculos[number]> = {};
    veiculos.forEach((v) => {
      const placa = v.placa.toUpperCase().trim();
      if (placa) {
        veiculoPorPlaca[placa] = v;
        veiculoPorPlacaNorm[normalizePlaca(placa)] = v;
      }
      const equip = v.equip.toUpperCase().trim();
      if (equip) veiculoPorEquip[equip] = v;
    });

    const placasVeiculos = new Set<string>();

    // Aplica correção manual e, se a placa corrigida bater com um veículo
    // cadastrado, recalcula equip/denominação/status a partir da aba Veículos.
    const applyCorrection = (
      base: Omit<InconsistenciaRow, "corrigido" | "placaOriginal">
    ): InconsistenciaRow => {
      const placaOriginal = base.placa.toUpperCase();
      const c = correcoesMap[placaOriginal];
      if (!c) return { ...base, placaOriginal, corrigido: false };

      const placaCorrigida = (c.placa_corrigida?.trim() || base.placa).toUpperCase();
      const veicMatch =
        veiculoPorPlaca[placaCorrigida] ||
        veiculoPorPlacaNorm[normalizePlaca(placaCorrigida)];

      // Se a placa corrigida existe na aba Veículos, recalcula status com base
      // no laudo mais recente daquele veículo (Sem laudo / Reprovado / ok).
      let status = base.status;
      let ultimoLaudo = base.ultimoLaudo;
      let resultado = base.resultado;
      if (veicMatch) {
        const laudoVeic = laudoPorPlaca[veicMatch.placa.toUpperCase()];
        if (!laudoVeic) {
          status = "Sem laudo";
          ultimoLaudo = "-";
          resultado = "-";
        } else if (laudoVeic.resultado === "REPROVADO") {
          status = "Reprovado";
          ultimoLaudo = laudoVeic.data;
          resultado = laudoVeic.resultado;
        } else {
          // Aprovado e cadastrado → não é mais inconsistência
          status = "OK";
          ultimoLaudo = laudoVeic.data;
          resultado = laudoVeic.resultado;
        }
      }

      return {
        ...base,
        equip: c.equip_corrigido?.trim() || veicMatch?.equip || base.equip,
        placa: c.placa_corrigida?.trim() || veicMatch?.placa || base.placa,
        denominacao:
          c.denominacao_corrigida?.trim() || veicMatch?.denominacao || base.denominacao,
        status,
        ultimoLaudo,
        resultado,
        placaOriginal,
        corrigido: true,
      };
    };

    // 1. Veículos sem laudo ou com laudo reprovado
    veiculos.forEach((v) => {
      const placa = v.placa.toUpperCase();
      placasVeiculos.add(placa);
      const laudo = laudoPorPlaca[placa];

      if (!laudo) {
        result.push(
          applyCorrection({
            equip: v.equip,
            placa: v.placa,
            denominacao: v.denominacao,
            status: "Sem laudo",
            ultimoLaudo: "-",
            resultado: "-",
            origem: "Cadastro",
          })
        );
      } else if (laudo.resultado === "REPROVADO") {
        result.push(
          applyCorrection({
            equip: v.equip,
            placa: v.placa,
            denominacao: v.denominacao,
            status: "Reprovado",
            ultimoLaudo: laudo.data,
            resultado: laudo.resultado,
            origem: "Cadastro",
          })
        );
      }
    });

    // 2. Laudos com placas que não existem no cadastro de veículos
    const placasJaAdicionadas = new Set<string>();
    laudos.forEach((l) => {
      const placa = l.placa.toUpperCase();
      if (!placasVeiculos.has(placa) && !placasJaAdicionadas.has(placa)) {
        placasJaAdicionadas.add(placa);
        const laudo = laudoPorPlaca[placa];

        // Duplo check: tenta achar o veículo correto na aba Veículos via
        // normalização de placa (corrige confusões OCR como 1↔I, 0↔O...)
        const matchVeic = veiculoPorPlacaNorm[normalizePlaca(placa)];

        result.push(
          applyCorrection({
            equip: matchVeic?.equip || "-",
            placa: matchVeic?.placa || l.placa,
            denominacao: matchVeic?.denominacao || l.veiculo,
            status: matchVeic ? "Placa divergente" : "Não cadastrado",
            ultimoLaudo: laudo?.data || l.data,
            resultado: laudo?.resultado || l.resultado,
            origem: "Laudo",
          })
        );
      }
    });

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [laudos, veiculos, correcoesMap]);

  const filtered = useMemo(() => {
    // Linhas com status "OK" foram corrigidas e validadas → não são inconsistência
    let data = rows.filter((r) => r.status !== "OK");
    if (search) {
      const s = search.toLowerCase();
      data = data.filter(
        (r) =>
          r.equip.toLowerCase().includes(s) ||
          r.placa.toLowerCase().includes(s) ||
          r.denominacao.toLowerCase().includes(s) ||
          r.status.toLowerCase().includes(s) ||
          r.resultado.toLowerCase().includes(s)
      );
    }
    data.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      const cmp = va.localeCompare(vb, "pt-BR", { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
    return data;
  }, [rows, search, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="h-3 w-3 ml-1 opacity-40" />;
    return sortDir === "asc" ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />;
  };

  const isLoading = loadingLaudos || loadingVeiculos || loadingCorrecoes;

  const openEdit = (row: InconsistenciaRow) => {
    setEditingRow(row);
    setEditForm({
      equip: row.equip === "-" ? "" : row.equip,
      placa: row.placa,
      denominacao: row.denominacao,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingRow) return;
    try {
      await upsertCorrecao.mutateAsync({
        placa_original: editingRow.placaOriginal,
        equip_corrigido: editForm.equip.trim() || null,
        placa_corrigida: editForm.placa.trim() || null,
        denominacao_corrigida: editForm.denominacao.trim() || null,
      });
      toast.success("Correção salva");
      setEditingRow(null);
    } catch (e: any) {
      toast.error("Erro ao salvar: " + e.message);
    }
  };

  const handleResetEdit = async () => {
    if (!editingRow) return;
    try {
      await deleteCorrecao.mutateAsync(editingRow.placaOriginal);
      toast.success("Correção removida");
      setEditingRow(null);
    } catch (e: any) {
      toast.error("Erro ao remover: " + e.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const semLaudo = rows.filter((r) => r.status === "Sem laudo").length;
  const reprovados = rows.filter((r) => r.status === "Reprovado").length;
  const naoCadastrados = rows.filter((r) => r.status === "Não cadastrado").length;

  return (
    <div className="min-h-screen bg-muted/30">
      <AppHeader />

      <main className="space-y-6 px-6 py-6">
        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-card shadow-lg p-4 flex items-center gap-3">
            <div className="rounded-lg bg-amber-500/10 p-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{semLaudo}</p>
              <p className="text-xs text-muted-foreground">Sem laudo</p>
            </div>
          </div>
          <div className="rounded-xl border bg-card shadow-lg p-4 flex items-center gap-3">
            <div className="rounded-lg bg-destructive/10 p-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{reprovados}</p>
              <p className="text-xs text-muted-foreground">Reprovados</p>
            </div>
          </div>
          <div className="rounded-xl border bg-card shadow-lg p-4 flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <AlertTriangle className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{naoCadastrados}</p>
              <p className="text-xs text-muted-foreground">Não cadastrados</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-card shadow-lg">
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-muted-foreground" />
              Inconsistências ({filtered.length})
            </h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar equip, placa, modelo..."
                  className="pl-9 w-[280px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="print:hidden"
                onClick={() => window.print()}
                title="Imprimir"
              >
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {([
                    ["equip", "Equip"],
                    ["placa", "Placa"],
                    ["denominacao", "Denominação"],
                    ["status", "Status"],
                    ["ultimoLaudo", "Último Laudo"],
                    ["resultado", "Resultado"],
                  ] as [SortKey, string][]).map(([key, label]) => (
                    <TableHead
                      key={key}
                      className="font-semibold cursor-pointer select-none hover:bg-muted/80 transition-colors"
                      onClick={() => handleSort(key)}
                    >
                      <span className="flex items-center">
                        {label}
                        <SortIcon col={key} />
                      </span>
                    </TableHead>
                  ))}
                  <TableHead className="font-semibold w-[80px] text-right print:hidden">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row, i) => (
                  <TableRow key={`${row.placaOriginal}-${i}`} className="hover:bg-muted/30">
                    <TableCell className="font-mono text-sm">
                      {row.equip}
                      {row.corrigido && (
                        <span className="ml-1 text-[10px] text-primary print:hidden" title="Dado corrigido manualmente">●</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono uppercase text-sm">{row.placa}</TableCell>
                    <TableCell className="text-sm">{row.denominacao}</TableCell>
                    <TableCell>
                      <Badge
                        variant={row.status === "Reprovado" ? "destructive" : "secondary"}
                        className={
                          row.status === "Sem laudo"
                            ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25"
                            : row.status === "Não cadastrado"
                            ? "bg-blue-500/15 text-blue-700 dark:text-blue-400 hover:bg-blue-500/25"
                            : row.status === "Placa divergente"
                            ? "bg-purple-500/15 text-purple-700 dark:text-purple-400 hover:bg-purple-500/25"
                            : ""
                        }
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{row.ultimoLaudo}</TableCell>
                    <TableCell>
                      {row.resultado !== "-" ? (
                        <Badge
                          variant={row.resultado === "APROVADO" ? "default" : "destructive"}
                          className={row.resultado === "APROVADO" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                        >
                          {row.resultado}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right print:hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEdit(row)}
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Nenhuma inconsistência encontrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="border-t px-6 py-3 text-sm text-muted-foreground">
            {filtered.length} de {rows.length} registros
          </div>
        </div>
      </main>

      <Dialog open={!!editingRow} onOpenChange={(o) => !o && setEditingRow(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar inconsistência</DialogTitle>
            <DialogDescription>
              Corrija os dados que vêm errados da base Syscon. Os laudos originais não serão alterados.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-equip">Equip.</Label>
              <Input
                id="edit-equip"
                value={editForm.equip}
                onChange={(e) => setEditForm((f) => ({ ...f, equip: e.target.value }))}
                placeholder="Número de frota"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-placa">Placa</Label>
              <Input
                id="edit-placa"
                value={editForm.placa}
                onChange={(e) => setEditForm((f) => ({ ...f, placa: e.target.value.toUpperCase() }))}
                className="uppercase"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-denominacao">Denominação</Label>
              <Input
                id="edit-denominacao"
                value={editForm.denominacao}
                onChange={(e) => setEditForm((f) => ({ ...f, denominacao: e.target.value }))}
              />
            </div>
            {editingRow?.corrigido && (
              <p className="text-xs text-muted-foreground">
                Placa original (Syscon): <span className="font-mono">{editingRow.placaOriginal}</span>
              </p>
            )}
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            {editingRow?.corrigido && (
              <Button
                variant="outline"
                onClick={handleResetEdit}
                disabled={deleteCorrecao.isPending}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restaurar original
              </Button>
            )}
            <Button variant="ghost" onClick={() => setEditingRow(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} disabled={upsertCorrecao.isPending}>
              {upsertCorrecao.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inconsistencias;
