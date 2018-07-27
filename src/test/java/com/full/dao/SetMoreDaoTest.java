package com.full.dao;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.full.dto.CustomerList;
import com.full.dto.LocalUnitTestServer;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.repackaged.com.google.api.client.util.store.DataStoreFactory;
@RunWith(PowerMockRunner.class)
@PrepareForTest({DatastoreService.class,Entity.class})
public class SetMoreDaoTest {
	
	@Before
	public void setUp(){
		LocalUnitTestServer.SetUpConfiguration();
	}
	@After
	public void tearDown(){
		LocalUnitTestServer.setDownConfiguration();
	}
	@Test
	public void createCustomerPositive(){
		try {
			
			CustomerList customerList = PowerMockito.mock(CustomerList.class);
			/*customerList.setAge(23);
			customerList.setAgeGroup("Young Age");
			customerList.setGender("Male");
			customerList.setUserName("Lokesh Kumar");*/
			PowerMockito.when(customerList.getUserName()).thenReturn("Lokesh Kumar");
			PowerMockito.when(customerList.getAge()).thenReturn(23);
			PowerMockito.when(customerList.getGender()).thenReturn("Male");
			PowerMockito.when(customerList.getAgeGroup()).thenReturn("Young Age");
/*			
			Entity entity = PowerMockito.mock(Entity.class);
			PowerMockito.whenNew(Entity.class).withArguments("Customer", customerList.getUserName()).thenReturn(entity);
			PowerMockito.doNothing().when(entity).setProperty("Age Group", customerList.getAgeGroup());
			PowerMockito.doNothing().when(entity).setProperty("age", customerList.getAge());
			PowerMockito.doNothing().when(entity).setProperty("Gender", customerList.getGender());*/
			
			//PowerMockito.when(datastore.put(entity));
			SetMoreDao.createCustomer(customerList);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@Test
public void getCustomerDetailsPositive(){
	try {
		 DatastoreService datastoreService = DatastoreServiceFactory.getDatastoreService();
	     Entity entity =new Entity("Customer","Lokesh Kumar");
	     datastoreService.put(entity);
	     assertEquals(entity,SetMoreDao.getCustomerDetails("Lokesh Kumar"));
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
}
}
