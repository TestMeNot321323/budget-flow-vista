
package com.budgettracker.api.controller;

import com.budgettracker.api.dto.TransactionDto;
import com.budgettracker.api.model.Transaction;
import com.budgettracker.api.security.FirebaseAuthenticationToken;
import com.budgettracker.api.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) String currency,
            FirebaseAuthenticationToken authentication) {
        
        String userId = authentication.getName();
        List<Transaction> transactions;
        
        if (year != null && month != null && currency != null) {
            transactions = transactionService.getTransactionsByMonthYearAndCurrency(userId, year, month, currency);
        } else if (year != null && month != null) {
            transactions = transactionService.getTransactionsByMonthAndYear(userId, year, month);
        } else if (currency != null) {
            transactions = transactionService.getTransactionsByUserAndCurrency(userId, currency);
        } else {
            transactions = transactionService.getAllTransactions(userId);
        }
        
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(
            @Valid @RequestBody TransactionDto transactionDto,
            FirebaseAuthenticationToken authentication) {
        
        Transaction transaction = mapDtoToEntity(transactionDto);
        transaction.setUserId(authentication.getName());
        
        Transaction savedTransaction = transactionService.createTransaction(transaction);
        return new ResponseEntity<>(savedTransaction, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(
            @PathVariable Long id,
            @Valid @RequestBody TransactionDto transactionDto,
            FirebaseAuthenticationToken authentication) {
        
        return transactionService.getTransactionById(id)
                .map(existingTransaction -> {
                    if (!existingTransaction.getUserId().equals(authentication.getName())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                    }
                    
                    Transaction updatedTransaction = mapDtoToEntity(transactionDto);
                    updatedTransaction.setId(id);
                    updatedTransaction.setUserId(authentication.getName());
                    updatedTransaction.setCreatedAt(existingTransaction.getCreatedAt());
                    
                    return ResponseEntity.ok(transactionService.updateTransaction(updatedTransaction));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(
            @PathVariable Long id,
            FirebaseAuthenticationToken authentication) {
        
        return transactionService.getTransactionById(id)
                .map(transaction -> {
                    if (!transaction.getUserId().equals(authentication.getName())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                    }
                    
                    transactionService.deleteTransaction(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    private Transaction mapDtoToEntity(TransactionDto dto) {
        Transaction transaction = new Transaction();
        transaction.setAmount(dto.getAmount());
        transaction.setCategory(dto.getCategory());
        transaction.setSubcategory(dto.getSubcategory());
        transaction.setDescription(dto.getDescription());
        transaction.setDate(dto.getDate());
        transaction.setType(dto.getType());
        transaction.setCurrency(dto.getCurrency());
        return transaction;
    }
}
