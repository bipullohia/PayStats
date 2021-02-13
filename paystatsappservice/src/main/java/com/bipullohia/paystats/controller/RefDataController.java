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
import com.bipullohia.paystats.model.RefDataVO;
import com.bipullohia.paystats.model.SyncInfoVO;
import com.bipullohia.paystats.service.RefDataService;

@RestController
@CrossOrigin
@RequestMapping(value="/refdata")
public class RefDataController {
	
	@Autowired
	private RefDataService refCodeService;
	
	@GetMapping("/all")
	public ResponseEntity<List<RefDataVO>> getAllRefData(){
		return new ResponseEntity<List<RefDataVO>>(refCodeService.getAllRefData(), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<RefDataVO> addRefData(@RequestBody RefDataVO refCodeVO){
		
		ResponseEntity<RefDataVO> resp = null;
		RefDataVO respRefData = refCodeService.addRefData(refCodeVO);
		if(respRefData == null) {
			resp = new ResponseEntity<RefDataVO>(HttpStatus.BAD_REQUEST);
		}else {
			System.out.println(respRefData);
			resp = new ResponseEntity<RefDataVO>(respRefData, HttpStatus.OK);
		}
		
		return resp;
	}
	
	//sync the data on the sheet with the db table (right now it just pushes the rows to the DB table)
	@GetMapping("/syncSheetToDB")
	public ResponseEntity<SyncInfoVO> syncSheetValuestoDB(@RequestParam("sheetName") String sheetName) {
		CSVHelper csvHelper = new CSVHelper();
		List<RefDataVO> list = null;
		list = csvHelper.getAllRefDataTransactionsFromSheet(sheetName);
		System.out.println("SheetName: " + sheetName + ", List Count: " + list.size());
		
		List<RefDataVO> listOfErrorRows = new ArrayList<>();
		int insertedRowCount = 0;
		RefDataVO respRefDataVO = null;
		for(RefDataVO refVO : list) {
			respRefDataVO = refCodeService.addRefData(refVO);
			if(respRefDataVO != null) {
				insertedRowCount++;
			}else {
				System.out.println("Error encountered while syncing refData record to DB");
				listOfErrorRows.add(refVO);
			}
		}
		
		SyncInfoVO syncInfo = new SyncInfoVO();
		syncInfo.setSheetName(sheetName);
		syncInfo.setNumOfRecordsInSheet(list.size());
		syncInfo.setNumOfRecordsInserted(insertedRowCount);
		syncInfo.setListOfRefDataErrorRows(listOfErrorRows);
		System.out.println("Rows inserted: " + insertedRowCount);
		return new ResponseEntity<SyncInfoVO>(syncInfo, HttpStatus.OK);
	}
}
