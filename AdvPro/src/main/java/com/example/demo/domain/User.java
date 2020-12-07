package com.example.demo.domain;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

@XmlRootElement
@Table(name = "tbl_user")
@Entity
public class User extends BaseObject {
	private static final long serialVersionUID = 1L;

	@Column(name = "username")
	private String username;

	@Column(name = "password")
	private String password;

	@Column(name = "email")
	private String email;
	@Column(name = "active")
	private Boolean active;

	@Column(name = "money")
	private Double money;

	
	@OneToOne
	@JoinColumn(name = "role")
	@NotFound(action = NotFoundAction.IGNORE)
	private Role role; // NEW, APPROVED

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@NotFound(action = NotFoundAction.IGNORE)
	private Set<AgencyUser> agencyUser;
	
	

	public Double getMoney() {
		return money;
	}

	public void setMoney(Double money) {
		this.money = money;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<AgencyUser> getAgencyUser() {
		return agencyUser;
	}

	public void setAgencyUser(Set<AgencyUser> agencyUser) {
		this.agencyUser = agencyUser;
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

}
