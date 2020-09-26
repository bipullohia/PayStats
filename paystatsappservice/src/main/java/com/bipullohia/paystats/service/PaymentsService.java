package com.bipullohia.paystats.service;

import java.util.List;

import com.bipullohia.paystats.entity.Payments;
import com.bipullohia.paystats.entity.PaymentFilter;

public interface PaymentsService {

	Payments getPaymentById(int payid);
	List<Payments> getAllPayment();
	Payments addPayment(Payments payment);
	Payments updatePayment(Payments payment);
	boolean deletePayment(int payid);
	
	boolean existsById(int payid);
	List<Payments> findAllByPayType(String payType);
	
	List<Payments> getFilteredPayments(PaymentFilter[] paymentFilter);
}
