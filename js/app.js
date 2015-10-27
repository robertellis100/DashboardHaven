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

    calcSimpleModel = {
        result: 0, // Holds the actual result in memory
        operation: "", // add, subtract, multiply and divide
        curNbr1: "0", c1: false, d1: false, // flag that curNbr1 input and decimal have been provided
        curNbr2: "0", c2: false, d2: false, // flag that curNbr2 input and decimal have been provided
        curDisplay: "", // Shows the input string
        curResult: "", // Shows the full input and result
        keydownkeycode: "",
        keyupkeycode: "",
        keypresskeycode: "",
        reset: function () {
            this.result = 0;
            this.operation = "";
            this.curNbr1 = "0"; this.c1 = false; this.d1 = false;
            this.curNbr2 = "0"; this.c2 = false; this.d2 = false;
            this.curDisplay = "";
            this.curResult = "";
        },
        setOperation: function (operationToSet) {
            if (this.c1 && this.c2) {
                this.curNbr1 = this.result.toString();
                this.c1 = true;
                this.result = 0;
                this.operation = operationToSet;
                this.curNbr2 = "0"; this.c2 = false; this.d2 = false;
                this.curDisplay = "";
                this.curResult = this.curNbr1 + " " + this.operation + " ";
            }
            if (this.operation === "" && !this.c1 && !this.c2 && this.curNbr1 !== "0") {
                    this.operation = operationToSet;
                    this.c1 = true;
                    this.curDisplay = "";
                    this.curResult += " " + this.operation + " ";
            }
        },
        calculate: function () {
            switch (this.operation) {
                case "+": this.result = parseFloat(this.curNbr1) + parseFloat(this.curNbr2); break;
                case "-": this.result = parseFloat(this.curNbr1) - parseFloat(this.curNbr2); break;
                case "/": this.result = parseFloat(this.curNbr1) / parseFloat(this.curNbr2); break;
                case "*": this.result = parseFloat(this.curNbr1) * parseFloat(this.curNbr2); break;
                default: break;
            }
        }
    }

}
