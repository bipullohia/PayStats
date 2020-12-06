package com.bipullohia.paystats.service;

import java.util.List;

import com.bipullohia.paystats.model.RefDataVO;

public interface RefDataService {
	
	List<RefDataVO> getAllRefData();
	RefDataVO addRefData(RefDataVO refDataVO);
}
