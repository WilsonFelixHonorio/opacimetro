import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Laudo, getLaudosPorMes, getLaudosPorAno, getVeiculosPorMarca, getVeiculosPorModelo } from "@/lib/laudos-data";
import { Badge } from "@/components/ui/badge";

interface LaudosChartProps {
  laudos: Laudo[];
  mesSelecionado?: string | null;
  onMesClick?: (mes: string | null) => void;
  placaDenominacao?: Record<string, string>;
}

const COLORS = [
  "hsl(222, 47%, 11%)", "hsl(210, 40%, 50%)", "hsl(215, 16%, 47%)", "hsl(200, 30%, 60%)",
  "hsl(180, 35%, 45%)", "hsl(240, 30%, 55%)", "hsl(260, 25%, 50%)", "hsl(190, 40%, 40%)",
  "hsl(170, 30%, 50%)", "hsl(230, 35%, 60%)",
];

export function LaudosChart({ laudos, mesSelecionado, onMesClick, placaDenominacao }: LaudosChartProps) {
  const dadosMes = getLaudosPorMes(laudos);
  const dadosAno = getLaudosPorAno(laudos);
  const dadosMarca = getVeiculosPorMarca(laudos, placaDenominacao);
  const dadosModelo = getVeiculosPorModelo(laudos, placaDenominacao);
  const modeloChartHeight = Math.max(300, dadosModelo.length * 32);

  const handleBarClick = (data: any) => {
    if (data?.activeLabel) {
      if (mesSelecionado === data.activeLabel) {
        onMesClick?.(null);
      } else {
        onMesClick?.(data.activeLabel);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Laudos por mês + por ano */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-none shadow-lg lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Laudos por Mês</CardTitle>
            {mesSelecionado && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => onMesClick?.(null)}
              >
                Filtro: {mesSelecionado} ✕
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-2">Clique em uma barra para filtrar a tabela</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosMes} onClick={handleBarClick} style={{ cursor: "pointer" }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="mes" className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: "hsl(222, 47%, 11%)",
                    border: "1px solid hsl(215, 16%, 47%)",
                    borderRadius: "8px",
                    color: "hsl(210, 40%, 98%)",
                  }}
                  labelStyle={{ color: "hsl(210, 40%, 98%)" }}
                  itemStyle={{ color: "hsl(210, 40%, 98%)" }}
                />
                <Bar dataKey="aprovados" name="Aprovados" fill="hsl(152, 60%, 35%)" radius={[4, 4, 0, 0]} activeBar={{ fill: "hsl(152, 60%, 50%)" }} />
                <Bar dataKey="reprovados" name="Reprovados" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} activeBar={{ fill: "hsl(0, 84%, 72%)" }} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-base">Laudos por Ano</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosAno}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="ano" className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: "hsl(222, 47%, 11%)",
                    border: "1px solid hsl(215, 16%, 47%)",
                    borderRadius: "8px",
                    color: "hsl(210, 40%, 98%)",
                  }}
                  labelStyle={{ color: "hsl(210, 40%, 98%)" }}
                  itemStyle={{ color: "hsl(210, 40%, 98%)" }}
                />
                <Bar dataKey="aprovados" name="Aprovados" fill="hsl(152, 60%, 35%)" radius={[4, 4, 0, 0]} activeBar={{ fill: "hsl(152, 60%, 50%)" }} />
                <Bar dataKey="reprovados" name="Reprovados" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} activeBar={{ fill: "hsl(0, 84%, 72%)" }} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Marca + Modelo side by side */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-base">Distribuição por Marca</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dadosMarca}
                  dataKey="total"
                  nameKey="marca"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ marca, total }: { marca: string; total: number }) => `${marca} (${total})`}
                  labelLine={{ stroke: "hsl(215, 16%, 47%)" }}
                >
                  {dadosMarca.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: "hsl(222, 47%, 11%)",
                    border: "1px solid hsl(215, 16%, 47%)",
                    borderRadius: "8px",
                    color: "hsl(210, 40%, 98%)",
                  }}
                  labelStyle={{ color: "hsl(210, 40%, 98%)" }}
                  itemStyle={{ color: "hsl(210, 40%, 98%)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-base">Distribuição por Modelo ({dadosModelo.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: "100%", overflowY: "auto", maxHeight: 400 }}>
              <ResponsiveContainer width="100%" height={modeloChartHeight}>
                <BarChart data={dadosModelo} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
                  <YAxis
                    type="category"
                    dataKey="modelo"
                    className="text-xs"
                    tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 11 }}
                    width={160}
                    interval={0}
                  />
                  <Tooltip
                    cursor={false}
                    contentStyle={{
                      backgroundColor: "hsl(222, 47%, 11%)",
                      border: "1px solid hsl(215, 16%, 47%)",
                      borderRadius: "8px",
                      color: "hsl(210, 40%, 98%)",
                    }}
                    labelStyle={{ color: "hsl(210, 40%, 98%)" }}
                    itemStyle={{ color: "hsl(210, 40%, 98%)" }}
                  />
                  <Bar dataKey="total" name="Laudos" fill="hsl(210, 40%, 50%)" radius={[0, 4, 4, 0]} activeBar={{ fill: "hsl(210, 40%, 65%)" }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
