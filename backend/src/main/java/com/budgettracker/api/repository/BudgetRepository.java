
package com.budgettracker.api.repository;

import com.budgettracker.api.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Optional<Budget> findByYearAndMonthAndCurrencyAndUserId(Integer year, Integer month, String currency, String userId);
    
    void deleteByYearAndMonthAndCurrencyAndUserId(Integer year, Integer month, String currency, String userId);
}
