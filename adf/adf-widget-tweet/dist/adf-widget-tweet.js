(function(window, undefined) {'use strict';
/*
 * The MIT License
 *
 * Copyright (c) 2015, Juan Méndez (https://github.com/dersteppenwolf/)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */



angular.module('adf.widget.tweet', ['adf.provider'])
  .config(["dashboardProvider", function(dashboardProvider){
    dashboardProvider
      .widget('tweet', {
        title: 'Tweet',
        description: 'Displays an embedded Tweet',
        templateUrl: '{widgetsPath}/tweet/src/view.html',
        controller: 'tweetCtrl',
        resolve: {
          tweetData: ["tweetService", "config", function(tweetService, config){
            if (config.url){
              return tweetService.get(config.url);
            }
          }]
        },
        edit: {
          templateUrl: '{widgetsPath}/tweet/src/edit.html'
        }
      });
  }])
  .service('tweetService', ["$q", "$http", function($q, $http){
    return {
      get: function(url){
        var deferred = $q.defer();
        var tweetOembed = 'https://api.twitter.com/1/statuses/oembed.json?callback=JSON_CALLBACK&url='+ url;
        $http.jsonp(tweetOembed).success(function(data){
            console.log(data);
            if (data  ){
              deferred.resolve(data);
            } else {
              deferred.reject();
            }
          })
          .error(function(){
            deferred.reject();
          });
        return deferred.promise;
      }
    };
  }])
  .controller('tweetCtrl', ["$scope", "$sce", "tweetData", function($scope,$sce, tweetData){
    $scope.tweetData = tweetData;
    $scope.tweetHtml = $sce.trustAsHtml(tweetData.html);
  }]);

angular.module("adf.widget.tweet").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/tweet/src/edit.html","<form role=form><div class=form-group><label for=url>Feed url</label> <input type=url class=form-control id=url ng-model=config.url placeholder=\"Enter Tweet url\"></div></form>");
$templateCache.put("{widgetsPath}/tweet/src/view.html","<div class=news><div class=\"alert alert-info\" ng-if=!tweetHtml>Please insert a tweet url in the widget configuration</div><div ng-bind-html=tweetHtml></div></div>");}]);})(window);