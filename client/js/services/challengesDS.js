'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appServices === 'undefined') {
    angular.appServices = angular.module('appServices', []);
  }

  angular.appServices.service('challengesDS', ['$scope', '$rootScope','Restangular', function ($scope, $rootScope, $restangular) {

    this.getChallenges = function(){
      return $restangular.all("challenges").getList();
    }


  }]);
}
