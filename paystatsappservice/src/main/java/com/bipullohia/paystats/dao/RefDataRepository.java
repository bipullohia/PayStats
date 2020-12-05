package com.bipullohia.paystats.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bipullohia.paystats.entity.RefData;


public interface RefDataRepository extends JpaRepository<RefData, RefData.RefDataId>{

}
