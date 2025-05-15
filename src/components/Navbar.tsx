
import React from 'react';
import { cn } from '@/lib/utils';

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  currency: string;
}

const Navbar: React.FC<NavbarProps> = ({ className, currency, ...props }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-3 bg-budget-primary text-white",
        className
      )}
      {...props}
    >
      <div className="flex items-center space-x-2">
        <span className="font-bold text-xl">Budget Tracker</span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm">Current Currency: {currency}</span>
      </div>
    </div>
  );
};

export default Navbar;
