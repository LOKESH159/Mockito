package com.full.service;

import static org.junit.Assert.assertEquals;

import javax.servlet.http.HttpServletRequest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.full.dao.SetMoreDao;
import com.full.dto.CustomerList;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.repackaged.org.json.JSONException;
import com.google.appengine.repackaged.org.json.JSONObject;
@RunWith(PowerMockRunner.class)
@PrepareForTest({SetMoreDao.class, Entity.class})
public class SetMoreServiceTest{
	SetMoreHelper setMoreHelper;
	
	
	@Before
	public void beforeTest(){
		setMoreHelper = new SetMoreHelper();
	}
	
	@Test
	public void createCustomerPositive() throws Exception{

		HttpServletRequest req = 	PowerMockito.mock(HttpServletRequest.class);
		PowerMockito.when(req.getParameter("userName")).thenReturn("Lokesh Kumar");
		PowerMockito.when(req.getParameter("gnd")).thenReturn("Male");
		PowerMockito.when(req.getParameter("age")).thenReturn("23");
	
		CustomerList customerList = PowerMockito.mock(CustomerList.class);
		customerList.setAge(23);
		customerList.setUserName("Lokesh Kumar");
		customerList.setGender("Male");
	
		PowerMockito.mockStatic(SetMoreDao.class);
		SetMoreDao.createCustomer(customerList);
	
		try 
		{
		
			assertEquals(true,new JSONObject(setMoreHelper.createCustomer(req)).get("response"));
			
		} 
		catch (JSONException e) 
		{
			
			e.printStackTrace();
			
		}
		
	}
	@Test
	public void createCustomerPositive1() throws Exception{

		HttpServletRequest req = 	PowerMockito.mock(HttpServletRequest.class);
		PowerMockito.when(req.getParameter("userName")).thenReturn("Lokesh Kumar");
		PowerMockito.when(req.getParameter("gnd")).thenReturn("Male");
		PowerMockito.when(req.getParameter("age")).thenReturn("15");
	
		CustomerList customerList = PowerMockito.mock(CustomerList.class);
		customerList.setAge(23);
		customerList.setUserName("Lokesh Kumar");
		customerList.setGender("Male");
	
		PowerMockito.mockStatic(SetMoreDao.class);
		SetMoreDao.createCustomer(customerList);
	
		try 
		{
		
			assertEquals(true,new JSONObject(setMoreHelper.createCustomer(req)).get("response"));
			
		} 
		catch (JSONException e) 
		{
			
			e.printStackTrace();
			
		}
		
	}
	@Test
	public void createCustomerPositive2() throws Exception{

		HttpServletRequest req = 	PowerMockito.mock(HttpServletRequest.class);
		PowerMockito.when(req.getParameter("userName")).thenReturn("Lokesh Kumar");
		PowerMockito.when(req.getParameter("gnd")).thenReturn("Male");
		PowerMockito.when(req.getParameter("age")).thenReturn("40");
	
		CustomerList customerList = PowerMockito.mock(CustomerList.class);
		customerList.setAge(23);
		customerList.setUserName("Lokesh Kumar");
		customerList.setGender("Male");
	
		PowerMockito.mockStatic(SetMoreDao.class);
		SetMoreDao.createCustomer(customerList);
	
		try 
		{
		
			assertEquals(true,new JSONObject(setMoreHelper.createCustomer(req)).get("response"));
			
		} 
		catch (JSONException e) 
		{
			
			e.printStackTrace();
			
		}
		
	}
	@Test
	public void createCustomerPositive3() throws Exception{

		HttpServletRequest req = 	PowerMockito.mock(HttpServletRequest.class);
		PowerMockito.when(req.getParameter("userName")).thenReturn("Lokesh Kumar");
		PowerMockito.when(req.getParameter("gnd")).thenReturn("Male");
		PowerMockito.when(req.getParameter("age")).thenReturn("75");
	
		CustomerList customerList = PowerMockito.mock(CustomerList.class);
		customerList.setAge(23);
		customerList.setUserName("Lokesh Kumar");
		customerList.setGender("Male");
	
		PowerMockito.mockStatic(SetMoreDao.class);
		SetMoreDao.createCustomer(customerList);
	
		try 
		{
		
			assertEquals(true,new JSONObject(setMoreHelper.createCustomer(req)).get("response"));
			
		} 
		catch (JSONException e) 
		{
			
			e.printStackTrace();
			
		}
		
	}
	@Test
	public void createCustomerNegative() throws Exception{

		HttpServletRequest req = 	PowerMockito.mock(HttpServletRequest.class);
		PowerMockito.when(req.getParameter("userName")).thenReturn("Lokesh Kumar");
		PowerMockito.when(req.getParameter("gnd")).thenReturn("Male");
		PowerMockito.when(req.getParameter("age")).thenReturn(null);
	
		CustomerList customerList = PowerMockito.mock(CustomerList.class);
		customerList.setAge(23);
		customerList.setUserName("Lokesh Kumar");
		customerList.setGender("Male");
	
		PowerMockito.mockStatic(SetMoreDao.class);
		SetMoreDao.createCustomer(customerList);
	
		try 
		{
		
			assertEquals( false , new JSONObject(setMoreHelper.createCustomer(req)).get("response"));
			
		} 
		catch (JSONException e) 
		{
			
			e.printStackTrace();
			
		}
		
	}
	@Test
	public void getCustomerDetailsPositive(){
		HttpServletRequest req = 	PowerMockito.mock(HttpServletRequest.class);
		PowerMockito.when(req.getParameter("userName")).thenReturn("Lokesh Kumar");
		
		PowerMockito.mockStatic(SetMoreDao.class);
		
		Entity customerDetails = PowerMockito.mock(Entity.class);
	/*	customerDetails.setProperty("Gender", "Male");
		customerDetails.setProperty("age", 23);
		customerDetails.setProperty("ageGroup", "Young age");*/
		//customerDetails.setProperty(propertyName, value);
		//CustomerList customerList = PowerMockito.mock(CustomerList.class);
		
	try {
		//PowerMockito.whenNew(CustomerList.class).withNoArguments().thenReturn(customerList);
	
		PowerMockito.when(SetMoreDao.getCustomerDetails(req.getParameter("userName"))).thenReturn(customerDetails);
		
		PowerMockito.when((String)customerDetails.getProperty("Gender")).thenReturn("Male");
		PowerMockito.when((Integer)customerDetails.getProperty("age")).thenReturn(23);
		PowerMockito.when((String)customerDetails.getProperty("ageGroup")).thenReturn("Young age");
		
		assertEquals( true , new JSONObject(setMoreHelper.getCustomerDetails(req)).get("response"));
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Test
	public void getCustomerDetailsNegative(){
		HttpServletRequest req = 	PowerMockito.mock(HttpServletRequest.class);
		PowerMockito.when(req.getParameter("userName")).thenReturn(null);
		
		PowerMockito.mockStatic(SetMoreDao.class);
		
		//Entity customerDetails = PowerMockito.mock(Entity.class);
	/*	customerDetails.setProperty("Gender", "Male");
		customerDetails.setProperty("age", 23);
		customerDetails.setProperty("ageGroup", "Young age");*/
		//customerDetails.setProperty(propertyName, value);
		//CustomerList customerList = PowerMockito.mock(CustomerList.class);
		
	try {
		//PowerMockito.whenNew(CustomerList.class).withNoArguments().thenReturn(customerList);
	
		PowerMockito.when(SetMoreDao.getCustomerDetails(req.getParameter("userName"))).thenThrow(NullPointerException.class);
		

		
		assertEquals( false , new JSONObject(setMoreHelper.getCustomerDetails(req)).get("response"));
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Test
	public void getCustomerDetailsNegative2(){
		HttpServletRequest req = 	PowerMockito.mock(HttpServletRequest.class);
		PowerMockito.when(req.getParameter("userName")).thenReturn("Ravi");
		
		PowerMockito.mockStatic(SetMoreDao.class);
		
		//Entity customerDetails = PowerMockito.mock(Entity.class);
	/*	customerDetails.setProperty("Gender", "Male");
		customerDetails.setProperty("age", 23);
		customerDetails.setProperty("ageGroup", "Young age");*/
		//customerDetails.setProperty(propertyName, value);
		//CustomerList customerList = PowerMockito.mock(CustomerList.class);
		
	try {
		//PowerMockito.whenNew(CustomerList.class).withNoArguments().thenReturn(customerList);
	
		PowerMockito.when(SetMoreDao.getCustomerDetails(req.getParameter("userName"))).thenThrow(EntityNotFoundException.class);
		

		
		assertEquals( false , new JSONObject(setMoreHelper.getCustomerDetails(req)).get("response"));
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	

}
