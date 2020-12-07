package com.example.demo.service;
 

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.dto.AnalticDto;
import com.example.demo.dto.OfferDto;
import com.example.demo.dto.seachdto.OfferSearchDto;

public interface OfferService  {

	Page<OfferDto> searchByPage(OfferSearchDto dto);
	
	OfferDto getOne(Long id);
	
	OfferDto saveOrUpdate(OfferDto dto, Long id);
	
	void deleteById(Long id);
	
	Page<OfferDto> getOfferList(OfferSearchDto dto, Long agencyID, String type);
	
	Page<OfferDto> getAgencyOfferList(OfferSearchDto dto, Long agencyID, String type);
	 
	OfferDto saveOfferPrivate(OfferDto dto, Long id);
	
	Page<OfferDto> getPrivateOfferList(OfferSearchDto dto, Long agencyID); 
	
	Page<OfferDto> getRequestOfferList(OfferSearchDto dto, Long userId, String type); 
	
	OfferDto setPrivateOffer(OfferDto dto);
	
	OfferDto setPublicOffer(OfferDto dto);
	
	void changeIsShowOffer(Long id);
	
	List<OfferDto> getNotification();
	
	Page<OfferDto> searchByPageChildOfOffer(OfferSearchDto dto,Long parentID);
	
	OfferDto redirectToWebsite(Long id, HttpServletRequest request, HttpServletResponse res);

	Long getOfferCountClick();

    Long countOfferPublic();
	
    Long countOfferPrivate();
    
    List<AnalticDto> count(String role, Long userId); 
    OfferDto resetCountClick(Long id);
}
