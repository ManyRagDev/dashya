import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLatestInsight, Insight } from '@/services/metricsService';
import { Brain, CheckCircle, AlertTriangle, AlertOctagon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIInsightCard() {
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getLatestInsight();
      setInsight(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="h-32 w-full animate-pulse bg-slate-800/50 rounded-xl mb-6" />;
  if (!insight) return null;

  // Configuração Visual baseada no Sentimento
  const styles = {
    positive: {
      border: "border-emerald-500/50",
      bg: "bg-emerald-500/10",
      icon: CheckCircle,
      iconColor: "text-emerald-400",
      title: "Oportunidade Detectada"
    },
    warning: {
      border: "border-amber-500/50",
      bg: "bg-amber-500/10",
      icon: AlertTriangle,
      iconColor: "text-amber-400",
      title: "Ponto de Atenção"
    },
    critical: {
      border: "border-red-500/50",
      bg: "bg-red-500/10",
      icon: AlertOctagon,
      iconColor: "text-red-400",
      title: "Ação Crítica Necessária"
    }
  }[insight.sentiment];

  const Icon = styles.icon;

  return (
    <Card className={cn("mb-8 border-l-4 shadow-lg backdrop-blur-sm relative overflow-hidden transition-all hover:shadow-xl", styles.border, styles.bg)}>
      
      {/* Efeito de Brilho de IA no fundo */}
      <div className="absolute -right-10 -top-10 h-32 w-32 bg-white/5 rounded-full blur-3xl" />
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn("p-2 rounded-lg bg-background/50 backdrop-blur-md border border-white/10", styles.iconColor)}>
              <Brain className="w-5 h-5 animate-pulse" />
            </div>
            <span className={cn("text-sm font-semibold uppercase tracking-wider opacity-80", styles.iconColor)}>
              Dashya Intelligence
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-background/40 px-2 py-1 rounded-full border border-white/5">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Confiança da IA: {insight.confidence_score}%</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col gap-3">
          {/* Manchete */}
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            {insight.insight_text}
          </h3>
          
          {/* Explicação Técnica (Regra) */}
          <div className="text-sm text-muted-foreground bg-background/30 p-3 rounded-lg border border-white/5 leading-relaxed">
            <strong className="text-foreground/80 block mb-1 text-xs uppercase tracking-wide">Diagnóstico Técnico:</strong>
            {insight.detailed_reason}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}