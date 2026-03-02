import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Laudo, getLaudosPorMes, getVeiculosPorMarca } from "@/lib/laudos-data";
import { motion } from "framer-motion";

interface LaudosChartProps {
  laudos: Laudo[];
}

const COLORS = ["hsl(222, 47%, 11%)", "hsl(210, 40%, 50%)", "hsl(215, 16%, 47%)", "hsl(200, 30%, 60%)"];

export function LaudosChart({ laudos }: LaudosChartProps) {
  const dadosMes = getLaudosPorMes(laudos);
  const dadosMarca = getVeiculosPorMarca(laudos);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-base">Laudos por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dadosMes}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="mes" className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(215, 16%, 47%)" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(214, 32%, 91%)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="aprovados" name="Aprovados" fill="hsl(152, 60%, 35%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reprovados" name="Reprovados" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-base">Distribuição por Marca</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={dadosMarca}
                  dataKey="total"
                  nameKey="marca"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ marca, total }) => `${marca} (${total})`}
                  labelLine={{ stroke: "hsl(215, 16%, 47%)" }}
                >
                  {dadosMarca.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
