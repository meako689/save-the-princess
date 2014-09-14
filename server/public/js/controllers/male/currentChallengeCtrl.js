'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('currentChallengeCtrl', ['$scope', '$rootScope', '$state', '$http', function ($scope, $rootScope, $state, $http) {

    function fetchCurrentChallenge(){
      $http({method: 'GET', url: '/api/challenge/male/current'})
        .success(function(data, status, headers, config) {
          console.log("challenge", data);
          $scope.challenge = data;
      });
    }

    fetchCurrentChallenge();

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (toState.name === "main.challenge.currentMale") {
        fetchCurrentChallenge();
      }
    });

    $scope.progress = 0;
    var i = 0;

    $scope.apply = function(){
      $scope.progress += 33.333333333333;
      $scope.challenge.steps[i].done = true;
      i+= 1;
      $scope.challenge.steps[i].active = true;

    }

    $scope.$watch("progress", function(val){
      if(val && val > 99.99){
        console.log("done");
        $state.transitionTo("main.challenge.finishedMale");
      }
    })


  }]);
}
