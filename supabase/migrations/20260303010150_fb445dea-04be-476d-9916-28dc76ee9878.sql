
CREATE TABLE public.veiculos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  equip text NOT NULL,
  denominacao text NOT NULL,
  denominacao_tipo text NOT NULL DEFAULT '',
  classe_operacional text NOT NULL DEFAULT '',
  ger_responsavel text NOT NULL DEFAULT '',
  ano text NOT NULL DEFAULT '',
  cor text NOT NULL DEFAULT '',
  placa text NOT NULL DEFAULT '',
  serie_chassis text NOT NULL DEFAULT '',
  proprietario text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.veiculos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Veiculos são visíveis para todos"
ON public.veiculos FOR SELECT
USING (true);

CREATE POLICY "Apenas service role pode inserir veiculos"
ON public.veiculos FOR INSERT
WITH CHECK (false);

CREATE POLICY "Apenas service role pode atualizar veiculos"
ON public.veiculos FOR UPDATE
USING (false);

CREATE POLICY "Apenas service role pode deletar veiculos"
ON public.veiculos FOR DELETE
USING (false);

CREATE TRIGGER update_veiculos_updated_at
BEFORE UPDATE ON public.veiculos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
