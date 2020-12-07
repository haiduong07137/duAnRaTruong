package com.example.demo.domain;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

 
@XmlRootElement
@Table(name = "tbl_agency_campaign")
@Entity
public class AgencyCampaign extends BaseObject {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name="product_id")
	private Product product;
	
	@ManyToOne
	@JoinColumn(name="agency_id")
	private Agency agency;

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Agency getAgency() {
		return agency;
	}
 
	public void setAgency(Agency agency) {
		this.agency = agency;
	}
 

	 
}
