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
	public PaymentVO addPayment(PaymentVO paymentVO) {
		Payment paymentResp = paymentRepo.save(paymentHelper.convertPaymentVOToPaymentEntity(paymentVO));
		PaymentVO respPaymentVO = paymentHelper.convertPaymentEntityToPaymentVO(paymentResp);
		return respPaymentVO;
	}

	@Override
	public List<PaymentVO> findAllByPayType(String payType) {
		List<Payment> payments = paymentRepo.findAllByPayType(payType);
		List<PaymentVO> listOfPaymentVO = new ArrayList<>();
		for(Payment payment : payments) {
			PaymentVO paymentVO = paymentHelper.convertPaymentEntityToPaymentVO(payment);
			listOfPaymentVO.add(paymentVO);
		}
		return listOfPaymentVO;
	}

	@Override
	public List<PaymentVO> findAllByCategory(String category) {
		List<Payment> payments = paymentRepo.findAllByCategory(category);
		List<PaymentVO> listOfPaymentVO = new ArrayList<>();
		for(Payment payment : payments) {
			PaymentVO paymentVO = paymentHelper.convertPaymentEntityToPaymentVO(payment);
			listOfPaymentVO.add(paymentVO);
		}
		return listOfPaymentVO;
	}
}

/*
 * To figure out diff ref data/values (for ref data)
 * 
 * List<String> categories = new ArrayList<>();
 * List<String> payTypes = new ArrayList<>();
 * 
 * if(categories.indexOf(payment.getCategory())==-1){
	categories.add(payment.getCategory());
	}
 * if(payTypes.indexOf(payment.getPayType())==-1) {
	payTypes.add(payment.getPayType());
	}
 *	
 * System.out.println(categories.toString());
 * System.out.println(payTypes.toString());
 */