package ec.edu.espe.polizas.client;

import ec.edu.espe.polizas.model.dto.ClienteDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@FeignClient(name = "clients-service", url = "${clients.service.url}")
public interface ClienteClient {

    @GetMapping("/api/clientes/{id}")
    ClienteDto getClienteById(@PathVariable("id") Long id);
}
