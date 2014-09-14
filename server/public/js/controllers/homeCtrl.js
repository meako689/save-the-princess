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

            //switch
            //female profile
            var appGenderVersionRoute = (account.gender === "female" ? "main.challenges" : (account.gender === "male" ? "main.profile" : "login") );
            //male challenges
            //var appGenderVersionRoute = (account.gender === "male" ? "main.challenges" : (account.gender === "female" ? "main.profile" : "login") );
            console.log(account.gender);
            console.log(appGenderVersionRoute);

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
