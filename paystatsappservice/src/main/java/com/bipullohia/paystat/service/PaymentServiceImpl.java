package com.bipullohia.paystat.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bipullohia.paystat.dao.PaymentRepository;
import com.bipullohia.paystat.model.Payment;

@Service
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentRepository paymentRepo;
	
	@Override
	public Payment getPaymentById(int payid) {
		
		Payment payment = null;
		Optional<Payment> optPayment = paymentRepo.findById(payid);
		if(optPayment.isPresent()) {
			payment = optPayment.get();
		}
		return payment;
	}

	@Override
	public List<Payment> getAllPayment() {
		return paymentRepo.findAll();
	}

	@Override
	public Payment addPayment(Payment payment) {
		return paymentRepo.save(payment);
	}

	@Override
	public Payment updatePayment(Payment payment) {
		return paymentRepo.save(payment);
	}

	@Override
	public boolean deletePayment(int payid) {
		boolean isDeleted=false;
		if(paymentRepo.existsById(payid)) {
			paymentRepo.deleteById(payid);
			isDeleted=true;
		}
		return isDeleted;
	}

	@Override
	public boolean existsById(int payid) {
		return paymentRepo.existsById(payid);
	}

	@Override
	public List<Payment> findAllByPayType(String payType) {
		return paymentRepo.findAllByPayType(payType);
	}

}
