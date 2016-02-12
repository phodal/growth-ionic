angular.module('starter.controllers')
  .controller('TodoViewCtrl', function ($scope, $ionicModal, $storageServices, $analytics, $updateServices, $translate) {
    $analytics.trackView('TodoView Ctrl ');
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.badgePoints = 0;
      $storageServices.get('badgePoints', function (points) {
        $scope.badgePoints = points;
      });
    });

    $scope.currentModal = null;
    $scope.subtopic = '';

    $scope.allDoneItems = {};
    angular.forEach(Object.keys(TODO_LISTS[$translate.use()]), function (key) {
      $scope.allDoneItems[key] = [];
    });

    function checkTodoItemIsFinish() {
      $scope.todoMenus = TODO_LISTS[$translate.use()];
      var todoMenuKeys = Object.keys(TODO_LISTS[$translate.use()]);

      angular.forEach(todoMenuKeys, function (listsKey) {
        $storageServices.get(listsKey + 'Finish', function (result) {
          if (result === 'true') {
            $scope.todoMenus[listsKey]['isFinish'] = true;
          }
        })
      });
      $scope.isFinish = function (todoMenu) {
        return todoMenu.isFinish ? 'isFinish' : 'noFinish';
      };
    }

    checkTodoItemIsFinish();

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

      if ($scope.todoLists.length === 0) {
        $storageServices.set($scope.subtopic + 'Finish', true);
      }
    };

    $scope.closeTodoModal = function () {
      $scope.currentModal.hide();
      checkTodoItemIsFinish();
    };

    $scope.helpModal = null;

    $scope.showHelp = function () {
      $ionicModal.fromTemplateUrl('templates/help/todo.html', {
        id: 'help',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        modal.show();
        $scope.helpModal = modal;
      });
    };
    $scope.closeHelpModal = function () {
      $scope.helpModal.hide();
    };
  });
