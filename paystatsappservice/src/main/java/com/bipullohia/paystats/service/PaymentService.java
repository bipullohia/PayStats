package com.bipullohia.paystats.service;

import java.util.List;

import com.bipullohia.paystats.entity.Payment;
import com.bipullohia.paystats.model.PaymentVO;

public interface PaymentService {

	List<PaymentVO> getAllPayment();
	Payment addPayment(PaymentVO paymentVO);
	
}

