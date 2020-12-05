package com.bipullohia.paystats.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bipullohia.paystats.dao.RefDataRepository;
import com.bipullohia.paystats.entity.RefData;
import com.bipullohia.paystats.helper.RefDataHelper;
import com.bipullohia.paystats.model.RefDataVO;

@Service
public class RefDataServiceImpl implements RefDataService {

	@Autowired
	private RefDataRepository refDataRepo;
	
	@Autowired
	private RefDataHelper refDataHelper;
	
	@Override
	public List<RefDataVO> getAllRefData() {
		
		List<RefData> allRefData = new ArrayList<>();
		allRefData = refDataRepo.findAll();

		List<RefDataVO> listOfRefDataVO = new ArrayList<>();
		for(RefData refdata : allRefData) {
			RefDataVO refDataVO = refDataHelper.getRefCodeVOFromRefCodeEnitity(refdata);
			listOfRefDataVO.add(refDataVO);
		}
		return listOfRefDataVO;
	}

	
	@Override
	public RefDataVO addRefData(RefDataVO refDataVO) {
		RefData refDataResp = refDataRepo.save(refDataHelper.getRefCodeEntityFromRefCodeVO(refDataVO));
		RefDataVO respRefDataVO = refDataHelper.getRefCodeVOFromRefCodeEnitity(refDataResp);
		return respRefDataVO;
	}

}
