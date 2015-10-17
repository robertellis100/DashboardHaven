'use strict';

angular.module('adf.widget.mortageCalc', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('mortageCalc', {
        title: 'calculator-mortgage',
        description: 'you can change this later',
        templateUrl: '{widgetsPath}/mortageCalc/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/mortageCalc/src/edit.html'
        }
      });
  });
