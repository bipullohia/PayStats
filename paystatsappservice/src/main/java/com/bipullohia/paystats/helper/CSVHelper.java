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
import com.bipullohia.paystats.util.DateUtils;
import com.bipullohia.paystats.util.StringUtils;
import com.opencsv.CSVReader;

public class CSVHelper {

	public List<PaymentVO> getAllTransactionsFromSheet(String sheetName){
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
			            
			            /* Exercise-    
			             * Here, we can directly copy paste the entire object
			             * 
			             */
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
