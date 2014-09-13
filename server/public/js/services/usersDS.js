'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appServices === 'undefined') {
    angular.appServices = angular.module('appServices', []);
  }

  angular.appServices.service('usersDS', ['$scope', '$rootScope','Restangular', function ($scope, $rootScope, $restangular) {

    this.getAccount = function(){
      return $restangular.all("user").get();
    }


  }]);
}
