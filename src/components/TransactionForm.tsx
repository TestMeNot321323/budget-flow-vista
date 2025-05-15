
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { categories, Transaction, Currency } from '@/lib/data';
import { toast } from 'sonner';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  currency: Currency;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction, currency }) => {
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [subcategories, setSubcategories] = useState(categories[0]?.subcategories || []);

  // Update subcategories when category changes
  useEffect(() => {
    if (categoryId) {
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        setSubcategories(category.subcategories);
        setSubcategoryId(''); // Reset subcategory when category changes
      }
    }
  }, [categoryId]);

  // Set income category when transaction type is income
  useEffect(() => {
    if (transactionType === 'income') {
      const incomeCategory = categories.find(c => c.name === 'Income');
      if (incomeCategory) {
        setCategoryId(incomeCategory.id);
      }
    } else {
      setCategoryId('');
    }
  }, [transactionType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !categoryId || !subcategoryId) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    const newTransaction: Omit<Transaction, 'id'> = {
      type: transactionType,
      amount: numericAmount,
      description,
      categoryId,
      subcategoryId,
      date: new Date(),
      currency
    };
    
    onAddTransaction(newTransaction);
    
    // Reset form
    setAmount('');
    setDescription('');
    if (transactionType !== 'income') {
      setCategoryId('');
    }
    setSubcategoryId('');
    
    toast.success('Transaction added successfully');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Add Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="expense" onValueChange={(value) => setTransactionType(value as 'income' | 'expense')}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="expense">Expense</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ({currency})</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              {transactionType === 'expense' && (
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={categoryId} onValueChange={setCategoryId} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter(category => category.name !== 'Income')
                        .map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select 
                  value={subcategoryId} 
                  onValueChange={setSubcategoryId} 
                  disabled={!categoryId}
                  required
                >
                  <SelectTrigger id="subcategory">
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategories.map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-budget-primary hover:bg-budget-secondary">
              Add Transaction
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
