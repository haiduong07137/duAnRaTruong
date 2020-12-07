package com.example.demo.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AnalticDto;
import com.example.demo.dto.OfferDto;
import com.example.demo.dto.seachdto.OfferSearchDto;
import com.example.demo.repository.ValidateOfferRepository;
import com.example.demo.service.AgencyService;
import com.example.demo.service.OfferService;
import com.example.demo.service.ProductService;

@RestController
@CrossOrigin(origins = { "http://localhost:3001", "http://localhost:3000" })
@RequestMapping(path = "/api/offer")
public class RestOfferController {

	@Autowired
	OfferService offerService;

	@Autowired
	AgencyService agencyService;
	
	@Autowired
	ProductService productService;

	@RequestMapping(value = "/searchByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<OfferDto>> searchByPage(@RequestBody OfferSearchDto searchDto) {
		Page<OfferDto> page = offerService.searchByPage(searchDto);

		return new ResponseEntity<Page<OfferDto>>(page, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<OfferDto> getOne(@PathVariable("id") Long id) {
		OfferDto dto = offerService.getOne(id);

		return new ResponseEntity<OfferDto>(dto, HttpStatus.OK);
	}

	@RequestMapping(value = "/getOfferList/{type}", method = RequestMethod.POST)
	public ResponseEntity<Page<OfferDto>> getOfferList(@RequestBody OfferSearchDto searchDto,
			@PathVariable String type) {
		Page<OfferDto> page = offerService.getOfferList(searchDto, searchDto.getId(), type);
		return new ResponseEntity<Page<OfferDto>>(page, HttpStatus.OK);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<OfferDto> saveOne(@RequestBody OfferDto dto) {
		OfferDto result = offerService.saveOrUpdate(dto, null);
		return new ResponseEntity<OfferDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<OfferDto> updateOne(@RequestBody OfferDto dto, @PathVariable("id") Long id) {

		OfferDto result = offerService.saveOrUpdate(dto, id);

		return new ResponseEntity<OfferDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteById(@PathVariable("id") Long id) {
		offerService.deleteById(id);

		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}

	@RequestMapping(value = "/getAgencyOffer", method = RequestMethod.POST)
	public ResponseEntity<Page<OfferDto>> getAgencyOfferList(@RequestBody OfferSearchDto searchDto) {
		Page<OfferDto> page = offerService.getAgencyOfferList(searchDto, searchDto.getAgencyId(), "public");
		return new ResponseEntity<Page<OfferDto>>(page, HttpStatus.OK);
	}

	@RequestMapping(value = "/saveOfferPrivate/{id}", method = RequestMethod.PUT)
	public ResponseEntity<OfferDto> saveOfferPrivate(@RequestBody OfferDto dto, @PathVariable("id") Long id) {

		OfferDto result = offerService.saveOfferPrivate(dto, id);

		return new ResponseEntity<OfferDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/getPrivateAgencyOffer", method = RequestMethod.POST)
	public ResponseEntity<Page<OfferDto>> getPrivateAgencyOffer(@RequestBody OfferSearchDto searchDto) {
		Page<OfferDto> page = offerService.getPrivateOfferList(searchDto, searchDto.getAgencyId());
		return new ResponseEntity<Page<OfferDto>>(page, HttpStatus.OK);
	}

	@RequestMapping(value = "/getRequestOfferList", method = RequestMethod.POST)
	public ResponseEntity<Page<OfferDto>> getUserRequestListOfAgency(@RequestBody OfferSearchDto searchDto) {
		Page<OfferDto> page = offerService.getRequestOfferList(searchDto, searchDto.getAgencyId(), "public");
		return new ResponseEntity<Page<OfferDto>>(page, HttpStatus.OK);
	}
	@RequestMapping(value = "/getNotification", method = RequestMethod.GET)
	public List<OfferDto> getNoti() {
		return offerService.getNotification();
	}
	

	@RequestMapping(value = "/setPrivateOffer", method = RequestMethod.POST)
	public ResponseEntity<OfferDto> setPrivateOffer(@RequestBody OfferDto dto) {
		OfferDto result = offerService.setPrivateOffer(dto);
		return new ResponseEntity<OfferDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/setPublicOffer", method = RequestMethod.POST)
	public ResponseEntity<OfferDto> setPublicOffer(@RequestBody OfferDto dto) {
		OfferDto result = offerService.setPublicOffer(dto);
		return new ResponseEntity<OfferDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/changeIsShowOffer/{id}", method = RequestMethod.POST)
	public ResponseEntity<Boolean> changeIsShowOffer(@PathVariable("id") Long id) {
		offerService.changeIsShowOffer(id);
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}

	@RequestMapping(value = "/searchByPageChildOfOffer/{id}", method = RequestMethod.POST)
	public ResponseEntity<Page<OfferDto>> searchByPageChildOfOffer(@RequestBody OfferSearchDto searchDto,
			@PathVariable("id") Long id) {
		Page<OfferDto> page = offerService.searchByPageChildOfOffer(searchDto, id);
		return new ResponseEntity<Page<OfferDto>>(page, HttpStatus.OK);
	}

	@RequestMapping(value = "/redirectToWebsite/{id}", method = RequestMethod.GET)
	public ResponseEntity<OfferDto> redirectToWebsite(@PathVariable("id") Long offerId, HttpServletRequest request,
			HttpServletResponse response) {
		OfferDto page = offerService.redirectToWebsite(offerId, request, response);
		return new ResponseEntity<OfferDto>(page, HttpStatus.OK);
	}

	// lay ra count offer public
	@RequestMapping(value = "/countOfferPublic", method = RequestMethod.GET)
	public ResponseEntity<OfferDto> countOfferPublic() {
		OfferDto offerDto = new OfferDto();
		Long count = offerService.countOfferPublic();
		offerDto.setCountOfferPublic(count);
		return new ResponseEntity<OfferDto>(offerDto, HttpStatus.OK);
	}

	// lay ra count offer private
	@RequestMapping(value = "/countOfferPrivate", method = RequestMethod.GET)
	public ResponseEntity<OfferDto> countOfferPrivate() {
		OfferDto offerDto = new OfferDto();
		Long count = offerService.countOfferPrivate();
		offerDto.setCountOfferPrivate(count);
		return new ResponseEntity<OfferDto>(offerDto, HttpStatus.OK);
	}

	// lay ra tong click cua tat ca san pham
	@RequestMapping(value = "/countclick", method = RequestMethod.GET)
	public ResponseEntity<OfferDto> redirectToWebsite() {
		OfferDto offerDto = new OfferDto();
		Long count = offerService.getOfferCountClick();
		offerDto.setCountClick(count);
		return new ResponseEntity<OfferDto>(offerDto, HttpStatus.OK);
	}
	
	//gui analtic
	@RequestMapping(value = "/dashboard/analytics", method = RequestMethod.GET)
	public ResponseEntity<analtic> analtic() {
//		OfferDto offerDto = new OfferDto();
//		Long count = offerService.getOfferCountClick();
//		offerDto.setCountClick(count);
		analtic analtic = new analtic();
		analtic.prd = (long) productService.getAllProduct().size();
		analtic.pb = offerService.countOfferPublic();
		analtic.pr = offerService.countOfferPrivate();
		analtic.cl = offerService.getOfferCountClick();
		return new ResponseEntity<analtic>(analtic, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/analytics/{userId}/{role}", method = RequestMethod.GET)
	public ResponseEntity<List<AnalticDto>> getAll(@PathVariable("role") String role, @PathVariable("userId") Long userId) {
		List<AnalticDto> analticDtos = new ArrayList<>();
		analticDtos = offerService.count(role, userId);
		return new ResponseEntity<List<AnalticDto>>(analticDtos, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/reset/{id}", method = RequestMethod.POST)
	public ResponseEntity<OfferDto> resetCountLink(@PathVariable("id") Long id) {
		OfferDto offerDto = offerService.resetCountClick(id);
		return new ResponseEntity<OfferDto>(offerDto,HttpStatus.OK);
	}
}

class analtic{
	public Long prd;
	public Long pb;
	public Long pr;
	public Long cl;
}
