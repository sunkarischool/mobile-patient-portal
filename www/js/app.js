// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('patientPortalApp', ['ionic', 'ngCordova', 'patientPortalApp','patientPortalApp'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $cordovaSplashscreen, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
      
      
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
      
      $rootScope.$on('loading:show', function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner> Loading ...'
        })
    });

    $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
        console.log('Loading ...');
        $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        console.log('done');
        $rootScope.$broadcast('loading:hide');
    });
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    controller: 'AppCtrl'
  })

.state('app.home', {
    url: '/home',
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html'
        }
      }
  })

  .state('app.aboutus', {
      url: '/aboutus',
      views: {
        'mainContent': {
          templateUrl: 'templates/aboutus.html'
        }
      }
    })

   .state('app.contactus', {
      url: '/contactus',
      views: {
        'mainContent': {
          templateUrl: 'templates/contactus.html'
        }
      }
    })

   .state('app.login', {
      url: '/login',
      views: {
        'mainContent': {
          templateUrl: 'templates/login.html',
		  controller: 'LoginController'
            // resolve: {
            // profile:  ['profileFactory', function(profileFactory){
                // return profileFactory.query();
              // }]
            // }
        }
      }
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'mainContent': {
          templateUrl: 'templates/profile.html'
          //controller: 'ProfileController',
            //resolve: {
            //profile:  ['profileFactory', function(profileFactory){
                //return profileFactory.query();
              //}]
            //}
        }
      }
    })
    .state('app.visits', {
      url: '/visits',
      views: {
        'mainContent': {
          templateUrl: 'templates/visits.html'
          //controller: 'VisitController',
            //resolve: {
            //profile:  ['visitFactory', function(visitFactory){
                //return visitFactory.query();
             // }]
            //}
        }
      }
    })
    .state('app.tests', {
      url: '/tests',
      views: {
        'mainContent': {
          templateUrl: 'templates/tests.html'
          //controller: 'VisitController',
            //resolve: {
            //profile:  ['visitFactory', function(visitFactory){
                //return visitFactory.query();
             // }]
            //}
        }
      }
    })

    .state('app.medications', {
      url: '/medications',
      views: {
        'mainContent': {
          templateUrl: 'templates/medications.html'
          //controller: 'VisitController',
            //resolve: {
            //profile:  ['visitFactory', function(visitFactory){
                //return visitFactory.query();
             // }]
            //}
        }
      }
    })
    .state('app.messages', {
      url: '/messages',
      views: {
        'mainContent': {
          templateUrl: 'templates/messages.html'
          //controller: 'VisitController',
            //resolve: {
            //profile:  ['visitFactory', function(visitFactory){
                //return visitFactory.query();
             // }]
            //}
        }
      }
    })
    .state('app.insurance', {
      url: '/insurance',
      views: {
        'mainContent': {
          templateUrl: 'templates/insurance.html'
          //controller: 'VisitController',
            //resolve: {
            //profile:  ['visitFactory', function(visitFactory){
                //return visitFactory.query();
             // }]
            //}
        }
      }
    })
    .state('app.billing', {
      url: '/billing',
      views: {
        'mainContent': {
          templateUrl: 'templates/billing.html'
          //controller: 'VisitController',
            //resolve: {
            //profile:  ['visitFactory', function(visitFactory){
                //return visitFactory.query();
             // }]
            //}
        }
      }
    })
 
	;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});
