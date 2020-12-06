package com.bipullohia.paystats.entity;

public class PaymentFilter {

	private String filterType;
	private String filterName;
	private String[] filterValues;
	
	public String getFilterType() {
		return filterType;
	}
	public void setFilterType(String filterType) {
		this.filterType = filterType;
	}
	
	public String getFilterName() {
		return filterName;
	}
	public void setFilterName(String filterName) {
		this.filterName = filterName;
	}
	
	public String[] getFilterValues() {
		return filterValues;
	}
	public void setFilterValues(String[] filterValues) {
		this.filterValues = filterValues;
	}
}
