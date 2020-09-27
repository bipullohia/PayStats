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

import com.bipullohia.paystats.entity.RefCode;
import com.bipullohia.paystats.model.RefCodeVO;
import com.bipullohia.paystats.service.RefCodeService;

@RestController
@CrossOrigin
@RequestMapping(value="/refdata")
public class RefDataController {
	
	@Autowired
	private RefCodeService refCodeService;
	
	@GetMapping("/all")
	public ResponseEntity<List<RefCodeVO>> getAllRefData(){
		return new ResponseEntity<List<RefCodeVO>>(refCodeService.getAllRefData(), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<RefCode> addRefData(@RequestBody RefCodeVO refCodeVO){
		
		ResponseEntity<RefCode> resp = null;
		RefCode refData = refCodeService.addRefData(refCodeVO);
		if(refData == null) {
			resp = new ResponseEntity<RefCode>(HttpStatus.BAD_REQUEST);
		}else {
			System.out.println(refData);
			resp = new ResponseEntity<RefCode>(refData, HttpStatus.OK);
		}
		
		return resp;
	}
}
