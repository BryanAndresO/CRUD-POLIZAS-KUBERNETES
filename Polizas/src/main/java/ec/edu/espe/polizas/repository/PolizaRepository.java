package ec.edu.espe.polizas.repository;

import ec.edu.espe.polizas.model.Poliza;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PolizaRepository extends JpaRepository<Poliza, Long> {
}
