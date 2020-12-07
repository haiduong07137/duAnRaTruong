package com.example.demo.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.example.demo.domain.Agency;
import com.example.demo.domain.AgencyUser;

public class AgencyDto extends BaseObjectDto {

	private static final long serialVersionUID = 1L;
	private String name;
	private String code;
	private String email;
	private String phone;
	private String country;
	private String skypeId;
	private String telegram;
	private String username;
	private String password;
	private String description;
	private String website;
	private Boolean isNetwork;
	private String socialContact;
	private String trafficSource;
	private Set<AgencyUserDto> agencyUsers;
	private String hostSite;
	private String imagePath;
	private String comPany;
	private Date modifyDate;
	private String agcId;

	public String getAgcId() {
		return agcId;
	}

	public void setAgcId(String agcId) {
		this.agcId = agcId;
	}

	private Boolean isCheck = false;

	public Boolean getIsCheck() {
		return isCheck;
	}

	public void setIsCheck(Boolean isCheck) {
		this.isCheck = isCheck;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getHostSite() {
		return hostSite;
	}

	public void setHostSite(String hostSite) {
		this.hostSite = hostSite;
	}

	public String getTrafficSource() {
		return trafficSource;
	}

	public void setTrafficSource(String trafficSource) {
		this.trafficSource = trafficSource;
	}

	public String getName() {
		return name;
	}

	public String getSocialContact() {
		return socialContact;
	}

	public void setSocialContact(String socialContact) {
		this.socialContact = socialContact;
	}

	public Boolean getIsNetwork() {
		return isNetwork;
	}

	public void setIsNetwork(Boolean isNetwork) {
		this.isNetwork = isNetwork;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
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

	public Set<AgencyUserDto> getAgencyUsers() {
		return agencyUsers;
	}

	public void setAgencyUsers(Set<AgencyUserDto> agencyUsers) {
		this.agencyUsers = agencyUsers;
	}

	public String getComPany() {
		return comPany;
	}

	public void setComPany(String comPany) {
		this.comPany = comPany;
	}

	public AgencyDto() {

	}

	public Date getModifyDate() {
		return modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public AgencyDto(Agency agency) {
		this.trafficSource = agency.getTraffic_Source();
		this.id = agency.getId();
		this.name = agency.getName();
		this.code = agency.getCode();
		this.email = agency.getEmail();
		this.phone = agency.getPhone();
		this.country = agency.getCountry();
		this.skypeId = agency.getSkypeId();
		this.telegram = agency.getTelegram();
		this.imagePath = agency.getImagePath();
		this.website = agency.getWebsite();
		this.isNetwork = agency.getIsNetwork();
		this.description = agency.getDescription();
		this.socialContact = agency.getSocialContact();
		this.comPany = agency.getComPany();
		this.agcId = agency.getAgcId();
		this.agencyUsers = new HashSet<AgencyUserDto>();
		if (agency.getAgencyUser() != null && agency.getAgencyUser().size() > 0) { 
			for (AgencyUser productPayout : agency.getAgencyUser()) { 
				AgencyUserDto dto = new AgencyUserDto(productPayout);
				this.agencyUsers.add(dto); 
			}
		}
	}

	public AgencyDto(Agency agency, boolean simple) {
		this.id = agency.getId();
		this.trafficSource = agency.getTraffic_Source();
		this.name = agency.getName();
		this.code = agency.getCode();
		this.email = agency.getEmail();
		this.imagePath = agency.getImagePath();
		this.phone = agency.getPhone();
		this.country = agency.getCountry();
		this.skypeId = agency.getSkypeId();
		this.telegram = agency.getTelegram();
		this.website = agency.getWebsite();
		this.isNetwork = agency.getIsNetwork();
		this.description = agency.getDescription();
		this.socialContact = agency.getSocialContact();
		this.comPany = agency.getComPany();
		this.agcId = agency.getAgcId();
	}
}
