'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('currentChallengeCtrl', ['$scope', '$rootScope', '$state', '$http', function ($scope, $rootScope, $state, $http) {

    function fetchCurrentChallenge(){
      $http({method: 'GET', url: '/api/challenge/male/current'})
        .success(function(data, status, headers, config) {
          debugger;

          $scope.challenge = data;

      });
    }

    fetchCurrentChallenge();

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (toState.name === "main.challenge.currentMale" && !$scope.challenge) {
        fetchCurrentChallenge();
      }
    });


  }]);
}
