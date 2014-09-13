'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('challengesCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {



  }]);
}