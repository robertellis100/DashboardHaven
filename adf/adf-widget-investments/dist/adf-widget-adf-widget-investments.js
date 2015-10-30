(function(window, undefined) {'use strict';
var app = angular.module('adf.widget.investments', ['adf.provider','chart.js'])
  .config(["dashboardProvider", function(dashboardProvider){
    dashboardProvider
      .widget('investments', {
        title: 'Investment Analyzer',
        description: 'Current financial information on public companies',
        templateUrl: '{widgetsPath}/adf-widget-investments/src/view.html',
        controller: 'RequestController',
        //controller2: 'LineCtrl',
        reload: true,
        resolve: {
          data: ["RequestService", "config", function(RequestService, config){
            if (config.ticker){
              return RequestService.getCompanyByTicker(config.ticker);
            } //multiple api call use $q.all()
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
$templateCache.put("{widgetsPath}/adf-widget-investments/src/view.html","<div><div ng-if=investment><h5>{{investment.name.substr(0,investment.name.indexOf(\'(\'))}}</h5><p>As of {{investment.data[0][0] | date:\'MM/dd/yyyy\'}} {{investment.dataset_code}} closed at an adjusted price of {{investment.data[0][11] | currency}} and had a volume of {{investment.data[0][12] | number:0}}.</p><div class=\"btn-group text-center\"><span type=button class=\"btn btn-default\" ng-class=\"{active: active === \'week\'}\" ng-click=\"changeRange(5, \'week\')\">5 Days</span> <span type=button class=\"btn btn-default\" ng-class=\"{active: active === \'month\'}\" ng-click=\"changeRange(20, \'month\')\">1 Month</span> <span type=button class=\"btn btn-default\" ng-class=\"{active: active === \'months\'}\" ng-click=\"changeRange(60, \'months\')\">3 Months</span> <span type=button class=\"btn btn-default\" ng-class=\"{active: active === \'year\'}\" ng-click=\"changeRange(260, \'year\')\">1 Year</span></div><canvas id=line class=\"chart chart-line\" chart-data=data chart-labels=labels chart-legend=true chart-series=series chart-click=onClick></canvas></div></div>");}]);
var app = angular.module('adf.widget.investments');
app.controller('RequestController', RequestController);

function RequestController($scope, data) {
    // $scope.getCompanyByTicker = function () {
    //     RequestService.getCompanyByTicker($scope.ticker).then(function (data) {
    $scope.investment = data;
    if(data){
      updateTitle();
      arrangeData(5);
      $scope.active = 'week';
    }
    //     });
    // }
    
     function updateTitle() {
        $scope.$parent.model.title = "Investment Analyzer - " + $scope.investment.dataset_code;;
     }
     function arrangeData(x){
        //for each dataPoint in array push to array
        var newDataDate=[];
        var newDataPrice=[];
        var newDataVolume=[];
        var dataSet=[];
       //shrink the dataSet
       for (var i = x; i >= 0; i--) {
          dataSet.push($scope.investment.data[i]);
       }
        
       dataSet.forEach(function(dataPoint, i) {
         if(x > 60){
           if(i % 10 == 0){
              newDataDate.push(dataPoint[0]);
           }
         } else if(x > 20 && x < 61){
           if(i % 2 == 0){
              newDataDate.push(dataPoint[0]);
           }
         } else {
            newDataDate.push(dataPoint[0]);
         }
       });
       dataSet.forEach(function(dataPoint) {
         newDataPrice.push(dataPoint[4]);
       });
       dataSet.forEach(function(dataPoint) {
         newDataVolume.push(dataPoint[5]);
       });
       chartIt(newDataDate,newDataPrice,newDataVolume);
     }
     function chartIt(newDataDate,newDataPrice,newDataVolume){
         $scope.labels = newDataDate;
        // $scope.series = [$scope.investment.column_names[4], $scope.investment.column_names[5]];
        // $scope.data = [
        //   newDataPrice,
        //   newDataVolume
        // ];
        $scope.series = [$scope.investment.column_names[4]+" Price"];
        $scope.data = [
          newDataPrice
        ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
     }
     
     $scope.changeRange =function(x, name){
       arrangeData(x);
       $scope.active = name;
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