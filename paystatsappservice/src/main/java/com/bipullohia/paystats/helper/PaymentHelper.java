package com.bipullohia.paystats.helper;

import org.springframework.stereotype.Service;

import com.bipullohia.paystats.entity.Payment;
import com.bipullohia.paystats.model.Enums.PaymentCategory;
import com.bipullohia.paystats.model.Enums.PaymentType;
import com.bipullohia.paystats.model.PaymentVO;
import com.bipullohia.paystats.util.ApplicationConstants;
import com.bipullohia.paystats.util.DateUtils;

@Service
public class PaymentHelper {
	
	public PaymentVO convertPaymentEntityToPaymentVO(Payment paymentEntity) {

		PaymentVO paymentVO = new PaymentVO();
		paymentVO.setId(paymentEntity.getId());
		paymentVO.setAmount(paymentEntity.getAmount());
		paymentVO.setCategory(PaymentCategory.valueOf(paymentEntity.getCategory()));
		paymentVO.setPayDescription(paymentEntity.getPayDescription());
		paymentVO.setPayType(PaymentType.valueOf(paymentEntity.getPayType()));
		paymentVO.setTransactionDate(DateUtils.getStringFromDate(paymentEntity.getTransactionDate(), ApplicationConstants.DATE_FORMAT_DASHED_DATEONLY));
		return paymentVO;
	}
	
	public Payment convertPaymentVOToPaymentEntity(PaymentVO paymentVO) {
		
		Payment paymentEntity = new Payment();
		paymentEntity.setAmount(paymentVO.getAmount());
		paymentEntity.setCategory(paymentVO.getCategory().toString());
		paymentEntity.setPayDescription(paymentVO.getPayDescription());
		paymentEntity.setPayType(paymentVO.getPayType().toString());
		paymentEntity.setTransactionDate(DateUtils.getDateFromString(paymentVO.getTransactionDate(), ApplicationConstants.DATE_FORMAT_DASHED_DATEONLY));
		return paymentEntity;
	}

}
