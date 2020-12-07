package com.example.demo.service;

import java.util.UUID;

import com.example.demo.dto.AgencyDto;
import com.example.demo.dto.UserDto; 
public interface SignUpService { 
	

	UserDto createUser(AgencyDto dto);

	void addProductToOfferForNewAgency(UUID idAgency);

	boolean checkEmail(AgencyDto dto);

	boolean checkUsername(AgencyDto dto);

	 void sendMailRegister(String emailTo,String token,String url);
	
	int confirmRegistration(String token);
}
