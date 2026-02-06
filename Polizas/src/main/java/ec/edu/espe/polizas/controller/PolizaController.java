package ec.edu.espe.polizas.controller;

import ec.edu.espe.polizas.model.Poliza;
import ec.edu.espe.polizas.service.PolizaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/polizas")
public class PolizaController {

    @Autowired
    private PolizaService polizaService;

    @GetMapping
    public List<Poliza> getAllPolizas() {
        return polizaService.getAllPolizas();
    }

    @PostMapping
    public ResponseEntity<Poliza> createPoliza(@RequestBody Poliza poliza) {
        try {
            return ResponseEntity.ok(polizaService.createPoliza(poliza));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Poliza> getPolizaById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(polizaService.getPolizaById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
