package com.bipullohia.paystat.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bipullohia.paystat.dao.PaymentModeRepository;
import com.bipullohia.paystat.model.PaymentMode;

@Service
public class PaymentModeServiceImpl implements PaymentModeService {

	@Autowired
	private PaymentModeRepository paymentModeRepo;
	
	@Override
	public List<PaymentMode> getAllPaymentMode() {
		return paymentModeRepo.findAll();
	}

	@Override
	public PaymentMode addPaymentMode(PaymentMode paymentMode) {
		return paymentModeRepo.save(paymentMode);
	}

	@Override
	public PaymentMode updatePaymentMode(PaymentMode paymentMode) {
		return paymentModeRepo.save(paymentMode);
	}

	@Override
	public boolean deletePaymentMode(int paymodeId) {
		boolean isDeleted = false;
		if(paymentModeRepo.existsById(paymodeId)) {
			paymentModeRepo.deleteById(paymodeId);
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public boolean existsById(int paymodeId) {
		return paymentModeRepo.existsById(paymodeId);
	}
	
	@Override
	public PaymentMode getPaymentModeById(int paymodeId) {
		PaymentMode paymentMode = null;
		Optional<PaymentMode> optPaymentMode = paymentModeRepo.findById(paymodeId);
		if(optPaymentMode.isPresent())
			paymentMode = optPaymentMode.get();
		return paymentMode;
	}

}
