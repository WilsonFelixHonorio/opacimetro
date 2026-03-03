import { getStats } from "@/lib/laudos-data";
import { useLaudos } from "@/hooks/use-laudos";
import { StatCard } from "@/components/StatCard";
import { LaudosTable } from "@/components/LaudosTable";
import { LaudosChart } from "@/components/LaudosChart";
import { ClipboardCheck, CheckCircle, XCircle, TrendingUp, RefreshCw, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

const Index = () => {
  const { data: laudosData = [], isLoading, refetch } = useLaudos();
  const [syncing, setSyncing] = useState(false);
  const stats = getStats(laudosData);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke("sync-laudos-urls");
      if (error) throw error;
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
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Painel de Laudos de Opacidade
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Usina Açucareira Guaíra — CNPJ: 07.948.124.0001/42
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSync}
                disabled={syncing}
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${syncing ? "animate-spin" : ""}`} />
                {syncing ? "Sincronizando..." : "Sincronizar"}
              </Button>
              <Badge variant="outline" className="text-xs">
                {laudosData.length} laudos
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total de Laudos" value={stats.total} icon={ClipboardCheck} color="bg-primary" />
          <StatCard title="Aprovados" value={stats.aprovados} icon={CheckCircle} description={`${stats.taxaAprovacao}% de aprovação`} color="bg-emerald-600" />
          <StatCard title="Reprovados" value={stats.reprovados} icon={XCircle} color="bg-destructive" />
          <StatCard title="Taxa de Aprovação" value={`${stats.taxaAprovacao}%`} icon={TrendingUp} color="bg-primary" />
        </div>

        {/* Charts */}
        <LaudosChart laudos={laudosData} />

        {/* Table */}
        <LaudosTable laudos={laudosData} />
      </main>
    </div>
  );
};

export default Index;
