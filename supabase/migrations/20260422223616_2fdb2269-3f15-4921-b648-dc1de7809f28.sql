-- Tabela para corrigir manualmente dados de inconsistências vindos da base Syscon
CREATE TABLE public.inconsistencia_correcoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  placa_original TEXT NOT NULL UNIQUE,
  equip_corrigido TEXT,
  placa_corrigida TEXT,
  denominacao_corrigida TEXT,
  observacao TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.inconsistencia_correcoes ENABLE ROW LEVEL SECURITY;

-- Visíveis para todos (mesmo padrão das outras tabelas do app)
CREATE POLICY "Correcoes visiveis para todos"
ON public.inconsistencia_correcoes
FOR SELECT
USING (true);

-- Permitir inserir/atualizar/deletar pelo cliente (app sem auth, mesmo padrão de uso)
CREATE POLICY "Qualquer um pode inserir correcoes"
ON public.inconsistencia_correcoes
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Qualquer um pode atualizar correcoes"
ON public.inconsistencia_correcoes
FOR UPDATE
USING (true);

CREATE POLICY "Qualquer um pode deletar correcoes"
ON public.inconsistencia_correcoes
FOR DELETE
USING (true);

CREATE TRIGGER update_inconsistencia_correcoes_updated_at
BEFORE UPDATE ON public.inconsistencia_correcoes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();