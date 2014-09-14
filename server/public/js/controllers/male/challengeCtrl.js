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

            console.log(data);

            $scope.x = data[0];

        });


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

          $state.transitionTo("main.challenge.currentMale");

      });

    }

  }]);
}
