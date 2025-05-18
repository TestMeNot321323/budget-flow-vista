
package com.budgettracker.api.controller;

import com.budgettracker.api.dto.BudgetDto;
import com.budgettracker.api.model.Budget;
import com.budgettracker.api.security.FirebaseAuthenticationToken;
import com.budgettracker.api.service.BudgetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;

    @GetMapping
    public ResponseEntity<?> getBudget(
            @RequestParam Integer year,
            @RequestParam Integer month,
            @RequestParam String currency,
            FirebaseAuthenticationToken authentication) {
        
        String userId = authentication.getName();
        Optional<Budget> budget = budgetService.getBudget(year, month, currency, userId);
        
        return budget.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Budget> createBudget(
            @Valid @RequestBody BudgetDto budgetDto,
            FirebaseAuthenticationToken authentication) {
        
        String userId = authentication.getName();
        Budget budget = budgetService.createOrUpdateBudget(
                budgetDto.getYear(),
                budgetDto.getMonth(),
                budgetDto.getAmount(),
                budgetDto.getCurrency(),
                userId);
        
        return new ResponseEntity<>(budget, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Budget> updateBudget(
            @Valid @RequestBody BudgetDto budgetDto,
            FirebaseAuthenticationToken authentication) {
        
        String userId = authentication.getName();
        Budget budget = budgetService.createOrUpdateBudget(
                budgetDto.getYear(),
                budgetDto.getMonth(),
                budgetDto.getAmount(),
                budgetDto.getCurrency(),
                userId);
        
        return ResponseEntity.ok(budget);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteBudget(
            @RequestParam Integer year,
            @RequestParam Integer month,
            @RequestParam String currency,
            FirebaseAuthenticationToken authentication) {
        
        String userId = authentication.getName();
        budgetService.deleteBudget(year, month, currency, userId);
        return ResponseEntity.noContent().build();
    }
}
