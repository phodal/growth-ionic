angular.module('app.skillTreeController', ['starter.factory', 'hljs', 'starter.utils'])

  .controller('skillTreeControl', function ($scope, $storageServices, $ionicModal, $analytics, $window) {
    $analytics.trackView('Skill Tree');
    $storageServices.get('isFirstTimeSkill', function (value) {
      if (value !== 'false') {
        $ionicModal.fromTemplateUrl('templates/intro/skilltree.html', {
          id: 'intro1',
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          modal.show();
          $scope.modal = modal;
        });

        $scope.$on('modal.hidden', function () {
          $storageServices.set('isFirstTimeSkill', 'false');
        });
      }
    });

    $scope.ratings = 0;
    $scope.isInfinite = false;
    $scope.learnedSkills = [];
    $scope.modal = null;

    $scope.openSkillsModal = function () {
      $analytics.trackView('All Skills');

      $ionicModal.fromTemplateUrl('templates/skills/skills.html', {
        id: 'skills',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        modal.show();
        $scope.modal = modal;
      });
    };

    $scope.closeSkillsModal = function () {
      $scope.modal.hide();
    };

    $scope.$on('$ionicView.enter', function () {
      $scope.showSkillMap = true;
      // clear badge
      $storageServices.set('badgePoints', 0);

      var flareChild = {};

      angular.forEach(AllSkills, function (skills, index) {
        var skillFlareChild = {};
        angular.forEach(skills, function (skill) {
          $storageServices.get(skill.text, function (result) {
            var rating = parseInt(result);
            if (rating) {
              skillFlareChild[skill.text] = [rating];

              $scope.ratings = $scope.ratings + rating;
              if (rating >= 3) {
                $scope.learnedSkills.push({
                  skill: skill.text,
                  rating: rating
                });
              }
              if ($scope.ratings > 100) {
                $scope.isInfinite = true;
              }
            }
          });
          if (skillFlareChild) {
            flareChild[index] = skillFlareChild
          }
        });
        $storageServices.set('points', $scope.ratings);
      });
      if ($scope.ratings > 0) {
        $scope.showSkillMap = true;
        RenderSkillTree($window, {
          "Skill": flareChild
        });

        RenderBubble($storageServices, $window);
      } else {
        $scope.showSkillMap = false;
      }
    });
  });
