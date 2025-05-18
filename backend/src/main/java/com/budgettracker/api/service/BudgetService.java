
package com.budgettracker.api.service;

import com.budgettracker.api.model.Budget;
import com.budgettracker.api.repository.BudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;

    public Optional<Budget> getBudget(Integer year, Integer month, String currency, String userId) {
        return budgetRepository.findByYearAndMonthAndCurrencyAndUserId(year, month, currency, userId);
    }

    @Transactional
    public Budget createOrUpdateBudget(Integer year, Integer month, BigDecimal amount, String currency, String userId) {
        Optional<Budget> existingBudget = budgetRepository.findByYearAndMonthAndCurrencyAndUserId(year, month, currency, userId);
        
        if (existingBudget.isPresent()) {
            Budget budget = existingBudget.get();
            budget.setAmount(amount);
            return budgetRepository.save(budget);
        } else {
            Budget newBudget = new Budget();
            newBudget.setYear(year);
            newBudget.setMonth(month);
            newBudget.setAmount(amount);
            newBudget.setCurrency(currency);
            newBudget.setUserId(userId);
            return budgetRepository.save(newBudget);
        }
    }

    @Transactional
    public void deleteBudget(Integer year, Integer month, String currency, String userId) {
        budgetRepository.deleteByYearAndMonthAndCurrencyAndUserId(year, month, currency, userId);
    }
}
