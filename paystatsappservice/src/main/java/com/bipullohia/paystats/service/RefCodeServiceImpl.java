package com.bipullohia.paystats.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bipullohia.paystats.dao.RefCodeRepository;
import com.bipullohia.paystats.entity.RefCode;
import com.bipullohia.paystats.helper.RefCodeHelper;
import com.bipullohia.paystats.model.RefCodeVO;

@Service
public class RefCodeServiceImpl implements RefCodeService {

	@Autowired
	private RefCodeRepository refCodeRepo;
	
	@Autowired
	private RefCodeHelper refCodeHelper;
	
	@Override
	public List<RefCodeVO> getAllRefData() {
		
		List<RefCode> allRefData = new ArrayList<>();
		allRefData = refCodeRepo.findAll();

		List<RefCodeVO> listOfRefDataVO = new ArrayList<>();
		for(RefCode refdata : allRefData) {
			RefCodeVO refCodeVO = refCodeHelper.getRefCodeVOFromRefCodeEnitity(refdata);
			listOfRefDataVO.add(refCodeVO);
		}
		return listOfRefDataVO;
	}

	
	@Override
	public RefCode addRefData(RefCodeVO refCodeVO) {
		return refCodeRepo.save(refCodeHelper.getRefCodeEntityFromRefCodeVO(refCodeVO));
	}

}
