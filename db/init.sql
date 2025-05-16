
-- Create tables
CREATE TABLE IF NOT EXISTS budgets (
  id SERIAL PRIMARY KEY,
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  amount DECIMAL(12,2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
  currency VARCHAR(3) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert seed data
INSERT INTO budgets (amount, currency, year, month) VALUES 
(5000, 'ZAR', 2025, 4),
(4500, 'ZAR', 2025, 5);

-- Insert some sample transactions
INSERT INTO transactions (amount, category, description, date, type, currency) VALUES
(1500.00, 'Salary', 'Monthly salary', '2025-05-01', 'income', 'ZAR'),
(200.00, 'Food', 'Grocery shopping', '2025-05-03', 'expense', 'ZAR'),
(50.00, 'Transport', 'Fuel', '2025-05-05', 'expense', 'ZAR'),
(300.00, 'Entertainment', 'Movie night', '2025-05-08', 'expense', 'ZAR'),
(100.00, 'Utilities', 'Electricity bill', '2025-05-10', 'expense', 'ZAR'),
(800.00, 'Freelance', 'Web design project', '2025-05-15', 'income', 'ZAR'),
(150.00, 'Shopping', 'Clothes', '2025-05-18', 'expense', 'ZAR'),
(120.00, 'Health', 'Pharmacy', '2025-05-20', 'expense', 'ZAR');
