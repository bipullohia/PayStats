package com.bipullohia.paystats.entity;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="paymentMode")
public class PaymentMode {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int paymodeId;
	
	@NotEmpty(message = "Payment Mode Name cannot be empty")
	private String paymodeName;
	
	@UpdateTimestamp
	private Timestamp timestamp;

	public Timestamp getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}

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
