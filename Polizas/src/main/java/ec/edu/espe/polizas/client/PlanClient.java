package ec.edu.espe.polizas.client;

import ec.edu.espe.polizas.model.dto.PlanDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "plans-service", url = "${plans.service.url}")
public interface PlanClient {

    @GetMapping("/api/planes/{id}")
    PlanDto getPlanById(@PathVariable("id") Long id);
}
