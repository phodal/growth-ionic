var isWebView = ionic.Platform.isWebView();
var isIPad = ionic.Platform.isIPad();
var isIOS = ionic.Platform.isIOS();
var isAndroid = ionic.Platform.isAndroid();
var isWindowsPhone = ionic.Platform.isWindowsPhone();

angular.module('starter', [
    'ionic',
    'ngCordova',
    'hc.marked',
    'ionic.rating',
    'tabSlideBox',
    'jett.ionic.filter.bar',
    'pascalprecht.translate',
    'angularMoment',
    'ngResource',
    'starter.controllers',
    'starter.services'
  ])
  .run(function ($ionicPlatform, amMoment, $state, $ionicSideMenuDelegate, $storageServices) {
    amMoment.changeLocale('zh-cn');

    $ionicPlatform.ready(function () {
      if (typeof analytics !== 'undefined') {
        analytics.startTrackerWithId('UA-71907748-1');
        analytics.trackView('Growth')
      } else {
        console.log("Google Analytics plugin could not be loaded.")
      }
      if (window.cordova && window.cordova.plugins.Keyboard && !ionic.Platform.isWindowsPhone()) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
        //StatusBar.backgroundColorByHexString("#387ef5");
      }
      if (typeof navigator.globalization !== "undefined") {
        navigator.globalization.getPreferredLanguage(function (language) {
          //var lang = angular.lowercase(language.value);
          //$translate.use(lang).then(function(data) {
          //  alert("SUCCESS -> " + data);
          //}, function(error) {
          //  alert("ERROR -> " + error);
          //});
        }, null);
      }
    });

    $ionicPlatform.registerBackButtonAction(function (event) {
      if ($state.$current.name === 'app.exam'
        || $state.$current.name === 'app.community'
        || $state.$current.name === 'app.solution'
        || $state.$current.name === 'app.more'
        || $state.$current.name === 'app.about'
        || $state.$current.name === 'app.setting'
      ) {
        $ionicSideMenuDelegate.toggleLeft();
        $state.go('app.main', {location: 'replace'});
      } else if ($state.$current.name === 'app.main') {
        navigator.app.exitApp(); // exit the app
      } else {
        navigator.app.backHistory(); // exit the app
      }
    }, 100);
  })
  .config(function ($ionicConfigProvider) {
    $ionicConfigProvider.navBar.alignTitle('left');
  })
  .config(function ($stateProvider, $urlRouterProvider, $translateProvider) {
    $translateProvider.useSanitizeValueStrategy('');

    $translateProvider.translations('en', SIDE_MENU['en']);
    $translateProvider.translations('en', MAIN_VIEW_MENU['en']);
    $translateProvider.translations('en', PAGE_TITLE['en']);
    $translateProvider.translations('en', DAY_TITLE['en']);
    $translateProvider.translations('en', ABOUT_MENU['en']);
    $translateProvider.translations('en', EXAM_MENU['en']);
    $translateProvider.translations('en', BOOK_ROADMAP_MENU['en']);
    $translateProvider.translations('en', PRACTICAL_PROGRAMMING['en']);
    $translateProvider.translations('en', ARCHITECTURE_DESIGN['en']);
    $translateProvider.translations('en', METHODOLOGY['en']);
    $translateProvider.translations('en', HELPER_ARTICLES['en']);


    $translateProvider.translations('zh-cn', DAY_TITLE['zh-cn']);
    $translateProvider.translations('zh-cn', SIDE_MENU['zh-cn']);
    $translateProvider.translations('zh-cn', MAIN_VIEW_MENU['zh-cn']);
    $translateProvider.translations('zh-cn', PAGE_TITLE['zh-cn']);
    $translateProvider.translations('zh-cn', ABOUT_MENU['zh-cn']);
    $translateProvider.translations('zh-cn', EXAM_MENU['zh-cn']);
    $translateProvider.translations('zh-cn', BOOK_ROADMAP_MENU['zh-cn']);
    $translateProvider.translations('zh-cn', PRACTICAL_PROGRAMMING['zh-cn']);
    $translateProvider.translations('zh-cn', ARCHITECTURE_DESIGN['zh-cn']);
    $translateProvider.translations('zh-cn', METHODOLOGY['zh-cn']);
    $translateProvider.translations('zh-cn', HELPER_ARTICLES['zh-cn']);

    $translateProvider.preferredLanguage('zh-cn');
    var language = window.localStorage.getItem('language');
    if (language !== undefined) {
      $translateProvider.preferredLanguage(language);
    }
    $translateProvider.fallbackLanguage('en');
  })
  .config(['markedProvider', function (markedProvider) {
    marked.Lexer.rules.gfm.heading = marked.Lexer.rules.normal.heading;
    marked.Lexer.rules.tables.heading = marked.Lexer.rules.normal.heading;

    markedProvider.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      highlight: function (code, lang) {
        if (lang) {
          return hljs.highlight(lang, code, true).value;
        } else {
          return hljs.highlightAuto(code).value;
        }
      }
    });
    markedProvider.setRenderer({
      heading: function (text, level) {
        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
        return '<h' + level + '><a name="' + escapedText + '" class="anchor" href="#' + escapedText + '"><span class="header-link"></span></a>' + text + '</h' + level + '>';
      },
      image: function (href) {
        return "<img class='full-image' src=" + href + ">";
      }
    });
  }])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })


      .state('app.main', {
        url: '/main',
        views: {
          'tab-main': {
            templateUrl: 'templates/main.html',
            controller: 'MainCtrl'
          }
        }
      })

      .state('app.exam', {
        url: '/exam',
        views: {
          'tab-exam': {
            templateUrl: 'templates/exam.html'
          }
        }
      })

      .state('app.solution', {
        url: "/solution",
        views: {
          'tab-solution': {
            templateUrl: "templates/more/solution.html",
            controller: 'SolutionCtrl'
          }
        }
      })

      .state('app.community', {
        url: '/community',
        views: {
          'tab-community': {
            templateUrl: 'templates/community.html',
            controller: 'CommunityCtrl'
          }
        }
      })

      .state('app.more', {
        url: '/more',
        views: {
          'tab-more': {
            templateUrl: 'templates/more.html'
          }
        }
      })

      .state('app.todoView', {
        url: '/todoView',
        views: {
          'menuContent': {
            templateUrl: 'templates/todoView.html',
            controller: 'TodoViewCtrl'
          }
        }
      })

      .state('app.topic', {
        url: '/topic/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/topic.html',
            controller: 'TopicCtrl',
            resolve: {
              discussion: function (Discussions, $stateParams) {
                return Discussions.get({id: $stateParams.id});
              }
            }
          }
        }
      })

      .state('app.stack', {
        url: "/stack/:stack",
        views: {
          'menuContent': {
            templateUrl: "templates/skills/stack.html",
            controller: 'StackCtrl'
          }
        }
      })

      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'templates/more/about.html',
            controller: 'AboutCtrl'
          }
        }
      })

      .state('app.help', {
        url: '/help',
        views: {
          'menuContent': {
            templateUrl: 'templates/more/help.html'
          }
        }
      })

      .state('app.setting', {
        url: '/setting',
        views: {
          'menuContent': {
            templateUrl: 'templates/setting.html',
            controller: 'SettingCtrl'
          }
        }
      })

      .state('app.skilltree', {
        url: '/skilltree',
        views: {
          'menuContent': {
            templateUrl: 'templates/skills/skilltree.html',
            controller: 'skillTreeControl'
          }
        }
      })

      .state('app.ai', {
        url: '/ai',
        views: {
          'menuContent': {
            templateUrl: 'templates/skills/ai.html',
            controller: 'AIControl'
          }
        }
      })

      .state('app.achievement', {
        url: '/achievement',
        views: {
          'menuContent': {
            templateUrl: 'templates/skills/achievement.html',
            controller: 'AchievementCtrl'
          }
        }
      })

      .state('app.article', {
        url: '/article/:slug',
        views: {
          'menuContent': {
            templateUrl: 'templates/read/article-detail.html',
            controller: 'ArticleCtrl'
          }
        }
      })

      .state('app.articles', {
        url: '/articles',
        views: {
          'menuContent': {
            templateUrl: 'templates/read/article-list.html',
            controller: 'ArticleListCtrl'
          }
        }
      })

      .state('app.review', {
        url: '/review/:slug',
        views: {
          'menuContent': {
            templateUrl: 'templates/read/review-detail.html',
            controller: 'ReviewCtrl'
          }
        }
      })

      .state('app.reviews', {
        url: '/reviews',
        views: {
          'menuContent': {
            templateUrl: 'templates/read/review-list.html',
            controller: 'ReviewListCtrl'
          }
        }
      })

      .state('app.book', {
        url: '/book',
        views: {
          'menuContent': {
            templateUrl: 'templates/read/book.html'
          }
        }
      })

      .state('app.day0', {
        url: '/day/0',
        views: {
          'menuContent': {
            templateUrl: 'templates/days/day0.html',
            controller: 'DayCtrl'
          }
        }
      })
      .state('app.day1', {
        url: '/day/1',
        views: {
          'menuContent': {
            templateUrl: 'templates/days/day1.html',
            controller: 'DayCtrl'
          }
        }
      })
      .state('app.day2', {
        url: '/day/2',
        views: {
          'menuContent': {
            templateUrl: 'templates/days/day2.html',
            controller: 'DayCtrl'
          }
        }
      })
      .state('app.day3', {
        url: '/day/3',
        views: {
          'menuContent': {
            templateUrl: 'templates/days/day3.html',
            controller: 'DayCtrl'
          }
        }
      })
      .state('app.day4', {
        url: '/day/4',
        views: {
          'menuContent': {
            templateUrl: 'templates/days/day4.html',
            controller: 'DayCtrl'
          }
        }
      })
      .state('app.day5', {
        url: '/day/5',
        views: {
          'menuContent': {
            templateUrl: 'templates/days/day5.html',
            controller: 'DayCtrl'
          }
        }
      })
      .state('app.day6', {
        url: '/day/6',
        views: {
          'menuContent': {
            templateUrl: 'templates/days/day6.html',
            controller: 'DayCtrl'
          }
        }
      })
      .state('app.day7', {
        url: '/day/7',
        views: {
          'menuContent': {
            templateUrl: 'templates/days/day7.html',
            controller: 'DayCtrl'
          }
        }
      })

      .state('app.prog', {
        url: '/books/prog',
        views: {
          'menuContent': {
            templateUrl: 'templates/books/prog.html'
          }
        }
      })
      .state('app.arch', {
        url: '/books/arch',
        views: {
          'menuContent': {
            templateUrl: 'templates/books/arch.html'
          }
        }
      })
      .state('app.method', {
        url: '/books/method',
        views: {
          'menuContent': {
            templateUrl: 'templates/books/method.html'
          }
        }
      })
      .state('app.think', {
        url: '/books/think',
        views: {
          'menuContent': {
            templateUrl: 'templates/books/think.html'
          }
        }
      })
      .state('app.bookfe', {
        url: '/books/fe',
        views: {
          'menuContent': {
            templateUrl: 'templates/books/fe.html'
          }
        }
      })

      .state('app.quiz', {
        url: '/quiz/:slug',
        views: {
          'menuContent': {
            templateUrl: 'templates/game/quiz.html',
            controller: 'AllQuizCtrl'
          }
        }
      })
      .state('app.advancedQuiz', {
        url: '/advance-quiz/:slug',
        views: {
          'menuContent': {
            templateUrl: 'templates/game/advance-quiz.html',
            controller: 'AdvancedQuizCtrl'
          }
        }
      })
    ;

    $urlRouterProvider.otherwise('/app/main');
  });

angular.module('starter.controllers', ['starter.factory', 'hljs', 'starter.utils', 'ionic.contrib.ui.tinderCards']);
