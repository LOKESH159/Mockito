var Router=Backbone.Router.extend({
	routes:{
		'':'home',
		'services':'getServices',
		'providers':'getProviders',
		'bookingappointment':'bookingAppoinment'
	},
	home:function(){
		console.log("Iam in home");
		var viewHomePage=new  ViewHomePage();
		viewHomePage.render();
	},
	getServices:function(){
		console.log("Iam in get services");
		var getServicesView=new GetServicesView();
		getServicesView.render();
		
	},
	getProviders:function(){
		console.log("Iam in get providers");
		var viewProviders=new ViewProviders();
		viewProviders.render();
	},
	bookingAppoinment:function(){
		console.log("Iam in boobking appointmnet");
		var viewBookingAppointment=new ViewBookingAppointment();
		viewBookingAppointment.render();
	}
	
})