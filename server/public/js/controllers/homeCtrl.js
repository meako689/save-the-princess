'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('homeCtrl', ['$scope', '$rootScope', '$state', 'usersDS', function ($scope, $rootScope, $state, usersDS) {

    console.log("home")


      $rootScope.showSpinner = true;

        // init profile

        userDS.getAccount().then(function(account){
          if(account){
            var appGenderVersionRoute = (account.gender === "male" ? "challenges" : "profile" );

            $rootScope.showSpinner = false;

            $state.transitionTo(appGenderVersionRoute);
          }
        });



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
