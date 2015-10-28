var app = angular.module('adf.widget.investments', ['adf.provider','chart.js'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('investments', {
        title: 'Investment Analyzer',
        description: 'Current financial information on public companies',
        templateUrl: '{widgetsPath}/adf-widget-investments/src/view.html',
        controller: 'RequestController',
        //controller2: 'LineCtrl',
        reload: true,
        resolve: {
          data: ["RequestService", "config", function(RequestService, config){
            if (config.ticker){
              return RequestService.getCompanyByTicker(config.ticker);
            } //multiple api call use $q.all()
          }]//http://www.martin-brennan.com/using-q-all-to-resolve-multiple-promises/
        },
        //edit: null
        edit: {
           //controller: 'RequestController',
           templateUrl: '{widgetsPath}/adf-widget-investments/src/edit.html'
        }
      }); 
  });