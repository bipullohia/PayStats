package com.bipullohia.paystats.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bipullohia.paystats.entity.PaymentCategory;
import com.bipullohia.paystats.entity.PaymentEntity;
import com.bipullohia.paystats.entity.PaymentMode;
import com.bipullohia.paystats.helper.CSVHelper;
import com.bipullohia.paystats.model.PaymentVO;
import com.bipullohia.paystats.service.PaymentCategoryService;
import com.bipullohia.paystats.service.PaymentEntityService;
import com.bipullohia.paystats.service.PaymentModeService;

@RestController
@CrossOrigin
@RequestMapping(value="/manage")
public class ManageApi {

	@Autowired
	private PaymentEntityService paymentEntityService;
	
	@Autowired
	private PaymentCategoryService paymentCategoryService;
	
	@Autowired
	private PaymentModeService paymentModeService;
	
	@GetMapping("/syncSheetToDB")
	public ResponseEntity<Void> syncSheetValuestoDB(@RequestParam("sheetName") String sheetName) {
		CSVHelper csvHelper = new CSVHelper();
		List<PaymentVO> list = null;
		list = csvHelper.getAllTransactionsFromSheet(sheetName);
		System.out.println("SheetName: " + sheetName + "List Count: " + list.size());
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/{option}/all")
	public ResponseEntity<List<?>> getAllValues(@PathVariable("option") String option){
		switch(option) {
		case "paymentEntity": 
			return new ResponseEntity<>(
					paymentEntityService.getAllPaymentEntity(), HttpStatus.OK);
			
		case "paymentCategory":
			return new ResponseEntity<>(
					paymentCategoryService.getAllPaymentCategory(), HttpStatus.OK);
		
		case "paymentMode":
			return new ResponseEntity<>(
					paymentModeService.getAllPaymentMode(), HttpStatus.OK);	
		default:
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}	
	}
	
	@DeleteMapping("/{option}/{id}")
	public ResponseEntity<Void> deletePayment(@PathVariable("option") String option, @PathVariable("id") int id){
		
		boolean result = false;		
		switch(option) {
		case "paymentEntity": 
			result = paymentEntityService.deletePaymentEntity(id);
			break;
			
		case "paymentCategory":
			result = paymentCategoryService.deletePaymentCategory(id);
			break;
		
		case "paymentMode":
			result = paymentModeService.deletePaymentMode(id);
			break;
		}	
		
		
		if(result)
			return new ResponseEntity<>(HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/paymentEntity")
	public ResponseEntity<PaymentEntity> addPaymentEntity(@RequestBody PaymentEntity paymentEntity){
		
		ResponseEntity<PaymentEntity> resp = null;
		PaymentEntity payEntity = paymentEntityService.addPaymentEntity(paymentEntity);
		if(payEntity==null)
			resp = new ResponseEntity<PaymentEntity>(HttpStatus.BAD_REQUEST);
		else {
			System.out.println(paymentEntity);
			resp = new ResponseEntity<PaymentEntity>(payEntity, HttpStatus.OK);
		}
		
		return resp;
	}
	
	@PostMapping("/paymentMode")
	public ResponseEntity<PaymentMode> addPaymentMode(@RequestBody PaymentMode paymentMode){
		
		ResponseEntity<PaymentMode> resp = null;
		PaymentMode payMode = paymentModeService.addPaymentMode(paymentMode);
		if(payMode==null)
			resp = new ResponseEntity<PaymentMode>(HttpStatus.BAD_REQUEST);
		else {
			System.out.println(paymentMode);
			resp = new ResponseEntity<PaymentMode>(payMode, HttpStatus.OK);
		}
		
		return resp;
	}
	
	
	@PostMapping("/paymentCategory")
	public ResponseEntity<PaymentCategory> addPaymentCategory(@RequestBody PaymentCategory paymentCategory){
		
		ResponseEntity<PaymentCategory> resp = null;
		PaymentCategory payCategory = paymentCategoryService.addPaymentCategory(paymentCategory);
		if(payCategory==null)
			resp = new ResponseEntity<PaymentCategory>(HttpStatus.BAD_REQUEST);
		else {
			System.out.println(paymentCategory);
			resp = new ResponseEntity<PaymentCategory>(payCategory, HttpStatus.OK);
		}
		
		return resp;
	}
	
	@PutMapping("/paymentEntity")
	public ResponseEntity<PaymentEntity> updatePaymentEntity(@RequestBody PaymentEntity paymentEntity){
		ResponseEntity<PaymentEntity> resp = null;
		PaymentEntity payEntity = paymentEntityService.getPaymentEntityById(paymentEntity.getEntityId());
		
		payEntity = paymentEntityService.updatePaymentEntity(paymentEntity);
		if(payEntity==null)
			resp = new ResponseEntity<PaymentEntity>(HttpStatus.BAD_REQUEST);
		else
			resp = new ResponseEntity<PaymentEntity>(payEntity, HttpStatus.OK);
		return resp;
	}
	
	@PutMapping("/paymentCategory")
	public ResponseEntity<PaymentCategory> updatePaymentCategory(@RequestBody PaymentCategory paymentCategory){
		ResponseEntity<PaymentCategory> resp = null;
		PaymentCategory payCategory = paymentCategoryService.getPaymentCategoryById(paymentCategory.getCategoryId());
		
		payCategory = paymentCategoryService.updatePaymentCategory(paymentCategory);
		if(payCategory==null)
			resp = new ResponseEntity<PaymentCategory>(HttpStatus.BAD_REQUEST);
		else
			resp = new ResponseEntity<PaymentCategory>(payCategory, HttpStatus.OK);
		return resp;
	}
	
	@PutMapping("/paymentMode")
	public ResponseEntity<PaymentMode> updatePaymentMode(@RequestBody PaymentMode paymentMode){
		ResponseEntity<PaymentMode> resp = null;
		PaymentMode payMode = paymentModeService.getPaymentModeById(paymentMode.getPaymodeId());
		
		payMode = paymentModeService.updatePaymentMode(paymentMode);
		if(payMode==null)
			resp = new ResponseEntity<PaymentMode>(HttpStatus.BAD_REQUEST);
		else
			resp = new ResponseEntity<PaymentMode>(payMode, HttpStatus.OK);
		return resp;
	}
	
}
