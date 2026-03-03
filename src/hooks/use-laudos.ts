import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Laudo } from "@/lib/laudos-data";

export function useLaudos() {
  return useQuery({
    queryKey: ["laudos"],
    queryFn: async (): Promise<Laudo[]> => {
      const { data, error } = await supabase
        .from("laudos")
        .select("numero, data, veiculo, placa, km, tipo, resultado, url")
        .order("numero", { ascending: false });

      if (error) throw error;

      return (data ?? []).map((row) => ({
        numero: row.numero,
        data: row.data,
        veiculo: row.veiculo,
        placa: row.placa,
        km: row.km,
        tipo: row.tipo,
        resultado: row.resultado as "APROVADO" | "REPROVADO",
        url: row.url ?? undefined,
      }));
    },
  });
}
