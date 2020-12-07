package com.example.demo.dto;

 

import java.util.Date;

import com.example.demo.domain.OTP;
 

public class OTPDto extends BaseObjectDto {

	private static final long serialVersionUID = 1L;
 
	private Long userId;
	private String token;
	private Date expired;
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	 
	
	
	
	public Date getExpired() {
		return expired;
	}
	public void setExpired(Date expired) {
		this.expired = expired;
	}
	public OTPDto(OTP opt) {
		super();
		this.userId = opt.getUserID();
		this.token = opt.getToken();
		this.expired = opt.getExpired();
	}
	 
 
}
