package com.bipullohia.paystats.model;

import java.util.List;

public class SyncInfoVO {
	
	private String sheetName;
	private int numOfRecordsInSheet;
	private int numOfRecordsInserted;
	private List<PaymentVO> listOfErrorRows;
	
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
	public List<PaymentVO> getListOfErrorRows() {
		return listOfErrorRows;
	}
	public void setListOfErrorRows(List<PaymentVO> listOfErrorRows) {
		this.listOfErrorRows = listOfErrorRows;
	}

	
}
