var app = angular.module('dashboardHaven', ['firebase', 'adf', 'adf.structures.base', 'adf.widget.clock', 'adf.widget.weather', 'adf.widget.iframe', 'adf.widget.news', 'adf.widget.investments', 'adf.widget.calcSimple']);

app.controller('MainController', MainController)

function MainController($timeout, $rootScope, $firebaseArray, $firebaseObject) {
    var vm = this;
    vm.db = new Firebase('https://dazzling-torch-8526.firebaseio.com/')
    vm.dashref = vm.db.child('dashboard');
    vm.dashboard = $firebaseObject(vm.dashref)
    vm.working = "Yes";
    vm.displayResult = "from MainController";
    vm.model = getFromStorage();

    $rootScope.$on('adfDashboardChanged', function (e, name, model) {
        //TODO: SEND TO DB
        // var sLayout = JSON.stringify(model);
        // localStorage.setItem(name, sLayout);
        console.log('saving')
        vm.dashboard[name] = model;
        vm.dashboard.$save();
    });

    function getFromStorage() {
        // return JSON.parse(localStorage.getItem("mydashboard"));
        // return vm.dashboard
    }

}
