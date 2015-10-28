var app = angular.module('dashboardHaven', ['adf', 'adf.structures.base', 'adf.widget.clock', 'adf.widget.weather', 'adf.widget.news', 'adf.widget.investments', 'adf.widget.calcSimple']);

app.controller('MainController', MainController) 

function MainController($timeout, $rootScope) {

    var vm = this;
    vm.working = "Yes";
    vm.displayResult = "from MainController";
    vm.model = getFromStorage();

    $rootScope.$on('adfDashboardChanged', function (e, name, model) {
        //TODO: SEND TO DB
        var sLayout = JSON.stringify(model);
        localStorage.setItem(name, sLayout);
    });

    function getFromStorage() {
        return JSON.parse(localStorage.getItem("mydashboard"));
    }

}
