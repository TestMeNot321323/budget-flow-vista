
import React from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  currency: string;
}

const Navbar: React.FC<NavbarProps> = ({ className, currency, ...props }) => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

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
        {currentUser ? (
          <div className="flex items-center space-x-2">
            <span className="text-sm">{currentUser.email}</span>
            <Button variant="outline" size="sm" onClick={signOut} className="text-white border-white hover:bg-white/10">
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={handleLogin} className="text-white border-white hover:bg-white/10">
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
