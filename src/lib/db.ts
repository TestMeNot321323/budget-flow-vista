
import { Pool } from 'pg';
import { Transaction, Budget, Currency } from './data';

const pool = new Pool({
  host: import.meta.env.VITE_PG_HOST || 'localhost',
  port: Number(import.meta.env.VITE_PG_PORT) || 5432,
  user: import.meta.env.VITE_PG_USER || 'postgres',
  password: import.meta.env.VITE_PG_PASSWORD || 'postgres',
  database: import.meta.env.VITE_PG_DATABASE || 'budget_tracker',
});

export async function getTransactionsForMonth(year: number, month: number): Promise<Transaction[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM transactions WHERE EXTRACT(YEAR FROM date) = $1 AND EXTRACT(MONTH FROM date) = $2',
      [year, month]
    );
    
    return result.rows.map(row => ({
      id: `trans-${row.id}`,
      amount: parseFloat(row.amount),
      category: row.category,
      description: row.description,
      date: new Date(row.date),
      type: row.type,
      currency: row.currency as Currency,
    }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

export async function addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction | null> {
  try {
    const { amount, category, description, date, type, currency } = transaction;
    const result = await pool.query(
      'INSERT INTO transactions (amount, category, description, date, type, currency) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [amount, category, description, date, type, currency]
    );
    
    const row = result.rows[0];
    return {
      id: `trans-${row.id}`,
      amount: parseFloat(row.amount),
      category: row.category,
      description: row.description,
      date: new Date(row.date),
      type: row.type,
      currency: row.currency as Currency,
    };
  } catch (error) {
    console.error('Error adding transaction:', error);
    return null;
  }
}

export async function getBudget(year: number, month: number, currency: Currency = 'ZAR'): Promise<number> {
  try {
    const result = await pool.query(
      'SELECT amount FROM budgets WHERE year = $1 AND month = $2 AND currency = $3 ORDER BY created_at DESC LIMIT 1',
      [year, month, currency]
    );
    
    if (result.rows.length > 0) {
      return parseFloat(result.rows[0].amount);
    }
    return 0;
  } catch (error) {
    console.error('Error fetching budget:', error);
    return 0;
  }
}

export async function setBudget(amount: number, year: number, month: number, currency: Currency = 'ZAR'): Promise<boolean> {
  try {
    // First check if a budget entry already exists for this month
    const existingBudget = await pool.query(
      'SELECT id FROM budgets WHERE year = $1 AND month = $2 AND currency = $3',
      [year, month, currency]
    );
    
    if (existingBudget.rows.length > 0) {
      // Update existing budget
      await pool.query(
        'UPDATE budgets SET amount = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [amount, existingBudget.rows[0].id]
      );
    } else {
      // Create new budget
      await pool.query(
        'INSERT INTO budgets (amount, currency, year, month) VALUES ($1, $2, $3, $4)',
        [amount, currency, year, month]
      );
    }
    return true;
  } catch (error) {
    console.error('Error setting budget:', error);
    return false;
  }
}
