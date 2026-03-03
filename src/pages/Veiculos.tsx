import { useVeiculos } from "@/hooks/use-veiculos";
import { Loader2, Truck, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { AppTabs } from "@/components/AppTabs";
import { useState, useMemo } from "react";

const Veiculos = () => {
  const { data: veiculos = [], isLoading } = useVeiculos();
  const [busca, setBusca] = useState("");

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-card shadow-sm">
        <div className="px-6 py-5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Painel de Laudos de Opacidade
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Usina Açucareira Guaíra — CNPJ: 07.948.124.0001/42
          </p>
        </div>
      </header>

      <AppTabs />

      <div className="space-y-6 px-6 py-6">
      {/* Search + count */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por equip, placa, denominação..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="outline" className="text-xs w-fit">
          <Truck className="h-3 w-3 mr-1" />
          {filtrados.length} veículos
        </Badge>
      </div>

      {/* Table */}
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtrados.map((v) => (
                  <TableRow key={v.id} className="hover:bg-muted/50">
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default Veiculos;
