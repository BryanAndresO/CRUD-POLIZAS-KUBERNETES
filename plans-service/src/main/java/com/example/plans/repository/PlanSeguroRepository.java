package com.example.plans.repository;

import com.example.plans.model.PlanSeguro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanSeguroRepository extends JpaRepository<PlanSeguro, Long> {
}
