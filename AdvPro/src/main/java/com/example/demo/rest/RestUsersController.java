package com.example.demo.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AgencyDto;
import com.example.demo.dto.ProductDto;
import com.example.demo.dto.UserDto;
import com.example.demo.dto.seachdto.SearchDto;
import com.example.demo.service.UserService;

@RestController
@CrossOrigin(origins = { "http://localhost:3001", "http://localhost:3000" })
@RequestMapping("/api/user")
public class RestUsersController {

	@Autowired
	UserService userservice;
 
	@RequestMapping(value = "/searchByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<UserDto>> searchByPage(@RequestBody SearchDto searchDto) {
		Page<UserDto> page = userservice.searchByPage(searchDto); 
		return new ResponseEntity<>(page, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<UserDto> getOne(@PathVariable("id") Long id) {
		UserDto dto = userservice.getOne(id);
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<UserDto> saveOne(@RequestBody UserDto dto) {
		UserDto result = userservice.saveOrUpdate(dto, null);
		return new ResponseEntity<UserDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<UserDto> updateOne(@RequestBody UserDto dto, @PathVariable("id") Long id) {
		UserDto result = userservice.saveOrUpdate(dto, id);

		return new ResponseEntity<UserDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
	
	@RequestMapping(value = "/{id}/{price}", method = RequestMethod.PUT)
	public ResponseEntity<UserDto> napTien( @PathVariable("id") Long id,@PathVariable("price") Double price) {
		UserDto dto = new UserDto();
		dto.setId(id);
		dto.setMoney(price);
		UserDto result = userservice.saveOrUpdate(dto, id);

		return new ResponseEntity<UserDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
	

}
