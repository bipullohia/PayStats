package com.bipullohia.paystat.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bipullohia.paystat.model.PaymentEntity;

@Repository
public interface PaymentEntityRepository extends JpaRepository<PaymentEntity, Integer> {

}
