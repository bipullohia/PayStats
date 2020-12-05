package com.bipullohia.paystats.model;

import java.util.List;

public class SyncInfoVO {
	
	private String sheetName;
	private int numOfRecordsInSheet;
	private int numOfRecordsInserted;
	private List<PaymentVO> listOfPaymentErrorRows;
	private List<RefDataVO> listOfRefDataErrorRows;
	
	public String getSheetName() {
		return sheetName;
	}
	public void setSheetName(String sheetName) {
		this.sheetName = sheetName;
	}
	public int getNumOfRecordsInSheet() {
		return numOfRecordsInSheet;
	}
	public void setNumOfRecordsInSheet(int numOfRecordsInSheet) {
		this.numOfRecordsInSheet = numOfRecordsInSheet;
	}
	public int getNumOfRecordsInserted() {
		return numOfRecordsInserted;
	}
	public void setNumOfRecordsInserted(int numOfRecordsInserted) {
		this.numOfRecordsInserted = numOfRecordsInserted;
	}
	public List<PaymentVO> getListOfPaymentErrorRows() {
		return listOfPaymentErrorRows;
	}
	public void setListOfPaymentErrorRows(List<PaymentVO> listOfPaymentErrorRows) {
		this.listOfPaymentErrorRows = listOfPaymentErrorRows;
	}
	public List<RefDataVO> getListOfRefDataErrorRows() {
		return listOfRefDataErrorRows;
	}
	public void setListOfRefDataErrorRows(List<RefDataVO> listOfRefDataErrorRows) {
		this.listOfRefDataErrorRows = listOfRefDataErrorRows;
	}
	
}
