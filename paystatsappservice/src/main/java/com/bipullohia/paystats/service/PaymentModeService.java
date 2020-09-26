package com.bipullohia.paystats.service;

import java.util.List;

import com.bipullohia.paystats.entity.PaymentMode;

public interface PaymentModeService {

	PaymentMode getPaymentModeById(int paymodeId);
	List<PaymentMode> getAllPaymentMode();
	PaymentMode addPaymentMode(PaymentMode PaymentMode);
	PaymentMode updatePaymentMode(PaymentMode PaymentMode);
	boolean deletePaymentMode(int paymodeId);
	
	boolean existsById(int paymodeId);
}
