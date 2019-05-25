package com.bipullohia.paystat.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="paymentCategory")
public class PaymentCategory {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int categoryId;
	
	@NotEmpty(message="Payment Category Name cannot be empty")
	private String categoryName;
	
	@UpdateTimestamp
	private Timestamp timestamp;

	public Timestamp getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
}
