package com.example.demo.service;

import org.springframework.data.domain.Page;

import com.example.demo.dto.CampaignDto;
import com.example.demo.dto.CategoryDto;
import com.example.demo.dto.seachdto.CampaignSeachdto;
import com.example.demo.dto.seachdto.CategorySearchDto;

public interface CampaignService {

	public void deleteById(Long id);
	
	Page<CampaignDto> searchByPage(CampaignSeachdto dto);
	
	CampaignDto getOne(Long id);
	
	CampaignDto saveOne(CampaignDto dto, Long id);
}
