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
      template: "<a href='/login/fb'>Please log in!!!</a>"
    })

    // MALE VIEWS //

    .state('main.challenges', {
      url: '/male/challenges'
    })

    .state('main.challenge', {
      url: '/male/challenge/:chId'
    })

    .state('main.challenge.currentMale', {
      url: '/male/challenges/current',
    })

    .state('main.challenge.finishedMale', {
      url: '/male/challenges/finished',
    })

    // FEMALE VIEWS //

    .state('main.profile', {
      url: '/female/main',
    })

    // .state('profile.firstTime', {
    //   url: '/female/profile/:profileId/first-time',
    //   templateUrl: 'partials/female/profile.first-time.html'
    // })

    .state('main.challenge.personalityFemale', {
      url: '/female/challenge/',
    })

    .state('main.challenge.stepsFemale', {
      url: '/female/challenge/steps',
    })

    .state('main.challenge.currentFemale', {
      url: '/female/challenge/current',
    })

    .state('main.challenge.finishedFemale', {
      url: '/female/challenges/finished',
    })
    .state('main.createChallenge', {
      url: '/female/challenges/create',
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
