'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('challengeCtrl', ['$scope', '$rootScope', '$state','Restangular', function ($scope, $rootScope, $state, $restangular) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

      if (toState.name === "challenge" && toParams.chId) {
        var challengeId = toParams.chId;
        console.log(challengeId);

        $restangular.one("challenge", challengeId).get().then(function(item){
          $scope.challenge = item;
          console.log(item);
        })

      }
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (fromState.name === "main.challenge") {
        $scope.x = undefined;
      }
    });

    $scope.applyChallenge = function(){

      $http({method: 'POST', url: '/api/challenge/' + $scope.x._id + '/apply'})
        .success(function(data, status, headers, config) {
          debugger;

          console.log(data);

          $rootScope.$state.transitionTo("main.challenge.currentMale");

      });

    }

  }]);
}
