!function () {
    "use strict";

    //var calcSimpleApp = angular.module('calcSimpleApp', ['calcSimpleModule']);
    //var calcSimpleModule = angular.module('calcSimpleModule', []);

    angular.module("adf.widget.calcSimple", ["adf.provider"])
        .config(["dashboardProvider", function (e) {
            e.widget("calcS", {
                title: "Simple Calculator",
                description: "Add, Subtract, Multiply and Divide ",
                templateUrl: "{widgetsPath}/calcS/simpleCalc.html",
                controller: "calcSimpleController",
                reload: 0, // no refresh 
                //result: 0, // Holds the actual result in memory
                //operation: "", // add, subtract, multiply and divide
                //curNbr1: "0", c1: false, d1: false, // flag that curNbr1 input and decimal have been provided
                //curNbr2: "0", c2: false, d2: false, // flag that curNbr2 input and decimal have been provided
                //curDisplay: "", // Shows the input string
                //curResult: "", // Shows the full input and result
                //keydownkeycode: "",
                //keyupkeycode: "",
                //keypresskeycode: "",
                //reset: function () {
                //    this.result = 0;
                //    this.operation = "";
                //    this.curNbr1 = "0"; this.c1 = false; this.d1 = false;
                //    this.curNbr2 = "0"; this.c2 = false; this.d2 = false;
                //    this.curDisplay = "";
                //    this.curResult = "";
                //},
                //setOperation: function (operationToSet) {
                //    if (this.c1 && this.c2) {
                //        this.curNbr1 = this.result.toString();
                //        this.c1 = true;
                //        this.result = 0;
                //        this.operation = operationToSet;
                //        this.curNbr2 = "0"; this.c2 = false; this.d2 = false;
                //        this.curDisplay = "";
                //        this.curResult = this.curNbr1 + " " + this.operation + " ";
                //    }
                //    if (this.operation === "") {
                //        this.operation = operationToSet;
                //        if (!this.c1 && !this.c2 && this.curNbr1 !== "0") {
                //            this.c1 = true;
                //            this.curDisplay = "";
                //            this.curResult += " " + this.operation + " ";
                //        }
                //    }
                //},
                //calculate: function () {
                //    switch (this.operation) {
                //        case "+": this.result = parseFloat(this.curNbr1) + parseFloat(this.curNbr2); break;
                //        case "-": this.result = parseFloat(this.curNbr1) - parseFloat(this.curNbr2); break;
                //        case "/": this.result = parseFloat(this.curNbr1) / parseFloat(this.curNbr2); break;
                //        case "*": this.result = parseFloat(this.curNbr1) * parseFloat(this.curNbr2); break;
                //        default: break;
                //    }
                //}

            })
        }])

       .controller('calcSimpleController', ['$scope', function ($scope) {
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
                   calcSimpleModel.curDisplay = "";
                   calcSimpleModel.curResult = "";
               } else if (!calcSimpleModel.c1) {
                   calcSimpleModel.curNbr1 += clickedNumber;
                   calcSimpleModel.curDisplay += clickedNumber;
                   calcSimpleModel.curResult += clickedNumber;
               } else {
                   calcSimpleModel.curNbr2 += clickedNumber;
                   calcSimpleModel.curDisplay += clickedNumber;
                   calcSimpleModel.curResult += clickedNumber;
               }
           };
           $scope.operationButtonClicked = function (clickedOperation) {
               calcSimpleModel.setOperation(clickedOperation);
           };
           $scope.enterClicked = function () {
               if (calcSimpleModel.c1 && !calcSimpleModel.c2) {
                   calcSimpleModel.calculate();
                   calcSimpleModel.c2 = true;
                   calcSimpleModel.curDisplay = calcSimpleModel.result;
                   calcSimpleModel.curResult += " = " + calcSimpleModel.result;
               }
           };
           $scope.resetClicked = function () {
               calcSimpleModel.reset();
           };
           $scope.keypressevt = function () {
               calcSimpleModel.keypresskeycode = event.keyCode;
           };
       }])

    angular.module("adf.widget.calcSimple").run(["$templateCache", function (e) {
        e.put("{widgetsPath}/calcS/simpleCalc.html", '<div><div class="section group">' +
        '<div class="col c5of5">{{calcSimple.curResult}}</div></div>' +
        '<div class="section group"><div class="col c4of5">{{calcSimple.curDisplay}}</div>' +
        '<div ng-click="resetClicked()" class="col c1of5">C</div></div>' +
        '<div class="section group">' +
        '<div ng-click="numberButtonClicked(7)" class="col c1of5">7</div>' +
        '<div ng-click="numberButtonClicked(8)" class="col c1of5">8</div>' +
        '<div ng-click="numberButtonClicked(9)" class="col c1of5">9</div>' +
        '<div ng-click="operationButtonClicked(&#39;&#47;&#39;)" class="col c1of5"><b>/</b></div>' +
        '<div ng-click="operationButtonClicked(&#39;&#42;&#39;)" class="col c1of5"><b>*</b></div></div>' +
        '<div class="section group">' +
        '<div ng-click="numberButtonClicked(4)" class="col c1of5">4</div>' +
        '<div ng-click="numberButtonClicked(5)" class="col c1of5">5</div>' +
        '<div ng-click="numberButtonClicked(6)" class="col c1of5">6</div>' +
        '<div ng-click="operationButtonClicked(&#39;&#45;&#39;)" class="col c2of5"><b>-</b></div></div>' +
        '<div class="section group">' +
        '<div ng-click="numberButtonClicked(1)" class="col c1of5">1</div>' +
        '<div ng-click="numberButtonClicked(2)" class="col c1of5">2</div>' +
        '<div ng-click="numberButtonClicked(3)" class="col c1of5">3</div>' +
        '<div ng-click="operationButtonClicked(&#39;&#43;&#39;)" class="col c2of5"><b>+</b></div></div>' +
        '<div class="section group">' +
        '<div ng-click="numberButtonClicked(0)" class="col c1of5">0</div>' +
        '<div ng-click="numberButtonClicked(&#39;&#46;&#39;)" class="col c1of5"><sup><b>.</b></sup></div>' +
        '<div ng-click="enterClicked()" class="col c3of5">Enter</div></div>' +
        //'<div class="c5of5xl"><center><p style="font-size:small;color:white">' +
        //'Use mouse above or click below for keyboard.</p></center><center>' +
        //'<input type="number" ng-keypress="keypressevt()" class="inkey-box" /></center></div>' +
        '</div>')
    }])
}(window);
