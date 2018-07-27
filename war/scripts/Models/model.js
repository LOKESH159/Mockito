var LoginGoogle=Backbone.Model.extend({
	urlRoot:'http://localhost:8888/signin'
});
var GetServices=Backbone.Collection.extend({

url:'https://developer.setmore.com/api/v1/bookingapi/services'
});
var GetAcessToken=Backbone.Model.extend({
	urlRoot:'http://localhost:8888/setmore'
});
var GetProvider=Backbone.Collection.extend({
	url:'https://developer.setmore.com/api/v1/bookingapi/staffs'
})
var BookingAppointmentModel=Backbone.Model.extend({
	defaults:{
		selectedService:"",
		selectedProvider:"",
		selectedDate:"",
		selectedTime:"",
		userDetails:"",
		appointmentConfirmation:""
	}
})
var SelectedServiceModel=Backbone.Model.extend({
	defaults:{
		serviceName:"",
		serviceKey:"",
	    staffKeys:"",
		serviceDuration:"",
		serviceCost:""
	}
});
var SelectedProviderModel=Backbone.Model.extend({
	defaults:{
		providerName:"",
		providerKey:""
	}
})
var GetTimings=Backbone.Model.extend({
	urlRoot:'https://developer.setmore.com/api/v1/bookingapi/slots'
});
var GetTimingsModel=Backbone.Model.extend({
	defaults:{
		"staff_key":"",
		"service_key":"",		
		"selected_date":"",
	    "off_hours":false,
        "double_booking" :false,
        "slot_limit" : 30
	}
});
var SelectedTimeModel=Backbone.Model.extend({
	defaults:{
		"date":"",
		"time":""
	}
});
var UserDetailsModel=Backbone.Model.extend({
	defaults:{
		userName:"",
		eMail:"",
		phoneNo:"",
		address:"",
		city:"",
		state:"",
		zipcode:"",
		comments:""
	},
	validate:function(){
		
		if(userName.value==""){
			return "Please enter user name";
		}
		if(phoneNo.value.length!=10||isNaN(phoneNo.value.length)){
		
			console.log(phoneNo);
			return "Please enter valid phone no";
		}
		if(eMail.value==""){
			return "Please enter valid email";
		}
	},
	url:"https://developer.setmore.com/api/v1/bookingapi/customer/create"
})
var AdminLoginModel=Backbone.Model.extend({
	defaults:{
		userName:"",
        password:""
	},
    validate:function(){
    	if(userName.value==""){
    		return "Please enter username";
    	}
    	console.log(password);
    	console.log(password.length);
    	if(password.value==""){
    		return "Please enter password";
    	}
    },
    url:'http://localhost:8882/checkAdminLogin'
})
