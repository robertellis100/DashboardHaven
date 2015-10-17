(function(window, undefined) {'use strict';


angular.module('adf.widget.thingtodelete', ['adf.provider'])
  .config(["dashboardProvider", function(dashboardProvider){
    dashboardProvider
      .widget('thingtodelete', {
        title: 'bah',
        description: 'dus stuff almd things',
        templateUrl: '{widgetsPath}/thingtodelete/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/thingtodelete/src/edit.html'
        }
      });
  }]);

angular.module("adf.widget.thingtodelete").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/thingtodelete/src/edit.html","<form role=form><div class=form-group><label for=sample>Sample</label> <input type=text class=form-control id=sample ng-model=config.sample placeholder=\"Enter sample\"></div></form>");
$templateCache.put("{widgetsPath}/thingtodelete/src/view.html","<div><h1>Widget view</h1><p>Content of {{config.sample}}</p></div>");}]);})(window);