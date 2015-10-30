(function(window, undefined) {'use strict';


angular.module('adf.widget.iframe', ['adf.provider'])
  .config(["dashboardProvider", function(dashboardProvider){
    dashboardProvider
      .widget('iframe', {
        title: 'iframe',
        description: 'Embed an external page into the dashboard',
        templateUrl: '{widgetsPath}/iframe/src/view.html',
        controller: 'iframeController',
        controllerAs: 'iframe',
        edit: {
          templateUrl: '{widgetsPath}/iframe/src/edit.html'
        },
        config: {
          height: '420px'
        }
      });
  }])
  .controller('iframeController', ["$sce", "config", function($sce, config){
    if (config.url){
      this.url = $sce.trustAsResourceUrl(config.url);
    }
  }]);

angular.module("adf.widget.iframe").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/iframe/src/edit.html","<form role=form><div class=form-group><label for=url>URL</label> <input type=url class=form-control id=url ng-model=config.url placeholder=http://www.example.com></div><div><table><tr><th>News</th><th>Search</th><th>Class Projects</th><th>Internet Radio</th></tr><tr><td><input type=radio name=dh value=http://www.cnn.com ng-model=config.url>CNN Home Page</td><td><input type=radio name=dh value=http://www.bing.com ng-model=config.url>Bing Search Engine</td><td><input type=radio name=dh value=http://www. ng-model=config.url>Food Trucks Search</td><td><input type=radio name=dh value=http://www.slacker.com ng-model=config.url>Slacker Radio</td></tr><tr><td></td><td><input type=radio name=dh value=http://www.duckduckgo.com ng-model=config.url>DuckDuckGo Search</td><td><input type=radio name=dh value=http://www. ng-model=config.url>Bullied Haven</td></tr><tr><td></td><td></td><td><input type=radio name=dh value=http://www. ng-model=config.url>Twitter Search</td></tr><tr><td></td><td></td><td><input type=radio name=dh value=http://www.trugrocer.com/bcw/indextest.htm ng-model=config.url>Dashboard</td></tr><tr><td></td><td></td><td></td></tr></table></div><div class=form-group><label for=url>Height</label> <input type=text class=form-control id=url ng-model=config.height></div></form>");
$templateCache.put("{widgetsPath}/iframe/src/view.html","<div><div class=\"alert alert-info\" ng-if=!config.url>Please insert a url in the widget configuration</div><iframe ng-if=iframe.url class=adf-iframe style=\"height: {{config.height}}\" src={{iframe.url}}></iframe></div>");}]);})(window);