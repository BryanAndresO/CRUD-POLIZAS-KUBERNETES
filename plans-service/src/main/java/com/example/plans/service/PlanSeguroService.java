package com.example.plans.service;

import com.example.plans.model.PlanSeguro;
import com.example.plans.repository.PlanSeguroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlanSeguroService {

    @Autowired
    private PlanSeguroRepository planSeguroRepository;

    public List<PlanSeguro> getAllPlanes() {
        return planSeguroRepository.findAll();
    }

    public Optional<PlanSeguro> getPlanById(Long id) {
        return planSeguroRepository.findById(id);
    }

    public PlanSeguro createPlan(PlanSeguro plan) {
        return planSeguroRepository.save(plan);
    }

    public PlanSeguro updatePlan(Long id, PlanSeguro planDetails) {
        PlanSeguro plan = planSeguroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plan no encontrado con id: " + id));

        plan.setNombre(planDetails.getNombre());
        plan.setTipo(planDetails.getTipo());
        plan.setPrimaBase(planDetails.getPrimaBase());
        plan.setCoberturaMax(planDetails.getCoberturaMax());

        return planSeguroRepository.save(plan);
    }

    public void deletePlan(Long id) {
        PlanSeguro plan = planSeguroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plan no encontrado con id: " + id));
        planSeguroRepository.delete(plan);
    }
}
