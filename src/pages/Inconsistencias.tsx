import { useMemo, useState } from "react";
import { useLaudos } from "@/hooks/use-laudos";
import { useVeiculos } from "@/hooks/use-veiculos";
import { AppHeader } from "@/components/AppHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ArrowUpDown, ArrowUp, ArrowDown, AlertTriangle, Loader2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseDate } from "@/lib/laudos-data";

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
}

const Inconsistencias = () => {
  const { data: laudos = [], isLoading: loadingLaudos } = useLaudos();
  const { data: veiculos = [], isLoading: loadingVeiculos } = useVeiculos();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("status");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

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

    const placasVeiculos = new Set<string>();

    // 1. Veículos sem laudo ou com laudo reprovado
    veiculos.forEach((v) => {
      const placa = v.placa.toUpperCase();
      placasVeiculos.add(placa);
      const laudo = laudoPorPlaca[placa];

      if (!laudo) {
        result.push({
          equip: v.equip,
          placa: v.placa,
          denominacao: v.denominacao,
          status: "Sem laudo",
          ultimoLaudo: "-",
          resultado: "-",
          origem: "Cadastro",
        });
      } else if (laudo.resultado === "REPROVADO") {
        result.push({
          equip: v.equip,
          placa: v.placa,
          denominacao: v.denominacao,
          status: "Reprovado",
          ultimoLaudo: laudo.data,
          resultado: laudo.resultado,
          origem: "Cadastro",
        });
      }
    });

    // 2. Laudos com placas que não existem no cadastro de veículos
    const placasJaAdicionadas = new Set<string>();
    laudos.forEach((l) => {
      const placa = l.placa.toUpperCase();
      if (!placasVeiculos.has(placa) && !placasJaAdicionadas.has(placa)) {
        placasJaAdicionadas.add(placa);
        const laudo = laudoPorPlaca[placa];
        result.push({
          equip: "-",
          placa: l.placa,
          denominacao: l.veiculo,
          status: "Não cadastrado",
          ultimoLaudo: laudo?.data || l.data,
          resultado: laudo?.resultado || l.resultado,
          origem: "Laudo",
        });
      }
    });

    return result;
  }, [laudos, veiculos]);

  const filtered = useMemo(() => {
    let data = rows;
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

  const isLoading = loadingLaudos || loadingVeiculos;

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
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row, i) => (
                  <TableRow key={`${row.placa}-${i}`} className="hover:bg-muted/30">
                    <TableCell className="font-mono text-sm">{row.equip}</TableCell>
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
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
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
    </div>
  );
};

export default Inconsistencias;
