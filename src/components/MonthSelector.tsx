
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getMonthsForSelector } from '@/lib/data';

interface MonthSelectorProps {
  selectedMonth: string;
  onChange: (value: string) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ selectedMonth, onChange }) => {
  const months = getMonthsForSelector();

  return (
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
  );
};

export default MonthSelector;
