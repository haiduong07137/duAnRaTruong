package com.example.demo.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List; 

import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;

import com.example.demo.dto.AgencyDto;
import com.example.demo.dto.seachdto.AgencySearchDto;
 

public interface AgencyService  {
    Page<AgencyDto> getByPage(int pageIndex, int pageSize);

    void deleteById(Long id);
    AgencyDto saveOrUpdate(AgencyDto dto, Long id,Long UserId);

    Page<AgencyDto> searchByPage(AgencySearchDto searchDto);

    List<AgencyDto> findAll(AgencySearchDto dto);


    AgencyDto getOne(Long id);


    Long getCurrentAgencyID(Long userID);
 

    AgencyDto setRoleBDStaffForAgency(Long agencyId, Long userId);

    AgencyDto unSetRoleBDStaffForAgency(Long agencyId);

    Page<AgencyDto> searchByPageListAgencyOfBDS(AgencySearchDto dto);
 

    List<String> getRole();

    ByteArrayResource customersToExcel(List<AgencyDto> list) throws IOException;

    AgencyDto getCurrentUser();
 

    boolean checkPassword(String dto) throws UnsupportedEncodingException;

    Page<AgencyDto> getPageAgencyDontHaveProductThis(AgencySearchDto dto);

    List<AgencyDto> getListAgencyDontHaveManager();

    /*
     * @params BDSAgency: management of agency
     */
    void sendAssignMailTo(String emailTo,String BDSAgency);
 
	
	List<AgencyDto> getAgencyDontHaveOffer(Long userId);
 

	void sendBDSMailTo(String emailTo, String Agency);


}
