import { useState } from 'react';
import { Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DateRangeSelector = () => {
  const [selectedRange, setSelectedRange] = useState('7days');

  const ranges = [
    { value: '7days', label: 'Últimos 7 dias' },
    { value: '30days', label: 'Últimos 30 dias' },
    { value: 'thisMonth', label: 'Este Mês' },
    { value: 'lastMonth', label: 'Mês Passado' },
    { value: 'thisYear', label: 'Este Ano' },
  ];

  return (
    <Select value={selectedRange} onValueChange={setSelectedRange}>
      <SelectTrigger className="w-[200px] h-11 bg-card border-border/50">
        <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ranges.map((range) => (
          <SelectItem key={range.value} value={range.value}>
            {range.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DateRangeSelector;
