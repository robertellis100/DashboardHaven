'use strict';

var app = angular.module('adf.widget.adf-widget-investments', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('adf-widget-investments', {
        title: 'Investment Analyzer',
        description: 'Review your business....Fill this in later',
        controller: 'InvestmentController',
        templateUrl: '{widgetsPath}/adf-widget-investments/src/view.html',
        edit: {
          controller: 'RequestController',
          templateUrl: '{widgetsPath}/adf-widget-investments/src/edit.html'
        }
      }); 
  });