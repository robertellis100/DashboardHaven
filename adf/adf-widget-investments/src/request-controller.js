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


