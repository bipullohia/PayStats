package com.bipullohia.paystats.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {

	public static Date getDateFromString(String dateString, String dateFormat) {
		Date date = null;
		if(!StringUtils.isNullOrEmpty(dateString)){
			SimpleDateFormat formatter = new SimpleDateFormat(dateFormat);
			try {
				date = formatter.parse(dateString);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return date;
	}
	
	public static String getStringFromDate(Date date, String dateFormat) {
		String dateStr = "";
		if(date!=null) {
			DateFormat formatter = new SimpleDateFormat(dateFormat);
			dateStr = formatter.format(date);
		}
		return dateStr;
	}
	
}
