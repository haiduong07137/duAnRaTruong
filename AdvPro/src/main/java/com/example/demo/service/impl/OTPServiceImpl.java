package com.example.demo.service.impl;
 
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import javax.persistence.EntityManager;

import org.apache.commons.codec.binary.Base64;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.OTP;
import com.example.demo.dto.OTPDto;
import com.example.demo.repository.OTPRepository;
import com.example.demo.service.OTPService;

@Service
public class OTPServiceImpl implements OTPService {
	@Autowired
	EntityManager manager;

	public SessionFactory getSessionFactory() {
		Session session = manager.unwrap(Session.class);
		return session.getSessionFactory();
	}
	@Autowired
	OTPRepository otpRespository;

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub

	}

	@Override
	public OTPDto findByToken(String token) {
		OTPDto dto = otpRespository.findByToken(token);
		return dto;
	}

	@Override
	public OTPDto saveOne(Long userId) {

		OTP entity = new OTP();

		entity.setUserID(userId);
		entity.setToken(createOneTimeToken());
		
		
		Date dt = new Date();
		Calendar c = Calendar.getInstance(); 
		c.setTime(dt); 
		c.add(Calendar.DATE, 1);
		dt = c.getTime();
		entity.setExpired(dt);
		entity = otpRespository.save(entity);
		if (entity != null) {
			return new OTPDto(entity);
		}
		return null;
	}

	 

	@Override
	public String createOneTimeToken() { 
		byte[] bytesEncoded = Base64.encodeBase64(UUID.randomUUID().toString().getBytes()); 
		return new String(bytesEncoded);
	}

}
