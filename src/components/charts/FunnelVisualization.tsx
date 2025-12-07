import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FunnelStage } from '@/data/mockData';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FunnelVisualizationProps {
  data: FunnelStage[];
  title?: string;
}

const FunnelVisualization = ({ data, title = 'Funil de Conversão' }: FunnelVisualizationProps) => {
  const maxValue = data[0]?.value || 1;

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Filter className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground font-normal">Jornada do usuário</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          {data.map((stage, index) => {
            const widthPercentage = (stage.value / maxValue) * 100;
            const isFirst = index === 0;
            const isLast = index === data.length - 1;

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{stage.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">
                      {stage.value.toLocaleString('pt-BR')}
                    </span>
                    {!isFirst && (
                      <span className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full",
                        stage.percentage >= 5 ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"
                      )}>
                        {stage.percentage.toFixed(2)}%
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="relative h-16 flex items-center">
                  <div 
                    className={cn(
                      "h-full rounded-xl transition-all duration-500 relative overflow-hidden",
                      isFirst && "bg-gradient-to-r from-primary/80 to-primary/60",
                      !isFirst && !isLast && "bg-gradient-to-r from-primary/60 to-primary/40",
                      isLast && "bg-gradient-to-r from-secondary/80 to-secondary/60"
                    )}
                    style={{ width: `${widthPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelVisualization;
