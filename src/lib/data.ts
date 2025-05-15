
export type TransactionType = 'income' | 'expense';
export type Currency = 'ZAR' | 'INR';

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
  color: string;
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  type: TransactionType;
  categoryId: string;
  subcategoryId: string;
  description: string;
  currency: Currency;
}

// Sample categories with subcategories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Food',
    color: '#F97316', // Orange
    subcategories: [
      { id: '1-1', name: 'Groceries' },
      { id: '1-2', name: 'Restaurants' },
      { id: '1-3', name: 'Delivery' }
    ]
  },
  {
    id: '2',
    name: 'Transportation',
    color: '#3B82F6', // Blue
    subcategories: [
      { id: '2-1', name: 'Fuel' },
      { id: '2-2', name: 'Public Transport' },
      { id: '2-3', name: 'Maintenance' }
    ]
  },
  {
    id: '3',
    name: 'Entertainment',
    color: '#8B5CF6', // Purple
    subcategories: [
      { id: '3-1', name: 'Movies' },
      { id: '3-2', name: 'Games' },
      { id: '3-3', name: 'Events' }
    ]
  },
  {
    id: '4',
    name: 'Housing',
    color: '#10B981', // Green
    subcategories: [
      { id: '4-1', name: 'Rent' },
      { id: '4-2', name: 'Utilities' },
      { id: '4-3', name: 'Maintenance' }
    ]
  },
  {
    id: '5',
    name: 'Shopping',
    color: '#EC4899', // Pink
    subcategories: [
      { id: '5-1', name: 'Clothing' },
      { id: '5-2', name: 'Electronics' },
      { id: '5-3', name: 'Household' }
    ]
  },
  {
    id: '6',
    name: 'Income',
    color: '#10B981', // Green
    subcategories: [
      { id: '6-1', name: 'Salary' },
      { id: '6-2', name: 'Freelance' },
      { id: '6-3', name: 'Investments' }
    ]
  }
];

// Generate 6 months of transaction data
export const generateTransactionData = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const currentDate = new Date();
  
  // Go back 6 months
  const startDate = new Date(currentDate);
  startDate.setMonth(currentDate.getMonth() - 5);
  
  // Random transactions within the past 6 months
  for (let i = 0; i < 300; i++) {
    const randomMonth = startDate.getMonth() + Math.floor(Math.random() * 6);
    const randomDay = 1 + Math.floor(Math.random() * 28);
    const date = new Date(startDate.getFullYear(), randomMonth, randomDay);
    
    // Determine if it's income or expense (25% income, 75% expense)
    const type: TransactionType = Math.random() < 0.25 ? 'income' : 'expense';
    
    // For income, use only the Income category
    let categoryId: string;
    let subcategoryId: string;
    
    if (type === 'income') {
      categoryId = '6'; // Income category
      const subcategories = categories.find(c => c.id === categoryId)?.subcategories || [];
      subcategoryId = subcategories[Math.floor(Math.random() * subcategories.length)].id;
    } else {
      // For expenses, use categories 1-5
      categoryId = String(1 + Math.floor(Math.random() * 5));
      const subcategories = categories.find(c => c.id === categoryId)?.subcategories || [];
      subcategoryId = subcategories[Math.floor(Math.random() * subcategories.length)].id;
    }
    
    // Random amount (income typically higher than expenses)
    let amount: number;
    if (type === 'income') {
      amount = 10000 + Math.floor(Math.random() * 15000); // 10,000 to 25,000
    } else {
      amount = 100 + Math.floor(Math.random() * 5000); // 100 to 5,100
    }
    
    // Random currency (50% each)
    const currency: Currency = Math.random() < 0.5 ? 'ZAR' : 'INR';
    
    transactions.push({
      id: `trans-${i}`,
      date,
      amount,
      type,
      categoryId,
      subcategoryId,
      description: `${type === 'income' ? 'Income' : 'Payment'} - ${i}`,
      currency
    });
  }
  
  return transactions;
};

// Helper functions
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getSubcategoryById = (categoryId: string, subcategoryId: string): Subcategory | undefined => {
  const category = getCategoryById(categoryId);
  return category?.subcategories.find(subcategory => subcategory.id === subcategoryId);
};

export const getCategoryName = (categoryId: string): string => {
  return getCategoryById(categoryId)?.name || 'Unknown';
};

export const getSubcategoryName = (categoryId: string, subcategoryId: string): string => {
  return getSubcategoryById(categoryId, subcategoryId)?.name || 'Unknown';
};

export const formatCurrency = (amount: number, currency: Currency): string => {
  const formatter = new Intl.NumberFormat(currency === 'ZAR' ? 'en-ZA' : 'en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  });
  
  return formatter.format(amount);
};

// Get transactions for a specific month
export const getTransactionsForMonth = (transactions: Transaction[], year: number, month: number): Transaction[] => {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate.getFullYear() === year && transactionDate.getMonth() === month;
  });
};

// Get months available in transactions
export const getAvailableMonths = (transactions: Transaction[]): { year: number; month: number }[] => {
  const monthsSet = new Set<string>();
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    monthsSet.add(key);
  });
  
  return Array.from(monthsSet).map(key => {
    const [year, month] = key.split('-').map(Number);
    return { year, month };
  }).sort((a, b) => {
    // Sort by year and month
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    return a.month - b.month;
  });
};

// Get month name
export const getMonthName = (month: number): string => {
  const date = new Date();
  date.setMonth(month);
  return date.toLocaleString('default', { month: 'long' });
};

// Calculate totals by category
export const calculateTotalsByCategory = (transactions: Transaction[], type: TransactionType): { categoryId: string; total: number }[] => {
  const totals: Record<string, number> = {};
  
  transactions
    .filter(transaction => transaction.type === type)
    .forEach(transaction => {
      if (!totals[transaction.categoryId]) {
        totals[transaction.categoryId] = 0;
      }
      totals[transaction.categoryId] += transaction.amount;
    });
  
  return Object.entries(totals).map(([categoryId, total]) => ({ categoryId, total }));
};

// Get transactions for a specific month grouped by day for trend graph
export const getMonthlyTransactionsByDay = (transactions: Transaction[], year: number, month: number): { date: string; income: number; expense: number }[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const result: { date: string; income: number; expense: number }[] = [];
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateString = date.toISOString().split('T')[0];
    
    const dayTransactions = transactions.filter(t => {
      const tDate = new Date(t.date);
      return tDate.getFullYear() === year && tDate.getMonth() === month && tDate.getDate() === day;
    });
    
    const income = dayTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const expense = dayTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    result.push({ date: dateString, income, expense });
  }
  
  return result;
};

// Get a predefined list of months for the selector
export const getMonthsForSelector = (): { label: string; value: string }[] => {
  const result = [];
  const today = new Date();
  
  for (let i = 0; i < 12; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const month = date.getMonth();
    const year = date.getFullYear();
    const label = `${getMonthName(month)} ${year}`;
    const value = `${year}-${month}`;
    
    result.push({ label, value });
  }
  
  return result;
};

// Initialize with sample data
export const transactions: Transaction[] = generateTransactionData();
