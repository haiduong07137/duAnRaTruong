package com.example.demo.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
 

@XmlRootElement
@Table(name = "tbl_product_payout")
@Entity
public class ProductPayout extends BaseObject{

	private static final long serialVersionUID = 1L;
	@ManyToOne
	@JoinColumn(name="product_id")
	private Product product; // Sản phẩm nào
	@Column(name="payout_value")
	private Double payoutValue; // Giá trị tiền
	@Column(name="is_current")
	private Boolean isCurrent;
	
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public Double getPayoutValue() {
		return payoutValue;
	}
	public void setPayoutValue(Double payoutValue) {
		this.payoutValue = payoutValue;
	}
	public Boolean getIsCurrent() {
		return isCurrent;
	}
	public void setIsCurrent(Boolean isCurrent) {
		this.isCurrent = isCurrent;
	}
	
	
}
