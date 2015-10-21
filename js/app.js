var app = angular.module('dashboardHaven', ['adf', 'adf.structures.base', 'adf.widget.clock', 'adf.widget.weather', 'adf.widget.news', 'adf.widget.investments' ]);

app.controller('MainController', MainController) 

function MainController($timeout, $rootScope) {

    var vm = this; //using vm to make things easier
    vm.working = "Yes";
    vm.model = getFromStorage();
    $rootScope.$on('adfDashboardChanged', function (e, name, model) {
        //TODO: SEND TO DB
        var sLayout = JSON.stringify(model);
        localStorage.setItem(name, sLayout);
    });

    function getFromStorage() {
        //get from local storage
        //parse the json back into an object
        //return the object.
        return JSON.parse(localStorage.getItem("mydashboard"));
    }

}
