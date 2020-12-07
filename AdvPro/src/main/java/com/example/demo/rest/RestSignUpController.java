package com.example.demo.rest;
 

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.core.env.Environment;
import com.example.demo.domain.User;
import com.example.demo.dto.AgencyDto;
import com.example.demo.dto.OTPDto;
import com.example.demo.dto.UserDto;
import com.example.demo.service.AgencyService;
import com.example.demo.service.OTPService;
import com.example.demo.service.SignUpService;
import com.example.demo.service.UserService;
  

@RestController
@CrossOrigin(origins = {"http://localhost:3001","http://localhost:3000" })
@RequestMapping(path = "/public")
public class RestSignUpController {
	
	@Autowired
	AgencyService agencyService;

	@Autowired
	SignUpService signUpService;
	
	@Autowired
	UserService userService;
	

	@Autowired
	OTPService otpService;

	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public ResponseEntity<UserDto> createUser(@RequestBody AgencyDto dto) {
		UserDto userDto = this.signUpService.createUser(dto);
		ResponseEntity<UserDto> resUser = new ResponseEntity<UserDto>(userDto,
				(userDto != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
		AgencyDto agencyDto = this.agencyService.saveOrUpdate(dto, null, resUser.getBody().getId());
		ResponseEntity<AgencyDto> res = new ResponseEntity<AgencyDto>(agencyDto,
				(agencyDto != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
		OTPDto otpDto=	otpService.saveOne(resUser.getBody().getId()); 
    	signUpService.sendMailRegister(res.getBody().getEmail(),otpDto.getToken(),dto.getHostSite());
//		signUpService.addProductToOfferForNewAgency(res.getBody().getId());
		
		return resUser;
	}

	@RequestMapping(value = "/checkEmail", method = RequestMethod.POST)
	public Boolean checkEmail(@RequestBody AgencyDto dto) {
		boolean result = true;
		if (dto.getEmail() != null && StringUtils.hasText(dto.getEmail())) {
			result = signUpService.checkEmail(dto);
		}
		return result;
	}

	@RequestMapping(value = "/checkUsername", method = RequestMethod.POST)
	public Boolean checkUsername(@RequestBody AgencyDto dto) {
		boolean result = true;
		if (dto.getUsername() != null && StringUtils.hasText(dto.getUsername())) {
			result = signUpService.checkUsername(dto);
		}
		return result; 
 	}
	
	@RequestMapping(value = "/confirmRegistration", method = RequestMethod.GET)
	public ResponseEntity<Integer> confirmRegistration(@RequestParam("token") String token) {
		int result = signUpService.confirmRegistration(token);
		ResponseEntity<Integer> res = new ResponseEntity<Integer>(result, HttpStatus.OK);
		
		return res;
	}
	
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<UserDto> login(@RequestBody UserDto dto  ) {
		UserDto result = userService.checkLogin(dto);
		ResponseEntity<UserDto> res = new ResponseEntity<UserDto>(result, HttpStatus.OK); 
		return res;
	}
	


}
