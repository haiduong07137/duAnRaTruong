package com.example.demo.rest;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List; 

import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.authenticator.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page; 
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.OfferDto;
import com.example.demo.dto.OfferPayoutDto;
import com.example.demo.dto.seachdto.OfferPayoutSearchDto;
import com.example.demo.dto.seachdto.OfferSearchDto;
import com.example.demo.service.OfferPayoutService;
import com.example.demo.service.OfferService;
import com.example.demo.utils.ImportExportExcelUtil;

@RestController
@RequestMapping(path = "/api/fileDownload")
public class RestFileDowloadController {
	@Autowired
	ImportExportExcelUtil importExportExcelUtil;
	
	@Autowired
	OfferPayoutService offerPayoutService;
	
	@Autowired
	OfferService offerService;

//	@Autowired
//	VoucherService voucherService;
//	
//	@Autowired
//	DepartmentRepository departmentRepository; 
	@RequestMapping(value="/historyOfferPayoutToExcel", method = RequestMethod.POST)
	public void exportHistoryOfferPayoutToExcel(@RequestBody OfferPayoutSearchDto searchDto, HttpServletResponse res) throws IOException {
		List<OfferPayoutDto> searchResult = offerPayoutService.findAll(searchDto);

		ByteArrayResource excelFile;
		excelFile = importExportExcelUtil.exporthistoryOfferPayoutToExcel(searchResult);
		InputStream ins = new ByteArrayInputStream(excelFile.getByteArray());
		org.apache.commons.io.IOUtils.copy(ins, res.getOutputStream());
		res.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		res.addHeader("Content-Disposition", "attachment; filename=Asset.xlsx");
	    res.flushBuffer();
	}
	 
	@RequestMapping(value="/historyOfferPayoutToExcel/{agencyID}", method = RequestMethod.POST)
	public void exportHistoryOfferPayoutToExcelByAgency(@PathVariable("agencyID") Long agencyID, HttpServletResponse res) throws IOException {
		OfferSearchDto dto = new OfferSearchDto();
		dto.setPageSize(999999999);
		Page<OfferDto> listResult = offerService.getPrivateOfferList(dto, agencyID);
		ByteArrayResource excelFile;
		excelFile = importExportExcelUtil.exporthistoryOfferPayoutToExcelByAgency(listResult.getContent());
		InputStream ins = new ByteArrayInputStream(excelFile.getByteArray());
		org.apache.commons.io.IOUtils.copy(ins, res.getOutputStream());
		res.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		res.addHeader("Content-Disposition", "attachment; filename=Asset.xlsx");
	    res.flushBuffer();
	}

	
}
