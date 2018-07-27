<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1" session="false"%>
<%
HttpSession session=request.getSession(false);
if(session!=null){
	System.out.print("USERNAME VALUE IS="+(String)session.getAttribute("userName"));
	System.out.print("ENAIL VALUE IS="+(String)session.getAttribute("eMail"));
	System.out.print("DATE VALUE IS="+(Long)session.getAttribute("createdDate"));
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Customer Booking Page</title>
<link rel="stylesheet" href="/css/styles.css">

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="/scripts/setmore.js"></script>

</head>
<body>
	<div id="body">

		<div id="availableList" class='styleDiv'>
			<div id="bookingAppointment">
				<a onclick='bookAppointmentView()'>Booking Appointment</a>
			</div>
			<div id="staffMembers">
				<a onclick='displayStaffMembers()'>Staff Members</a>
			</div>
			<div id="services">
				<a onclick='displayServices()'>Services</a>
			</div>
		</div>
		<div id="detailsFetched" class='styleDiv'>
			<div id='loadingGif'>
				<img src="/gif/setmore-loader.gif" alt="loading">
			</div>
		</div>
		<div id="customersList"></div>
	
	</div>
<script>
  window.intercomSettings = {
    app_id: "ejh3fr3g",
    name:" \'<%=((String)session.getAttribute("userName"))%>\'  ", 
    email:" \"<%=((String)session.getAttribute("eMail"))%>\" ",
    created_at:<%=session.getAttribute("createdDate")%>
  };
</script>

<script>(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reatt  .lach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/APP_ID';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()</script>
</body>[]
</html>
<%}
else{
	response.sendRedirect("/Login.html");

}
%>