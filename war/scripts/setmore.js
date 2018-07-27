var servicesUrl='https://developer.setmore.com/api/v1/bookingapi/services';
var staffUrl='https://developer.setmore.com/api/v1/bookingapi/staffs';
var timeSlotsUrl='https://developer.setmore.com/api/v1/bookingapi/slots';
var customerUrl="https://developer.setmore.com/api/v1/bookingapi/customer/create";
var appointmentUrl="https://developer.setmore.com/api/v1/bookingapi/appointment/create";
var servicesData,userDetailsObject,selectedServiceObject,selectedProviderObject,selectedTimeObject,customerCreatedObject;
var isCustomerExisted,existedCustomerId;
$(document).ready(function(){
    var url='setmore';
	servicesData=fetchDetails();
	})
function calculateToTime(fromTime,serviceDuration){
	var fromTime=fromTime.split(":");
	console.log(fromTime);
	var toTime=parseInt(fromTime[1])+selectedServiceObject.selectedServiceDuration;
	console.log(toTime);
	if(toTime>60){
		toTime=toTime%60;
		toTime=(parseInt(fromTime[0])+1)+":"+toTime;
	}
	else{
		toTime=(parseInt(fromTime[0]))+":"+toTime;
	}
	return toTime;
}
	function slotTimeFunction(){
		
	 selectedTime = $("#selectedSlotTime").val();
	  selectedDate=$("#selectedDate").val();
	 // alert("iam in slot timesss";		
		console.log(selectedTime);
		console.log(selectedDate);
	
		//alert(selectedDate);
		//alert(selectedTime);
		serviceDuration=30;
		var toTimeValue=calculateToTime(selectedTime,serviceDuration);
		selectedTimeObject={
				selectDate:selectedDate,
				selectTime:selectedTime,
				toTime:toTimeValue
		};
		
	       customerForm();
			
     }
	function customerForm(){
		var userInfo="<a class='anchorStyle' onclick='fetchDetails()'>SERVICES</a><a  class='anchorStyle' onclick='selectedServiceFunction(\""+selectedServiceObject.selectedService+"\",\""+selectedServiceObject.selectedStaffKey+"\",\""+selectedServiceObject.selectedServiceKey+"\",\""+selectedServiceObject.selectedServiceDuration+"\")'>PROVIDER</a><a class='anchorStyle' onclick='selectedProviderFunction(\""+selectedProviderObject.selectedStaffKey+"\",\""+selectedProviderObject.selectedServiceKey+"\",\""+selectedProviderObject.selectedProvider+"\")'>DATE</a><a class='anchorStyle' onclick='customerForm()'>INFO</a><a class='anchorStyle'>CONFIRM</a><div class='progress-bar'><div class='progress-status' style='width:255px'></div></div><p style='margin-left:15px'>Enter Your Information</p>";
		userInfo+="<div><label class='info-label'>NAME</label><input type='text' id='userName' class='input' placeholder='username'/><br/>";
	    userInfo+="<label class='info-label'>EMAIL</label><input type='email' id='eMail' class='input' placeholder='EMail'/><br/>";
	    userInfo+="<label class='info-label'>Phone No</label><input type='text' id='phoneNo' class='input' placeholder='PhoneNo'/><br/>";
	    userInfo+="<label class='info-label'>ADDRESS</label><input type='text' id='address' class='input' placeholder='Address'/><br/><input type='text' id='city' placeholder='city' class='input1'/><input type='text' id='state' placeholder='state' class='input1'/><input type='text' id='zipcode' placeholder='zipcode' class='input1'/><br/>";
	    userInfo+="<label class='info-label'>COMMENTS</label><textarea id='comments'rows='4' cols='50' class='input' placeholder='optional'/><br/></div>";
	    userInfo+="<button class='continue-button' onclick='return submitDetails()'>Continue</button>";
		$("#detailsFetched").html(userInfo);
		$.ajax({
			url:"/getCustomerDetails",
			type:"GET",
			contentType: "application/json",
			async:false,
	       	dataType:"json",
	
			success:function(responseText){
				console.log(responseText);
				responseData=JSON.parse(responseText.data);
				console.log(responseText);
				var retrievedCustomerDetails='<div id="myDropdown" class="dropdown-content"><input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()" class="input"><div class="getCustomerDetailsBox">';
				for(var i=0;i<responseData.length;i++){
					retrievedCustomerDetails+="<div class='getCustomerDetailsStyle' onclick='selectedCustomerFunction(\""+responseData[i].customerId+"\",\""+responseData[i].customerMail+"\",\""+responseData[i].customerName+"\")'>"+responseData[i].customerName+"<hr style='margin-bottom:0;padding:0'/></div>";
				}
				retrievedCustomerDetails+="</div></div>";
				//alert(retrievedCustomerDetails);
				console.log(retrievedCustomerDetails);
				$("#customersList").html(retrievedCustomerDetails);
				$("#customersList").show();
			}
	 	});
		if(userDetailsObject!=""||userDetailsObject!=undefined){
			$("#userName").val(userDetailsObject.firstNameEntered);
			$("#eMail").val(userDetailsObject.eMailEntered);
			$("#phoneNo").val(userDetailsObject.phoneNoEntered);
			$("#address").val(userDetailsObject.addressEntered);
			$("#city").val(userDetailsObject.cityEntered);
			$("#state").val(userDetailsObject.stateEntered);
			$("#zipcode").val(userDetailsObject.zipcodeEntered);
			$("#comments").val(userDetailsObject.commentsEntered);
		}
	}
	function selectedCustomerFunction(customerId,customerMail,customerName){
		$("#userName").val(customerName);
		console.log(customerMail);
		$("#eMail").val(customerMail);
	existedCustomerId=customerId;
	isCustomerExisted=true;
	}
     function submitDetails(){
    
    	 var userName=$("#userName").val();
    	 var eMail=$("#eMail").val();
    	 var phoneNo=$("#phoneNo").val();
    	 var address=$("#address").val();
    	 var city=$("#city").val();
    	 var state=$("#state").val();
    	 var zipcode=$("#zipcode").val();
    	 var comments=$("#comments").val();
    	 if(userName==""){
    		 $("#userName").css("background-color","rgb(170,0,0)");
    		 $("#userName").css(" border","1px solid red");
    		 
    	 }
    	 if(phoneNo==""&&phoneNo.length!=10){
    		 $("#phoneNo").css("background-color","rgb(170,0,0)");
    		 $("#phoneNo").css("border","1px solid red");
    		 return false;
    	 }
    	 userDetailsObject={
    			 firstNameEntered:userName,
    			 eMailEntered:eMail,
    			 phoneNoEntered:phoneNo,
    			 addressEntered:address,
    			 cityEntered:city,
    			 stateEntered:state,
    			 zipcodeEntered:zipcode,
    			 commentsEntered:comments
    	 };
    	 console.log(userDetailsObject);
    	if(!isCustomerExisted){
    	customerCreatedObject=createCustomer();
    	}
    	if(customerCreatedObject!=""||isCustomerExisted){
    	 var confirmDetails="<a class='anchorStyle' onclick='fetchDetails()'>SERVICES</a><a  class='anchorStyle' onclick='selectedServiceFunction(\""+selectedServiceObject.selectedService+"\",\""+selectedServiceObject.selectedStaffKey+"\",\""+selectedProviderObject.selectedServiceKey+"\",\""+selectedServiceObject.selectedServiceDuration+"\")'>PROVIDER</a><a class='anchorStyle' onclick='selectedProviderFunction(\""+selectedProviderObject.selectedStaffKey+"\",\""+selectedProviderObject.selectedServiceKey+"\",\""+selectedProviderObject.selectedProvider+"\")'>>DATE</a><a class='anchorStyle' onclick='customerForm()'>INFO</a><a class='anchorStyle'>CONFIRM</a><div class='progress-bar'><div class='progress-status' style='width:340px'></div></div><p style='margin-left:15px'>Confirm Appointment</p>";
    	 confirmDetails+="<div class='confirm-appointment'><div class='confirm-div'><label class='confirm-label'>SERVICE:</label><span class='confirmDetails'>"+selectedService+"</span></div>";
    	 confirmDetails+="<div class='confirm-div'><label class='confirm-label'>PROVIDER:</label><span class='confirmDetails'>"+selectedProvider+"</span></div>";
    	 confirmDetails+="<div class='confirm-div'><label class='confirm-label'>Date&Time:</label><span class='confirmDetails'>"+selectedDate+"   "+selectedTime+"</span></div>";
    	 confirmDetails+="<div class='confirm-div'><label class='confirm-label'>Your Info:</label><span class='confirmDetails'><ul><li>"+userName+"</li><li>"+phoneNo+"</li>";
    	 if(eMail!=""){
    		 confirmDetails+="<li>"+eMail+"</li>";
    	 }
    	 if(address!=""||city!=""||state!=""||zipcode!=""){
    		 confirmDetails+="<li>"+address+","+city+","+state+","+zipcode+"</li>";
    	 }
    	confirmDetails+="</ul></span></div></div>";
    	confirmDetails+="<button class='continue-button' onclick='return createAppointment()'>Create Appointment</button>";
   	  $("#customersList").hide();
    	$("#detailsFetched").html(confirmDetails);
    	if(!isCustomerExisted){
    	var userDetailsResponse=customerCreatedObject.data.customer;
    /*	var object={
	       		userName:userDetailsResponse.first_name,
	       		eMailId:userDetailsResponse.email_id,
	       		customerId:userDetailsResponse.key
	       	};*/
    	$.ajax({
			url:"/createCustomer",
			type:"POST",
	       	dataType:"json",
	      data:{
	       		userName:userDetailsResponse.first_name,
	       		eMailId:userDetailsResponse.email_id,
	       		customerId:userDetailsResponse.key
	       	},
		 	success:function(responseText){
				console.log(responseText);
				responseData=responseText;
				console.log(responseText);
			} 
	 	});
    	}
    	}
     }
     function createCustomer(){
    	
    		var responseData;
    	 	$.ajax({
    			url:"/checkCustomer",
    			type:"GET",
    			contentType: "application/json",
    			async:false,
    			 data:{
    				 eMailId:userDetailsObject. firstNameEntered
    			 },
    			success:function(responseText){
    				console.log(responseText);
    				responseData=JSON.parse(responseText);
    				if(responseData.response){
    					alert("Already Customer Existed");
    					
    				}
    			
    			}
    	 	});
    	 	if(!(responseData.response)){
    	 		 var data=ajaxFunction('/setmore');
    	    		console.log(data);
    		if(data.response){
    			console.log(data.accessToken);
    			var accessTokenString=data.accessToken;
    			var accessTokenObject=JSON.parse(accessTokenString);
    			var accessToken="Bearer "+accessTokenObject.data.token.access_token;
    			console.log(accessToken);	
    			var customerInput={"first_name":userDetailsObject.firstNameEntered, "email_id":userDetailsObject.eMailEntered};
    			console.log(customerInput);
    	 	$.ajax({
    			url:customerUrl,
    			type:"POST",
    			contentType: "application/json",
    			crossDomain:true,
    			async:false,
    			beforeSend: function(request) {
    			    request.setRequestHeader("Authorization",accessToken);
    			  },
    			 data:JSON.stringify(customerInput),
    			success:function(responseText){
    				console.log(responseText);
    				responseData=responseText;
    				console.log(responseText);
    			}
    	 	});
    	 	return responseData;
    		}
    	 	}
    	 	else{
    	 		return "";
    	 	}
     }
     function createAppointmentView(){
    	 var confirmDetails="<a class='anchorStyle' onclick='fetchDetails()'>SERVICES</a><a  class='anchorStyle' onclick='selectedServiceFunction(\""+selectedServiceObject.selectedService+"\",\""+selectedServiceObject.selectedStaffKey+"\",\""+selectedProviderObject.selectedServiceKey+"\",\""+selectedServiceObject.selectedServiceDuration+"\")'>PROVIDER</a><a class='anchorStyle' onclick='selectedProviderFunction(\""+selectedProviderObject.selectedStaffKey+"\",\""+selectedProviderObject.selectedServiceKey+"\",\""+selectedProviderObject.selectedProvider+"\")'>DATE</a><a class='anchorStyle' onclick='customerForm()'>INFO</a><a class='anchorStyle'>CONFIRM</a><div class='progress-bar'><div class='progress-status' style='width:340px'></div></div><p style='margin-left:15px'>Confirm Appointment</p>";
    	 confirmDetails+="<div class='confirm-appointment'><div class='confirm-div'><label class='confirm-label'>SERVICE:</label><span class='confirmDetails'>"+selectedService+"</span></div>";
    	 confirmDetails+="<div class='confirm-div'><label class='confirm-label'>PROVIDER:</label><span class='confirmDetails'>"+selectedProvider+"</span></div>";
    	 confirmDetails+="<div class='confirm-div'><label class='confirm-label'>Date&Time:</label><span class='confirmDetails'>"+selectedDate+"   "+selectedTime+"</span></div>";
    	 confirmDetails+="<div class='confirm-div'><label class='confirm-label'>Your Info:</label><span class='confirmDetails'><ul><li>"+ userDetailsObject.firstNameEntered+"</li><li>"+ userDetailsObject.phoneNoEntered+"</li>";
    	 if(userDetailsObject.eMailEntered!=""){
    		 confirmDetails+="<li>"+ userDetailsObject.eMailEntered+"</li>";
    	 }
    	 if( userDetailsObject.addressEntered!=""|| userDetailsObject.cityEntered!=""|| userDetailsObject.stateEntered!=""|| userDetailsObject.zipcodeEntered!=""){
    		 confirmDetails+="<li>"+ userDetailsObject.addressEntered+","+ userDetailsObject.cityEntered+","+ userDetailsObject.stateEntered+","+ userDetailsObject.zipcodeEntered+"</li>";
    	 }
    	confirmDetails+="</ul></span></div></div>";
    	confirmDetails+="<button class='continue-button' onclick='return createAppointment()'>Create Appointment</button>"
    	$("#detailsFetched").html(confirmDetails);
     }
     function createAppointment(){
    	
    	 var data=ajaxFunction('/setmore');
 		console.log(data);
 		var responseData;
 		if(data.response){
 			console.log(data.accessToken);
 			var accessTokenString=data.accessToken;
 			var accessTokenObject=JSON.parse(accessTokenString);
 			var accessToken="Bearer "+accessTokenObject.data.token.access_token;
 			console.log(accessToken);	
 			if(isCustomerExisted){
 				customerKey=existedCustomerId;
 			}
 			else{
 				customerKey=customerCreatedObject.data.customer.key;
 			}
 			console.log(customerKey);
 			var appointmentDetails=   {
 			          "staff_key" : selectedProviderObject.selectedStaffKey,      
 			          "service_key" :selectedServiceObject.selectedServiceKey,      
 			          "customer_key" : customerKey,  
 			          "start_time" : selectedTimeObject.selectDate+"T"+selectedTimeObject.selectTime+":00.000Z",     
 			          "end_time"  :selectedTimeObject.selectDate+"T"+selectedTimeObject.toTime+":00.000Z"
 			      };
 			console.log(appointmentDetails);
 			console.log(userDetailsObject);
 	 	$.ajax({
 			url: appointmentUrl,
 			type:"POST",
 			contentType: "application/json",
 			crossDomain:true,
 			async:false,
 			beforeSend: function(request) {
 			    request.setRequestHeader("Authorization",accessToken);
 			  },
 			 data:JSON.stringify(appointmentDetails),
 			success:function(responseText){
 				console.log(responseText);
 				responseData=responseText;
 				console.log(responseText);
 				if(responseData.response){
 					var appointmentConfirmationDetails="<div class='progress-bar'><div class='progress-status' style='width:450px'></div></div><p>Appointment created Successfully</p>";
 					appointmentConfirmationDetails+="<div class='confirm-appointment'><div class='confirm-div'><label class='confirm-label'>SERVICE:</label><span class='confirmDetails'>"+selectedService+"</span></div>";
 					appointmentConfirmationDetails+="<div class='confirm-div'><label class='confirm-label'>PROVIDER:</label><span class='confirmDetails'>"+selectedProvider+"</span></div>";
 					appointmentConfirmationDetails+="<div class='confirm-div'><label class='confirm-label'>Date&Time:</label><span class='confirmDetails'>"+selectedDate+"   "+selectedTime+"</span></div>";
 					appointmentConfirmationDetails+="<div class='confirm-div'><label class='confirm-label'>Your Info:</label><span class='confirmDetails'><ul><li>"+ userDetailsObject.firstNameEntered+"</li><li>"+ userDetailsObject.phoneNoEntered+"</li>";
 			    	 if(userDetailsObject.eMailEntered!=""){
 			    		appointmentConfirmationDetails+="<li>"+ userDetailsObject.eMailEntered+"</li>";
 			    	 }
 			    	 if( userDetailsObject.addressEntered!=""|| userDetailsObject.cityEntered!=""|| userDetailsObject.stateEntered!=""|| userDetailsObject.zipcodeEntered!=""){
 			    		appointmentConfirmationDetails+="<li>"+ userDetailsObject.addressEntered+","+ userDetailsObject.cityEntered+","+ userDetailsObject.stateEntered+","+ userDetailsObject.zipcodeEntered+"</li>";
 			    	 }
 			    	appointmentConfirmationDetails+="</ul></span></div></div>";
 			    	appointmentConfirmationDetails+="<button class='continue-button' onclick='return fetchDetails()'>Book Another Appointment</button>"
 			    	$("#detailsFetched").html(appointmentConfirmationDetails);
 			    	isCustomerExisted=false;
 			    	 userDetailsObject="";
 				}
 			}
 	 	});
 	 	
 		}
     }
     function getStaffMembers(){
    	 var data=ajaxFunction('/setmore');
    	 var responseData;   	 
    		console.log(data);
    		if(data.response){
    			console.log(data.accessToken);
    			var accessTokenString=data.accessToken;
    			var accessTokenObject=JSON.parse(accessTokenString);
    			var accessToken="Bearer "+accessTokenObject.data.token.access_token;
    			console.log(accessToken);	
    		$.ajax({
    			url:staffUrl,
    			type:"GET",
    			contentType: "application/json",
    			dataType:"json",
    			async:false,
    			crossDomain:true,
    			beforeSend: function(request) {
    			    request.setRequestHeader("Authorization",accessToken);
    			  },
    			success:function(responseText){
    				console.log(responseText);
    				responseData=responseText;
    			}
    		  });
    		return responseData;
    		}
     }
