angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

//hier staan alle routes die in de app gebruikt worden 

      .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.berichten', {
    url: '/berichten',
    views: {
      'side-menu21': {
        templateUrl: 'templates/berichten.html',
        controller: 'berichtenCtrl'
      }
    }
  })

  .state('menu.registreren', {
    url: '/registreren',
    views: {
      'side-menu21': {
        templateUrl: 'templates/registreren.html',
        controller: 'registrerenCtrl'
      }
    }
  })

  .state('menu.evenementsInfo', {
    url: '/evenementsinfo',
    views: {
      'side-menu21': {
        templateUrl: 'templates/evenementsInfo.html',
        controller: 'evenementsInfoCtrl'
      }
    }
  })

  .state('menu.zaklamp', {
    url: '/zaklamp',
    views: {
      'side-menu21': {
        templateUrl: 'templates/zaklamp.html',
        controller: 'zaklampCtrl'
      }
    }
  })

  .state('menu.locatie', {
    url: '/locatie',
    views: {
      'side-menu21': {
        templateUrl: 'templates/locatie.html',
        controller: 'locatieCtrl'
      }
    }
  })

  .state('menu.fotoS', {
    url: '/fotos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/fotoS.html',
        controller: 'fotoSCtrl'
      }
    }
  })

  .state('menu.delen', {
    url: '/delen',
    views: {
      'side-menu21': {
        templateUrl: 'templates/delen.html',
        controller: 'delenCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

$urlRouterProvider.otherwise('/side-menu21/home')



});
