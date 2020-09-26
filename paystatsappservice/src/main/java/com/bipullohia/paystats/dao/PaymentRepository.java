package com.bipullohia.paystats.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bipullohia.paystats.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer>{

}
