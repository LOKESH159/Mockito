package com.full.service;

import java.net.HttpURLConnection;

import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import com.full.dto.CustomerList;

import com.full.dao.SetMoreDao;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

@Service
public class SetMoreHelper {
	String accessToken;
	HttpURLConnection con;
	Logger logger=Logger.getLogger(SetMoreHelper.class.getName());


public String getCustomerDetails(HttpServletRequest req){
	JsonObject jsonObject=new JsonObject();
	try{
Entity  userDetails=SetMoreDao.getCustomerDetails(req.getParameter("userName"));

	CustomerList customerList=new CustomerList();
	customerList.setUserName(req.getParameter("userName"));
	customerList.setGender((String)userDetails.getProperty("Gender"));
	customerList.setAge((int)userDetails.getProperty("age"));
	customerList.setAgeGroup((String)userDetails.getProperty("ageGroup"));
	Gson gson=new Gson();
	jsonObject.addProperty("response", true);
	jsonObject.addProperty("data", gson.toJson(customerList));
	}
	catch(EntityNotFoundException e){
		
		jsonObject.addProperty("response", false);
		jsonObject.addProperty("data", "user not found");
		return jsonObject.toString(); 
	}
	catch(Exception e){
		jsonObject.addProperty("response", false);
		jsonObject.addProperty("data", "some internal exception occured");
		return jsonObject.toString(); 
	}
	return jsonObject.toString();
}
public String createCustomer(HttpServletRequest req){
	JsonObject jsonObject=new JsonObject();
	System.out.println("Iam in createCustomer Helper class");

	try{
		int age = Integer.parseInt(req.getParameter("age"));
		CustomerList customerList =new CustomerList();
		customerList.setUserName(req.getParameter("userName"));
		customerList.setGender(req.getParameter("gnd"));
		customerList.setAge(age);
		if(age<=18)
			customerList.setAgeGroup("teen age");
		
		else if (age>18 && age<=30)
			customerList.setAgeGroup("young age");
		else if (age>30 && age <=55)
			customerList.setAgeGroup("middle age");
		
		else
			customerList.setAgeGroup("old age");
	
	SetMoreDao.createCustomer(customerList);
	jsonObject.addProperty("response",true);
	jsonObject.addProperty("data","Customer Created Successfully");
	}
	catch(Exception e){
		System.out.println("I got exception");
		jsonObject.addProperty("response",false);
		jsonObject.addProperty("data","some Exception Occurred");
	}
	return jsonObject.toString();
}




}
