package com.example.demo.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AgencyDto;
import com.example.demo.dto.LeadDto;
import com.example.demo.dto.seachdto.AgencySearchDto;
import com.example.demo.dto.seachdto.SearchDto;
import com.example.demo.service.AgencyService;
import com.example.demo.service.LeadService;

@RestController
@CrossOrigin(origins = { "http://localhost:3001", "http://localhost:3000" })
@RequestMapping("/api/lead")
public class RestLeadController {

	@Autowired
	LeadService leadService;

	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<LeadDto> createAgency(@RequestBody LeadDto dto) {
		LeadDto result = leadService.saveOrUpdate(dto, null);
		return new ResponseEntity<LeadDto>(result, result != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<LeadDto> getOne(@PathVariable("id") Long id) {
		LeadDto dto = leadService.getOne(id);
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<LeadDto> updateAgency(@RequestBody LeadDto dto, @PathVariable("id") Long Long) {
		LeadDto result = leadService.saveOrUpdate(dto, Long);
		return new ResponseEntity<>(result, result != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") Long Long) {
		leadService.deleteById(Long);
		
		
	}

	@RequestMapping(value = "/searchByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<LeadDto>> searchByPage(@RequestBody SearchDto searchDto) {
		Page<LeadDto> page = leadService.searchByPage(searchDto);
		return new ResponseEntity<>(page, HttpStatus.OK);
	}
}
