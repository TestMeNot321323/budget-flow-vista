
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction, calculateTotalsByCategory, getCategoryById, formatCurrency, Currency } from '@/lib/data';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryBreakdownProps {
  transactions: Transaction[];
  currency: Currency;
}

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ transactions, currency }) => {
  const categoryData = useMemo(() => {
    const categoryTotals = calculateTotalsByCategory(transactions, 'expense');
    
    return categoryTotals.map(({ categoryId, total }) => {
      const category = getCategoryById(categoryId);
      return {
        name: category?.name || 'Unknown',
        value: total,
        color: category?.color || '#999'
      };
    });
  }, [transactions]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-semibold" style={{ color: data.color }}>{data.name}</p>
          <p>{formatCurrency(data.value, currency)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Expense Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;
