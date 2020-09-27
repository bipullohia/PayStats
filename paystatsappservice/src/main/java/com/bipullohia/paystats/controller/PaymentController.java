package com.bipullohia.paystats.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bipullohia.paystats.model.PaymentVO;
import com.bipullohia.paystats.service.PaymentService;

@RestController
@CrossOrigin
@RequestMapping(value="/payments")
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
	
	
}
