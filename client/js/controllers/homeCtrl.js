'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('homeCtrl', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {

    console.log("home")


      $rootScope.showSpinner = true;

      window.setTimeout(function(){
        // init profile
        $rootScope.showSpinner = false;

        $state.transitionTo("challenges");
      }, 1000);




    // $scope begin
    //


    $scope.newAccountModel = {
      email: "",
      firstName: "",
      lastName: "",
      role: ""
    };


//    $scope.createAccount = function () {
//      usersDS.createAccount($scope.newAccountModel).then(function (user) {
//        alert("new account is created successfully");
//        fetchUsers()
//      })
//    };
//
//    // #Function begin
//    //
//
//    function fetchUsers() {
//      usersDS.getAccounts().then(function (accounts) {
//        $scope.accounts = accounts;
//        $scope.users = accounts;
//      });
//    }
//
//    function filterAccounts(roleType) {
//      return $scope.accounts.filter(function (account) {
//        return account.role === roleType;
//      })
//    }

  }]);
}