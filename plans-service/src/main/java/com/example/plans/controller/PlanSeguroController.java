package com.example.plans.controller;

import com.example.plans.model.PlanSeguro;
import com.example.plans.service.PlanSeguroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planes")
public class PlanSeguroController {

    @Autowired
    private PlanSeguroService planSeguroService;

    @GetMapping
    public List<PlanSeguro> getAllPlanes() {
        return planSeguroService.getAllPlanes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanSeguro> getPlanById(@PathVariable Long id) {
        return planSeguroService.getPlanById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PlanSeguro createPlan(@RequestBody PlanSeguro plan) {
        return planSeguroService.createPlan(plan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanSeguro> updatePlan(@PathVariable Long id, @RequestBody PlanSeguro planDetails) {
        try {
            return ResponseEntity.ok(planSeguroService.updatePlan(id, planDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        try {
            planSeguroService.deletePlan(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
