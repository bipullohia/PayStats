package com.bipullohia.paystat.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bipullohia.paystat.model.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

	boolean existsById(int payid);
	
	List<Payment> findAllByPayType(String payType);
}
