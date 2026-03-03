import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Laudo, SYSCON_BASE_URL } from "@/lib/laudos-data";
import { Search, Truck, Tag, Gauge, FileText, ExternalLink } from "lucide-react";

interface LaudosTableProps {
  laudos: Laudo[];
}

export function LaudosTable({ laudos }: LaudosTableProps) {
  const [search, setSearch] = useState("");
  const [filtroResultado, setFiltroResultado] = useState<string>("todos");

  const filtered = useMemo(() => {
    return laudos.filter((l) => {
      const matchSearch =
        l.veiculo.toLowerCase().includes(search.toLowerCase()) ||
        l.placa.toLowerCase().includes(search.toLowerCase()) ||
        l.numero.toString().includes(search);
      const matchResultado = filtroResultado === "todos" || l.resultado === filtroResultado;
      return matchSearch && matchResultado;
    });
  }, [laudos, search, filtroResultado]);

  return (
    <div className="rounded-xl border bg-card shadow-lg">
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Truck className="h-5 w-5 text-muted-foreground" />
          Laudos de Inspeção
        </h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar veículo, placa..."
              className="pl-9 w-[250px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={filtroResultado} onValueChange={setFiltroResultado}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="APROVADO">Aprovado</SelectItem>
              <SelectItem value="REPROVADO">Reprovado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold w-[100px]">Nº / Data</TableHead>
              <TableHead className="font-semibold">
                <span className="flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5" /> Veículo
                </span>
              </TableHead>
              <TableHead className="font-semibold">
                <span className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" /> Placa
                </span>
              </TableHead>
              <TableHead className="font-semibold text-right">
                <span className="flex items-center gap-1.5 justify-end">
                  <Gauge className="h-3.5 w-3.5" /> Km
                </span>
              </TableHead>
              <TableHead className="font-semibold">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Tipo
                </span>
              </TableHead>
              <TableHead className="font-semibold text-center">Resultado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((l) => (
              <TableRow
                key={l.numero}
                className="hover:bg-muted/30 cursor-pointer group"
                onClick={() => {
                  const sysconUrl = l.url || `${SYSCON_BASE_URL}`;
                  window.open(sysconUrl, "_blank", "noopener,noreferrer");
                }}
              >
                <TableCell className="py-3">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-primary">{l.numero}</span>
                    <span className="text-xs text-muted-foreground">{l.data}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[280px]">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="truncate text-foreground text-sm">{l.veiculo}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tag className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="font-mono uppercase text-foreground text-sm">{l.placa}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <Gauge className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="font-mono text-sm text-muted-foreground">
                      {l.km.toLocaleString("pt-BR")}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground truncate max-w-[200px]">{l.tipo}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Badge
                      variant={l.resultado === "APROVADO" ? "default" : "destructive"}
                      className={
                        l.resultado === "APROVADO"
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : ""
                      }
                    >
                      {l.resultado}
                    </Badge>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Nenhum laudo encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="border-t px-6 py-3 text-sm text-muted-foreground">
        {filtered.length} de {laudos.length} laudos
      </div>
    </div>
  );
}
