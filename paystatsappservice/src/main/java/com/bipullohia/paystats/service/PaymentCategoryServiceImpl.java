package com.bipullohia.paystats.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bipullohia.paystats.dao.PaymentCategoryRepository;
import com.bipullohia.paystats.entity.PaymentCategory;

@Service
public class PaymentCategoryServiceImpl implements PaymentCategoryService {

	@Autowired
	private PaymentCategoryRepository paymentCategoryRepo;
	
	@Override
	public List<PaymentCategory> getAllPaymentCategory() {
		return paymentCategoryRepo.findAll();
	}

	@Override
	public PaymentCategory addPaymentCategory(PaymentCategory paymentCategory) {
		return paymentCategoryRepo.save(paymentCategory);
	}

	@Override
	public PaymentCategory updatePaymentCategory(PaymentCategory paymentCategory) {
		return paymentCategoryRepo.save(paymentCategory);
	}

	@Override
	public boolean deletePaymentCategory(int categoryId) {
		boolean isDeleted = false;
		if(paymentCategoryRepo.existsById(categoryId)) {
			paymentCategoryRepo.deleteById(categoryId);
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public boolean existsById(int categoryId) {
		return paymentCategoryRepo.existsById(categoryId);
	}

	@Override
	public PaymentCategory getPaymentCategoryById(int categoryId) {
		PaymentCategory paymentCategory = null;
		Optional<PaymentCategory> optPaymentCategory = paymentCategoryRepo.findById(categoryId);
		if(optPaymentCategory.isPresent())
			paymentCategory = optPaymentCategory.get();
		return paymentCategory;
	}

}
