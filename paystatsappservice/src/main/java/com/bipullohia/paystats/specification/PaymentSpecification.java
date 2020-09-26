package com.bipullohia.paystats.specification;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.bipullohia.paystats.entity.Payments;
import com.bipullohia.paystats.entity.PaymentFilter;

public class PaymentSpecification implements Specification<Payments> {

	private static final long serialVersionUID = -5684345452148307970L;
	private List<PaymentFilter> paymentFilters;
	
	public PaymentSpecification(List<PaymentFilter> paymentFilters) {
		this.paymentFilters = paymentFilters;
	}
	
	@Override
	public Predicate toPredicate(Root<Payments> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		List<Predicate> predicates = new ArrayList<>();
		for(PaymentFilter paymentFilter : paymentFilters) {
			switch(paymentFilter.getFilterType()) {
			case "paymentDate":
				predicates.add(getPredicateForPaymentDate(criteriaBuilder, root, paymentFilter));
				break;
			case "paymentAmount":
				predicates.add(getPredicateForPaymentAmount(criteriaBuilder, root, paymentFilter));
				break;
			case "paymentCategory":
				predicates.add(getPredicateForPaymenCategory(criteriaBuilder, root, paymentFilter));
				break;
			case "paymentEntity":
				predicates.add(getPredicateForPaymentEntity(criteriaBuilder, root, paymentFilter));
				break;
			case "paymentMode":
				predicates.add(getPredicateForPaymentMode(criteriaBuilder, root, paymentFilter));
				break;
			}
		}
		return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size() - 1]));
	}
	
	public Predicate getPredicateForPaymentDate(CriteriaBuilder builder, Root<?> root, PaymentFilter paymentFilter) {
		final Predicate predicate = builder.disjunction();
		
		System.out.println(paymentFilter.getFilterValues()[0].toString());		
		System.out.println(paymentFilter.getFilterValues()[1].toString());
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
		
		
		try {
			Date startDate = dateFormat.parse((paymentFilter.getFilterValues()[0]));
			Date endDate = dateFormat.parse(paymentFilter.getFilterValues()[1]);
			
			System.out.println(startDate + " start");
			System.out.println(endDate);
			System.out.println(root.get("dateOfTransaction").getAlias());
			System.out.println(root.get("dateOfTransaction").toString());
			Path<Date> st = root.get("dateOfTransaction");
			
			predicate.getExpressions().add(builder.and(builder.greaterThanOrEqualTo(st, startDate), 
					builder.lessThanOrEqualTo(st, endDate)));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return predicate;
	}
	
	public Predicate getPredicateForPaymentAmount(CriteriaBuilder builder, Root<?> root, PaymentFilter paymentFilter) {
		final Predicate predicate = builder.disjunction();
		predicate.getExpressions().add(builder.and(builder.greaterThanOrEqualTo(root.get("amount"), Integer.valueOf(paymentFilter.getFilterValues()[0])), 
				builder.lessThanOrEqualTo(root.get("amount"), Integer.valueOf(paymentFilter.getFilterValues()[1]))));
		return predicate;
	}
	
	public Predicate getPredicateForPaymenCategory(CriteriaBuilder builder, Root<?> root, PaymentFilter paymentFilter) {
		final Predicate predicate = builder.disjunction();
		List<String> entityList = new ArrayList<String>();
		for(String value : paymentFilter.getFilterValues()) {
			entityList.add(value);
		}
		predicate.getExpressions().add(builder.and(root.get("paymentCategory").in(entityList)));
		return predicate;
	}
	
	public Predicate getPredicateForPaymentEntity(CriteriaBuilder builder, Root<?> root, PaymentFilter paymentFilter) {
		final Predicate predicate = builder.disjunction();
		List<String> entityList = new ArrayList<String>();
		for(String value : paymentFilter.getFilterValues()) {
			entityList.add(value);
		}
		predicate.getExpressions().add(builder.and(root.get("paymentEntity").in(entityList)));
		return predicate;
	}
	
	public Predicate getPredicateForPaymentMode(CriteriaBuilder builder, Root<?> root, PaymentFilter paymentFilter) {
		final Predicate predicate = builder.disjunction();
		List<String> entityList = new ArrayList<String>();
		for(String value : paymentFilter.getFilterValues()) {
			entityList.add(value);
		}
		predicate.getExpressions().add(builder.and(root.get("payType").in(entityList)));
		return predicate;
	}
}
