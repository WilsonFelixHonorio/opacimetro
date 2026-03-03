import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Laudo, getLaudosPorMes, getLaudosPorAno, getVeiculosPorMarca, getVeiculosPorModelo } from "@/lib/laudos-data";
import type { ChartFilters } from "@/pages/Index";

interface LaudosChartProps {
  laudos: Laudo[];
  laudosFiltrados: Laudo[];
  filters: ChartFilters;
  onFilterToggle: (key: keyof ChartFilters, value: string | null) => void;
  placaDenominacao?: Record<string, string>;
}

const COLORS = [
  "hsl(210, 70%, 50%)",  // azul vibrante
  "hsl(152, 60%, 40%)",  // verde
  "hsl(25, 85%, 55%)",   // laranja
  "hsl(340, 65%, 50%)",  // rosa/vermelho
  "hsl(270, 55%, 55%)",  // roxo
  "hsl(45, 80%, 50%)",   // amarelo dourado
  "hsl(185, 60%, 45%)",  // ciano
  "hsl(0, 70%, 55%)",    // vermelho
  "hsl(140, 45%, 50%)",  // verde claro
  "hsl(300, 40%, 55%)",  // magenta
];

const TOOLTIP_STYLE = {
  contentStyle: {
    backgroundColor: "hsl(222, 47%, 11%)",
    border: "1px solid hsl(215, 16%, 47%)",
    borderRadius: "8px",
    color: "hsl(210, 40%, 98%)",
  },
  labelStyle: { color: "hsl(210, 40%, 98%)" },
  itemStyle: { color: "hsl(210, 40%, 98%)" },
};

export function LaudosChart({ laudos, laudosFiltrados, filters, onFilterToggle, placaDenominacao }: LaudosChartProps) {
  // Use laudosFiltrados for charts that are NOT the source of the current filter
  // Use laudos (unfiltered by chart clicks) for the chart that IS the source
  const dadosMes = getLaudosPorMes(filters.mes ? laudos : laudosFiltrados);
  const dadosAno = getLaudosPorAno(filters.ano ? laudos : laudosFiltrados);
  const dadosMarca = getVeiculosPorMarca(filters.marca ? laudos : laudosFiltrados, placaDenominacao);
  const dadosModelo = getVeiculosPorModelo(filters.modelo ? laudos : laudosFiltrados, placaDenominacao);
  const modeloChartHeight = Math.max(300, dadosModelo.length * 32);

  return (
    <div className="space-y-6">
      <p className="text-xs text-muted-foreground">Clique em qualquer gráfico para filtrar os dados. Clique novamente para remover o filtro.</p>

      {/* Laudos por mês + por ano */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className={`border-none shadow-lg lg:col-span-2 transition-all ${filters.mes ? "ring-2 ring-primary/50" : ""}`}>
          <CardHeader>
            <CardTitle className="text-base">Laudos por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={dadosMes}
                onClick={(data: any) => data?.activeLabel && onFilterToggle("mes", data.activeLabel)}
                style={{ cursor: "pointer" }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="mes" className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
                <Tooltip cursor={false} {...TOOLTIP_STYLE} />
                <Bar dataKey="aprovados" name="Aprovados" fill="hsl(152, 60%, 35%)" radius={[4, 4, 0, 0]} activeBar={{ fill: "hsl(152, 60%, 50%)" }} />
                <Bar dataKey="reprovados" name="Reprovados" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} activeBar={{ fill: "hsl(0, 84%, 72%)" }} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className={`border-none shadow-lg transition-all ${filters.ano ? "ring-2 ring-primary/50" : ""}`}>
          <CardHeader>
            <CardTitle className="text-base">Laudos por Ano</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={dadosAno}
                onClick={(data: any) => data?.activeLabel && onFilterToggle("ano", data.activeLabel)}
                style={{ cursor: "pointer" }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="ano" className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
                <Tooltip cursor={false} {...TOOLTIP_STYLE} />
                <Bar dataKey="aprovados" name="Aprovados" fill="hsl(152, 60%, 35%)" radius={[4, 4, 0, 0]} activeBar={{ fill: "hsl(152, 60%, 50%)" }} />
                <Bar dataKey="reprovados" name="Reprovados" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} activeBar={{ fill: "hsl(0, 84%, 72%)" }} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Marca + Modelo */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className={`border-none shadow-lg transition-all ${filters.marca ? "ring-2 ring-primary/50" : ""}`}>
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
                  label={({ marca, total, x, y, textAnchor }: any) => (
                    <text x={x} y={y} textAnchor={textAnchor} fill="hsl(215, 16%, 47%)" fontSize={12}>
                      {`${marca} (${total})`}
                    </text>
                  )}
                  labelLine={{ stroke: "hsl(215, 16%, 47%)" }}
                  stroke="none"
                  activeShape={() => null}
                  onClick={(data: any) => data?.marca && onFilterToggle("marca", data.marca)}
                  style={{ cursor: "pointer" }}
                >
                  {dadosMarca.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip cursor={false} isAnimationActive={false} {...TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className={`border-none shadow-lg transition-all ${filters.modelo ? "ring-2 ring-primary/50" : ""}`}>
          <CardHeader>
            <CardTitle className="text-base">Distribuição por Modelo ({dadosModelo.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: "100%", overflowY: "auto", maxHeight: 400 }}>
              <ResponsiveContainer width="100%" height={modeloChartHeight}>
                <BarChart
                  data={dadosModelo}
                  layout="vertical"
                  margin={{ left: 10, right: 20, top: 5, bottom: 5 }}
                  onClick={(data: any) => data?.activeLabel && onFilterToggle("modelo", data.activeLabel)}
                  style={{ cursor: "pointer" }}
                >
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
                  <Tooltip cursor={false} {...TOOLTIP_STYLE} />
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
