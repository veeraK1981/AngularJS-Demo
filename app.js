var app = angular.module('app',['ngRoute', 'angularUtils.directives.dirPagination']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/dictionary',{
		templateUrl:'dictionary.htm',
		controller:'dictionaryctrl'
	}).
	when('/marketing',{
		templateUrl:'computersolutions/home.htm',
		controller:'marketingctrl'
	}).
	when('/marketing/home',{
		templateUrl:'computersolutions/home.htm',
		controller:'marketingctrl'
	}).
	when('/marketing/projects',{
		templateUrl:'computersolutions/projects.htm',
		controller:'marketingctrl'
	}).
	when('/marketing/about',{
		templateUrl:'computersolutions/about.htm',
		controller:'marketingctrl'
	}).
	when('/marketing/contact',{
		templateUrl:'computersolutions/contact.htm',
		controller:'marketingctrl'
	}).
	when('/marketing/projectdetail/:param1',{
		templateUrl:'computersolutions/projectdetail.htm',
		controller:'prodetailctrl'
	}).
	when('/marketing/viewdetails/:param1',{
		templateUrl:'computersolutions/viewdetails.htm',
		controller:'viewdetailctrl'
	}).
	otherwise({redirectTo:'/dictionary'});

}]);


app.controller('dictionaryctrl', ["$scope", "$http", "$log", function($scope, $http, $log){
		
//	$http({
//	url : "https://services.odata.org/Northwind/Northwind.svc/Customers?$format=json",
//	method : 'GET'
//	
//}).then(function(resp){
//	$scope.names = resp.data.value;
//	$log.log(resp.data.CompanyName)
//},function(resp){
//	
//})

$http.get("source.json").then(function(resp){
	$scope.names = resp.data;
	
},function(resp){
	console.log($scope.names);
});

$scope.doSearch = function(){
	
	
	$http.get("source.json").then(function(resp){
		
		var my_json = JSON.stringify(resp.data);
		
		var filtered_json = JSON.parse(my_json).filter(function (entry) {
		    if (entry.french.indexOf($scope.search) !== -1){
		    	return entry.french;
		    }else if (entry.english.indexOf($scope.search) !== -1){
		    	return entry.english;
		    };
		});
		
		$scope.names = filtered_json;
		
	},function(resp){
		
	})
}

}]);


app.controller('marketingctrl', ["$scope", "$http", "$log", "$window", "$location", function($scope, $http, $log, $window, $location){

$http.get("projects.json").then(function(resp){
	$scope.projects = resp.data;
	
},function(resp){
	console.log($scope.projects);
});

$scope.prodetail = function(p) {
 $location.path('/marketing/projectdetail/'+ p.id);
}

}]);


app.controller('prodetailctrl', ["$scope", "$http", "$log", "$window", "$routeParams", function($scope, $http, $log, $window, $routeParams){
var pid = $routeParams.param1;
//$window.alert(pid);

$http.get("projects.json").then(function(resp){
		
		var my_json = JSON.stringify(resp.data);
		
		var filtered_json = JSON.parse(my_json).filter(function (entry) {
		    if (entry.id == pid ){
				//$window.alert(entry.name);
				return entry;
						
		    };
		});
		
		$scope.project = filtered_json;
		
	},function(resp){
		console.log($scope.project);
	})


}]);



app.controller('viewdetailctrl', ["$scope", "$http", "$log", "$window", "$routeParams", function($scope, $http, $log, $window, $routeParams){
var param1 = $routeParams.param1;
//$window.alert(param1);
$scope.pageview = param1;



}]);