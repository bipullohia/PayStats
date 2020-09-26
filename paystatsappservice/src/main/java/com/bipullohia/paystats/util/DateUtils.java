package com.bipullohia.paystats.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {

	public static Date getDateFromString(String dateString, String dateFormat) {
		System.out.println(dateString);
		System.out.println(dateFormat);
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
}
