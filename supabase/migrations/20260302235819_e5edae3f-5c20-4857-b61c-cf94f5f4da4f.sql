
-- Tabela para armazenar laudos de opacidade
CREATE TABLE public.laudos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  numero INTEGER NOT NULL UNIQUE,
  data TEXT NOT NULL,
  veiculo TEXT NOT NULL,
  placa TEXT NOT NULL,
  km INTEGER NOT NULL DEFAULT 0,
  tipo TEXT NOT NULL DEFAULT 'Relatório simplificado de Fumaça',
  resultado TEXT NOT NULL CHECK (resultado IN ('APROVADO', 'REPROVADO')),
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.laudos ENABLE ROW LEVEL SECURITY;

-- Política de leitura pública (dados são públicos)
CREATE POLICY "Laudos são visíveis para todos"
ON public.laudos
FOR SELECT
USING (true);

-- Política de escrita apenas via service role (Edge Functions)
CREATE POLICY "Apenas service role pode inserir laudos"
ON public.laudos
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Apenas service role pode atualizar laudos"
ON public.laudos
FOR UPDATE
USING (false);

CREATE POLICY "Apenas service role pode deletar laudos"
ON public.laudos
FOR DELETE
USING (false);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_laudos_updated_at
BEFORE UPDATE ON public.laudos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
