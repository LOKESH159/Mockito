var selectedServiceModel,bookingAppointmentModel,selectedProviderModel,getTimingsModel;
var ViewHomePage=Backbone.View.extend({
	el:'#content',
	render:function(){
		   var that=this;
		console.log("Iam in VIEW HOME PAGE");
		var loginTemplate= _.template('<div class="loginBox"><div><label class="infoLabel">USERNAME:</label><input type="text" name="userName" id="userName" class="input"/></div><div><label class="infoLabel">PASSWORD:</label><input type="password" name="password" id="password" class="input"/></div></div><div><form action="signin" method="get"><button class="loginButton" style="margin-left:33%" id="googleLogin">GOOGLE LOGIN</button></form><button class="loginButton" style="margin-left:2%" id="adminLogin">ADMIN LOGIN</button></div>');
	
		     
		       console.log("TEMPLLAYTE IS ="+loginTemplate);
		        that.$el.html(loginTemplate);  	    	  
	},
events:{
//	'click #googleLogin':'googleLogin',
	'click #adminLogin':'adminLogin'
},
	googleLogin:function(){
		console.log("IAM IN GOOGLE LOGIN");
		var loginGoogle=new LoginGoogle();
		console.log("Iam calling ajax call");
		$.ajax({
			url:'signin',
			type:"GET",
			success:function(responseText){
				
			}
		});
	},
	adminLogin:function(){	
		var userName=$("#userName").val();
		var password=$("#password").val();
		console.log(userName);
		console.log(password);
		var adminLoginModel=new AdminLoginModel();
		adminLoginModel.set("userName",userName);
		adminLoginModel.set("password",password)
		if(adminLoginModel.isValid()){
			console.log("all are valid");
			console.log(adminLoginModel.attributes);
			adminLoginModel.fetch({
						dataType:"application/json",
				        async:false,
				        data:{
				        	userDetails:JSON.stringify(adminLoginModel.attributes)
				        },
				        contentType:"application/json",
				        success:function(model,response,options){
		    		  console.log(model);
		    		  console.log(response);    		  
		    		  console.log(options);		
		    		  	var template=_.template($("#fileDownload").html(),{});
		   	    	 that.$el.html(template);  
		    	  },
		         error:function(model,response,options){
		    	   console.log(model);
		    		  console.log(response);
		    		  console.log(options);
		       }
			})
		}
		else{
			alert("MESSAGE IS :"+adminLoginModel.validationError); 
		}
	}
	
});
var GetServicesView=Backbone.View.extend({
	el:'#content',	
	render:function(){
		var that =this;
		console.log("Iam in get services view");
		var getAccessToken=new GetAcessToken();
		var accessToken;
		getAccessToken.fetch({
				dataType:"json",
				async:false,
				success:function(model,response,options){
		    		  console.log(model);
		    		  console.log(response);    		  
		    		  console.log(options);
		    		var accessTokenObject=JSON.parse(response.accessToken);
		    	   accessToken="Bearer "+accessTokenObject.data.token.access_token;
		    	   console.log(accessToken);
		    		
		    	  },
		         error:function(model,response,options){
		    	   console.log(model);
		    		  console.log(response);
		    		  console.log(options);
		       }
		});
		var getServices=new GetServices();
		getServices.fetch({
			  headers: {
				    'Authorization': accessToken
				  },
		      contentType: "application/json",
			 crossDomain:true,
			 success:function(model,response,options){
	    		  console.log(model);
	    		  console.log(response);    		  
	    		  console.log(options);
	    		  console.log(response.data.services);
	    		  console.log(model.models);
	    		  var modelData=model.models;
	    		console.log(modelData[0].attributes.data.services);
	    		services=response.data.services;
	    		var viewBox=new ViewBox();
	    		viewBox.render();
	  	var template=_.template($("#service-list-template").html(),{model:response.data.services});
	    	 that.$el.html(template);  	
	    	  },
	         error:function(model,response,options){
	    	   console.log(model);
	    		  console.log(response);
	    		  console.log(options);
	       }
		});
		return this;
	},
	events:{
	'click #service':'selectedServiceFunction'
	},
	selectedServiceFunction:function(serviceValues){
		console.log("Iam in selected service function");
		console.log($(serviceValues));
		console.log($(serviceValues).children());
		 selectedServiceModel =	new SelectedServiceModel();
		
		
        console.log($(serviceValues).children().prevObject["0"].currentTarget.childNodes[1].innerHTML);
	   console.log($(serviceValues).children().prevObject["0"].currentTarget.childNodes[1].id);
		console.log($(serviceValues).children().prevObject["0"].currentTarget.childNodes[3].innerHTML);
		console.log($(serviceValues).children().prevObject["0"].currentTarget.childNodes[5].innerHTML);
		console.log($(serviceValues).children().prevObject["0"].currentTarget.childNodes[7].id);
      selectedServiceModel.set('serviceName',$(serviceValues).children().prevObject["0"].currentTarget.childNodes[1].innerHTML);
      selectedServiceModel.set('serviceKey',$(serviceValues).children().prevObject["0"].currentTarget.childNodes[1].id);
      selectedServiceModel.set('staffKeys',$(serviceValues).children().prevObject["0"].currentTarget.childNodes[7].id);
      selectedServiceModel.set('serviceDuration',$(serviceValues).children().prevObject["0"].currentTarget.childNodes[3].innerHTML);
      selectedServiceModel.set('serviceCost',$(serviceValues).children().prevObject["0"].currentTarget.childNodes[5].innerHTML);
      bookingAppointmentModel.set('selectedService',$(serviceValues).children().prevObject["0"].currentTarget.childNodes[1].innerHTML);
      console.log(selectedServiceModel);
      console.log(bookingAppointmentModel);
  	var viewProviders=new ViewProviders();
	viewProviders.render();
	}

});
var ViewBox=Backbone.View.extend({
	el:'#view',
	render:function(){
		   var that=this;
		console.log("Iam in VIEW BOX PAGE");
		var viewTemplate= _.template($("#views_template").html(),{});	     
		       console.log("TEMPLLAYTE IS ="+viewTemplate);
		        that.$el.html(viewTemplate);  	 
		    return this;
	},
});
var ViewProviders=Backbone.View.extend({
	el:'#content',
	events:{
		'click .provider_name':'selectedProviderFunction'
	},
	selectedProviderFunction:function(selectedProvider){
		console.log($(selectedProvider).children());
		console.log($(selectedProvider).children().prevObject["0"].currentTarget.innerHTML);
		console.log($(selectedProvider).children().prevObject["0"].currentTarget.id);
		selectedProviderModel=new SelectedProviderModel();
		selectedProviderModel.set("providerName",$(selectedProvider).children().prevObject["0"].currentTarget.innerHTML);
		selectedProviderModel.set("providerKey",$(selectedProvider).children().prevObject["0"].currentTarget.id);
		bookingAppointmentModel.set("selectedProvider",$(selectedProvider).children().prevObject["0"].currentTarget.innerHTML);
		var getTimingsView=new GetTimingsView();
		getTimingsView.render();
	},
	render:function(){
		var getAccessToken=new GetAcessToken();
		var accessToken;
		var that=this;
		getAccessToken.fetch({
				dataType:"json",
				async:false,
				success:function(model,response,options){
		    		  console.log(model);
		    		  console.log(response);    		  
		    		  console.log(options);
		    		var accessTokenObject=JSON.parse(response.accessToken);
		    	   accessToken="Bearer "+accessTokenObject.data.token.access_token;
		    	   console.log(accessToken);
		    		
		    	  },
		         error:function(model,response,options){
		    	   console.log(model);
		    		  console.log(response);
		    		  console.log(options);
		       }
		});
	var getProvider=new GetProvider();
	getProvider.fetch({
		headers: {
				    'Authorization': accessToken
				  },
		      contentType: "application/json",
			 crossDomain:true,
			 success:function(model,response,options){
	    		  console.log(model);
	    		  console.log(response);    		  
	    		  console.log(options); 	
	    		  console.log(response.data.staffs);
	    		  console.log(model.models[0].attributes.data.staffs);
	    		  providers=response.data.staffs;
	    			var viewBox=new ViewBox();
		    		viewBox.render();
		    		var staffKeys=response.data.staffs;
		    	
		    		console.log("ROUTES :"+router.routes[Backbone.history.getFragment()]);
		    		if(router.routes[Backbone.history.getFragment()]=='getServices'){
		    			providers=[];
		    			console.log(selectedServiceModel);
		    			var staffKeysSelected= selectedServiceModel.get("staffKeys").split(",");
		    			for(var i=0;i<staffKeysSelected.length;i++){
		    		 		console.log(staffKeysSelected[0]);
		    					for( var j=0;j<staffKeys.length;j++){
		                           console.log(staffKeys[0].key);
		                          
		    						if(staffKeys[j].key==staffKeysSelected[i]){
		    						    providers.push(staffKeys[j]);
		    							break;
		    						}//if
		    					}//for staffMembers
		    				} //for keys
		    		}
		    	console.log(providers);
		     	var template=_.template($("#providers-list-template").html(),{model:providers});
		    	 that.$el.html(template);  	
	    	  },
	         error:function(model,response,options){
	    	   console.log(model);
	    		  console.log(response);
	    		  console.log(options);
	       }
		});
	}
});
var ViewBookingAppointment=Backbone.View.extend({
	el:"#content",
	render:function(){
		if(bookingAppointmentModel==undefined){
			bookingAppointmentModel=new BookingAppointmentModel();
			var getServicesView=new GetServicesView();
			getServicesView.render();
			return this;
		}
	if(	bookingAppointmentModel.get('selectedService')===""){
		var getServicesView=new GetServicesView();
		getServicesView.render();
		return this;
	}
	if(	bookingAppointmentModel.get('selectedProvider')===""){
	 	var viewProviders=new ViewProviders();
		viewProviders.render();
		return this;
	}
	if(	bookingAppointmentModel.get('selectedDate')===""){
		var getTimingsView=new GetTimingsView();
		getTimingsView.render();
		return this;
	}	if(	bookingAppointmentModel.get('userDetails')===""){
		var getServicesView=new GetServicesView();
		getServicesView.render();
		return this;
	}
		
	}
});
var GetTimingsView=Backbone.View.extend({

el:'#content',
	render:function(){
		var getAccessToken=new GetAcessToken();
		var accessToken;
		var that=this;
		getAccessToken.fetch({
				dataType:"json",
				async:false,
				success:function(model,response,options){
		    		  console.log(model);
		    		  console.log(response);    		  
		    		  console.log(options);
		    		var accessTokenObject=JSON.parse(response.accessToken);
		    	   accessToken="Bearer "+accessTokenObject.data.token.access_token;
		    	   console.log(accessToken);
		    		
		    	  },
		         error:function(model,response,options){
		    	   console.log(model);
		    		  console.log(response);
		    		  console.log(options);
		       }
		});
		
		var currentDate=new Date();
		 var day,month;
	     	if(currentDate.getDate()>9){
				day=currentDate.getDate();
			}
			else{
				day="0"+currentDate.getDate();
			}
			 if(currentDate.getMonth()<9){
				 month="0"+(currentDate.getMonth()+1);		
			 }
			 else{
				 month=currentDate.getMonth()+1;
			 }
	var todayDate= day+"/"+month+"/"+currentDate.getFullYear();

	if(getTimingsModel==undefined){		
	getTimingsModel	=new GetTimingsModel();
	getTimingsModel.set("staff_key",selectedProviderModel.get("providerKey"));
	getTimingsModel.set("service_key",selectedServiceModel.get("serviceKey"));
	getTimingsModel.set("selected_date",todayDate);
	}
	
	console.log(getTimingsModel);
	console.log(JSON.stringify(getTimingsModel.attributes));
   var getTimings=new GetTimings();
	getTimings.fetch({
		type: 'POST',
		 beforeSend: function (xhr) {
	            xhr.setRequestHeader('Content-Type', 'application/json');
	            xhr.setRequestHeader('Authorization',accessToken);
	        },
	 crossDomain:true,     
	 data:JSON.stringify(getTimingsModel.attributes),
	 success:function(model,response,options){
		  console.log(model);
		  console.log(response);    		  
		  console.log(options); 	
		  slots=response.data.slots;
   	var template=_.template($("#timings-list-template").html(),{model:slots});
    	 that.$el.html(template);	 
    	 console.log(todayDate);
    	 todayDate=todayDate.split("/")
    	 $("#dateValue").attr("min",todayDate[2]+"-"+todayDate[1]+"-"+todayDate[0]);
    	 todayDate=getTimingsModel.get("selected_date").split("/");
    	 console.log(todayDate);
    	$("#dateValue").val(todayDate[2]+"-"+todayDate[1]+"-"+todayDate[0]);
    
    	 
	  },
     error:function(model,response,options){
	   console.log(model);
		  console.log(response);
		  console.log(options);
   }
	})
	},
	events:{
		'change #selectedSlotTime':'selectedSlotTime',
		'change #dateValue':'changedDateValue'
	},	
	selectedSlotTime:function(e){
		console.log("sel");
		var selectedTime=$("#selectedSlotTime").val();
		var selectedDate=$("#dateValue").val();
		console.log(selectedDate);
		selectedDate=selectedDate.split("-")	
		var selectedTimeModel=new SelectedTimeModel();
		selectedTimeModel.set("date",(selectedDate[2]+"/"+selectedDate[1]+"/"+selectedDate[0]));
		selectedTimeModel.set("time",selectedTime);
		bookingAppointmentModel.set("selectedDate",(selectedDate[2]+"/"+selectedDate[1]+"/"+selectedDate[0]));
		bookingAppointmentModel.set("selectedTime",selectedTime);
		console.log(bookingAppointmentModel);
		var userDetailsView=new UserDetailsView();
		userDetailsView.render();
	
	},
	changedDateValue:function(e){
		console.log("iam in changed date value");
		var selectedDate=$("#dateValue").val();
		console.log(selectedDate);
		selectedDate=selectedDate.split("-")
		getTimingsModel.set("selected_date",(selectedDate[2]+"/"+selectedDate[1]+"/"+selectedDate[0]));
		var getTimingsView=new GetTimingsView();
		getTimingsView.render();
	}
	
})
var UserDetailsView=Backbone.View.extend({
	el:"#content",
	render:function(){
		var that=this;
			var template=_.template($("#userDetails-list-template").html(),{});
		     that.$el.html(template);  
	},
	events:{
		"submit .userDetailsForm":'getUserDetails'
	},
	getUserDetails:function(e){
		console.log(e);
		var that=this;
		var userDetailsModel=new UserDetailsModel();
		userDetailsModel.set('userName',e.currentTarget["0"].value);
		userDetailsModel.set('eMail',e.currentTarget["1"].value);
		userDetailsModel.set('phoneNo',e.currentTarget["2"].value);	
		userDetailsModel.set('address',e.currentTarget["3"].value);
		userDetailsModel.set('city',e.currentTarget["4"].value);
		userDetailsModel.set('state',e.currentTarget["5"].value);
		userDetailsModel.set('zipcode',e.currentTarget["6"].value);
		userDetailsModel.set('comments',e.currentTarget["7"].value);
		console.log(userDetailsModel);
		
		if(!(userDetailsModel.isValid())){
			alert(userDetailsModel.validationError);
		}
		else{
			var getAccessToken=new GetAcessToken();
			var accessToken;
			getAccessToken.fetch({
					dataType:"json",
					async:false,
					success:function(model,response,options){
			    		  console.log(model);
			    		  console.log(response);    		  
			    		  console.log(options);
			    		var accessTokenObject=JSON.parse(response.accessToken);
			    	   accessToken="Bearer "+accessTokenObject.data.token.access_token;
			    	   console.log(accessToken);
			    		
			    	  },
			         error:function(model,response,options){
			    	   console.log(model);
			    		  console.log(response);
			    		  console.log(options);
			       }
			});
			var userDetails={
					
			};
			userDetails.first_name=userDetailsModel.get('userName');
			userDetails.email_id=userDetailsModel.get('eMail');
			console.log(userDetails)
			userDetailsModel.fetch({
				headers: {
				    'Authorization': accessToken
				  },
		      type:"POST",
		      contentType: "application/json",
			   crossDomain:true,
			   data:JSON.stringify(userDetails),
			 success:function(model,response,options){
	    		  console.log(model);
	    		  console.log(response);    		  
	    		  console.log(options); 	
	    		  bookingAppointmentModel.set("userDetails",userDetailsModel.attributes);
	    		  console.log(bookingAppointmentModel);
	    	  appointmentDetails=bookingAppointmentModel.toJSON();
	    		  var viewTemplate= _.template($("#bookDetails-list-Template").html(),{model:appointmentDetails});	     
			        that.$el.html(viewTemplate); 
	    	  },
	         error:function(model,response,options){
	    	   console.log(model);
	    		  console.log(response);
	    		  console.log(options);
	       }
		});
		
		}
		return false;
	}
})