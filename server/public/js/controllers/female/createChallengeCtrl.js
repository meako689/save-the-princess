'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('createChallengeCtrl', ['$scope', '$rootScope', '$state','Restangular', function ($scope, $rootScope, $state, $restangular) {

  }]);
}
