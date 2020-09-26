package com.bipullohia.paystats.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bipullohia.paystats.entity.PaymentEntity;

@Repository
public interface PaymentEntityRepository extends JpaRepository<PaymentEntity, Integer> {

}
