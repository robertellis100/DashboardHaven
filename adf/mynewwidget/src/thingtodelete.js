'use strict';

angular.module('adf.widget.thingtodelete', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('thingtodelete', {
        title: 'bah',
        description: 'dus stuff almd things',
        templateUrl: '{widgetsPath}/thingtodelete/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/thingtodelete/src/edit.html'
        }
      });
  });
