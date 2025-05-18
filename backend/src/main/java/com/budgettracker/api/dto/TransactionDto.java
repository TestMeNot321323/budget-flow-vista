
package com.budgettracker.api.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TransactionDto {
    
    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Amount must be positive")
    private BigDecimal amount;
    
    @NotBlank(message = "Category is required")
    @Size(max = 50, message = "Category must be less than 50 characters")
    private String category;
    
    @Size(max = 50, message = "Subcategory must be less than 50 characters")
    private String subcategory;
    
    @NotBlank(message = "Description is required")
    @Size(max = 255, message = "Description must be less than 255 characters")
    private String description;
    
    @NotNull(message = "Date is required")
    private LocalDate date;
    
    @NotBlank(message = "Type is required")
    @Size(max = 10, message = "Type must be less than 10 characters")
    private String type;
    
    @NotBlank(message = "Currency is required")
    @Size(min = 3, max = 3, message = "Currency code must be 3 characters")
    private String currency;
}
