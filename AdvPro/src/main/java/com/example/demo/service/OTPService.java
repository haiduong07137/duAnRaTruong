package com.example.demo.service;

import com.example.demo.dto.OTPDto;

public interface OTPService  {
	
	public void deleteById(Long id);
  
	public OTPDto findByToken(String token);
	
	OTPDto saveOne(Long userId);

	String createOneTimeToken();
}
