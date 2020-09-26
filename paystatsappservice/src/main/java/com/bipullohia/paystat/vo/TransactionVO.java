package com.bipullohia.paystat.vo;

import com.bipullohia.paystat.helper.Enums.TransactionCategory;
import com.bipullohia.paystat.helper.Enums.TransactionType;

public class TransactionVO {

	private String date;
	private String desc;
	private TransactionCategory category;
	private int amount;
	private TransactionType type;
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public TransactionCategory getCategory() {
		return category;
	}
	public void setCategory(TransactionCategory category) {
		this.category = category;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public TransactionType getType() {
		return type;
	}
	public void setType(TransactionType type) {
		this.type = type;
	}
	
	@Override
	public String toString() {
		return "TransactionVO [date=" + date + ", desc=" + desc + ", category=" + category + ", amount=" + amount
				+ ", type=" + type + "]";
	}
	
}
