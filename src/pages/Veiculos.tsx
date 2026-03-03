import React from "react";
import { useVeiculos, Veiculo } from "@/hooks/use-veiculos";
import { useLaudos } from "@/hooks/use-laudos";
import { parseDate } from "@/lib/laudos-data";
import { Loader2, Truck, Search, Plus, Trash2, ChevronDown, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { AppHeader } from "@/components/AppHeader";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import { SYSCON_BASE_URL } from "@/lib/laudos-data";

const camposVeiculo = [
  { key: "equip", label: "Equip." },
  { key: "denominacao", label: "Denominação" },
  { key: "denominacao_tipo", label: "Tipo" },
  { key: "classe_operacional", label: "Classe Operacional" },
  { key: "ger_responsavel", label: "Ger. Responsável" },
  { key: "ano", label: "Ano" },
  { key: "cor", label: "Cor" },
  { key: "placa", label: "Placa" },
  { key: "serie_chassis", label: "Série/Chassis" },
  { key: "proprietario", label: "Proprietário" },
] as const;

const emptyForm = {
  equip: "", denominacao: "", denominacao_tipo: "", classe_operacional: "",
  ger_responsavel: "", ano: "", cor: "", placa: "", serie_chassis: "", proprietario: "",
};

const Veiculos = () => {
  const { data: veiculos = [], isLoading, refetch } = useVeiculos();
  const { data: laudos = [], isLoading: loadingLaudos } = useLaudos();
  const [busca, setBusca] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [expandedPlaca, setExpandedPlaca] = useState<string | null>(null);

  // Laudos grouped by placa, sorted newest first
  const laudosPorPlaca = useMemo(() => {
    const map: Record<string, typeof laudos> = {};
    laudos.forEach((l) => {
      const placa = l.placa.toUpperCase();
      if (!map[placa]) map[placa] = [];
      map[placa].push(l);
    });
    // Sort each group newest first
    Object.values(map).forEach((arr) =>
      arr.sort((a, b) => parseDate(b.data).getTime() - parseDate(a.data).getTime())
    );
    return map;
  }, [laudos]);

  const filtrados = useMemo(() => {
    if (!busca) return veiculos;
    const termo = busca.toLowerCase();
    return veiculos.filter(
      (v) =>
        v.equip.toLowerCase().includes(termo) ||
        v.denominacao.toLowerCase().includes(termo) ||
        v.denominacao_tipo.toLowerCase().includes(termo) ||
        v.classe_operacional.toLowerCase().includes(termo) ||
        v.placa.toLowerCase().includes(termo) ||
        v.ger_responsavel.toLowerCase().includes(termo) ||
        v.proprietario.toLowerCase().includes(termo)
    );
  }, [veiculos, busca]);

  const handleAdd = async () => {
    if (!form.equip || !form.denominacao) {
      toast.error("Preencha ao menos Equip. e Denominação");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.functions.invoke("manage-veiculos", {
        body: { action: "insert", veiculo: form },
      });
      if (error) throw error;
      toast.success("Veículo adicionado com sucesso!");
      setShowAdd(false);
      setForm(emptyForm);
      refetch();
    } catch (e: any) {
      toast.error("Erro ao adicionar: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const { error } = await supabase.functions.invoke("manage-veiculos", {
        body: { action: "delete", id: deleteId },
      });
      if (error) throw error;
      toast.success("Veículo removido com sucesso!");
      setDeleteId(null);
      refetch();
    } catch (e: any) {
      toast.error("Erro ao remover: " + e.message);
    } finally {
      setDeleting(false);
    }
  };

  if (isLoading || loadingLaudos) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AppHeader />

      <div className="space-y-6 px-6 py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por equip, placa, denominação..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-9 sm:w-[300px]"
              />
            </div>
            <Button size="sm" onClick={() => setShowAdd(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Novo Veículo
            </Button>
          </div>
          <Badge variant="outline" className="text-xs w-fit">
            <Truck className="h-3 w-3 mr-1" />
            {filtrados.length} veículos
          </Badge>
        </div>

        <Card className="border-none shadow-lg">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/5">
                    <TableHead className="font-semibold text-xs whitespace-nowrap">Equip.</TableHead>
                    <TableHead className="font-semibold text-xs whitespace-nowrap">Denominação</TableHead>
                    <TableHead className="font-semibold text-xs whitespace-nowrap">Tipo</TableHead>
                    <TableHead className="font-semibold text-xs whitespace-nowrap">Classe Operacional</TableHead>
                    <TableHead className="font-semibold text-xs whitespace-nowrap">Ger. Responsável</TableHead>
                    <TableHead className="font-semibold text-xs whitespace-nowrap">Ano</TableHead>
                    <TableHead className="font-semibold text-xs whitespace-nowrap">Cor</TableHead>
                    <TableHead className="font-semibold text-xs whitespace-nowrap">Placa</TableHead>
                    <TableHead className="font-semibold text-xs whitespace-nowrap">Série/Chassis</TableHead>
                    <TableHead className="font-semibold text-xs whitespace-nowrap">Proprietário</TableHead>
                    <TableHead className="font-semibold text-xs whitespace-nowrap w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtrados.map((v) => {
                    const placa = v.placa.toUpperCase();
                    const isExpanded = expandedPlaca === placa;
                    const veiculoLaudos = laudosPorPlaca[placa] || [];

                    return (
                      <React.Fragment key={v.id}>
                        <TableRow
                          className="hover:bg-muted/50 group cursor-pointer"
                          onClick={() => setExpandedPlaca(isExpanded ? null : placa)}
                        >
                          <TableCell className="font-bold text-sm" style={{ color: "hsl(217, 91%, 60%)" }}>
                            <span className="flex items-center gap-1">
                              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isExpanded ? "rotate-0" : "-rotate-90"}`} />
                              {v.equip}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm whitespace-nowrap">{v.denominacao}</TableCell>
                          <TableCell className="text-sm whitespace-nowrap">{v.denominacao_tipo}</TableCell>
                          <TableCell className="text-sm whitespace-nowrap">{v.classe_operacional}</TableCell>
                          <TableCell className="text-sm whitespace-nowrap">{v.ger_responsavel}</TableCell>
                          <TableCell className="text-sm text-center">{v.ano}</TableCell>
                          <TableCell className="text-sm">{v.cor}</TableCell>
                          <TableCell className="text-sm font-medium">{v.placa}</TableCell>
                          <TableCell className="text-sm font-mono text-xs">{v.serie_chassis}</TableCell>
                          <TableCell className="text-sm whitespace-nowrap">{v.proprietario}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                              onClick={(e) => { e.stopPropagation(); setDeleteId(v.id); }}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        {isExpanded && (
                          <TableRow>
                            <TableCell colSpan={11} className="p-0 bg-muted/20">
                              {veiculoLaudos.length === 0 ? (
                                <div className="px-8 py-4 text-sm text-muted-foreground italic">
                                  Nenhum laudo encontrado para este veículo.
                                </div>
                              ) : (
                                <div className="px-8 py-3">
                                  <p className="text-xs font-semibold text-muted-foreground mb-2">
                                    Laudos ({veiculoLaudos.length})
                                  </p>
                                  <Table>
                                    <TableHeader>
                                      <TableRow className="bg-muted/40">
                                        <TableHead className="text-xs font-semibold">Nº</TableHead>
                                        <TableHead className="text-xs font-semibold">Data</TableHead>
                                        <TableHead className="text-xs font-semibold">KM</TableHead>
                                        <TableHead className="text-xs font-semibold">Resultado</TableHead>
                                        <TableHead className="text-xs font-semibold">Link</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {veiculoLaudos.map((l) => (
                                        <TableRow key={l.numero} className="hover:bg-muted/30">
                                          <TableCell className="text-sm font-mono">{l.numero}</TableCell>
                                          <TableCell className="text-sm">{l.data}</TableCell>
                                          <TableCell className="text-sm">{l.km.toLocaleString("pt-BR")}</TableCell>
                                          <TableCell>
                                            <Badge
                                              variant={l.resultado === "APROVADO" ? "default" : "destructive"}
                                              className={l.resultado === "APROVADO" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                                            >
                                              {l.resultado}
                                            </Badge>
                                          </TableCell>
                                          <TableCell>
                                            {l.url ? (
                                              <a
                                                href={l.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline inline-flex items-center gap-1 text-xs"
                                                onClick={(e) => e.stopPropagation()}
                                              >
                                                <ExternalLink className="h-3 w-3" /> Ver
                                              </a>
                                            ) : (
                                              <span className="text-muted-foreground text-xs">-</span>
                                            )}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Novo Veículo</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {camposVeiculo.map(({ key, label }) => (
              <div key={key} className="space-y-1">
                <Label className="text-xs">{label}</Label>
                <Input
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={label}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancelar</Button>
            <Button onClick={handleAdd} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover veículo?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O veículo será removido permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {deleting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Veiculos;
