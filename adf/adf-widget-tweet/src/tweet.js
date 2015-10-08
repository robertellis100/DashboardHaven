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

'use strict';

angular.module('adf.widget.tweet', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('tweet', {
        title: 'Tweet',
        description: 'Displays an embedded Tweet',
        templateUrl: '{widgetsPath}/tweet/src/view.html',
        controller: 'tweetCtrl',
        resolve: {
          tweetData: function(tweetService, config){
            if (config.url){
              return tweetService.get(config.url);
            }
          }
        },
        edit: {
          templateUrl: '{widgetsPath}/tweet/src/edit.html'
        }
      });
  })
  .service('tweetService', function($q, $http){
    return {
      get: function(url){
        var deferred = $q.defer();
        var tweetOembed = 'https://api.twitter.com/1/statuses/oembed.json?callback=JSON_CALLBACK&url='+ url;
        $http.jsonp(tweetOembed).success(function(data){
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
  })
  .controller('tweetCtrl', function($scope,$sce, tweetData){
    $scope.tweetData = tweetData;
    $scope.tweetHtml = $sce.trustAsHtml(tweetData.html);
  });
