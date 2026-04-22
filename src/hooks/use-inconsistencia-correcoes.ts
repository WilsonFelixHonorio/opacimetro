import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CorrecaoInconsistencia {
  id: string;
  placa_original: string;
  equip_corrigido: string | null;
  placa_corrigida: string | null;
  denominacao_corrigida: string | null;
  observacao: string | null;
  oculto: boolean;
}

export function useInconsistenciaCorrecoes() {
  return useQuery({
    queryKey: ["inconsistencia_correcoes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inconsistencia_correcoes")
        .select("*");
      if (error) throw error;
      return data as CorrecaoInconsistencia[];
    },
  });
}

export function useUpsertCorrecao() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      placa_original: string;
      equip_corrigido: string | null;
      placa_corrigida: string | null;
      denominacao_corrigida: string | null;
      observacao?: string | null;
    }) => {
      const { data, error } = await supabase
        .from("inconsistencia_correcoes")
        .upsert(input, { onConflict: "placa_original" })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inconsistencia_correcoes"] });
    },
  });
}

export function useDeleteCorrecao() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (placa_original: string) => {
      const { error } = await supabase
        .from("inconsistencia_correcoes")
        .delete()
        .eq("placa_original", placa_original);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inconsistencia_correcoes"] });
    },
  });
}
