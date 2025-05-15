
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Transaction, formatCurrency, Currency } from '@/lib/data';
import { ArrowDown, ArrowUp, ChartLine } from 'lucide-react';

interface DashboardProps {
  transactions: Transaction[];
  currency: Currency;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, currency }) => {
  const stats = useMemo(() => {
    // Filter transactions by currency
    const filteredTransactions = transactions.filter(t => t.currency === currency);
    
    // Calculate total income
    const totalIncome = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Calculate total expenses
    const totalExpenses = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Calculate balance
    const balance = totalIncome - totalExpenses;
    
    // Calculate month-over-month change
    // For this demo, we'll just show a random percentage
    const changePercent = Math.floor(Math.random() * 20) - 10;
    
    return {
      totalIncome,
      totalExpenses,
      balance,
      changePercent
    };
  }, [transactions, currency]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Income
            </CardTitle>
          </div>
          <ArrowUp className="h-4 w-4 text-budget-income" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalIncome, currency)}</div>
          <p className="text-xs text-muted-foreground">
            {stats.changePercent > 0 ? '+' : ''}{stats.changePercent}% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
          </div>
          <ArrowDown className="h-4 w-4 text-budget-expense" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalExpenses, currency)}</div>
          <p className="text-xs text-muted-foreground">
            {Math.abs(stats.changePercent)}% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Balance
            </CardTitle>
          </div>
          <ChartLine className="h-4 w-4 text-budget-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.balance, currency)}</div>
          <p className="text-xs text-muted-foreground">
            Current month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
