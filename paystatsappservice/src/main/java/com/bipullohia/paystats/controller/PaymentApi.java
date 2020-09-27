package com.bipullohia.paystats.controller;

import java.util.ArrayList;
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

import com.bipullohia.paystats.entity.Payments;
import com.bipullohia.paystats.entity.PaymentFilter;
import com.bipullohia.paystats.service.PaymentsService;

@RestController
@CrossOrigin
@RequestMapping(value="/payments")
public class PaymentApi {

	@Autowired
	private PaymentsService paymentService;
	
	@GetMapping("/all")
	public ResponseEntity<List<Payments>> getAllPayments(){
		return new ResponseEntity<>(
				paymentService.getAllPayment(), HttpStatus.OK);
	}
	
	@GetMapping("/{payid}")
	public ResponseEntity<Payments> getPaymentById(@PathVariable("payid") int payid){
		
		ResponseEntity<Payments> resp;
		Payments payment = paymentService.getPaymentById(payid);
		
		if(payment==null)
			resp = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		else
			resp=new ResponseEntity<>(payment, HttpStatus.OK);
		
		return resp;
	}
	
	@GetMapping("{searchField}/{searchValue}")
	public ResponseEntity<List<Payments>> getAllPaymentsBySearch(
			@PathVariable("searchField") String searchField,
			@PathVariable("searchValue") String searchValue
			){
		ResponseEntity<List<Payments>> resp = null;
		
		switch (searchField) {
		case "PayType":
			List<Payments> results = paymentService.findAllByPayType(searchValue);
			
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
	public ResponseEntity<Payments> addPayment(@RequestBody Payments payment){
		
		ResponseEntity<Payments> resp = null;
		Payments pay = paymentService.addPayment(payment);
		if(pay==null)
			resp = new ResponseEntity<Payments>(HttpStatus.BAD_REQUEST);
		else {
			System.out.println(pay);
			resp = new ResponseEntity<Payments>(pay, HttpStatus.OK);
		}
		
		return resp;
	}
	
	
	@PutMapping
	public ResponseEntity<Payments> updatePayment(@RequestBody Payments payment){
		System.out.println("dfjdjv");
		ResponseEntity<Payments> resp = null;
		Payments pay = paymentService.getPaymentById(payment.getPayid());
		
		pay = paymentService.updatePayment(payment);
		if(pay==null)
			resp = new ResponseEntity<Payments>(HttpStatus.BAD_REQUEST);
		else
			resp = new ResponseEntity<Payments>(pay, HttpStatus.OK);
		
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
	
	@PostMapping("/filters")
	public List<Payments> getFilteredPayments(@RequestBody PaymentFilter[] paymentFilter){
		System.out.println(paymentFilter);
		List<Payments> payments = new ArrayList<Payments>();
		payments = paymentService.getFilteredPayments(paymentFilter);
		System.out.println(payments.size() + " : filtered payment array result size");
		return payments;
	}
}
