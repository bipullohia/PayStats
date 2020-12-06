package com.bipullohia.paystats.util;

public class StringUtils {

	public static boolean isNullOrEmpty(String str) {
		if(str != null && str.isEmpty())
			return true;
		else return false;
	}
}
