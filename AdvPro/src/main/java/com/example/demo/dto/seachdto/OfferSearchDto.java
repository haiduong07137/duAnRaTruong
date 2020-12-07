package com.example.demo.dto.seachdto;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public class OfferSearchDto extends SearchDto {
	private Set<String> categories;
	private Set<String> locations;
	private Set<String> conversionTypes;
	private List<Double> payoutRange;

	private Long agencyId;
	private String currency;
	private boolean  times;
	

	
	public Set<String> getConversionTypes() {
		return conversionTypes;
	}
	public void setConversionTypes(Set<String> conversionTypes) {
		this.conversionTypes = conversionTypes;
	}
	public boolean isTimes() {
		return times;
	}
	public void setTimes(boolean times) {
		this.times = times;
	}
	public Long getAgencyId() {
		return agencyId;
	}
	public void setAgencyId(Long agencyId) {
		this.agencyId = agencyId;
	}
	public Set<String> getCategories() {
		return categories;
	}
	public void setCategories(Set<String> categories) {
		this.categories = categories;
	}
	public Set<String> getLocations() {
		return locations;
	}
	public void setLocations(Set<String> locations) {
		this.locations = locations;
	}
	public List<Double> getPayoutRange() {
		return payoutRange;
	}
	public void setPayoutRange(List<Double> payoutRange) {
		this.payoutRange = payoutRange;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
}
