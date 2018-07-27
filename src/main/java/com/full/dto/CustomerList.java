package com.full.dto;

public class CustomerList {
private String userName;
private String gender;
private int age;
private String ageGroup;
public String getAgeGroup() {
	return ageGroup;
}
public void setAgeGroup(String ageGroup) {
	//System.out.println("Iam setting age group");
	this.ageGroup = ageGroup;
}
public String getUserName() {
	return userName;
}
public void setUserName(String userName) {
	System.out.println("Iam setting userName");
	this.userName = userName;
}
public String getGender() {
	return gender;
}
public void setGender(String gender) {
	System.out.println("Iam setting gender");
	this.gender = gender;
}
public int getAge() {
	return age;
}
public void setAge(int age) {
	//System.out.println("Iam setting age ");
	this.age = age;
}

}
