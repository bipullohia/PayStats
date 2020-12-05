package com.bipullohia.paystats.helper;

import org.springframework.stereotype.Service;

import com.bipullohia.paystats.entity.RefData;
import com.bipullohia.paystats.model.RefDataVO;

@Service
public class RefDataHelper {

	public RefDataVO getRefCodeVOFromRefCodeEnitity(RefData refData) {
		RefDataVO refDataVO = new RefDataVO();
		refDataVO.setDescription(refData.getDescription());
		refDataVO.setRefDataType(refData.getRefDataType());
		refDataVO.setValue(refData.getValue());
		refDataVO.setStatusFlag(refData.getStatusFlag());
		return refDataVO;
	}
	
	public RefData getRefCodeEntityFromRefCodeVO(RefDataVO refDataVO) {
		RefData refData = new RefData();
		refData.setDescription(refDataVO.getDescription());
		refData.setRefDataType(refDataVO.getRefDataType());
		refData.setValue(refDataVO.getValue());
		refData.setStatusFlag(refDataVO.getStatusFlag());
		return refData;
	}
}
