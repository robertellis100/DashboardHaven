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


