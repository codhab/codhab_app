// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

function onPushwooshInitialized(pushNotification) {

  //if you need push token at a later time you can always get it from Pushwoosh plugin
  pushNotification.getPushToken(
    function(token) {

    //alert("o token é:" + token)

      console.info('push token: ' + token);
    }
  );
//crRNSCHBa0Q:APA91bEUo_WiPB-nNXJmElEcH-LujAQihY-ZWrxML8aC6SQew1WnvuSU0qo-suuVgv5N38RySPdm_KQ_trg7O2y0NzCobJebOotgnkOc4YfZVZ6S-3osMaCNOQUUf1TDGM2vGMasNbTu
  //and HWID if you want to communicate with Pushwoosh API
  pushNotification.getPushwooshHWID(
    function(token) {
      console.info('Pushwoosh HWID: ' + token);
    }
  );
  //crRNSCHBa0Q:APA91bEUo_WiPB-nNXJmElEcH-LujAQihY-ZWrxML8aC6SQew1WnvuSU0qo-suuVgv5N38RySPdm_KQ_trg7O2y0NzCobJebOotgnkOc4YfZVZ6S-3osMaCNOQUUf1TDGM2vGMasNbTu
  //settings tags
  pushNotification.setTags({
      tagName: "tagValue",
      intTagName: 10
    },
    function(status) {
      console.info('setTags success: ' + JSON.stringify(status));
    },
    function(status) {
      console.warn('setTags failed');
    }
  );

  pushNotification.getTags(
    function(status) {
      //alert('getTags success: ' + JSON.stringify(status));
      console.info('getTags success: ' + JSON.stringify(status));
    },
    function(status) {
      console.warn('getTags failed');
    }
  );

  //start geo tracking.
  //pushNotification.startLocationTracking();
}

function initPushwoosh() {
  var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");

  //set push notifications handler
  document.addEventListener('push-notification',
    function(event) {
      var message = event.notification.message;
      var userData = event.notification.userdata;

    //  alert("Push message opened: " + message);
      console.info(JSON.stringify(event.notification));

      //dump custom data to the console if it exists
      if (typeof(userData) != "undefined") {
        console.warn('user data: ' + JSON.stringify(userData));
      }
    }
  );

  //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
  pushNotification.onDeviceReady({
    projectid: "190801927723",
    appid: "48A40-8A976",
    serviceName: ""
  });

  //register for push notifications
  pushNotification.registerDevice(
    function(status) {
    //  alert("registered with token: " + status.pushToken);
      onPushwooshInitialized(pushNotification);
    },
    function(status) {
    //  alert("failed to register: " + status);
      console.warn(JSON.stringify(['failed to register ', status]));
    }
  );
}

var app = angular.module('codhab', ['ionic',
'ngCordova',
'ngMessages',
'ngCpfCnpj',
'ui.mask',
'ksSwiper',
'angularMoment',
// 'parse-angular', Removido Temporariamente
// 'parse-angular.enhance', Removido Temporariamente
'codhab.controllers.app',
'codhab.controllers.map',
'codhab.controllers.search',
'codhab.controllers.searchreg',
'codhab.controllers.message',
'codhab.controllers.login',
'codhab.controllers.report',
'codhab.controllers.postos',
'codhab.controllers.assistencia',
'codhab.controllers.slider',
'codhab.controllers.entidades',
'codhab.controllers.entidade',
'codhab.controllers.noticias',
'codhab.controllers.portal',
'codhab.controllers.scan',
'codhab.services.auth',
'codhab.services.ReportService',
'codhab.services.PostosService',
'codhab.services.MessageService',
'codhab.services.EntidadesService'
])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
      StatusBar.overlaysWebView(false);
    }
    initPushwoosh();

    // Parse - Removido Temporariamente
    // Parse.initialize("0nHHDsgXpUZieEkv46JhEKgk8fXUkKn8aDNpyqZP", "r4pMXbjMUVCrqcSzh25W1J1U3yJ5U4rjG6kdCwry");

  });
});

