package com.example.demo.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;

import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
 
@XmlRootElement
@Table(name = "tbl_agency_user")
@Entity
public class AgencyUser extends BaseObject {
	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "agency_id")
	@NotFound(action = NotFoundAction.IGNORE)
	private Agency agency;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@NotFound(action = NotFoundAction.IGNORE)
	private User user;
	
	
	@Column(name = "is_admin")
	private Boolean isAdmin;

	public Agency getAgency() {
		return agency;
	}

	public void setAgency(Agency agency) {
		this.agency = agency;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Boolean getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(Boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

}
