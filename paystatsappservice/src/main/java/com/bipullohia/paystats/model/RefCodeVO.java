package com.bipullohia.paystats.model;

public class RefCodeVO {

	private String codeType;
	private String codeValue;
	private String codeDesc;
	private char statusFlag;
	
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
	
	public String getCodeDesc() {
		return codeDesc;
	}
	
	public void setCodeDesc(String codeDesc) {
		this.codeDesc = codeDesc;
	}
	
	public char getStatusFlag() {
		return statusFlag;
	}
	
	public void setStatusFlag(char statusFlag) {
		this.statusFlag = statusFlag;
	}
	
}
