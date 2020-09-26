package com.bipullohia.paystats.model;

import java.util.Date;

import com.bipullohia.paystats.model.Enums.PaymentCategory;
import com.bipullohia.paystats.model.Enums.PaymentType;

public class PaymentVO {

	private String payDescription;
	private PaymentCategory category;
	private int amount;
	private PaymentType payType;
	//private Date transactionDate;
	private String transactionDate;
	
	
	public String getPayDescription() {
		return payDescription;
	}
	
	public void setPayDescription(String payDescription) {
		this.payDescription = payDescription;
	}
	
	public PaymentCategory getCategory() {
		return category;
	}
	
	public void setCategory(PaymentCategory category) {
		this.category = category;
	}
	
	public int getAmount() {
		return amount;
	}
	
	public void setAmount(int amount) {
		this.amount = amount;
	}
	
	public PaymentType getPayType() {
		return payType;
	}
	
	public void setPayType(PaymentType payType) {
		this.payType = payType;
	}
	
//	public Date getTransactionDate() {
//		return transactionDate;
//	}
//	
//	public void setTransactionDate(Date transactionDate) {
//		this.transactionDate = transactionDate;
//	}

	public String getTransactionDate() {
		return transactionDate;
	}
	
	public void setTransactionDate(String transactionDate) {
		this.transactionDate = transactionDate;
	}

	@Override
	public String toString() {
		return "PaymentVO [payDescription=" + payDescription + ", category=" + category + ", amount=" + amount
				+ ", payType=" + payType + ", transactionDate=" + transactionDate + "]";
	}
	
}
