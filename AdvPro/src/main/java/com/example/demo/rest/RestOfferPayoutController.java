package com.example.demo.rest;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.OfferPayoutDto;
import com.example.demo.dto.seachdto.OfferPayoutSearchDto;
import com.example.demo.service.OfferPayoutService;

@RestController
@CrossOrigin(origins = {"http://localhost:3001","http://localhost:3000" })
@RequestMapping(path = "/api/offerPayout")
public class RestOfferPayoutController {
	@Autowired
	OfferPayoutService offerPayoutService;
	 
	@RequestMapping(value = "/historyOfPrivateOfferPayout", method=RequestMethod.POST)
	public ResponseEntity<Page<OfferPayoutDto>> getHistoryOfPrivateOfferPayout(@RequestBody OfferPayoutSearchDto searchDto) {
		Page<OfferPayoutDto> listHistory = this.offerPayoutService.getHistoryOfPrivateOfferPayout(searchDto);
		return new ResponseEntity<Page<OfferPayoutDto>>(listHistory, HttpStatus.OK);
	}
	 
	@RequestMapping(value="/findAll", method = RequestMethod.POST)
	public List<OfferPayoutDto> findAll(@RequestBody OfferPayoutSearchDto searchDto) { 
		 List<OfferPayoutDto> list = offerPayoutService.findAll(searchDto);
		 return list;
	}

}
