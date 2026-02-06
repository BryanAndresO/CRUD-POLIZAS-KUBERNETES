package ec.edu.espe.polizas.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "polizas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Poliza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String numeroPoliza;

    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private BigDecimal primaMensual;

    @Enumerated(EnumType.STRING)
    private EstadoPoliza estado;

    @Column(nullable = false)
    private Long clienteId;

    @Column(nullable = false)
    private Long planId;

    public enum EstadoPoliza {
        ACTIVA, CANCELADA
    }
}
