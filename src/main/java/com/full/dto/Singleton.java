package com.full.dto;

import com.full.service.SetMoreHelper;

public class Singleton {
private static SetMoreHelper setMoreHelper;
private Singleton() {
	
}
public static SetMoreHelper createObject() {
	if(setMoreHelper==null) {
		return new SetMoreHelper();
	}
	return setMoreHelper;
}
}
