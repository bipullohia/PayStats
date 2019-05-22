package com.bipullohia.paystat.service;

import java.util.List;

import com.bipullohia.paystat.model.PaymentEntity;

public interface PaymentEntityService {

	PaymentEntity getPaymentEntityById(int entityId);
	List<PaymentEntity> getAllPaymentEntity();
	PaymentEntity addPaymentEntity(PaymentEntity paymentEntity);
	PaymentEntity updatePaymentEntity(PaymentEntity paymentEntity);
	boolean deletePaymentEntity(int entityId);
	
	boolean existsById(int entityId);
}
