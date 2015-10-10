app.service('InvestmentController', InvestmentController);


function InvestmentController(RequestService, $scope){
	$scope.investment = RequestService.getActiveCompany();
}