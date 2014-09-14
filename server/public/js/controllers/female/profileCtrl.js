'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('profileCtrl', ['$scope', '$rootScope', '$state','Restangular', function ($scope, $rootScope, $state, $restangular) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      console.log('female profile');
    });


  }]);
}
