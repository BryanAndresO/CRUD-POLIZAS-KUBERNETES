package ec.edu.espe.polizas.service;

import ec.edu.espe.polizas.client.ClienteClient;
import ec.edu.espe.polizas.client.PlanClient;
import ec.edu.espe.polizas.model.Poliza;
import ec.edu.espe.polizas.model.dto.ClienteDto;
import ec.edu.espe.polizas.model.dto.PlanDto;
import ec.edu.espe.polizas.repository.PolizaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PolizaService {

    @Autowired
    private PolizaRepository polizaRepository;

    @Autowired
    private ClienteClient clienteClient;

    @Autowired
    private PlanClient planClient;

    public List<Poliza> getAllPolizas() {
        return polizaRepository.findAll();
    }

    public Poliza createPoliza(Poliza poliza) {
        // Validate Cliente
        ClienteDto cliente = clienteClient.getClienteById(poliza.getClienteId());
        if (cliente == null) {
            throw new RuntimeException("Cliente no encontrado");
        }

        // Validate Plan
        PlanDto plan = planClient.getPlanById(poliza.getPlanId());
        if (plan == null) {
            throw new RuntimeException("Plan no encontrado");
        }

        // Generate numeroPoliza if not present
        if (poliza.getNumeroPoliza() == null || poliza.getNumeroPoliza().isEmpty()) {
            poliza.setNumeroPoliza(UUID.randomUUID().toString());
        }

        return polizaRepository.save(poliza);
    }

    public Poliza getPolizaById(Long id) {
        return polizaRepository.findById(id).orElseThrow(() -> new RuntimeException("Poliza no encontrada"));
    }

    // Additional methods (update, delete) could be added
}
