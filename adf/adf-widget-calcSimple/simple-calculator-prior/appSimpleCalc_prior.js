var calcSimpleApp = angular.module('calcSimpleApp', ['calcSimpleModule']);
var calcSimpleModule = angular.module('calcSimpleModule', []);

calcSimpleModel = {
    result: 0, // Holds the actual result in memory
    operation: "", // add, subtract, multiply and divide
    curNbr1: "0", c1: false, d1: false, // flag that curNbr1 input and decimal have been provided
    curNbr2: "0", c2: false, d2: false, // flag that curNbr2 input and decimal have been provided
    currentDisplay: "", // Shows the input string
    displayResult: "", // Shows the full input and result
    keydownkeycode: "",
    keyupkeycode: "",
    keypresskeycode: "",
    reset: function () {
        this.result = 0;
        this.operation = "";
        this.curNbr1 = "0"; this.c1 = false; this.d1 = false;
        this.curNbr2 = "0"; this.c2 = false; this.d2 = false;
        this.currentDisplay = "";
        this.displayResult = "";
    },
    setOperation: function (operationToSet) {
        if (this.c1 && this.c2) {
            this.curNbr1 = this.result.toString();
            this.c1 = true;
            this.result = 0;
            this.operation = operationToSet;
            this.curNbr2 = "0"; this.c2 = false; this.d2 = false;
            this.currentDisplay = "";
            this.displayResult = this.curNbr1 + " " + this.operation + " ";
        }
        if (this.operation === "") {
            this.operation = operationToSet;
            if (!this.c1 && !this.c2 && this.curNbr1 !== "0") {
                this.c1 = true;
                this.currentDisplay = "";
                this.displayResult += " " + this.operation + " ";
            }
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
};

calcSimpleModule.controller('calcSimpleController', ['$scope', function ($scope) {
    $scope.calcSimple = calcSimpleModel;
    $scope.numberButtonClicked = function (clickedNumber) {
        if (calcSimpleModel.c1 && calcSimpleModel.c2) {
            calcSimpleModel.reset();
        }
        if (clickedNumber === ".") {
            if (!calcSimpleModel.c1 && !calcSimpleModel.d1) {
                calcSimpleModel.d1 = true;
            } else if (calcSimpleModel.c1 && !calcSimpleModel.c2 && !calcSimpleModel.d2) {
                calcSimpleModel.d2 = true;
            } else clickedNumber = "";
        }
        if (!calcSimpleModel.c1 && clickedNumber === "0" && calcSimpleModel.curNbr1 === "0") {
            calcSimpleModel.currentDisplay = "";
            calcSimpleModel.displayResult = "";
        } else if (!calcSimpleModel.c1) {
            calcSimpleModel.curNbr1 += clickedNumber;
            calcSimpleModel.currentDisplay += clickedNumber;
            calcSimpleModel.displayResult += clickedNumber;
        } else {
            calcSimpleModel.curNbr2 += clickedNumber;
            calcSimpleModel.currentDisplay += clickedNumber;
            calcSimpleModel.displayResult += clickedNumber;
        }
    };

    $scope.operationButtonClicked = function (clickedOperation) {
            calcSimpleModel.setOperation(clickedOperation);
    };

    $scope.enterClicked = function () {
        if (calcSimpleModel.c1 && !calcSimpleModel.c2) {
            calcSimpleModel.calculate();
            calcSimpleModel.c2 = true;
            calcSimpleModel.currentDisplay = calcSimpleModel.result;
            calcSimpleModel.displayResult += " = " + calcSimpleModel.result;
        }
    };

    $scope.resetClicked = function () {
        calcSimpleModel.reset();
    };

    $scope.keypressevt = function () {
        calcSimpleModel.keypresskeycode = event.keyCode;
    };

}]);
