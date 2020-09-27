package com.bipullohia.paystats.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bipullohia.paystats.entity.RefCode;


public interface RefCodeRepository extends JpaRepository<RefCode, RefCode.RefCodeId>{

}
