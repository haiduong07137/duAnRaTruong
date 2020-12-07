package com.example.demo.rest;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.List; 

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.catalina.authenticator.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AgencyDto;
import com.example.demo.dto.seachdto.AgencySearchDto;
import com.example.demo.service.AgencyService; 

@RestController
@CrossOrigin(origins = {"http://localhost:3001","http://localhost:3000" })
@RequestMapping(path = "/api/agency")

public class RestAgencyController {
	@Autowired	
	AgencyService agencyService;
	 
 
	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<AgencyDto> createAgency(@RequestBody AgencyDto dto) {
		AgencyDto result = agencyService.saveOrUpdate(dto, null, null);
		return new ResponseEntity<>(result, result != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
 
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<AgencyDto> getOne(@PathVariable("id") Long id) {
		AgencyDto dto = agencyService.getOne(id);
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
 
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<AgencyDto> updateAgency(@RequestBody AgencyDto dto, @PathVariable("id") Long Long) {
		AgencyDto result = agencyService.saveOrUpdate(dto, Long, null);
		return new ResponseEntity<>(result, result != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	} 
	@RequestMapping(value = "/{pageIndex}/{pageSize}", method = RequestMethod.GET)
	public ResponseEntity<Page<AgencyDto>> getList(@PathVariable("pageIndex") int pageIndex,
			@PathVariable("pageSize") int pageSize) {
		Page<AgencyDto> page = agencyService.getByPage(pageIndex, pageSize);
		return new ResponseEntity<>(page, HttpStatus.OK);
	}
 
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteById(@PathVariable("id") Long id) {
		agencyService.deleteById(id);
		return new ResponseEntity<>(true, HttpStatus.OK);
	}
 
	@RequestMapping(value = "/searchByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<AgencyDto>> searchByPage(@RequestBody AgencySearchDto searchDto) { 
		Page<AgencyDto> page = agencyService.searchByPage(searchDto);
		return new ResponseEntity<>(page, HttpStatus.OK);
	}
 
	public List<AgencyDto> findAll(@RequestBody AgencySearchDto searchDto) {

		List<AgencyDto> list = agencyService.findAll(searchDto);
		return list;
	}
 
	@RequestMapping(value = "/setManager/{userId}", method = RequestMethod.POST)
	public ResponseEntity<AgencyDto> setManager(@RequestBody AgencyDto agencyDto, @PathVariable("userId") Long userId) {
		AgencyDto result = agencyService.setRoleBDStaffForAgency(agencyDto.getId(), userId);
		return new ResponseEntity<>(result, result != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
 
	@RequestMapping(value = "/unSetManager", method = RequestMethod.POST)
	public ResponseEntity<AgencyDto> unSetManager(@RequestBody AgencyDto agencyDto) {
		AgencyDto result = agencyService.unSetRoleBDStaffForAgency(agencyDto.getId());
		return new ResponseEntity<>(result, result != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
 
	 
	@RequestMapping(value = "/searchByPageAgencyOfBDS", method = RequestMethod.POST)
	public ResponseEntity<Page<AgencyDto>> searchByPageAgencyOfBDS(@RequestBody AgencySearchDto searchDto) {
		Page<AgencyDto> page = agencyService.searchByPageListAgencyOfBDS(searchDto);
		return new ResponseEntity<>(page, HttpStatus.OK);
	}
 
	@RequestMapping(value = "/getRole", method = RequestMethod.POST)
	public List<String> getRole() {
		return agencyService.getRole();
	}
 
	@RequestMapping(value = "/getCurrentUser/{id}", method = RequestMethod.POST)
	public ResponseEntity<AgencyDto> getCurrentUser(@PathVariable("id") Long id) {
		AgencyDto result = agencyService.getOne(id);
		return new ResponseEntity<>(result, result != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
 
	 
 
 
	@RequestMapping(value = "/checkPassword", method = RequestMethod.POST)
	public Boolean checkPassword(@RequestBody String dto) throws UnsupportedEncodingException {
		boolean result = true;
		if (dto != null && StringUtils.hasText(dto))
			result = agencyService.checkPassword(dto);
		return result;
	}
 
	@RequestMapping(value = "/getPageAgencyDontHaveProductThis", method = RequestMethod.POST)
	public ResponseEntity<Page<AgencyDto>> getPageAgencyDontHaveProductThis(@RequestBody AgencySearchDto searchDto) {
		Page<AgencyDto> page = agencyService.getPageAgencyDontHaveProductThis(searchDto);
		return new ResponseEntity<>(page, HttpStatus.OK);
	}
 
	@RequestMapping(value = "/getListAgencyDontHaveManager", method = RequestMethod.POST)
	public ResponseEntity<List<AgencyDto>> getListAgencyDontHaveManager() {
		List<AgencyDto> page = agencyService.getListAgencyDontHaveManager();
		return new ResponseEntity<>(page, HttpStatus.OK);
	}

	 

	 
}
