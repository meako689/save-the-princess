'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('profileCtrl', ['$scope', '$rootScope', '$state', '$http', function ($scope, $rootScope, $state, $http) {

    $scope.renderGirl function renderGirl(){
      $http({method: 'GET', url: '/api/user'})
        .success(function(data, status, headers, config) {
          $scope.account = data;
      });
    }
    $scope.renderGirl();


    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (!$scope.account){
        $scope.renderGirl();
      }
    });

    $scope.createChallenge = function(){
      $state.transitionTo("main.createChallenge");
    };


  }]);
}
