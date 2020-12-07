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

import com.example.demo.dto.CampaignDto;
import com.example.demo.dto.ProductDto;
import com.example.demo.dto.seachdto.CampaignSeachdto;
import com.example.demo.dto.seachdto.ProductSearchDto;
import com.example.demo.service.CampaignService;

@RestController
@CrossOrigin(origins = {"http://localhost:3001","http://localhost:3000" })
@RequestMapping(path = "/api/campaign")

public class RestCampaignController {
	@Autowired
	CampaignService campaignService;
	
	@RequestMapping(value = "",method =RequestMethod.POST )
	public ResponseEntity<CampaignDto> createCampaign(@RequestBody CampaignDto dto){
		
		CampaignDto result= campaignService.saveOne(dto, null);
		return new ResponseEntity<CampaignDto>(result,(result!=null ? HttpStatus.OK : HttpStatus.BAD_REQUEST));
	}
	
	
	@RequestMapping(value = "/{id}",method =RequestMethod.PUT )
	public ResponseEntity<CampaignDto> updateCampaign(@RequestBody CampaignDto dto, @PathVariable("id") Long id){
		CampaignDto result= campaignService.saveOne(dto, id);
		return new ResponseEntity<CampaignDto>(result,(result!=null ? HttpStatus.OK : HttpStatus.BAD_REQUEST));
	}
	
	
	@RequestMapping(value = "/{id}",method = RequestMethod.DELETE )
	public ResponseEntity<Boolean>  deleteId(@PathVariable("id") Long id){
		campaignService.deleteById(id);
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}",method = RequestMethod.GET )
	public ResponseEntity<CampaignDto>  getOner(@PathVariable("id") Long id){
	CampaignDto result=	campaignService.getOne(id);
	return new ResponseEntity<CampaignDto>(result,(result!=null ? HttpStatus.OK : HttpStatus.BAD_REQUEST));
	}
	
	
	@RequestMapping(value = "/searchByPage",method = RequestMethod.POST)
	public ResponseEntity<Page<CampaignDto>> searchByPage(@RequestBody CampaignSeachdto searchDto) {
		
		Page<CampaignDto> page = campaignService.searchByPage(searchDto);
		return new ResponseEntity<Page<CampaignDto>>(page, HttpStatus.OK);
	
	} 
	
	
	
	


}
