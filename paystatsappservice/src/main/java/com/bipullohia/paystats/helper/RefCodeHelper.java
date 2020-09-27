package com.bipullohia.paystats.helper;

import org.springframework.stereotype.Service;

import com.bipullohia.paystats.entity.RefCode;
import com.bipullohia.paystats.model.RefCodeVO;

@Service
public class RefCodeHelper {

	public RefCodeVO getRefCodeVOFromRefCodeEnitity(RefCode refCode) {
		RefCodeVO refCodeVO = new RefCodeVO();
		refCodeVO.setCodeDesc(refCode.getCodeDesc());
		refCodeVO.setCodeType(refCode.getCodeType());
		refCodeVO.setCodeValue(refCode.getCodeValue());
		refCodeVO.setStatusFlag(refCode.getStatusFlag());
		return refCodeVO;
	}
	
	public RefCode getRefCodeEntityFromRefCodeVO(RefCodeVO refCodeVO) {
		RefCode refCode = new RefCode();
		refCode.setCodeDesc(refCodeVO.getCodeDesc());
		refCode.setCodeType(refCodeVO.getCodeType());
		refCode.setCodeValue(refCodeVO.getCodeValue());
		refCode.setStatusFlag(refCodeVO.getStatusFlag());
		return refCode;
	}
}
