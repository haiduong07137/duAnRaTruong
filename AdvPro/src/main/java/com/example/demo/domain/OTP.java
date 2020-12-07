package com.example.demo.domain;
 
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity; 
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
  
@XmlRootElement
@Table(name = "tbl_OPT")
@Entity
public class OTP extends BaseObject {
	private static final long serialVersionUID = 1L;

	@Column(name="userID")
	private Long userID;
	
	@Column(name="token")
	private String token;
	
	@Column(name="expired")
	private Date expired;

	public Long getUserID() {
		return userID;
	}

	public void setUserID(Long userID) {
		this.userID = userID;
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

	 
	
	 
}
