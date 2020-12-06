package com.bipullohia.paystats.helper;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.util.ResourceUtils;

import com.bipullohia.paystats.model.Enums.PaymentCategory;
import com.bipullohia.paystats.model.Enums.PaymentType;
import com.bipullohia.paystats.model.PaymentVO;
import com.bipullohia.paystats.model.RefDataVO;
import com.bipullohia.paystats.util.StringUtils;
import com.opencsv.CSVReader;

public class CSVHelper {

	public List<PaymentVO> getAllPaymentTransactionsFromSheet(String sheetName){
		List<PaymentVO> listOfPayments = new ArrayList<PaymentVO>();
		
		File file = null;
		try {
			file = ResourceUtils.getFile("classpath:" + sheetName);
			FileReader filereader = new FileReader(file); 
			
			CSVReader csvReader = new CSVReader(filereader); 
	        String[] nextRecord; 
	        int i = 0;
	        while ((nextRecord = csvReader.readNext()) != null) { 
	        	if(i > 0) {
	        		//check for empty rows of data
	        		if(isRowDataValid(nextRecord)) {
		        		PaymentVO payment = new PaymentVO();
			        	//payment.setTransactionDate(DateUtils.getDateFromString(nextRecord[0], "dd/MM/yyyy"));
			        	payment.setTransactionDate(nextRecord[0].trim());
		        		payment.setPayDescription(nextRecord[1].trim());
			        	payment.setCategory(PaymentCategory.valueOf(nextRecord[2].trim()));
			        	payment.setAmount(Integer.parseInt(nextRecord[3].trim()));
			        	payment.setPayType(PaymentType.valueOf(nextRecord[4].trim()));	
			        	System.out.println(payment.toString());
			            listOfPayments.add(payment);

	        		}
	        	}else {
	        		//to make sure only the header is exempted from going into the object
		            i++;
	        	}
	        } 
	        csvReader.close(); 
		
		} catch (IOException e) {
			e.printStackTrace();
		}
		return listOfPayments;
	}
	
	public List<RefDataVO> getAllRefDataTransactionsFromSheet(String sheetName){
		List<RefDataVO> listOfRefData = new ArrayList<RefDataVO>();
		
		File file = null;
		try {
			file = ResourceUtils.getFile("classpath:" + sheetName);
			FileReader filereader = new FileReader(file); 
			
			CSVReader csvReader = new CSVReader(filereader); 
	        String[] nextRecord; 
	        int i = 0;
	        while ((nextRecord = csvReader.readNext()) != null) { 
	        	if(i > 0) {
	        		//check for empty rows of data
	        		if(isRowDataValid(nextRecord)) {
		        		RefDataVO refData = new RefDataVO();
		        		//nextRecord[0] is the sl. no which we want db/backend to self-populate
		        		refData.setRefDataType(nextRecord[1].trim());
		        		refData.setValue(nextRecord[2].trim());
		        		refData.setDescription(nextRecord[3].trim());
		        		refData.setStatusFlag(nextRecord[4].trim().charAt(0));
			        	System.out.println(refData.toString());
			        	listOfRefData.add(refData);
	        		}
	        	}else {
	        		//to make sure only the header is exempted from going into the object
		            i++;
	        	}
	        } 
	        csvReader.close(); 
		
		} catch (IOException e) {
			e.printStackTrace();
		}
		return listOfRefData;
	}
	
	private boolean isRowDataValid(String[] rowData) {
		boolean isValid = true;

		//validating if data is null/empty
		if(StringUtils.isNullOrEmpty(rowData[0]) || StringUtils.isNullOrEmpty(rowData[1]) 
				|| StringUtils.isNullOrEmpty(rowData[2]) || StringUtils.isNullOrEmpty(rowData[3])
				|| StringUtils.isNullOrEmpty(rowData[4])) {
			isValid = false;
		}
		return isValid;
	}
}
