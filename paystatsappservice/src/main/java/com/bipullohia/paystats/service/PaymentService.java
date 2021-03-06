package com.bipullohia.paystats.service;

import java.util.List;

import com.bipullohia.paystats.model.PaymentVO;

public interface PaymentService {

	List<PaymentVO> getAllPayment();
	PaymentVO addPayment(PaymentVO paymentVO);
	
	List<PaymentVO> findAllByPayType(String payType);
	List<PaymentVO> findAllByCategory(String category);
	
}

