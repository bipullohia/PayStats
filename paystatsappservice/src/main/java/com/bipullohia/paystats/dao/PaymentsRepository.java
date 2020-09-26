package com.bipullohia.paystats.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bipullohia.paystats.entity.Payments;
import com.bipullohia.paystats.entity.PaymentFilter;

@Repository
public interface PaymentsRepository extends JpaRepository<Payments, Integer>, JpaSpecificationExecutor<Payments> {

	boolean existsById(int payid);
	
	List<Payments> findAllByPayType(String payType);
}
