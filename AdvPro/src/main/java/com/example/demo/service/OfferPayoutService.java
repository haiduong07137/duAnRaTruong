package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;

import com.example.demo.domain.OfferPayout;
import com.example.demo.dto.OfferPayoutDto;
import com.example.demo.dto.seachdto.OfferPayoutSearchDto; 

public interface OfferPayoutService     {

	Page<OfferPayoutDto> getHistoryOfPrivateOfferPayout(OfferPayoutSearchDto searchDto);

	List<OfferPayoutDto> findAll(OfferPayoutSearchDto searchDto);
	
	List<OfferPayoutDto> getListHistoryByAgency(UUID agencyId);

}
