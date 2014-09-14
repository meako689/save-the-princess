'use strict';


if (typeof window.angular !== 'undefined') {
  if (typeof angular.appControllers === 'undefined') {
    angular.appControllers = angular.module('appControllers', []);
  }

  angular.appControllers.controller('homeCtrl', ['$scope', '$rootScope', '$state', 'Restangular', function ($scope, $rootScope, $state, $restangular) {

    console.log("home")


      $rootScope.showSpinner = true;

        // init profile


        $restangular.one("user").get().then(function(account){
          if(account){

            var appGenderVersionRoute = (account.gender === "male" ? "challenges" : (account.gender === "female" ? "profile" : "login") );

            window.setTimeout(function(){
              $rootScope.showSpinner = false;
              $state.transitionTo(appGenderVersionRoute);
            }, 300);

          }
        });



    // $scope begin
    //

    //
    // $scope.newAccountModel = {
    //   email: "",
    //   firstName: "",
    //   lastName: "",
    //   role: ""
    // };


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
