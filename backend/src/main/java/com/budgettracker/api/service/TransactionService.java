
package com.budgettracker.api.service;

import com.budgettracker.api.model.Transaction;
import com.budgettracker.api.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public List<Transaction> getAllTransactions(String userId) {
        return transactionRepository.findByUserIdOrderByDateDesc(userId);
    }

    public List<Transaction> getTransactionsByUserAndCurrency(String userId, String currency) {
        return transactionRepository.findByUserIdAndCurrencyOrderByDateDesc(userId, currency);
    }

    public List<Transaction> getTransactionsByMonthAndYear(String userId, int year, int month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);
        
        return transactionRepository.findByUserIdAndDateBetweenOrderByDateDesc(userId, startDate, endDate);
    }

    public List<Transaction> getTransactionsByMonthYearAndCurrency(String userId, int year, int month, String currency) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);
        
        return transactionRepository.findByUserIdAndCurrencyAndDateBetweenOrderByDateDesc(userId, currency, startDate, endDate);
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    @Transactional
    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Transactional
    public Transaction updateTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Transactional
    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }
}
