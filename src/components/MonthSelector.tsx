
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getMonthsForSelector } from '@/lib/data';
import { Calendar } from 'lucide-react';

interface MonthSelectorProps {
  selectedMonth: string;
  onChange: (value: string) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ selectedMonth, onChange }) => {
  const months = getMonthsForSelector();

  return (
    <div className="flex items-center">
      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
      <Select value={selectedMonth} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MonthSelector;
