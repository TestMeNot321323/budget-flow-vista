
package com.budgettracker.api.repository;

import com.budgettracker.api.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserIdOrderByDateDesc(String userId);
    
    List<Transaction> findByUserIdAndCurrencyOrderByDateDesc(String userId, String currency);
    
    List<Transaction> findByUserIdAndDateBetweenOrderByDateDesc(String userId, LocalDate startDate, LocalDate endDate);
    
    List<Transaction> findByUserIdAndCurrencyAndDateBetweenOrderByDateDesc(String userId, String currency, 
                                                                        LocalDate startDate, LocalDate endDate);
}
