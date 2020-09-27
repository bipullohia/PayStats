package com.bipullohia.paystats.service;

import java.util.List;

import com.bipullohia.paystats.entity.RefCode;
import com.bipullohia.paystats.model.RefCodeVO;

public interface RefCodeService {
	
	List<RefCodeVO> getAllRefData();
	RefCode addRefData(RefCodeVO refCodeVO);
}
