package com.bipullohia.paystat.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name="paymentMode")
public class PaymentMode {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int paymodeId;
	
	@NotEmpty(message = "Payment Mode Name cannot be empty")
	private String paymodeName;

	public int getPaymodeId() {
		return paymodeId;
	}

	public void setPaymodeId(int paymodeId) {
		this.paymodeId = paymodeId;
	}

	public String getPaymodeName() {
		return paymodeName;
	}

	public void setPaymodeName(String paymodeName) {
		this.paymodeName = paymodeName;
	}
}
