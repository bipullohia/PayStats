package com.bipullohia.paystat.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bipullohia.paystat.dao.PaymentEntityRepository;
import com.bipullohia.paystat.model.PaymentEntity;

@Service
public class PaymentEntityServiceImpl implements PaymentEntityService {

	@Autowired
	private PaymentEntityRepository paymentEntityRepo;
	
	@Override
	public List<PaymentEntity> getAllPaymentEntity() {
		return paymentEntityRepo.findAll();
	}

	@Override
	public PaymentEntity addPaymentEntity(PaymentEntity paymentEntity) {
		return paymentEntityRepo.save(paymentEntity);
	}

	@Override
	public PaymentEntity updatePaymentEntity(PaymentEntity paymentEntity) {
		return paymentEntityRepo.save(paymentEntity);
	}

	@Override
	public boolean deletePaymentEntity(int entityId) {
		boolean isDeleted = false;
		if(paymentEntityRepo.existsById(entityId)) {
			paymentEntityRepo.deleteById(entityId);
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public boolean existsById(int entityId) {
		return paymentEntityRepo.existsById(entityId);
	}
	
	@Override
	public PaymentEntity getPaymentEntityById(int entityId) {
		PaymentEntity paymentEntity = null;
		Optional<PaymentEntity> optPaymentEntity = paymentEntityRepo.findById(entityId);
		if(optPaymentEntity.isPresent())
			paymentEntity = optPaymentEntity.get();
		return paymentEntity;
	}

}