app.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider,  $cordovaFacebookProvider) {

	$stateProvider
    .state('signup',{
      url: "/signup",
      templateUrl:"views/login/signup.html",
      controller: 'SignupCtrl'
    })
    .state('login',{
      url: "/login",
      templateUrl:"views/login/login.html",
      controller: 'LoginCtrl'
    })
		.state('app', {
			url: "/app",
      abstract: true,
			templateUrl: "views/app/side.html"
		})
    .state('app.home', {
      url: "/home",
      views:{
        'home':{
          templateUrl: "views/app/home.html",
          controller: 'AppCtrl'
        }
      }
    })
    .state('app.messages',{
      url: "/messages",
      views:{
        'home':{
          templateUrl: "views/app/message/messages.html",
          controller: 'MessageListCtrl'
        }
      }
    })
    .state('app.habitacao',{
      url: "/habitacao",
      views:{
        'home':{
          templateUrl: "views/app/habitacao/index.html"
        }
      }
    })
    .state('app.oquehabitacao',{
      url: "/oque_habitacao",
      views:{
        'home':{
          templateUrl: "views/app/habitacao/oque_habitacao.html"
        }
      }
    })
    .state('app.agendamentohabitacao',{
      url: "/agendamento",
      views:{
        'home':{
          templateUrl: "views/app/habitacao/agendamento.html"
        }
      }
    })
    .state('app.listahabitacao',{
      url: "/listahabitacao",
      views:{
        'home':{
          templateUrl: "views/app/habitacao/listahabitacao.html",
          controller: 'SearchCtrl'
        }
      }
    })
    .state('app.regularizacao',{
      url: "/regularizacao",
      views:{
        'home':{
          templateUrl: "views/app/regularizacao/index.html"
        }
      }
    })
    .state('app.oqueregularizacao',{
      url: "/oque_regularizacao",
      views:{
        'home':{
          templateUrl: "views/app/regularizacao/oque_regularizacao.html"
        }
      }
    })
    .state('app.listaregularizacao',{
      url: "/listaregularizacao",
      views:{
        'home':{
          templateUrl: "views/app/regularizacao/listaregularizacao.html",
          controller: 'SearchRegCtrl'
        }
      }
    })
    .state('app.agendamentoregularizacao',{
      url: "/agendamentoregularizacao",
      views:{
        'home':{
          templateUrl: "views/app/regularizacao/agendamento.html"
        }
      }
    })
    .state('app.terms',{
          url: "/terms",
          views:{
            'home':{
              templateUrl: "views/app/terms.html"
            }
          }
        })
    .state('app.faq',{
          url: "/faq",
          views:{
            'home':{
              templateUrl: "views/app/faq.html"
            }
          }
        })
        .state('intro',{
          url: "/intro",
          templateUrl:"views/app/intro.html",
          controller: 'sliderCtrl'
        })
    .state('app.new_message',{
      url: "/new_message",
      views:{
        'home':{
          templateUrl: "views/app/message/new_message.html",
          controller: 'messageCtrl'
        }
      }
    })
    .state('app.map',{
      url: "/map",
      views:{
        'home':{
          templateUrl: "views/app/map/map.html",
          controller: 'MapCtrl'
        }
      }
    })
    .state('app.assistencia',{
      url: "/assistencia",
      views:{
        'home':{
        templateUrl: "views/app/assistencia/index.html",
        controller: 'AssistenciaCtrl'
        }
      }
    })
    .state('app.entidades',{
      url: "/entidades",
      views:{
        'home':{
        templateUrl: "views/app/entidade/index.html"
        }
      }
    })
    .state('app.listaentidades',{
      url: "/listaentidades",
      views:{
        'home':{
        templateUrl: "views/app/entidade/listaentidade.html",
        controller: 'EntidadesCtrl'
        }
      }
    })
    .state('app.noticias',{
      url: "/noticias",
      views:{
        'home':{
        templateUrl: "views/app/noticias/index.html",
        controller: 'NoticiasCtrl'
        }
      }
    })
    .state('app.noticia',{
      url: "/noticia/:id",
      views:{
        'home':{
        templateUrl: "views/app/noticias/single.html",
        controller: 'NoticiaCtrl'
        }
      }
    })
    .state('app.cadastro',{
      url: "/cadastro",
      views:{
        'home':{
        templateUrl: "views/app/cadastro/index.html"
        }
      }
    })
    .state('app.portal',{
      url: "/portal",
      views:{
        'home':{
        templateUrl: "views/app/portal/index.html",
        controller: 'portalCtrl'
        }
      }
    })
    .state('app.oqueentidades',{
      url: "/oqueentidades",
      views:{
        'home':{
        templateUrl: "views/app/entidade/oque_entidade.html"
        }
      }
    })
    .state('app.agendamentoentidades',{
      url: "/entidades",
      views:{
        'home':{
        templateUrl: "views/app/entidade/agendamento.html"
        }
      }
    })
    .state('app.entidade',{
      url:"/entidade/:cnpj?lat&long",
      views:{
        'home':{
          templateUrl:"views/app/entidade/single.html",
          controller:'EntidadeCtrl'
        }
      }
    })
    .state('app.postos',{
      url:"/postos/:id?nome&endereco&hora&coordenador&tel&email&latitude&longitude",
      views:{
        'home':{
          templateUrl:"views/app/assistencia/single.html",
          controller:'PostosCtrl'
        }
      }
    })
    .state('app.report',{
      url: "/report",
      views:{
        'home':{
          templateUrl: "views/app/report/report.html",
          controller: 'reportCreateCtrl'
        }
      }
    })
    .state('app.scan',{
      url: "/scan",
      views:{
        'home':{
          templateUrl: "views/app/scan/index.html",
          controller: 'ScanCtrl'
        }
      }
    })
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "views/app/tabs.html"
    })
	;

   // $ionicConfigProvider.tabs.position('bottom')
	// if none of the above states are matched, use this as the fallback
  if(window.localStorage['tutorial'] === "true") {
	   $urlRouterProvider.otherwise('/app/home');
  }else{
    $urlRouterProvider.otherwise('/intro');
  }
  if(localStorage.getItem("LocalData") == null)
    {
        var data = [];
        data = JSON.stringify(data);
        localStorage.setItem("LocalData", data);
    }
});
