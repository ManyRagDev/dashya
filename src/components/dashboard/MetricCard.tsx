import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  isLoading?: boolean;
}

const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description,
  trend = 'neutral',
  trendValue,
  isLoading = false
}: MetricCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className={cn(
                "text-3xl font-bold transition-all duration-300",
                isLoading ? "text-muted-foreground" : "text-foreground group-hover:text-primary"
              )}>
                {value}
              </h3>
              {trendValue && (
                <div className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  trend === 'up' && "text-secondary",
                  trend === 'down' && "text-destructive",
                  trend === 'neutral' && "text-muted-foreground"
                )}>
                  {trend === 'up' && <TrendingUp className="w-4 h-4" />}
                  {trend === 'down' && <TrendingDown className="w-4 h-4" />}
                  <span>{trendValue}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>

        {description && (
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            {description}
          </p>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </CardContent>
    </Card>
  );
};

export default MetricCard;
