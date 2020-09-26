package com.bipullohia.paystats.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bipullohia.paystats.dao.PaymentRepository;
import com.bipullohia.paystats.entity.Payment;
import com.bipullohia.paystats.helper.PaymentHelper;
import com.bipullohia.paystats.model.PaymentVO;

@Service
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentRepository paymentRepo;
	
	@Autowired
	private PaymentHelper paymentHelper;
	
	@Override
	public List<PaymentVO> getAllPayment() {
		
		List<Payment> allPayments = new ArrayList<>();
		allPayments = paymentRepo.findAll();
		
		List<PaymentVO> listOfPaymentVO = new ArrayList<>();
		for(Payment payment : allPayments) {
			PaymentVO paymentVO = paymentHelper.convertPaymentEntityToPaymentVO(payment);
			listOfPaymentVO.add(paymentVO);
		}
		return listOfPaymentVO;
	}

	@Override
	public Payment addPayment(PaymentVO paymentVO) {
		
		//PaymentVO respPayVO = null;
		Payment payment = paymentHelper.convertPaymentVOToPaymentEntity(paymentVO);
		Payment pay2 = paymentRepo.save(payment);
		//return paymentRepo.save(payment);
		//respPayVO = paymentHelper.convertPaymentEntityToPaymentVO(pay2);
		return pay2;
	}


}
