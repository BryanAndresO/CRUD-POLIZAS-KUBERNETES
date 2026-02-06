package ec.edu.espe.polizas.model.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class PlanDto {
    private Long id;
    private String nombre;
    private String tipo;
    private BigDecimal primaBase;
    private BigDecimal coberturaMax;
}
