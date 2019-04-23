package com.bipullohia.paystat.model;

import java.sql.Timestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@Entity
@Table(name="payments")
public class Payment {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int payid;

	@NotEmpty(message="Title for Payment cannot be empty")
	private String title;
	
	private String description;
	
	@NotNull(message="Transaction Amount cannot be null")
	private int amount;

	@NotEmpty(message="Date of Transaction cannot be empty")
	private String dateOfTransaction;
	
	@UpdateTimestamp
	private Timestamp timestamp;
	
	@NotEmpty(message="Payment Category cannot be empty")
	private String paymentCategory;
	
	@NotEmpty(message="Payment Type cannot be empty")
	private String payType;
	
	private String paymentEntity;
	
	private String entityPaidTo;

	public int getPayid() {
		return payid;
	}

	public void setPayid(int payid) {
		this.payid = payid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}
	
	public String getDateOfTransaction() {
		return dateOfTransaction;
	}

	public void setDateOfTransaction(String dateOfTransaction) {
		this.dateOfTransaction = dateOfTransaction;
	}

	public Timestamp getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}

	public String getPaymentCategory() {
		return paymentCategory;
	}

	public void setPaymentCategory(String paymentCategory) {
		this.paymentCategory = paymentCategory;
	}

	public String getPayType() {
		return payType;
	}

	public String getPaymentEntity() {
		return paymentEntity;
	}

	public void setPaymentEntity(String paymentEntity) {
		this.paymentEntity = paymentEntity;
	}

	public void setPayType(String payType) {
		this.payType = payType;
	}


	public String getEntityPaidTo() {
		return entityPaidTo;
	}

	public void setEntityPaidTo(String entityPaidTo) {
		this.entityPaidTo = entityPaidTo;
	}	
	
}
