package com.bipullohia.paystat.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bipullohia.paystat.model.PaymentCategory;

@Repository
public interface PaymentCategoryRepository extends JpaRepository<PaymentCategory, Integer> {

}
