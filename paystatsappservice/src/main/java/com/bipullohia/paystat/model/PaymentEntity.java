package com.bipullohia.paystat.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name="paymentEntity")
public class PaymentEntity {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int entityId;
	
	@NotEmpty(message="Payment Entity Name cannot be empty")
	private String entityName;

	public int getEntityId() {
		return entityId;
	}

	public void setEntityId(int entityId) {
		this.entityId = entityId;
	}

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}
}
