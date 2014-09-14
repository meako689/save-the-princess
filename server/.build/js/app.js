window.app = angular.module('app', ['ui.router', 'restangular', 'appControllers']);

app.config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {

//  $urlRouterProvider.otherwise('/home');

  $stateProvider

  .state('main', {
    templateUrl: function(stateParams) {
      return '/partials/index.html';
    }
  })

    // HOME STATES AND NESTED VIEWS ========================================
    .state('main.home', {
      url: '/home'
    })

    .state('login', {
      url: '/login',
      template: "<h1>Please log in!!!</h1>"
    })

    // MALE VIEWS //

    .state('main.challenges', {
      url: '/male/challenges'
    })

    .state('main.challenge', {
      url: '/male/challenge/:chId'
    })

    .state('challenge.currentMale', {
      url: '/male/challenges/current',
      templateUrl: '/partials/male/challenge.current.html'
    })

    .state('challenge.finishedMale', {
      url: '/male/challenges/finished',
      templateUrl: '/partials/male/challenge.finished.html'
    })

    // FEMALE VIEWS //

    .state('profile', {
      url: '/female/main/',
      templateUrl: '/partials/female/profile.html'
    })

    // .state('profile.firstTime', {
    //   url: '/female/profile/:profileId/first-time',
    //   templateUrl: 'partials/female/profile.first-time.html'
    // })

    .state('challenge.personalityFemale', {
      url: '/female/challenge/',
      templateUrl: '/partials/female/challenge.personality.html'
    })

    .state('challenge.stepsFemale', {
      url: '/female/challenge/steps',
      templateUrl: '/partials/female/challenge.steps.html'
    })

    .state('challenge.currentFemale', {
      url: '/female/challenge/current',
      templateUrl: '/partials/female/challenge.current.html'
    })

    .state('challenge.finishedFemale', {
      url: '/female/challenges/finished',
      templateUrl: '/partials/female/challenge.finished.html'
    });


  var mainPageUrl = "/home";

  $urlRouterProvider.otherwise(mainPageUrl);

  // $restangularProvider.setBaseUrl("http://save-the-princess-lviv.herokuapp.com/api/");
  RestangularProvider.setBaseUrl("http://localhost:8000/api/");


});

window.app.run(['$rootScope', '$state', '$http', '$templateCache', '$timeout', '$q',
  function ($rootScope, $state, $http, $templateCache, $timeout, $q) {

    $rootScope.viewModel = {
      isActivated: function () {
        return !!this.userProfile;
      },

      clear: function () {
        this.userProfile = null;
      }
    };

    $rootScope.appState = $state;

    $rootScope.showSpinner = true;

    // Preload partials
    function fetchPartials() {

      var promises = [];

      [
        '/partials/male/challenges.html',
        '/partials/male/challenge.html',
        '/partials/male/challenge.current.html'

      ].forEach(function (partial) {
          var deferred = $q.defer();

          $http.get(partial, {
            cache: $templateCache
          })
            .success(function (data) {
              deferred.resolve(data);
            }).
            error(function (error) {
              deferred.reject();
            });

          promises.push(deferred.promise);
        });
      return $q.all(promises)
    }

    fetchPartials().then(function () {
      $timeout(function () {
        $rootScope.$broadcast('partials:loaded');
        console.log('partials:loaded');
      }, 1000);
      // need timeout to prevent emitting event before listener is being initialized
    });


    $rootScope.safeDigest = function (scope) {
      if (scope !== undefined) {
        try {
          if (!scope.$$phase && !scope.$$destroyed) {
            //if scope is not destroyed and actions are not made then digest
            scope.$digest();
          }
        } catch (e) {
          $rootScope.log.error(e);
          $rootScope.safeDigest();
        }
      }
      else if (!$rootScope.$$phase) {
        $rootScope.$digest();
      }
    };

  }
]);
