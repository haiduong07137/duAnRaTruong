package com.example.demo.rest;

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

import com.example.demo.dto.ValidateDto;
import com.example.demo.dto.seachdto.SearchDto;
import com.example.demo.service.ValidateService;

@RestController
@CrossOrigin(origins = { "http://localhost:3001", "http://localhost:3000" })
@RequestMapping(value = "/api/validate")
public class RestValidateController {

	@Autowired
	ValidateService validateService;

	@RequestMapping(value = "/searchValidate", method = RequestMethod.POST)
	public ResponseEntity<Page<SearchDto>> searchValidate(@RequestBody SearchDto serSearchDto) {
		Page<SearchDto> result = validateService.searchValidate(serSearchDto);
		return new ResponseEntity<Page<SearchDto>>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<ValidateDto> getById(@PathVariable Long id) {
		ValidateDto validateDto = validateService.findById(id);
		return new ResponseEntity<ValidateDto>(validateDto, HttpStatus.OK);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<ValidateDto> newValidate(@RequestBody ValidateDto validateDto) {
		System.out.println((validateDto != null) + "=ok");
		ValidateDto validateDtoNew = validateService.createOrUpdateValidate(validateDto, null);
		return new ResponseEntity<ValidateDto>(validateDtoNew, HttpStatus.OK);
//		return new ResponseEntity<ValidateDto>(validateDto, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<ValidateDto> updateValidate(@RequestBody ValidateDto validateDto, @PathVariable Long id) {
		ValidateDto validateDtoNew = validateService.createOrUpdateValidate(validateDto, id);
		return new ResponseEntity<ValidateDto>(validateDtoNew, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteValidate(@PathVariable Long id) {
		validateService.deleteById(id);
	}
}
