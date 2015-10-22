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
