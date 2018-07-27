<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Customer Booking Page</title>
<style>
.input {
    width: 50%;
    padding: 12px 20px;
    margin: 8px 10px;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 2px;
  
}
.input1 {
    width: 20%;
    padding: 8px 20px;
    display: inline-block;
    border: 0.5px solid #ccc;
    box-sizing: border-box;
    border-radius: 2px;
}
#city{
margin-left: 22%;}
.info-label{
float:left;
width:100px;
margin-top:15px;
}
.confirm-label{
float:left;
width:100px;
}

a{
text-decoration: none;
cursor: pointer;
}
#availableList{
    margin-right:30px;
     top:20%;
    width:25%;
    height:25%;
    border: 1px solid black;
    box-sizing: border-box;
}
#body{
width:1000px;
height:700px;
}
#bookingAppointment,staffMembers,services{
margin:10%
}
#staffMembers,services{
margin:10%
}
#services{
margin:10%
}

.service-name{
color:blue;}
#detailsFetched{
    left:30%;
    top:20%;
    margin:0%;
    width:50%;
    height:25%;
    padding-top:50px;
    border: 0px solid blue;
    box-sizing: border-box;
}
.serviceDetails{
display:block;
cursor:pointer;}
.staff-details{
display:block;
cursor:pointer;}
.anchorStyle{
margin-left: 20px;}
.service-name{
margin-right: 80px;
margin-left:15px;
width:100px
text-align: center;
color: blue;}
.service-duration{
margin-right:15px;}
.service-cost{
margin-right:10px;}
 .styleDiv{
display:inline-block;
margin-top:50px;
padding:0px;
float:left;
}
.continue-button{
padding:15px 25px;
background-color:#14B5FA;
margin-top:15px;
margin-left: 27%;
color:white;
font-weight: bold;
font-size: medium;
cursor:pointer;
}
.confirmDetails{
    width: 50%;
padding-left:20px;
display:inline-block;`	`
vertical-align: top;
}
.confirm-div{
margin-top:20px;}
.confirm-appointment{
    width: 400px;
    
    padding: 10px;
    border: 1px solid grey;
}
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display:inline;
}

</style>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
var servicesUrl='https://developer.setmore.com/api/v1/bookingapi/services';
var staffUrl='https://developer.setmore.com/api/v1/bookingapi/staffs';
var timeSlotsUrl='https://developer.setmore.com/api/v1/bookingapi/slots';
var servicesData;
$(document).ready(function(){
    var url='setmore';
	servicesData=fetchDetails();
	})

	function slotTimeFunction(){
	 selectedTime = $("#selectedSlotTime").val();
	  selectedDate=$("#selectedDate").val();
	 // alert("iam in slot timesss";		
		console.log(selectedTime);
		console.log(selectedDate);
		alert(selectedDate);
		alert(selectedTime);
		var userInfo="<a class='anchorStyle'>SERVICES</a><a  class='anchorStyle'>PROVIDER</a><a class='anchorStyle'>DATE</a><a class='anchorStyle'>INFO</a><a class='anchorStyle'>CONFIRM</a><p style='margin-left:15px'>Enter Your Information</p>";
		userInfo+="<div><label class='info-label'>NAME</label><input type='text' id='userName' class='input' placeholder='username'/><br/>";
	    userInfo+="<label class='info-label'>EMAIL</label><input type='email' id='eMail' class='input' placeholder='EMail'/><br/>";
	    userInfo+="<label class='info-label'>Phone No</label><input type='text' id='phoneNo' class='input' placeholder='PhoneNo'/><br/>";
	    userInfo+="<label class='info-label'>ADDRESS</label><input type='text' id='address' class='input' placeholder='Address'/><br/><input type='text' id='city' placeholder='city' class='input1'/><input type='text' id='state' placeholder='state' class='input1'/><input type='text' id='zipcode' placeholder='zipcode' class='input1'/><br/>";
	    userInfo+="<label class='info-label'>COMMENTS</label><textarea id='comments'rows='4' cols='50' class='input' placeholder='optional'/><br/></div>";
	    userInfo+="<button class='continue-button' onclick='return submitDetails()'>Continue</button>";
		$("#detailsFetched").html(userInfo);
			
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
    	 var confirmDetails="<a class='anchorStyle'>SERVICES</a><a  class='anchorStyle'>PROVIDER</a><a class='anchorStyle'>DATE</a><a class='anchorStyle'>INFO</a><a class='anchorStyle'>CONFIRM</a><p style='margin-left:15px'>Confirm Appointment</p>";
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
    	confirmDetails+="<button class='continue-button' onclick='return createAppointment()'>Create Appointment</button>"
    	$("#detailsFetched").html(confirmDetails);
     }
     function createAppointment(){
    	 
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
	var keyArray=key.split(",");
 //	var data=ajaxFunction('/setmore');
//	console.log(data);
	selectedService=selectService;

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
				var staffProvider="<a class='anchorStyle'>SERVICES</a><a  class='anchorStyle'>PROVIDER</a><a class='anchorStyle'>DATE</a><a class='anchorStyle'>INFO</a><a class='anchorStyle'>CONFIRM</a><p style='margin-left:15px'>Choose Provider</p>";
		 	for(var i=0;i<keyArray.length;i++){
		 		console.log(keyArray[0]);
					for( var j=0;j<staffMembers.length;j++){
                       console.log(staffMembers[0].key);
                      
						if(staffMembers[j].key==keyArray[i]){
							staffProvider+="<div class='staff-details' onclick='selectedProvider(\""+keyArray[i]+"\",\""+serviceKey+"\",\""+staffMembers[j].first_name+"\")'><p style='color:blue' ><b>"+staffMembers[j].first_name+"</b></p><hr style='margin-top:15px'/></div>";
							break;
						}//if
					}//for staffMembers
				} //for keys
		 	$("#detailsFetched").html(staffProvider);
			}//if response
}

