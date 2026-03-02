import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Laudo } from "@/lib/laudos-data";
import { Search, Truck } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-xl border bg-card shadow-lg"
    >
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
      <div className="overflow-auto max-h-[500px]">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Nº</TableHead>
              <TableHead className="font-semibold">Data</TableHead>
              <TableHead className="font-semibold">Veículo</TableHead>
              <TableHead className="font-semibold">Placa</TableHead>
              <TableHead className="font-semibold text-right">Km</TableHead>
              <TableHead className="font-semibold text-center">Resultado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((l) => (
              <TableRow key={l.numero} className="hover:bg-muted/30">
                <TableCell className="font-mono font-bold text-foreground">{l.numero}</TableCell>
                <TableCell className="text-muted-foreground">{l.data}</TableCell>
                <TableCell className="max-w-[300px] truncate text-foreground">{l.veiculo}</TableCell>
                <TableCell className="font-mono uppercase text-foreground">{l.placa}</TableCell>
                <TableCell className="text-right font-mono text-muted-foreground">
                  {l.km.toLocaleString("pt-BR")}
                </TableCell>
                <TableCell className="text-center">
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
    </motion.div>
  );
}
