angular.module('app.MainCtrl', ['starter.factory', 'hljs', 'starter.utils'])
  .controller('MainCtrl', function ($scope, $ionicModal, $storageServices, $analytics, $ionicPopover) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $storageServices.get('isFirstTime', function (value) {
        if (value !== 'false') {
          $ionicModal.fromTemplateUrl('templates/intro/intro.html', {
            id: 'intro1',
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            modal.show();
            $scope.modal = modal;
          });

          $scope.$on('modal.hidden', function () {
            $storageServices.set('isFirstTime', 'false');
          });
        }
      }); 
    });
    $scope.$on('$ionicView.afterEnter', function () {
      $scope.currentModal = null;
      $scope.subtopic = '';

      $scope.allDoneItems = {};
      angular.forEach(Object.keys(TODO_LISTS), function (key) {
        $scope.allDoneItems[key] = [];
      });

      setDayView();
      $storageServices.get('lastHomeView', function (view) {
        if (view !== undefined) {
          if (view === 'dayView') {
            setDayView();
          } else {
            setTodoView();
          }
        }
      });

      function setDayView() {
        $scope.dayView = true;
        $scope.todoView = false;
      }

      function setTodoView() {
        $scope.dayView = false;
        $scope.todoView = true;
      }

      $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope
      }).then(function (popover) {
        $scope.popover = popover;
      });

      $scope.setView = function (view) {
        $storageServices.set('lastHomeView', view);
        if (view === 'dayView') {
          setDayView();
        } else {
          setTodoView();
        }
        $scope.popover.hide();
      };


      $scope.openTodoModal = function (subtopic) {
        $scope.subtopic = subtopic;
        $scope.todoLists = [];
        $analytics.trackView('todo ' + subtopic);

        var todoLists = TODO_LISTS[subtopic]['basic'];
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

      $scope.closeSpecialModal = function () {
        $scope.currentModal.hide();
      };
    })
  });
