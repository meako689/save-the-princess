'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('challengeCtrl', ['$scope', '$rootScope', '$state','$http', function ($scope, $rootScope, $state, $http) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (toState.name === "challenge" && toParams.chId) {

        var challengeId = toParams.chId;
        console.log(challengeId);

        $http({method: 'GET', url: '/api/challenge/' + challengeId})
          .success(function(data, status, headers, config) {

            $rootScope.x = data[0];
            console.log(data);
            debugger;

        });


      }
    });

    $scope.h1 = "dsdsd";

    $scope.applyChallenge = function(){
      $restangular.one("challenge", challengeId).customGET("apply").then(function(resp){
        debugger;
        $rootScope.$state.transitionTo("challenge.currentMale");
      })
    }

  }]);
}
