var app = angular.module('dashboardHaven', ['adf', 'adf.structures.base', 'adf.widget.clock', 'adf.widget.weather', 'adf.widget.news']);

app.controller('MainController', MainController) 

function MainController($timeout) {

    var vm = this; //using vm to make things easier
    vm.working = "Yes";

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
    //logStuff(vm);
    //logStuff(app);
}
