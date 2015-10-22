(function(window, undefined) {'use strict';
var app = angular.module('adf.widget.investments', ['adf.provider'])
  .config(["dashboardProvider", function(dashboardProvider){
    dashboardProvider
      .widget('investments', {
        title: 'Investment Analyzer',
        description: 'Review your business....Fill this in later',
        templateUrl: '{widgetsPath}/adf-widget-investments/src/view.html',
        edit: {
          controller: 'RequestController',
          templateUrl: '{widgetsPath}/adf-widget-investments/src/edit.html'
        }
      }); 
  }]);
angular.module("adf.widget.investments").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/adf-widget-investments/src/edit.html","<div><form role=form><div class=form-group><label for=sample>Gather information about your investements {{test}}</label> <input type=text class=form-control id=sample ng-model=ticker placeholder=\"Enter Company Ticker\"> <button ng-click=getCompanyByTicker() class=\"btn btn-primary\">Get Info!</button></div></form><div><h1>{{investment.name}}</h1></div></div>");
$templateCache.put("{widgetsPath}/adf-widget-investments/src/view.html","<div ng-controller=RequestController><div ng-if=investment><h5>{{investment.name.substr(0,investment.name.indexOf(\'(\'))}}</h5><p>As of {{investment.data[0][0] | date:\'dd/MM/yyyy\'}} {{investment.dataset_code}} closed at a price of {{investment.data[0][11] | currency}} and had a volume of {{investment.data[0][12] | number:0}}.</p></div><form role=form><div class=form-group><input type=text class=form-control id=sample ng-model=ticker placeholder=\"Enter Company Name or Ticker\"> <button ng-click=getCompanyByTicker() class=\"btn btn-primary\">Get Info!</button></div></form></div>");}]);
var app = angular.module('adf.widget.investments');
app.controller('RequestController', RequestController);


function RequestController(RequestService, $scope){
	$scope.getCompanyByTicker = function(){
    	RequestService.getCompanyByTicker($scope.ticker).then(function(data){
			$scope.investment = data;
			console.log(data);
		});      
	}
}
RequestController.$inject = ["RequestService", "$scope"];

var app = angular.module('adf.widget.investments');
app.service('RequestService', RequestService)

function RequestService ($http){
	var _company = '';
	var _token = 'EYWa43Yiw7xreqxtDcYs';
	
	this.getCompanyByTicker = function(ticker){
		var url = 'https://www.quandl.com/api/v3/datasets/WIKI/'+ticker+'.json?api_key='+ _token;
		return $http.get(url)
			.then(function(res){
				_company = res.data.dataset;
				return _company;
			})
	}
	
	this.getActiveCompany = function(){
		return _company;
	}
}
RequestService.$inject = ["$http"];})(window);