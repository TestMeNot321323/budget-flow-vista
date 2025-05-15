
import React from 'react';
import { Button } from "@/components/ui/button";
import { Currency } from '@/lib/data';

interface CurrencyToggleProps {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyToggle: React.FC<CurrencyToggleProps> = ({ currency, setCurrency }) => {
  return (
    <div className="flex items-center gap-2 p-1 bg-budget-light rounded-lg">
      <Button 
        onClick={() => setCurrency('ZAR')}
        variant={currency === 'ZAR' ? 'default' : 'ghost'}
        className={`px-3 py-1 h-8 ${currency === 'ZAR' ? 'bg-budget-primary text-white' : 'text-budget-neutral'}`}
      >
        ZAR
      </Button>
      <Button 
        onClick={() => setCurrency('INR')}
        variant={currency === 'INR' ? 'default' : 'ghost'}
        className={`px-3 py-1 h-8 ${currency === 'INR' ? 'bg-budget-primary text-white' : 'text-budget-neutral'}`}
      >
        INR
      </Button>
    </div>
  );
};

export default CurrencyToggle;
