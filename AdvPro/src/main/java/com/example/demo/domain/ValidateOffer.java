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
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
  
@XmlRootElement
@Table(name = "tbl_validate_offer")
@Entity
public class ValidateOffer extends BaseObject{
	private static final long serialVersionUID = 1L;
	 
	@ManyToOne
	@NotFound(action = NotFoundAction.IGNORE)
	@JoinColumn(name="offer_id")
	private Offer offer;
	
	@Column(name="key_lock")
	private String keyLock;
	
	@Column(name="value")
	private String value;

	public Offer getOffer() {
		return offer;
	}

	public void setOffer(Offer offer) {
		this.offer = offer;
	}

	public String getKeyLock() {
		return keyLock;
	}

	public void setKeyLock(String keyLock) {
		this.keyLock = keyLock;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
}
