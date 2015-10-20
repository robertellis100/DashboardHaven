var app = angular.module('dashboardHaven', ['adf', 'adf.structures.base', 'adf.widget.clock', 'adf.widget.weather', 'adf.widget.news', 'adf.widget.thingtodelete']);

app.controller('MainController', MainController) 

function MainController($timeout, $rootScope) {

    var vm = this; //using vm to make things easier
    vm.working = "Yes";
    vm.model = getFromStorage();
    $rootScope.$on('adfDashboardChanged', function (e, name, model) {
        var sLayout = JSON.stringify(model);
        localStorage.setItem(name, sLayout);
    });

    vm.addToNewsTitle = "";

    function logStuff(userData) {
        if (typeof userData === "string") {
            console.log("MainController string : " + userData);
        } else if (typeof userData === "object") {
            for (var item in userData) {
                console.log("MainController object : " + item + ":" + userData[item]);
                if (typeof userData[item] === "object") {
                    for (var j in userData[item]) {
                        console.log("  Subobject : " + j + ":" + userData[item.j]);
                    }
                }
            }
        }
    }

    function getFromStorage() {
        //get from local storage
        //parse the json back into an object
        //return the object.
        return JSON.parse(localStorage.getItem("mydashboard"));

    }
    //logStuff(vm);
    //logStuff(app);
}
