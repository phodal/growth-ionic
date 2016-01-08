angular.module('starter', ['ionic', 'ngCordova', 'app.skillTreeController', 'app.helloWorldController', 'app.quizController', 'app.reviewController', 'app.dayController', 'starter.controllers', 'starter.services', 'hc.marked', 'ionic.rating'])
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (typeof analytics !== 'undefined') {
        analytics.startTrackerWithId('UA-71907748-1');
        analytics.trackView('Growth')
      } else {
        console.log("Google Analytics plugin could not be loaded.")
      }
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        //StatusBar.styleDefault();
        StatusBar.backgroundColorByHexString("#387ef5");
      }
    });
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
        return '<h' + level + '><a name="' +
          escapedText +
          '" class="anchor" href="#' +
          escapedText +
          '"><span class="header-link"></span></a>' +
          text + '</h' + level + '>';
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
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.main', {
        url: '/main',
        views: {
          'menuContent': {
            templateUrl: 'templates/main.html',
            controller: 'MainCtrl'
          }
        }
      })

      .state('app.wiki', {
        url: "/wiki",
        views: {
          'menuContent': {
            templateUrl: "templates/game/wiki.html",
            controller: 'WikiCtrl'
          }
        }
      })
      .state('app.language', {
        url: "/language/:language_info",
        views: {
          'menuContent': {
            templateUrl: "templates/game/wiki_detail.html",
            controller: 'WikiDetailCtrl'
          }
        }
      })
      .state('app.levelSelect', {
        url: "/level",
        views: {
          'menuContent': {
            templateUrl: "templates/game/level.html",
            controller: 'LevelSelectCtrl'
          }
        }
      })

      .state('app.single', {
        url: "/level/:level",
        views: {
          'menuContent': {
            templateUrl: "templates/game/level_quiz.html",
            controller: 'QuizCtrl'
          }
        }
      })

      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'templates/about.html',
            controller: 'AboutCtrl'
          }
        }
      })

      .state('app.skilltree', {
        url: '/skilltree',
        views: {
          'menuContent': {
            templateUrl: 'templates/skilltree.html',
            controller: 'skillTreeControl'
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

      .state('app.seven', {
        url: '/seven',
        views: {
          'menuContent': {
            templateUrl: 'templates/more/seven.html'
          }
        }
      })

      .state('app.faq', {
        url: '/faq',
        views: {
          'menuContent': {
            templateUrl: 'templates/more/faq.html'
          }
        }
      })

      .state('app.feedback', {
        url: '/feedback',
        views: {
          'menuContent': {
            templateUrl: 'templates/more/feedback.html',
            controller: 'FeedbackCtrl'
          }
        }
      })

      .state('app.exam', {
        url: '/exam',
        views: {
          'menuContent': {
            templateUrl: 'templates/exam.html'
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
