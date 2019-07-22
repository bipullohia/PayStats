package com.bipullohia.paystat.service;

import java.util.List;

import com.bipullohia.paystat.model.Payment;
import com.bipullohia.paystat.model.PaymentFilter;

public interface PaymentService {

	Payment getPaymentById(int payid);
	List<Payment> getAllPayment();
	Payment addPayment(Payment payment);
	Payment updatePayment(Payment payment);
	boolean deletePayment(int payid);
	
	boolean existsById(int payid);
	List<Payment> findAllByPayType(String payType);
	
	List<Payment> getFilteredPayments(PaymentFilter[] paymentFilter);
}
