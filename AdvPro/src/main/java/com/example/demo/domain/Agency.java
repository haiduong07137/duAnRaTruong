package com.example.demo.domain;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
 
@XmlRootElement
@Table(name = "tbl_agency")
@Entity
public class Agency extends BaseObject {
	private static final long serialVersionUID = 1L;
 
	@Column(name="name")
	private String name;
	
	@Column(name="code")
	private String code;
	
	@Column(name="email")
	private String email;
	
	@Column(name="phone")
	private String phone;
	
	@Column(name="country")  // quốc gia
	private String country;
	
	@Column(name="skype_id") 
	private String skypeId;
	
	@Column(name="telegram")
	private String telegram;
	
	@Column(name="description") // mô tả
	private String description;
	
	@Column(name="website")
	private String website;
	
	@Column(name="is_network") //
	private Boolean isNetwork;
	
	@OneToMany(mappedBy = "agency", cascade = CascadeType.ALL, orphanRemoval = true)
	@NotFound(action = NotFoundAction.IGNORE)
	private Set<AgencyUser> agencyUser;
	
//	@OneToOne
//	@JoinColumn(name = "user_manage_id") 
//	@NotFound(action = NotFoundAction.IGNORE)
//	private User userManage; //NEW, APPROVED
	
	@Column(name="social_contact") 
	private String socialContact; //NEW, APPROVED
	
	@Column(name="status")
	private String status; //NEW, APPROVED
	
	@Column(name="traffic_Source")  
	private String traffic_Source; //NEW, APPROVED
	

	@Column(name="image_path")
	private String imagePath; //NEW, APPROVED
	
	@Column(name="company")
	private String comPany; //NEW, APPROVED
	
	@Column(name="agc_id")
	private String agcId; //NEW, APPROVED
	
	@OneToMany(mappedBy = "agency", cascade = CascadeType.ALL, orphanRemoval = true)
	@NotFound(action = NotFoundAction.IGNORE)
	private Set<AgencyCampaign> agencyCampaign;
	
	
	
	
	public String getAgcId() {
		return agcId;
	}
	public void setAgcId(String agcId) {
		this.agcId = agcId;
	}
	public String getComPany() {
		return comPany;
	}
	public void setComPany(String comPany) {
		this.comPany = comPany;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	public String getTraffic_Source() {
		return traffic_Source;
	}
	public void setTraffic_Source(String traffic_Source) {
		this.traffic_Source = traffic_Source;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getSkypeId() {
		return skypeId;
	}
	public void setSkypeId(String skypeId) {
		this.skypeId = skypeId;
	}
	public String getTelegram() {
		return telegram;
	}
	public void setTelegram(String telegram) {
		this.telegram = telegram;
	}
	public Set<AgencyUser> getAgencyUser() {
		return agencyUser;
	}
	public void setAgencyUser(Set<AgencyUser> agencyUser) {
		this.agencyUser = agencyUser;
	}
	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
	}
	public Boolean getIsNetwork() {
		return isNetwork;
	}
	public void setIsNetwork(Boolean isNetwork) {
		this.isNetwork = isNetwork;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getSocialContact() {
		return socialContact;
	}
	public void setSocialContact(String socialContact) {
		this.socialContact = socialContact;
	}
	public Set<AgencyCampaign> getAgencyCampaign() {
		return agencyCampaign;
	}
	public void setAgencyCampaign(Set<AgencyCampaign> agencyCampaign) {
		this.agencyCampaign = agencyCampaign;
	}
 
	
	
}
