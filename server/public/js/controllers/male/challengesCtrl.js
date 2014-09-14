'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('challengesCtrl', ['$scope', '$rootScope', '$state','Restangular','$http', function ($scope, $rootScope, $state, $restangular, $http) {

    $http({method: 'GET', url: '/api/challenges'})
      .success(function(data, status, headers, config) {

        $scope.items = data;
        console.log(data);

    });

    $scope.showChallenge = function(id){
      $state.transitionTo("challenge", {chId: id});
    }

  }]);
}
