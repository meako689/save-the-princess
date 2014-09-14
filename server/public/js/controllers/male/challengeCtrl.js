'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('challengeCtrl', ['$scope', '$rootScope', '$state','$http', function ($scope, $rootScope, $state, $http) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (toState.name === "main.challenge" && toParams.chId) {

        var challengeId = toParams.chId;
        console.log(challengeId);

        $http({method: 'GET', url: '/api/challenge/' + challengeId})
          .success(function(data, status, headers, config) {

            $scope.x = data[0];
            console.log(data);

        });

      }
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (fromState.name === "main.challenge") {
        $rootScope.x = undefined;
      }
    });

    $scope.applyChallenge = function(){
      $restangular.one("challenge", challengeId).customGET("apply").then(function(resp){
        debugger;
        $rootScope.$state.transitionTo("main.challenge.currentMale");
      })
    }

  }]);
}
