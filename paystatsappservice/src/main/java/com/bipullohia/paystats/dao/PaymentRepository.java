package com.bipullohia.paystats.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bipullohia.paystats.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer>{

	List<Payment> findAllByPayType(String payType);
	List<Payment> findAllByCategory(String category);
}
