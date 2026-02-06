package com.example.plans.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "planes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlanSeguro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoPlan tipo;

    @Column(nullable = false)
    private BigDecimal primaBase;

    private BigDecimal coberturaMax;

    public enum TipoPlan {
        VIDA, AUTO, SALUD
    }
}
