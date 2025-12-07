import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PlatformDistribution } from '@/data/mockData';
import { PieChartIcon } from 'lucide-react';

interface PlatformDistributionChartProps {
  data: PlatformDistribution[];
}

const PlatformDistributionChart = ({ data }: PlatformDistributionChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <PieChartIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Distribuição de Gasto</h3>
            <p className="text-sm text-muted-foreground font-normal">Por plataforma</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ platform, value }) => {
                const percentage = ((value / total) * 100).toFixed(1);
                return `${platform}: ${percentage}%`;
              }}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
              }}
              formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Gasto']}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PlatformDistributionChart;
