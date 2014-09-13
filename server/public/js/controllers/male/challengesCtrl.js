'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('challengesCtrl', ['$scope', '$rootScope', 'challengesDS','$state', function ($scope, $rootScope, challengesDS, $state) {

    challengesDS.getChallenges().then(function(items){

      $scope.challenges = items;

    });

    $scope.showChallenge = function(id){
      $state.transitionTo("challenge", {chId: id});
    }

  }]);
}
