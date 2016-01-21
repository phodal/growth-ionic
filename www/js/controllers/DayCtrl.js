angular.module('app.dayController', ['hljs', 'starter.utils'])
  .controller('DayCtrl', function ($scope, $ionicModal, $storageServices, $analytics, $http, $filter, $sce, $window, $translate) {
    $analytics.trackView('Day Ctrl List');

    $scope.currentModal = null;
    $scope.currentModals = [];

    $scope.allDoneItems = {};
    angular.forEach(Object.keys(TODO_LISTS[$translate.use()]), function (key) {
      $scope.allDoneItems[key] = [];
    });

    $scope.HELPER = HELPER_ARTICLES[$translate.use()];

    $scope.openTodoModal = function (subtopic) {
      $scope.subtopic = subtopic;
      $scope.todoLists = [];
      $analytics.trackView('todo ' + subtopic);

      var todoLists = TODO_LISTS[$translate.use()][subtopic]['basic'];
      var items = {};
      $storageServices.get($scope.subtopic, function (result) {
        if (result !== undefined) {
          try {
            items = JSON.parse(result);
          } catch (err) {
            console.log(err)
          }
        }
        angular.forEach(items.items, function (item, itemKey) {
          angular.forEach(todoLists, function (todoList, index) {
            if (todoList.id === itemKey) {
              $scope.allDoneItems[subtopic].push({
                id: todoList.id,
                title: todoList.title
              });
              todoLists[index] = {};
            }
          });
        });
      });
      $scope.doneItems = $scope.allDoneItems[subtopic];
      $scope.todoLists = todoLists;

      $ionicModal.fromTemplateUrl('templates/modal/todo.html', {
        id: subtopic,
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        modal.show();
        $scope.currentModal = modal;
      });
    };

    $scope.addTodo = function (item) {
      var items = {
        items: {}
      };
      $storageServices.get($scope.subtopic, function (result) {
        if (result !== undefined) {
          try {
            items = JSON.parse(result);
          } catch (err) {
            console.log(err)
          }
        }
      });

      items.items[item.id] = item.title;
      $scope.doneItems.push({
        id: item.id,
        title: item.title
      });

      $storageServices.set($scope.subtopic, JSON.stringify(items));
      $scope.todoLists.splice($scope.todoLists.indexOf(item), 1);
    };

    $scope.closeTodoModal = function () {
      $scope.currentModal.hide();
    };

    $storageServices.get('isFirstTimeDay', function (value) {
      if (value !== 'false') {
        $ionicModal.fromTemplateUrl('templates/intro/day1.html', {
          id: 'intro1',
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          modal.show();
          $scope.modal = modal;
        });

        $scope.$on('modal.hidden', function () {
          $storageServices.set('isFirstTimeDay', 'false');
        });
      }
    });

    $scope.openSpecialModal = function (subtopic, branch) {
      $analytics.trackView('modal ' + subtopic + ' ' + branch);

      if (subtopic === 'todo') {
        $scope.todoLists = todoLists[subtopic]['basic'];
      }

      $ionicModal.fromTemplateUrl('templates/modal/' + subtopic + '/' + branch + '.html', {
        id: subtopic + '-' + branch,
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        modal.show();
        $scope.currentModal = modal;
        $scope.currentModals.push(modal);
      });
    };

    $scope.openDescModal = function (subtopic) {
      $analytics.trackView('modal ' + subtopic + ' desc');

      $ionicModal.fromTemplateUrl('templates/modal/desc.html', {
        id: subtopic + '-desc',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $http({
          method: 'GET',
          url: 'assets/desc/' + subtopic + '.md'
        }).success(function (response) {
          $scope.htmlContent = $sce.trustAsHtml(marked(response))
        }).error(function (data, status) {
          alert(data + status);
        });
        modal.show();
        $scope.currentModal = modal;
        $scope.currentModals.push(modal);
      });
    };

    $scope.closeSpecialModal = function () {
      $scope.currentModal.hide();
    };

    $scope.openArticleModal = function (article) {
      console.log('assets/article/' + article + '.md');
      $analytics.trackView('article ' + article);

      $ionicModal.fromTemplateUrl('templates/read/article-detail.html', {
        id: article,
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {

        $http({method: 'GET', url: 'assets/article/' + article + '.md'}).success(function (response) {
          var articleInfo = $filter('filter')(AllArticle, {"slug": article})[0];

          $scope.title = articleInfo.title;
          $scope.EditArticle = function () {
            window.open('https://github.com/phodal/growth/edit/master/www/assets/article/' + articleInfo.slug + '.md', '_system', 'location=yes');
          };
          $scope.htmlContent = $sce.trustAsHtml(marked(response))
        }).error(function (data, status) {
          alert(data + status);
        });

        modal.show();
        $scope.currentModal = modal;
        $scope.currentModals.push(modal);
      });
    };


    $scope.openBookListModal = function (topic) {
      $analytics.trackView('modal book lists');
      $scope.books = $filter('filter')(BOOK_REVIEWS, {"category": topic});

      $ionicModal.fromTemplateUrl('templates/modal/book.html', {
        id: topic,
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        modal.show();
        $scope.currentModal = modal;
        $scope.currentModals.push(modal);
      });
    };

    $scope.closeBookModal = function () {
      $scope.currentBookModal.hide();
    };

    $scope.openBookModal = function (bookName) {
      $analytics.trackView('book ' + bookName);

      $ionicModal.fromTemplateUrl('templates/read/review-detail.html', {
        id: bookName,
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {

        $http({method: 'GET', url: 'assets/review/' + bookName + '.md'}).success(function (response) {
          var bookInfo = $filter('filter')(BOOK_REVIEWS, {"slug": bookName})[0];
          $scope.title = bookInfo.title;
          $scope.store = bookInfo.store;
          $scope.OpenInStore = function () {
            window.open(bookInfo.store, '_system', 'location=yes')
          };
          $scope.htmlContent = $sce.trustAsHtml(marked(response))
        }).error(function (data, status) {
          alert(data + status);
        });

        modal.show();
        $scope.currentBookModal = modal;
        $scope.currentModals.push(modal);
      });
    };

    $scope.closeBookModal = function () {
      $scope.currentBookModal.hide();
    };


    $scope.introModal = null;
    $scope.openIntroModal = function (day) {
      $analytics.trackView('modal day' + day);

      $ionicModal.fromTemplateUrl('templates/days/modals/intro-day' + day + '.html', {
        id: 'introModal',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        modal.show();
        $scope.introModal = modal;
      });
    };

    $scope.closeIntroModal = function () {
      $scope.introModal.hide();
    };

    $scope.getSkill = function (subtopic) {
      $scope.devList = [];
      var devLists = ALL_SKILLS[subtopic];

      angular.forEach(devLists, function (skill) {
        $storageServices.get(skill.text, function (value) {
          var rating = parseInt(value);
          $scope.devList.push({
            rating: rating,
            max: 5,
            text: skill.text
          });
        });
      });

      $ionicModal.fromTemplateUrl('templates/skills/skill.html', {
        id: subtopic,
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        modal.show();
        $scope.currentModal = modal;
        $scope.currentModals.push(modal);
      });

      $scope.submitSkill = function () {
        var originPoints = 0;
        $storageServices.get('badgePoints', function (data) {
          if (parseInt(data) > 0) {
            originPoints = parseInt(data);
          }
        });

        angular.forEach($scope.devList, function (skill) {
          $storageServices.set(skill.text, skill.rating);
          var skillPoint = parseInt(skill.rating);
          if (skillPoint > 0) {
            originPoints = originPoints + skillPoint;
          }
        });

        $storageServices.set('badgePoints', originPoints);
      }
    };

    if (!$window.cordova) {
      $scope.$on('modal.shown', function (event, modal) {
        console.log('Modal ' + modal.id + ' is shown!');
      });

      $scope.$on('modal.hidden', function (event, modal) {
        console.log('Modal ' + modal.id + ' is hidden!');
      });
    }

    // Cleanup the modals
    $scope.$on('$destroy', function () {
      angular.forEach($scope.currentModals, function (modal) {
        modal.remove();
      });
    });
  });
