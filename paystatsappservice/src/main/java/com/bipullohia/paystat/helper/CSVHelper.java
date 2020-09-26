package com.bipullohia.paystat.helper;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.util.ResourceUtils;

import com.bipullohia.paystat.helper.Enums.TransactionCategory;
import com.bipullohia.paystat.helper.Enums.TransactionType;
import com.bipullohia.paystat.vo.TransactionVO;
import com.opencsv.CSVReader;

public class CSVHelper {

	public List<TransactionVO> getAllTransactionsFromSheet(String sheetName){
		List<TransactionVO> listOfTransactions = new ArrayList<TransactionVO>();
		
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
	        		if(!nextRecord[0].isEmpty() && nextRecord[0] != null) {
		        		TransactionVO transaction = new TransactionVO();
			        	transaction.setDate(nextRecord[0].trim());
			        	transaction.setDesc(nextRecord[1].trim());
			        	transaction.setCategory(TransactionCategory.valueOf(nextRecord[2].trim()));
			        	transaction.setAmount(Integer.parseInt(nextRecord[3].trim()));
			        	transaction.setType(TransactionType.valueOf(nextRecord[4].trim()));	
			        	System.out.println(transaction.toString());
			            listOfTransactions.add(transaction);
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
		return listOfTransactions;
	}
}
