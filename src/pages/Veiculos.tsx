import { useVeiculos, Veiculo } from "@/hooks/use-veiculos";
import { Loader2, Truck, Search, Plus, Trash2 } from "lucide-react";
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
  const [busca, setBusca] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

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

  if (isLoading) {
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
                  {filtrados.map((v) => (
                    <TableRow key={v.id} className="hover:bg-muted/50 group">
                      <TableCell className="font-bold text-sm" style={{ color: "hsl(217, 91%, 60%)" }}>{v.equip}</TableCell>
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
                          onClick={() => setDeleteId(v.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
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
