import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Target, MousePointerClick } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Metric } from '@/data/mockData';

interface KPICardProps {
  metric: Metric;
}

const iconMap = {
  DollarSign,
  TrendingUp,
  Target,
  MousePointerClick,
};

const KPICard = ({ metric }: KPICardProps) => {
  const Icon = iconMap[metric.icon as keyof typeof iconMap] || DollarSign;
  const isPositive = metric.deltaType === 'increase';
  const isNegative = metric.deltaType === 'decrease';

  return (
    <Card className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{metric.label}</p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-all duration-300">
                {metric.value}
              </h3>
            </div>
          </div>
          
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>

        <div className={cn(
          "flex items-center gap-1.5 text-sm font-medium",
          isPositive && "text-secondary",
          isNegative && "text-destructive",
          metric.deltaType === 'neutral' && "text-muted-foreground"
        )}>
          {isPositive && <TrendingUp className="w-4 h-4" />}
          {isNegative && <TrendingDown className="w-4 h-4" />}
          <span>
            {isPositive && '▲'}
            {isNegative && '▼'}
            {' '}
            {Math.abs(metric.delta)}% vs período anterior
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </CardContent>
    </Card>
  );
};

export default KPICard;
