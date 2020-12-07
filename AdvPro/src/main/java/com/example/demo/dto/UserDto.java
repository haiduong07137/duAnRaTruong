package com.example.demo.dto;

import java.util.Set;

import javax.persistence.Column;

import com.example.demo.domain.AgencyUser;
import com.example.demo.domain.Role;
import com.example.demo.domain.User;

public class UserDto extends BaseObjectDto {
	private String username;

	private String password;

	private String email;
	private Boolean active;
	private Set<AgencyUserDto> agencyUsers;
	private Long agencyId;
	private RoleDto role;
	private Double money;

	public Double getMoney() {
		return money;
	}

	public void setMoney(Double money) {
		this.money = money;
	}

	public RoleDto getRole() {
		return role;
	}

	public void setRole(RoleDto role) {
		this.role = role;
	}
	


	public Long getAgencyId() {
		return agencyId;
	}

	public void setAgencyId(Long agencyId) {
		this.agencyId = agencyId;
	}

	public Set<AgencyUserDto> getAgencyUsers() {
		return agencyUsers;
	}

	public void setAgencyUsers(Set<AgencyUserDto> agencyUsers) {
		this.agencyUsers = agencyUsers;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public UserDto() {
		// TODO Auto-generated constructor stub
	}

	public UserDto(User entity) {
		this.money=entity.getMoney();
		this.id = entity.getId();
		this.username = entity.getUsername();
		this.password = entity.getPassword();
		this.email = entity.getEmail();
		this.active = entity.getActive();
		this.agencyUsers = null;
		if (entity.getAgencyUser() != null && entity.getAgencyUser().size() > 0) {
			for (AgencyUser productPayout : entity.getAgencyUser()) {
				this.agencyId = productPayout.getAgency().getId();
			}
		}
		if (entity.getRole() != null) {
			this.role = new RoleDto(entity.getRole());
		}
	}

}
