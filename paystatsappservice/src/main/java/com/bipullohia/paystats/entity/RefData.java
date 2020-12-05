package com.bipullohia.paystats.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="ref_code")
@IdClass(RefData.RefDataId.class)
public class RefData {

	@Id
	private String refDataType;
	
	@Id
	private String value;

	@NotEmpty(message="RefData description cannot be empty")
	private String description;

	private char statusFlag;
	
	@UpdateTimestamp
	private Timestamp lastUpdateTs;

	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getRefDataType() {
		return refDataType;
	}
	
	public void setRefDataType(String refDataType) {
		this.refDataType = refDataType;
	}
	
	public String getValue() {
		return value;
	}
	
	public void setValue(String value) {
		this.value = value;
	}
	
	public char getStatusFlag() {
		return statusFlag;
	}
	
	public void setStatusFlag(char statusFlag) {
		this.statusFlag = statusFlag;
	}
	
	public Timestamp getLastUpdateTs() {
		return lastUpdateTs;
	}
	
	public void setLastUpdateTs(Timestamp createTs) {
		this.lastUpdateTs = createTs;
	}
	
	//For composite primary key
	public static class RefDataId implements Serializable {
		private static final long serialVersionUID = -3623739722685491129L;
		private String refDataType;
		private String value;
		
		public RefDataId() {
		}
		
		public RefDataId(String refDataType, String value) {
			this.refDataType = refDataType;
			this.value = value;
		}

		public String getRefDataType() {
			return refDataType;
		}

		public void setRefDataType(String refDataType) {
			this.refDataType = refDataType;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}
	}
	
}
