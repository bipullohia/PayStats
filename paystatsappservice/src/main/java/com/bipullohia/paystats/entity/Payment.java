package com.bipullohia.paystats.entity;

import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="payment")
public class Payment {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@NotEmpty(message="Payment description cannot be empty")
	private String payDescription;
	
	@NotEmpty(message="Payment category cannot be empty")
	private String category;
	
	@NotNull(message="Payment amount cannot be empty")
	private int amount;
	
	@NotEmpty(message="Payment type cannot be empty")
	private String payType;
	
	@NotNull(message="Payment transaction date cannot be empty")
	@Temporal(TemporalType.DATE) //helps to put only date related data into the DB and not time info
	private Date transactionDate;
	
	@UpdateTimestamp
	private Timestamp createTs;

	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getPayDescription() {
		return payDescription;
	}
	
	public void setPayDescription(String payDescription) {
		this.payDescription = payDescription;
	}
	
	public String getCategory() {
		return category;
	}
	
	public void setCategory(String category) {
		this.category = category;
	}
	
	public int getAmount() {
		return amount;
	}
	
	public void setAmount(int amount) {
		this.amount = amount;
	}
	
	public String getPayType() {
		return payType;
	}
	
	public void setPayType(String payType) {
		this.payType = payType;
	}
	
	public Date getTransactionDate() {
		return transactionDate;
	}
	
	public void setTransactionDate(Date transactionDate) {
		this.transactionDate = transactionDate;
	}
	
	public Timestamp getCreateTs() {
		return createTs;
	}
	
	public void setCreateTs(Timestamp createTs) {
		this.createTs = createTs;
	}
	
}
