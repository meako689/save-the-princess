'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('currentChallengeCtrl', ['$scope', '$rootScope', '$state','Restangular', function ($scope, $rootScope, $state, $restangular) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

      if (toState.name === "challenge.currentMale") {
        $restangular.one("challenge").customGET("male/current").then(function(item){
          $scope.challenge = item;
        })
      }
    });

    $scope.applyChallenge = function(){
      $restangular.one("challenge", challengeId).customGET("apply").then(function(resp){
        debugger;
      })
    }

  }]);
}
