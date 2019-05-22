package com.bipullohia.paystat.service;

import java.util.List;

import com.bipullohia.paystat.model.PaymentCategory;

public interface PaymentCategoryService {

	PaymentCategory getPaymentCategoryById(int categoryId);
	List<PaymentCategory> getAllPaymentCategory();
	PaymentCategory addPaymentCategory(PaymentCategory paymentCategory);
	PaymentCategory updatePaymentCategory(PaymentCategory paymentCategory);
	boolean deletePaymentCategory(int categoryId);
	
	boolean existsById(int categoryId);
}