function selectedServiceFunction(selectService,key,serviceKey,serviceDuration){
	console.log(selectService);
	console.log(key);
	$("#customersList").hide();
	var keyArray=key.split(",");
	selectedServiceObject={
			serviceNameSelected:selectService,
			selectedServiceKey:serviceKey,
			selectedStaffKey:key,
			selectedServiceDuration:serviceDuration
	};
 //	var data=ajaxFunction('/setmore');
//	console.log(data);
	selectedService=selectService;
	selectedProviderObject="";
	selectedTimeObject="";customerCreatedObject="";
/*	if(data.response){
		console.log(data.accessToken);
		var accessTokenString=data.accessToken;
		var accessTokenObject=JSON.parse(accessTokenString);
		var accessToken="Bearer "+accessTokenObject.data.token.access_token;
		console.log(accessToken);	
	$.ajax({
		url:staffUrl,
		type:"GET",
		contentType: "application/json",
		dataType:"json",
		crossDomain:true,
		beforeSend: function(request) {
		    request.setRequestHeader("Authorization",accessToken);
		  },
		success:function(responseText){
			console.log(responseText);
			//alert(JSON.stringify(responseText));
			console.log(JSON.stringify(responseText)); */
			var responseData=getStaffMembers();
			if(responseData.response){
				var staffMembers=responseData.data.staffs;
				var staffProvider="<a class='anchorStyle' onclick='fetchDetails()'>SERVICES</a><a  class='anchorStyle' onclick='selectedServiceFunction(\""+selectedServiceObject.selectedService+"\",\""+selectedServiceObject.selectedStaffKey+"\",\""+selectedServiceObject.selectedServiceKey+"\",\""+selectedServiceObject.selectedServiceDuration+"\")'>PROVIDER</a><a class='anchorStyle' >DATE</a><a class='anchorStyle' onclick='customerForm()'>INFO</a><a class='anchorStyle'>CONFIRM</a><div class='progress-bar'><div class='progress-status' style='width:85px'></div></div><p style='margin-left:15px'>Choose Provider</p>";
		 	for(var i=0;i<keyArray.length;i++){
		 		console.log(keyArray[0]);
					for( var j=0;j<staffMembers.length;j++){
                       console.log(staffMembers[0].key);
                      
						if(staffMembers[j].key==keyArray[i]){
							staffProvider+="<div class='staff-details' onclick='selectedProviderFunction(\""+keyArray[i]+"\",\""+serviceKey+"\",\""+staffMembers[j].first_name+"\")'><p style='color:blue' ><b>"+staffMembers[j].first_name+"</b></p><hr style='margin-top:15px'/></div>";
							break;
						}//if
					}//for staffMembers
				} //for keys
		 	$("#detailsFetched").html(staffProvider);
			}//if response
}

