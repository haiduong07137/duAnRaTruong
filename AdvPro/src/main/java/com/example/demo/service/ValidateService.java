package com.example.demo.service;

import org.springframework.data.domain.Page;

import com.example.demo.dto.ValidateDto;
import com.example.demo.dto.seachdto.SearchDto;

public interface ValidateService {
	
	void deleteById(Long id);
	
	ValidateDto createOrUpdateValidate(ValidateDto validateDto, Long id);
	
	Page<SearchDto> searchValidate(SearchDto serSearchDto);
	
	ValidateDto findById(Long id);
	
}
