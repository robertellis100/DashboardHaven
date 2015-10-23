(function(window, undefined) {'use strict';
var app = angular.module('adf.widget.investments', ['adf.provider'])
  .config(["dashboardProvider", function(dashboardProvider){
    dashboardProvider
      .widget('investments', {
        title: 'Investment Analyzer',
        description: 'Current financial information on public companies',
        templateUrl: '{widgetsPath}/adf-widget-investments/src/view.html',
        controller: 'RequestController',
        reload: true,
        resolve: {
          data: ["RequestService", "config", function(RequestService, config){
            if (config.ticker){
              return RequestService.getCompanyByTicker(config.ticker);
            } //multiple api call use 
          }]//http://www.martin-brennan.com/using-q-all-to-resolve-multiple-promises/
        },
        //edit: null
        edit: {
           //controller: 'RequestController',
           templateUrl: '{widgetsPath}/adf-widget-investments/src/edit.html'
        }
      }); 
  }]);
angular.module("adf.widget.investments").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/adf-widget-investments/src/edit.html","<div><form role=form><div class=form-group><label for=sample>Gather information about your investements</label> <input type=text class=form-control id=sample ng-model=config.ticker placeholder=\"Enter Company Ticker\"></div></form></div>");
$templateCache.put("{widgetsPath}/adf-widget-investments/src/view.html","<div><div ng-if=investment><h5>{{investment.name.substr(0,investment.name.indexOf(\'(\'))}}</h5><p>As of {{investment.data[0][0] | date:\'dd/MM/yyyy\'}} {{investment.dataset_code}} closed at an adjusted price of {{investment.data[0][11] | currency}} and had a volume of {{investment.data[0][12] | number:0}}.</p></div></div>");}]);
var app = angular.module('adf.widget.investments');
app.controller('RequestController', RequestController);


function RequestController($scope, data) {
    // $scope.getCompanyByTicker = function () {
    //     RequestService.getCompanyByTicker($scope.ticker).then(function (data) {
             $scope.investment = data;
             if(data){
                updateTitle();
             }
              //     });
    // }
    
     function updateTitle() {
        $scope.$parent.model.title = "Investment Analyzer - " + $scope.investment.dataset_code;;
     }
}
RequestController.$inject = ["$scope", "data"];



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