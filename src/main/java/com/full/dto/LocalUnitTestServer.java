package com.full.dto;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;

public class LocalUnitTestServer {
	static LocalServiceTestHelper localServiceTestHelper = new LocalServiceTestHelper(
			new LocalDatastoreServiceTestConfig());
public  static void SetUpConfiguration(){

	   localServiceTestHelper.setUp();
			
}
public static void setDownConfiguration() {
	// TODO Auto-generated method stub
	localServiceTestHelper.tearDown();
}
}
