'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('challengesCtrl', ['$scope', '$rootScope', '$state','Restangular', function ($scope, $rootScope, $state, $restangular) {

    $restangular.all("challenges").getList().then(function(items){

      $scope.challenges = items;

    });

    $scope.showChallenge = function(id){
      $state.transitionTo("challenge", {chId: id});
    }

  }]);
}
