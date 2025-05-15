
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCurrency, Currency } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface BudgetFormProps {
  currentBudget: number;
  onSetBudget: (amount: number) => void;
  currency: Currency;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ 
  currentBudget, 
  onSetBudget,
  currency
}) => {
  const [budgetAmount, setBudgetAmount] = useState<string>(currentBudget.toString());
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(budgetAmount);
    if (isNaN(amount) || amount < 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid budget amount",
        variant: "destructive"
      });
      return;
    }

    onSetBudget(amount);
    toast({
      title: "Budget Updated",
      description: `Your monthly budget has been set to ${formatCurrency(amount, currency)}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Monthly Budget</CardTitle>
        <CardDescription>
          Define your spending limit for the month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <label htmlFor="budget" className="text-sm font-medium text-gray-700">
              Budget Amount ({currency})
            </label>
            <div className="flex items-center">
              <Input
                id="budget"
                type="number"
                min="0"
                step="0.01"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
                className="flex-grow"
                placeholder="Enter budget amount"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              Current Budget: <strong>{formatCurrency(currentBudget, currency)}</strong>
            </div>
            <Button type="submit">Set Budget</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BudgetForm;
