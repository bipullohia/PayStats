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
@IdClass(RefCode.RefCodeId.class)
public class RefCode {

	@Id
	private String codeType;
	
	@Id
	private String codeValue;

	@NotEmpty(message="Code desc cannot be empty")
	private String codeDesc;

	private char statusFlag;
	
	@UpdateTimestamp
	private Timestamp createTs;

	
	public String getCodeDesc() {
		return codeDesc;
	}
	
	public void setCodeDesc(String codeDesc) {
		this.codeDesc = codeDesc;
	}
	
	public String getCodeType() {
		return codeType;
	}
	
	public void setCodeType(String codeType) {
		this.codeType = codeType;
	}
	
	public String getCodeValue() {
		return codeValue;
	}
	
	public void setCodeValue(String codeValue) {
		this.codeValue = codeValue;
	}
	
	public char getStatusFlag() {
		return statusFlag;
	}
	
	public void setStatusFlag(char statusFlag) {
		this.statusFlag = statusFlag;
	}
	
	public Timestamp getCreateTs() {
		return createTs;
	}
	
	public void setCreateTs(Timestamp createTs) {
		this.createTs = createTs;
	}
	
	//For composite primary key
	public static class RefCodeId implements Serializable {
		private static final long serialVersionUID = -3623739722685491129L;
		private String codeType;
		private String codeValue;
		
		public RefCodeId(String codeType, String codeValue) {
			this.codeType = codeType;
			this.codeValue = codeValue;
		}

		public String getCodeType() {
			return codeType;
		}

		public void setCodeType(String codeType) {
			this.codeType = codeType;
		}

		public String getCodeValue() {
			return codeValue;
		}

		public void setCodeValue(String codeValue) {
			this.codeValue = codeValue;
		}
	}
	
}
