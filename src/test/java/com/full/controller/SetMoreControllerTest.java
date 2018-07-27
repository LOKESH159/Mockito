package com.full.controller;

import static org.junit.Assert.*;

import javax.servlet.http.HttpServletRequest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.full.dto.Singleton;
import com.full.service.SetMoreHelper;
@RunWith(PowerMockRunner.class)
@PrepareForTest({Singleton.class})
public class SetMoreControllerTest {
	SetMoreHelper setMoreHelper;
	SetMoreController setMoreController;
	
@Before
public void beforeTest(){
	setMoreHelper = PowerMockito.mock(SetMoreHelper.class);
	PowerMockito.mockStatic(Singleton.class);
	PowerMockito.when(Singleton.createObject()).thenReturn(setMoreHelper);
	setMoreController =new SetMoreController();
	setMoreController.setSetMoreHelper(setMoreHelper);
	

}
@Test
public void createCustomer(){
	HttpServletRequest req =PowerMockito.mock(HttpServletRequest.class);
	
	PowerMockito.when(setMoreHelper.createCustomer(req)).thenReturn("successful");

	assertEquals("successful",setMoreController.createCustomer(req));
	Mockito.verify(setMoreHelper).createCustomer(req);
}
@Test
public void getCustomerDetails(){
	HttpServletRequest req =PowerMockito.mock(HttpServletRequest.class);
	PowerMockito.when(setMoreHelper.getCustomerDetails(req)).thenReturn("successful");

	assertEquals("successful",setMoreController.getCustomersList(req));
}
}
