
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction, getMonthlyTransactionsByDay, formatCurrency, Currency } from '@/lib/data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrendsGraphProps {
  transactions: Transaction[];
  selectedYear: number;
  selectedMonth: number;
  currency: Currency;
}

const TrendsGraph: React.FC<TrendsGraphProps> = ({ 
  transactions, 
  selectedYear, 
  selectedMonth,
  currency
}) => {
  const data = useMemo(() => {
    return getMonthlyTransactionsByDay(transactions, selectedYear, selectedMonth);
  }, [transactions, selectedYear, selectedMonth]);

  // Format the currency for tooltip
  const formatTooltipValue = (value: number) => {
    return formatCurrency(value, currency);
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatTooltipValue(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Monthly Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => value.split('-')[2]} // Show only day
                stroke="#8E9196"
              />
              <YAxis stroke="#8E9196" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10B981"
                activeDot={{ r: 8 }}
                strokeWidth={2}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#F97316"
                activeDot={{ r: 8 }}
                strokeWidth={2}
                name="Expense"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendsGraph;
