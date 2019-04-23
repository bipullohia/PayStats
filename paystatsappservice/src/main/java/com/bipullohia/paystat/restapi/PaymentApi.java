package com.bipullohia.paystat.restapi;

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
import org.springframework.web.bind.annotation.RestController;

import com.bipullohia.paystat.model.Payment;
import com.bipullohia.paystat.service.PaymentService;

@RestController
@CrossOrigin
@RequestMapping(value="/payments")
public class PaymentApi {

	@Autowired
	private PaymentService paymentService;
	
	@GetMapping("/all")
	public ResponseEntity<List<Payment>> getAllPayments(){
		return new ResponseEntity<>(
				paymentService.getAllPayment(), HttpStatus.OK);
	}
	
	@GetMapping("/{payid}")
	public ResponseEntity<Payment> getPaymentById(@PathVariable("payid") int payid){
		
		ResponseEntity<Payment> resp;
		Payment payment = paymentService.getPaymentById(payid);
		
		if(payment==null)
			resp = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		else
			resp=new ResponseEntity<>(payment, HttpStatus.OK);
		
		return resp;
	}
	
	@GetMapping("{searchField}/{searchValue}")
	public ResponseEntity<List<Payment>> getAllPaymentsBySearch(
			@PathVariable("searchField") String searchField,
			@PathVariable("searchValue") String searchValue
			){
		ResponseEntity<List<Payment>> resp = null;
		
		switch (searchField) {
		case "PayType":
			List<Payment> results = paymentService.findAllByPayType(searchValue);
			
			if(results != null && results.size()>0)
				resp = new ResponseEntity<>(results, HttpStatus.OK);
			else
				resp = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			break;

		default:
			resp = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			break;
		}
		
		return resp;
	}
	
	@PostMapping
	public ResponseEntity<Payment> addPayment(@RequestBody Payment payment){
		
		ResponseEntity<Payment> resp = null;
		Payment pay = paymentService.addPayment(payment);
		if(pay==null)
			resp = new ResponseEntity<Payment>(HttpStatus.BAD_REQUEST);
		else {
			System.out.println(pay);
			resp = new ResponseEntity<Payment>(pay, HttpStatus.OK);
		}
		
		return resp;
	}
	
	
	@PutMapping
	public ResponseEntity<Payment> updatePayment(@RequestBody Payment payment){
		System.out.println("dfjdjv");
		ResponseEntity<Payment> resp = null;
		Payment pay = paymentService.getPaymentById(payment.getPayid());
		
		pay = paymentService.updatePayment(payment);
		if(pay==null)
			resp = new ResponseEntity<Payment>(HttpStatus.BAD_REQUEST);
		else
			resp = new ResponseEntity<Payment>(pay, HttpStatus.OK);
		
		return resp;
	}
	
	@DeleteMapping("/{payid}")
	public ResponseEntity<Void> deletePayment(@PathVariable("payid") int payid){
		
		ResponseEntity<Void> resp = null;
		
		if(paymentService.deletePayment(payid))
			resp = new ResponseEntity<>(HttpStatus.OK);
		else
			resp = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
		return resp;
	}
}
