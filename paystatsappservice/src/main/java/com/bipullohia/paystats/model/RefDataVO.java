package com.bipullohia.paystats.model;

public class RefDataVO {

	private String refDataType;
	private String value;
	private String description;
	private char statusFlag;
	
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
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public char getStatusFlag() {
		return statusFlag;
	}
	
	public void setStatusFlag(char statusFlag) {
		this.statusFlag = statusFlag;
	}

	@Override
	public String toString() {
		return "RefDataVO [refDataType=" + refDataType + ", value=" + value + ", description=" + description
				+ ", statusFlag=" + statusFlag + "]";
	}
	
}
