package com.bipullohia.paystats.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bipullohia.paystats.dao.PaymentsRepository;
import com.bipullohia.paystats.entity.Payments;
import com.bipullohia.paystats.entity.PaymentFilter;
import com.bipullohia.paystats.specification.PaymentSpecification;

@Service
public class PaymentsServiceImpl implements PaymentsService {

	@Autowired
	private PaymentsRepository paymentRepo;
	
	@Override
	public Payments getPaymentById(int payid) {
		
		Payments payment = null;
		Optional<Payments> optPayment = paymentRepo.findById(payid);
		if(optPayment.isPresent()) {
			payment = optPayment.get();
		}
		return payment;
	}

	@Override
	public List<Payments> getAllPayment() {
		return paymentRepo.findAll();
	}

	@Override
	public Payments addPayment(Payments payment) {
		return paymentRepo.save(payment);
	}

	@Override
	public Payments updatePayment(Payments payment) {
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
	public List<Payments> findAllByPayType(String payType) {
		return paymentRepo.findAllByPayType(payType);
	}

	@Override
	public List<Payments> getFilteredPayments(PaymentFilter[] paymentFilters) {
		List<PaymentFilter> paymentFiltersList = new ArrayList<PaymentFilter>();
		for(PaymentFilter PaymentFilter : paymentFilters) {
			paymentFiltersList.add(PaymentFilter);
		}
		PaymentSpecification paymentSpecification = new PaymentSpecification(paymentFiltersList);
		List<Payments> filteredPayments = new ArrayList<Payments>();
		paymentRepo.findAll(paymentSpecification).forEach((payment) -> {
			filteredPayments.add(payment);
		});
		return filteredPayments;
	}
}