function selectedProvider(staffKey,serviceKey,selectProvider){
	console.log(staffKey);
	console.log(serviceKey);
	console.log(selectProvider);
	selectedProvider=selectProvider;
	var data=ajaxFunction('/setmore');
	console.log(data);
	if(data.response){
		console.log(data.accessToken);
		var accessTokenString=data.accessToken;
		var accessTokenObject=JSON.parse(accessTokenString);
		var accessToken="Bearer "+accessTokenObject.data.token.access_token;
		console.log(accessToken);		
		var date=new Date();
		
		 if(date.getMonth()<9){
			 month="0"+(date.getMonth()+1);		
		 }
		 else{
			 month=date.getMonth()+1;
		 }
		 var currentDate=date.getDate()+"/"+month+"/"+date.getFullYear();
		console.log(currentDate);
		var jsData={
				staff_key:staffKey,
				service_key:serviceKey,
				selected_date:currentDate,
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
			var timeSlotsDetails="<a class='anchorStyle'>SERVICES</a><a  class='anchorStyle'>PROVIDER</a><a  class='anchorStyle'>DATE</a><a class='anchorStyle'>INFO</a><a class='anchorStyle'>CONFIRM</a>";
			 timeSlotsDetails+="<span>SELECT DATE:</span><input type='date' id='selectedDate' min="+(date.getFullYear()+"-"+month+"-"+date.getDate())+" value="+(date.getFullYear()+"-"+month+"-"+date.getDate())+"></input>";
			 if(responseText.response){
				 var slots=responseText.data.slots;
				 if(slots.length>0){
					 timeSlotsDetails+="<br/><span>SELECT SLOT:</span><select id='selectedSlotTime' onchange='slotTimeFunction()'><option value='Select Slot'>Select Slot</option>";
		          for(var i=0;i<slots.length;i++){
		           timeSlotsDetails+="<option value="+slots[i]+">"+slots[i]+"</option>";
		           }
		           timeSlotsDetails+="</select>";
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
			servicesData=getServices();
			var bindDetails="<a class='anchorStyle'>SERVICES</a><a  class='anchorStyle'>PROVIDER</a><a  class='anchorStyle'>DATE</a><a class='anchorStyle'>INFO</a><a class='anchorStyle'>CONFIRM</a><p style='margin-left:15px'>Choose Service</p><p style='margin-left:15px'>All Services</p>";
			
		//	alert(servicesData.data.services);
			for(var i=0;i<servicesData.data.services.length;i++){
				bindDetails+="<div class='serviceDetails' onclick='selectedServiceFunction(\""+servicesData.data.services[i].service_name+"\",\""+servicesData.data.services[i].staff_keys+"\",\""+servicesData.data.services[i].key+"\")'>";
				bindDetails+="<b class='service-name'>"+servicesData.data.services[i].service_name+"</b><span class='service-duration'>"+servicesData.data.services[i].duration+"</span><span class='service-cost'>"+servicesData.data.services[i].cost+"</span><hr/>"
				bindDetails+="</div>";
			}
			
			$("#detailsFetched").html(bindDetails);

}
function displayStaffMembers(){
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

</script>
</head>
<body>
<div id="body">

<div id="availableList" class='styleDiv'>
<div  id="bookingAppointment">
<a onclick='fetchDetails()'>Booking Appointment</a>
</div>
<div  id="staffMembers">
<a onclick='displayStaffMembers()'>Staff Members</a>
</div>
<div  id="services">
<a onclick='displayServices()'>Services</a>
</div>
</div>
<div id="detailsFetched" class='styleDiv'>
</div>
</div>
</body>
</html>