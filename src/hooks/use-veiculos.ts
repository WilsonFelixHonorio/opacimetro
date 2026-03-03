import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Veiculo {
  id: string;
  equip: string;
  denominacao: string;
  denominacao_tipo: string;
  classe_operacional: string;
  ger_responsavel: string;
  ano: string;
  cor: string;
  placa: string;
  serie_chassis: string;
  proprietario: string;
}

export function useVeiculos() {
  return useQuery({
    queryKey: ["veiculos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("veiculos")
        .select("*")
        .order("equip", { ascending: true });
      if (error) throw error;
      return data as Veiculo[];
    },
  });
}