function selectedProviderFunction(staffKey,serviceKey,selectProvider){
	$("#customersList").hide();
	console.log(staffKey);
	console.log(serviceKey);
	console.log(selectProvider);
	selectedProvider=selectProvider;
	selectedTimeObject="";
	customerCreatedObject="";
	selectedProviderObject={
			selectedStaffKey:staffKey,
			selectedServiceKey:serviceKey,
			selectedProvider:selectProvider
	};
	console.log("SELCTED PROVIDER"+selectedProviderObject);
	var data=ajaxFunction('/setmore');
	console.log(data);
	if(data.response){
		console.log(data.accessToken);
		var accessTokenString=data.accessToken;
		var accessTokenObject=JSON.parse(accessTokenString);
		var accessToken="Bearer "+accessTokenObject.data.token.access_token;
		console.log(accessToken);	
		var submittedDate,todayDate;
		var date;
		
		submittedDate=$("#selectedDate").val();
		submittedDateValue=submittedDate;
		
		         date=new Date();	
		         var day;
		     	if(date.getDate()>9){
					day=date.getDate();
				}
				else{
					day="0"+date.getDate();
				}
				 if(date.getMonth()<9){
					 month="0"+(date.getMonth()+1);		
				 }
				 else{
					 month=date.getMonth()+1;
				 }
				todayDate=day+"/"+month+"/"+date.getFullYear();
				  if(submittedDate==undefined){
	            submittedDate=todayDate;
	            submittedDateValue=date.getFullYear()+"-"+month+"-"+day;
		          }
				  else{
					submittedDate=submittedDate.split("-");
					submittedDate=submittedDate[2]+"/"+submittedDate[1]+"/"+submittedDate[0];
				  }
		console.log(submittedDate);
		
		var jsData={
				staff_key:staffKey,
				service_key:serviceKey,
				selected_date:submittedDate,
				off_hours:false,
				double_booking:false,
				slot_limit:30
			};
		console.log(jsData);
		var jsonData=JSON.stringify(jsData);
		console.log(jsonData);
 	$.ajax({
		url:"https://developer.setmore.com/api/v1/bookingapi/slots",
		type:"POST",
		contentType: "application/json",       
		data:jsonData,
		crossDomain:true,
		beforeSend: function(request) {
		    request.setRequestHeader("Authorization",accessToken);
		  },
		success:function(responseText){
			console.log(responseText);
			servicesData=responseText;
			
			var timeSlotsDetails="<a class='anchorStyle' onclick='fetchDetails()'>SERVICES</a><a  class='anchorStyle' onclick='selectedServiceFunction(\""+selectedServiceObject.selectedService+"\",\""+selectedServiceObject.selectedStaffKey+"\",\""+selectedProviderObject.selectedServiceKey+"\",\""+selectedServiceObject.selectedServiceDuration+"\")'>PROVIDER</a><a  class='anchorStyle'>DATE</a><a class='anchorStyle'>INFO</a><a class='anchorStyle'>CONFIRM</a><div class='progress-bar'><div class='progress-status' style='width:190px'></div></div>";
			 timeSlotsDetails+="<span style='margin-top:30px'>SELECT DATE:</span><input type='date' onchange='dateChanged()' id='selectedDate' min="+(date.getFullYear()+"-"+month+"-"+day)+" value="+submittedDateValue+" style='margin-top:30px;margin-left:40px'></input>";
			 if(responseText.response){
				 var slots=responseText.data.slots;
				 if(slots.length>0){
					 timeSlotsDetails+="<br/><span style='margin-top:30px'>SELECT SLOT:</span>";
					 date=new Date();
					 var todayHoursMillis;
						var todayDate=day+"/"+month+"/"+date.getFullYear();
						if (submittedDate==todayDate) {
							isTodayDate=true;
						} else {
							todayDate = submittedDate;
							isTodayDate=false;
						}
						if(isTodayDate){
				      	 if(date.getMinutes()<30){
							todayHoursMillis=((date.getHours()+1)*60000*60)+(30*60000);
							}
							else{
								todayHoursMillis=(date.getHours()+2)*60000*60;
							}
						}
						else{
						todayHoursMillis=0;
						}
					 var timeSlotsAvailable="";
		          for(var i=0;i<slots.length;i++){
		        var slotTime=slots[i].split(":");
		        var slotMillis=(slotTime[0]*60000*60)+(slotTime[1]*60000);
		        	 if(slotMillis>todayHoursMillis){
		     
		             timeSlotsAvailable+="<option value="+slots[i]+">"+slots[i]+"</option>";
		             }
		           }
		          if(timeSlotsAvailable!=""){
		        	  timeSlotsDetails+="<select id='selectedSlotTime' onchange='slotTimeFunction()' style='margin-top:30px;margin-left:40px'><option value='Select Slot'>Select Slot</option>";
		        	  timeSlotsDetails+=timeSlotsAvailable; 
		        	  timeSlotsDetails+="</select>";
		          }
		          else{
		        	  timeSlotsDetails+="<p style='color:red'>slots not available</p>";
		          }
				 }
				 else{
					 timeSlotsDetails+="<p style='color:red'>slots not available</p>";
				 }
			 }
			$("#detailsFetched").html(timeSlotsDetails);
		}
	
	}) 
	}
}
function dateChanged(){
	var staffK=selectedProviderObject.selectedStaffKey;
	var serviceK=selectedProviderObject.selectedServiceKey;
	var providerK=selectedProviderObject.selectedProvider;
	console.log(staffK);
	console.log(serviceK);
	console.log(providerK);
	selectedProviderFunction(staffK,serviceK,providerK);
}
function ajaxFunction(URL){
	var data;
	$.ajax({
		url:URL,
		type:"GET",
		cache:false,
		dataType:"json",
		  async: false,
		success:function(responseText){
			console.log(responseText);
			data=responseText;
		}
	})
	return data;
}
function getServices(){
	$("#customersList").hide();
	var data=ajaxFunction('/setmore');
	console.log(data);
	var responseData;
	if(data.response){
		console.log(data.accessToken);
		var accessTokenString=data.accessToken;
		var accessTokenObject=JSON.parse(accessTokenString);
		var accessToken="Bearer "+accessTokenObject.data.token.access_token;
		console.log(accessToken);		
 	$.ajax({
		url:servicesUrl,
		type:"GET",
		contentType: "application/json",
		crossDomain:true,
		async:false,
		beforeSend: function(request) {
		    request.setRequestHeader("Authorization",accessToken);
		  },
		success:function(responseText){
			console.log(responseText);
			responseData=responseText;
		}
 	});
 	return responseData;
	}
}
function fetchDetails(){
/* 	var data=ajaxFunction('/setmore');
	console.log(data);
	if(data.response){
		console.log(data.accessToken);
		var accessTokenString=data.accessToken;
		var accessTokenObject=JSON.parse(accessTokenString);
		var accessToken="Bearer "+accessTokenObject.data.token.access_token;
		console.log(accessToken);		
 	$.ajax({
		url:servicesUrl,
		type:"GET",
		contentType: "application/json",
		crossDomain:true,
		beforeSend: function(request) {
		    request.setRequestHeader("Authorization",accessToken);
		  },
		success:function(responseText){
			console.log(responseText); */
			$("#customersList").hide();
			servicesData=getServices();
			selectedServiceObject="";
			selectedProviderObject="";
			selectedTimeObject="";
			customerCreatedObject="";
			var bindDetails="<a class='anchorStyle' onclick='fetchDetails()'>SERVICES</a><a  class='anchorStyle' >PROVIDER</a><a  class='anchorStyle' >DATE</a><a class='anchorStyle'>INFO</a><a class='anchorStyle'>CONFIRM</a><div class='progress-bar'></div><p style='margin-left:15px'>Choose Service</p><p style='margin-left:15px'>All Services</p>";
			
		//	alert(servicesData.data.services);
			for(var i=0;i<servicesData.data.services.length;i++){
				bindDetails+="<div class='serviceDetails' onclick='selectedServiceFunction(\""+servicesData.data.services[i].service_name+"\",\""+servicesData.data.services[i].staff_keys+"\",\""+servicesData.data.services[i].key+"\",\""+servicesData.data.services[i].duration+"\")'>";
				bindDetails+="<div class='service-name'><b>"+servicesData.data.services[i].service_name+"</b></div><div class='service-duration'>"+servicesData.data.services[i].duration+"  mins</div><div class='service-cost'>";
				if(servicesData.data.services[i].cost==undefined){
					bindDetails+="0";
			     }	
				else{
				bindDetails+=servicesData.data.services[i].cost;
			   }
				bindDetails+="</div><hr/></div>";
			}
			
			$("#detailsFetched").html(bindDetails);

}
function displayStaffMembers(){
	$("#customersList").hide();
	var responseData=getStaffMembers();
	if(responseData.response){
		var staffMembers=responseData.data.staffs;
	var staffProvider="<p style='margin-left:15px'>Provider</p><div style='margin-left:15px;margin-top:10px'>";
			for( var j=0;j<staffMembers.length;j++){
               console.log(staffMembers[0].key);   			
			    staffProvider+="<p>"+staffMembers[j].first_name+"</p><hr style='margin-top:15px'/>";			
			}//for staffMembers
		staffProvider+="</div>";
 	$("#detailsFetched").html(staffProvider);
	}//if response
}
function displayServices(){
	$("#customersList").hide();
	servicesData=getServices();
		
	var bindDetails="<p style='margin-left:15px'>All Services</p><div style='margin-left:15px;margin-top:10px'>";
	
	//alert(servicesData.data.services);
	for(var i=0;i<servicesData.data.services.length;i++){
		bindDetails+="<div class='serviceDetails'>";
		bindDetails+="<b class='service-name'>"+servicesData.data.services[i].service_name+"</b><span class='service-duration'>"+servicesData.data.services[i].duration+"</span><span class='service-cost'>"+servicesData.data.services[i].cost+"</span><hr/>"
		bindDetails+="</div>";
	}
	bindDetails+="</div>";
	$("#detailsFetched").html(bindDetails);
}
function bookAppointmentView(){
	$("#customersList").hide();
	if(selectedServiceObject==""||selectedServiceObject==undefined){
		fetchDetails();
	}
	else{
		console.log(selectedProviderObject);
		   if(selectedProviderObject==""||selectedProviderObject==undefined) {
			 selectedServiceFunction(selectedServiceObject.selectedService,selectedServiceObject.selectedStaffKey,selectedServiceObject.selectedServiceKey,selectedServiceObject.selectedServiceDuration) ;
		    }
		 else{
			 if(customerCreatedObject.response){
				 createAppointmentView();
			 }
			 else{
				 
		console.log(selectedProviderObject);
		console.log(JSON.stringify(selectedProviderObject));
		  selectedProviderFunction(selectedProviderObject.selectedStaffKey,selectedProviderObject.selectedServiceKey,selectedProviderObject.selectedProvider);
			 }
		 }
	}
}
function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("div");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}