package com.bipullohia.paystats.service;

import java.util.List;

import com.bipullohia.paystats.entity.PaymentCategory;

public interface PaymentCategoryService {

	PaymentCategory getPaymentCategoryById(int categoryId);
	List<PaymentCategory> getAllPaymentCategory();
	PaymentCategory addPaymentCategory(PaymentCategory paymentCategory);
	PaymentCategory updatePaymentCategory(PaymentCategory paymentCategory);
	boolean deletePaymentCategory(int categoryId);
	
	boolean existsById(int categoryId);
}
