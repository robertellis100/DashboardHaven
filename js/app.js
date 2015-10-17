var app = angular.module('dashboardHaven', ['adf', 'adf.structures.base', 'adf.widget.clock', 'adf.widget.weather', 'adf.widget.news']);

app.controller('MainController', MainController) 

function MainController($timeout) {

    var vm = this; //using vm to make things easier
    vm.working = "Yes";

}
