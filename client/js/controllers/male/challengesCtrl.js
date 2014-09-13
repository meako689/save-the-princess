'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('challengesCtrl', ['$scope', '$rootScope', 'challengesDS','$state', function ($scope, $rootScope, challengesDS, $state) {

    challengesDS.getChallenges().then(function(items){

      $scope.challenges = items;

    }))

    $scope.showChallenge = function(id){
      $state.transitionTo("challenge", {chId: id});
    }

    $scope.challenges = [
      {
        members: [

        ],
        _id: "23432493dsad",
        baba-creator: "3424234dsa34d34asd",
        timer-start: "ISOTime",
        badges: [
          "strength", "money", "beer"
        ],
        inProgress: false,
        finished:
      },
    ]

  }]);
}
