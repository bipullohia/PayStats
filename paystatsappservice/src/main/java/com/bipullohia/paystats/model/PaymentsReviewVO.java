package com.bipullohia.paystats.model;

import java.util.HashMap;

public class PaymentsReviewVO {
	
	private int totalIncome;
	private int totalExpense;
	private HashMap<String, Integer> categoryDetails;
	
	public int getTotalIncome() {
		return totalIncome;
	}
	public void setTotalIncome(int totalIncome) {
		this.totalIncome = totalIncome;
	}
	public int getTotalExpense() {
		return totalExpense;
	}
	public void setTotalExpense(int totalExpense) {
		this.totalExpense = totalExpense;
	}
	public HashMap<String, Integer> getCategoryDetails() {
		return categoryDetails;
	}
	public void setCategoryDetails(HashMap<String, Integer> catDetails) {
		this.categoryDetails = catDetails;
	}
	
	@Override
	public String toString() {
		return "PaymentsReviewVO [totalIncome=" + totalIncome + ", totalExpense=" + totalExpense + ", catDetails="
				+ categoryDetails + "]";
	}	
	
	
}
