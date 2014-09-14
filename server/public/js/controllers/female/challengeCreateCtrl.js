'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('profileCtrl', ['$scope', '$rootScope', '$state','Restangular', function ($scope, $rootScope, $state, $restangular) {
    var renderGirl = function renderGirl(){
      console.log('female rendered');
        $restangular.one("user").get().then(function(account){
          $scope.accout = account;
        });

      $scope.createChallenge = function(){
        $rootScope.$state.transitionTo("main.challenge.female.createChallenge");
      };
    }

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (!$scope.account){
        renderGirl();
      }
    });


  }]);
}
