package com.example.demo.dto;

import com.example.demo.domain.AgencyUser;

public class AgencyUserDto extends BaseObjectDto {
	private AgencyDto agencyDto;
	private UserDto userDto;
	private Boolean isAdmin;
	private String role;
	private String createdBy;
	private String email;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public void setIsAdmin(Boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public AgencyDto getAgencyDto() {
		return agencyDto;
	}

	public void setAgencyDto(AgencyDto agencyDto) {
		this.agencyDto = agencyDto;
	}

	public UserDto getUserDto() {
		return userDto;
	}

	public void setUserDto(UserDto userDto) {
		this.userDto = userDto;
	}

	public Boolean getIsAdmin() {
		return isAdmin;
	}

	public AgencyUserDto() {
	}

	public AgencyUserDto(AgencyUser entity) {
		this.agencyDto = new AgencyDto(entity.getAgency(),true);

		if(entity.getUser() != null) {
			this.userDto = new UserDto(entity.getUser());
		}
	}
	
	public AgencyUserDto(AgencyUser entity,Boolean check) {
		this.agencyDto = new AgencyDto(entity.getAgency(),true); 
		this.userDto = new UserDto(entity.getUser());
	}

}
