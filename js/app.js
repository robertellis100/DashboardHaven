var app = angular.module('dashboardHaven', ['adf', 'adf.structures.base', 'adf.widget.clock']);

app.controller('MainController', MainController)

function MainController($timeout) {

    var vm = this; //using vm to make things easier
    vm.working = "Yes";

}
