package com.example.demo.service;
 
import org.springframework.data.domain.Page;

import com.example.demo.dto.LeadDto;
import com.example.demo.dto.seachdto.SearchDto;

public interface LeadService {
	public void deleteById(Long id);

	public LeadDto saveOrUpdate(LeadDto dto, Long id);

	public Page<LeadDto> searchByPage(SearchDto dto);

	public LeadDto getOne(Long id);

}
