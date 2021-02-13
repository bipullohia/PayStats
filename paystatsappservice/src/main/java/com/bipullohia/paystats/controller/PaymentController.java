package com.bipullohia.paystats.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bipullohia.paystats.helper.CSVHelper;
import com.bipullohia.paystats.model.PaymentVO;
import com.bipullohia.paystats.model.PaymentsReviewVO;
import com.bipullohia.paystats.model.SyncInfoVO;
import com.bipullohia.paystats.service.PaymentService;

@RestController
@CrossOrigin
@RequestMapping(value="/payments")
public class PaymentController {

	@Autowired
	private PaymentService paymentService;
	
	//TO get all the payments on the DB table
	@GetMapping("/all")
	public ResponseEntity<List<PaymentVO>> getAllPayments(){
		return new ResponseEntity<List<PaymentVO>>(paymentService.getAllPayment(),HttpStatus.OK);
	}
	
	//Adds new payment to the DB table (shouldn't be used as of now)
	@PostMapping
	public ResponseEntity<PaymentVO> addPayment(@RequestBody PaymentVO paymentVO){
		
		ResponseEntity<PaymentVO> resp = null;
		PaymentVO respPay = paymentService.addPayment(paymentVO);
		if(respPay==null) {
			resp = new ResponseEntity<PaymentVO>(HttpStatus.BAD_REQUEST);
		}else {
			System.out.println(respPay);
			resp = new ResponseEntity<PaymentVO>(respPay, HttpStatus.OK);
		}
		
		return resp;
	}
	
	//Get specific payments according to the search fields
	@GetMapping
	public ResponseEntity<List<PaymentVO>> getAllPaymentsBySearch(
			@RequestParam("searchField") String searchField,
			@RequestParam("searchValue") String searchValue
			){
		ResponseEntity<List<PaymentVO>> resp = null;
		
		switch(searchField) {
		case "PayCategory":
			List<PaymentVO> listOfPayByCategory = paymentService.findAllByCategory(searchValue);
			
			if(listOfPayByCategory != null && listOfPayByCategory.size()>0)
				resp = new ResponseEntity<>(listOfPayByCategory, HttpStatus.OK);
			else
				resp = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			break;
			
		case "PayType":
			List<PaymentVO> listOfPayByType = paymentService.findAllByPayType(searchValue);
			
			if(listOfPayByType != null && listOfPayByType.size()>0)
				resp = new ResponseEntity<>(listOfPayByType, HttpStatus.OK);
			else
				resp = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			break;
		
		default:
			resp = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			break;
		}
		
		return resp;
	}
	
	//sync the data on the sheet with the db table (right now it just pushes the payment rows to the DB table)
	@GetMapping("/syncSheetToDB")
	public ResponseEntity<SyncInfoVO> syncSheetValuestoDB(@RequestParam("sheetName") String sheetName) {
		CSVHelper csvHelper = new CSVHelper();
		List<PaymentVO> list = null;
		list = csvHelper.getAllPaymentTransactionsFromSheet(sheetName);
		System.out.println("SheetName: " + sheetName + ", List Count: " + list.size());
		
		List<PaymentVO> listOfErrorRows = new ArrayList<>();
		int insertedRowCount = 0;
		PaymentVO respPaymentVO = null;
		for(PaymentVO payVO : list) {
			respPaymentVO = paymentService.addPayment(payVO);
			if(respPaymentVO != null) {
				insertedRowCount++;
			}else {
				System.out.println("Error encountered while syncing payment record to DB");
				listOfErrorRows.add(payVO);
			}
		}
		
		SyncInfoVO syncInfo = new SyncInfoVO();
		syncInfo.setSheetName(sheetName);
		syncInfo.setNumOfRecordsInSheet(list.size());
		syncInfo.setNumOfRecordsInserted(insertedRowCount);
		syncInfo.setListOfPaymentErrorRows(listOfErrorRows);
		System.out.println("Rows inserted: " + insertedRowCount);
		return new ResponseEntity<SyncInfoVO>(syncInfo, HttpStatus.OK);
	}
	
	@GetMapping("/generateReviewReport")
	public ResponseEntity<TreeMap<String, PaymentsReviewVO>> generateExpenseReport(){
		//retrieve all the payments from the PAYMENT table
		List<PaymentVO> payments = paymentService.getAllPayment();
		HashMap<String, PaymentsReviewVO> reviewMap = new HashMap<>();
		reviewMap = getPaymentReviewHashmap(payments);
		
		TreeMap<String, PaymentsReviewVO> sortedMap = new TreeMap<>();
		sortedMap.putAll(reviewMap);
		
		return new ResponseEntity<>(sortedMap, HttpStatus.OK);
	}
	
	
	@GetMapping("/testEndpoint")
	public ResponseEntity<String> testFunction(){
		
		System.out.println("Hello World! This is a test endpoint for experiments");
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	private HashMap<String, PaymentsReviewVO> getPaymentReviewHashmap(List<PaymentVO> payments){
		//The root map containing all the month's reports
		HashMap<String, PaymentsReviewVO> reviewMap = new HashMap<>();
		
		if(payments.size() > 0) {
			PaymentsReviewVO payReviewVO = new PaymentsReviewVO();
			//This map corresponds to a particular month's report
			HashMap<String, Integer> map = new HashMap<>();
			
			for(int i=0; i<payments.size(); i++) {
				String currentMonth = getMonth(payments.get(i).getTransactionDate());
				String currentYear = getYear(payments.get(i).getTransactionDate());
				String currentMapKey = currentYear+currentMonth;

				//if root hashmap is not there for the month, create one
				if(!reviewMap.containsKey(currentMapKey)) {
					payReviewVO = new PaymentsReviewVO();
					map = new HashMap<>();
					payReviewVO.setCategoryDetails(map);
					reviewMap.put(currentMapKey, payReviewVO);
				}
				
				map = reviewMap.get(currentMapKey).getCategoryDetails();
				String category = payments.get(i).getCategory().toString();
				
				//If this category doesn't exist in the map, we initiate it with 0				
				if(!map.containsKey(category)) {
					map.put(category, 0);
				}
				
				int amount = map.get(category);
				int finalAmount = amount + payments.get(i).getAmount();
				map.put(category, finalAmount);
				
				//setting the updated map back to the root map
				reviewMap.get(currentMapKey).setCategoryDetails(map);
			}
		}
		return reviewMap;
	}
	
	private String getMonth(String date) {
		String month = date.substring(3, 5);
		return month;
	}
	
	private String getYear(String date) {
		String year = date.substring(6);
		return year;
	}
	
	
}
