package com.example.demo.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
 
@XmlRootElement
@Table(name = "tbl_campaign")
@Entity
public class Campaign extends BaseObject {
	private static final long serialVersionUID = 1L;
 
	@Column(name="name")
	private String name;
	 
	@Column(name="price")
	private Double price;
	
	@Column(name="from_date")
	private Date fromDate;
	
	@Column(name="to_date")
	private Date toDate;
	
	
	@OneToOne
	@JoinColumn(name = "product_id") 
	@NotFound(action = NotFoundAction.IGNORE)
	private Product product; //NEW, APPROVED
	
	@OneToMany(mappedBy = "agency", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	private Set<AgencyCampaign> agencyCampaign;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Set<AgencyCampaign> getAgencyCampaign() {
		return agencyCampaign;
	}

	public void setAgencyCampaign(Set<AgencyCampaign> agencyCampaign) {
		this.agencyCampaign = agencyCampaign;
	}

	 
	 
	
	
}
