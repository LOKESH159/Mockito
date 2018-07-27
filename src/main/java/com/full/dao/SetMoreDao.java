package com.full.dao;


import org.springframework.stereotype.Repository;

import com.full.dto.CustomerList;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;


@Repository
public class SetMoreDao {
	static DatastoreService datastore=DatastoreServiceFactory.getDatastoreService();
	public static Entity getCustomerDetails(String userName) throws Exception{
	
		Key key = KeyFactory.createKey("Customer", userName);
		System.out.println(key);
	    return datastore.get(key);
}
public static  void createCustomer(CustomerList customerDetails){
	System.out.println("Iam in Create Customer Helper");
	System.out.println(customerDetails.getUserName());
	Entity entity=new Entity("Customer",customerDetails.getUserName());
	entity.setProperty("Age Group",customerDetails.getAgeGroup());
	entity.setProperty("Gender", customerDetails.getGender());
	entity.setProperty("age", customerDetails.getAge());
	
	datastore.put(entity);
}



}
