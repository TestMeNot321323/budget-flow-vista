
package com.budgettracker.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "transactions")
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private BigDecimal amount;
    
    @Column(nullable = false, length = 50)
    private String category;
    
    @Column(length = 50)
    private String subcategory;
    
    @Column(nullable = false, length = 255)
    private String description;
    
    @Column(nullable = false)
    private LocalDate date;
    
    @Column(nullable = false, length = 10)
    private String type;
    
    @Column(nullable = false, length = 3)
    private String currency;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(nullable = false)
    private String userId;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
