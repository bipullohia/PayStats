package com.bipullohia.paystats.controller;

import java.util.ArrayList;
import java.util.List;

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
import com.bipullohia.paystats.model.SyncInfoVO;
import com.bipullohia.paystats.service.PaymentService;

@RestController
@CrossOrigin
@RequestMapping(value="/paymentss")
public class PaymentController {

	@Autowired
	private PaymentService paymentService;
	
	@GetMapping("/all")
	public ResponseEntity<List<PaymentVO>> getAllPayments(){
		return new ResponseEntity<List<PaymentVO>>(paymentService.getAllPayment(),HttpStatus.OK);
	}
	
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
	
	@GetMapping("/syncSheetToDB")
	public ResponseEntity<SyncInfoVO> syncSheetValuestoDB(@RequestParam("sheetName") String sheetName) {
		CSVHelper csvHelper = new CSVHelper();
		List<PaymentVO> list = null;
		list = csvHelper.getAllTransactionsFromSheet(sheetName);
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
		syncInfo.setListOfErrorRows(listOfErrorRows);
		System.out.println("Rows inserted: " + insertedRowCount);
		return new ResponseEntity<SyncInfoVO>(syncInfo, HttpStatus.OK);
	}
	
	
}
