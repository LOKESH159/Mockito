package com.full.controller;
import java.io.IOException;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.full.service.SetMoreHelper;

@Controller
public class SetMoreController {
	private SetMoreHelper setMoreHelper;

@Autowired
public void setSetMoreHelper(SetMoreHelper setMoreHelper) {
		this.setMoreHelper = setMoreHelper;
	}
@ResponseBody
@RequestMapping(value="/getCustomerDetails",method=RequestMethod.GET)
public String getCustomersList(HttpServletRequest req){
	return setMoreHelper.getCustomerDetails(req);
}
@ResponseBody
@RequestMapping(value="/createCustomer",method=RequestMethod.POST)
public String createCustomer(HttpServletRequest req){

	return setMoreHelper.createCustomer(req);

}


@RequestMapping(value="/")
	public String returnHomePage(){
	System.out.println("Iam in default controller");
	return "Login";
	
}


}
