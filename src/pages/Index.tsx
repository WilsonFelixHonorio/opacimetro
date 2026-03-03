import { getStats, getAnosDisponiveis, parseDate } from "@/lib/laudos-data";
import { useLaudos } from "@/hooks/use-laudos";
import { useVeiculos } from "@/hooks/use-veiculos";
import { StatCard } from "@/components/StatCard";
import { LaudosTable } from "@/components/LaudosTable";
import { LaudosChart } from "@/components/LaudosChart";
import { AppHeader } from "@/components/AppHeader";
import { ClipboardCheck, CheckCircle, XCircle, TrendingUp, RefreshCw, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useMemo, useCallback, useEffect } from "react";

const Index = () => {
  const { data: allLaudos = [], isLoading, refetch } = useLaudos();
  const { data: veiculos = [] } = useVeiculos();
  const [syncing, setSyncing] = useState(false);
  const [anoFiltro, setAnoFiltro] = useState<string>("todos");
  const [mesFiltro, setMesFiltro] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(
    () => localStorage.getItem("lastSyncTime")
  );

  const placaDenominacao = useMemo(() => {
    const map: Record<string, string> = {};
    veiculos.forEach((v) => {
      map[v.placa.toUpperCase()] = v.denominacao;
    });
    return map;
  }, [veiculos]);

  const anos = useMemo(() => getAnosDisponiveis(allLaudos), [allLaudos]);

  const laudosPorAno = useMemo(() => {
    if (anoFiltro === "todos") return allLaudos;
    const ano = parseInt(anoFiltro);
    return allLaudos.filter((l) => parseDate(l.data).getFullYear() === ano);
  }, [allLaudos, anoFiltro]);

  const laudosData = useMemo(() => {
    if (!mesFiltro) return laudosPorAno;
    const nomesMeses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    return laudosPorAno.filter((l) => {
      const date = parseDate(l.data);
      const key = `${nomesMeses[date.getMonth()]}/${date.getFullYear()}`;
      return key === mesFiltro;
    });
  }, [laudosPorAno, mesFiltro]);

  const stats = getStats(laudosData);

  const handleMesClick = useCallback((mes: string | null) => {
    setMesFiltro(mes);
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke("sync-laudos-urls");
      if (error) throw error;
      const now = new Date().toLocaleString("pt-BR");
      localStorage.setItem("lastSyncTime", now);
      setLastSync(now);
      toast.success(`Sincronizado! ${data.inserted} novos, ${data.updated} atualizados.`);
      refetch();
    } catch (e: any) {
      toast.error("Erro ao sincronizar: " + e.message);
    } finally {
      setSyncing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AppHeader>
        <Button variant="outline" size="sm" onClick={handleSync} disabled={syncing}>
          <RefreshCw className={`h-4 w-4 mr-1 ${syncing ? "animate-spin" : ""}`} />
          {syncing ? "Sincronizando..." : "Sincronizar"}
        </Button>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {lastSync ? lastSync : "Nunca sincronizado"}
        </span>
      </AppHeader>

      <main className="space-y-6 px-6 py-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total de Laudos" value={stats.total} icon={ClipboardCheck} color="bg-primary" />
          <StatCard title="Aprovados" value={stats.aprovados} icon={CheckCircle} description={`${stats.taxaAprovacao}% de aprovação`} color="bg-emerald-600" />
          <StatCard title="Reprovados" value={stats.reprovados} icon={XCircle} color="bg-destructive" />
          <StatCard title="Taxa de Aprovação" value={`${stats.taxaAprovacao}%`} icon={TrendingUp} color="bg-primary" />
        </div>

        <LaudosChart laudos={laudosPorAno} mesSelecionado={mesFiltro} onMesClick={handleMesClick} placaDenominacao={placaDenominacao} />

        <LaudosTable laudos={laudosData} anoFiltro={anoFiltro} onAnoChange={(v) => { setAnoFiltro(v); setMesFiltro(null); }} anos={anos} />
      </main>
    </div>
  );
};

export default Index;
