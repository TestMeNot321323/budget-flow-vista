
import React, { useState, useEffect } from 'react';
import { 
  transactions as initialTransactions, 
  Transaction, 
  Currency, 
  getMonthsForSelector,
  getTransactionsForMonth
} from '@/lib/data';
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';
import TrendsGraph from '@/components/TrendsGraph';
import CategoryBreakdown from '@/components/CategoryBreakdown';
import TransactionForm from '@/components/TransactionForm';
import CurrencyToggle from '@/components/CurrencyToggle';
import MonthSelector from '@/components/MonthSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/card';

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [currency, setCurrency] = useState<Currency>('ZAR');
  const [selectedMonthValue, setSelectedMonthValue] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  // Initialize the selected month
  useEffect(() => {
    const months = getMonthsForSelector();
    if (months.length > 0) {
      setSelectedMonthValue(months[0].value);
      const [year, month] = months[0].value.split('-').map(Number);
      setSelectedYear(year);
      setSelectedMonth(month);
    }
  }, []);

  // Filter transactions when month or currency changes
  useEffect(() => {
    if (selectedYear && selectedMonth !== undefined) {
      const monthlyTransactions = getTransactionsForMonth(transactions, selectedYear, selectedMonth);
      setFilteredTransactions(monthlyTransactions);
    }
  }, [transactions, selectedYear, selectedMonth, currency]);

  // Handle month change
  const handleMonthChange = (value: string) => {
    setSelectedMonthValue(value);
    const [year, month] = value.split('-').map(Number);
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  // Add new transaction
  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transactionWithId: Transaction = {
      ...newTransaction,
      id: `trans-${Date.now()}`
    };
    setTransactions(prev => [...prev, transactionWithId]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currency={currency} />
      
      <main className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Personal Budget Tracker</h1>
          <div className="flex items-center space-x-4">
            <MonthSelector selectedMonth={selectedMonthValue} onChange={handleMonthChange} />
            <CurrencyToggle currency={currency} setCurrency={setCurrency} />
          </div>
        </div>
        
        <div className="grid gap-6">
          <Dashboard transactions={filteredTransactions} currency={currency} />
          
          <div className="grid gap-6 lg:grid-cols-2">
            <TrendsGraph 
              transactions={filteredTransactions} 
              selectedYear={selectedYear} 
              selectedMonth={selectedMonth}
              currency={currency}
            />
            <CategoryBreakdown transactions={filteredTransactions} currency={currency} />
          </div>
          
          <div className="mt-6">
            <TransactionForm onAddTransaction={handleAddTransaction} currency={currency} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
