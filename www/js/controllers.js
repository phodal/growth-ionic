angular.module('starter.controllers', ['starter.factory', 'hljs', 'starter.utils'])

  .controller('AppCtrl', function ($scope) {
  })

  .controller('AboutCtrl', function ($scope, $analytics) {
    $analytics.trackView('About Ctrl');
    $scope.isApp = window.cordova !== undefined;
  })

  .controller('skillTreeControl', function ($scope, $storageServices, $ionicModal, $analytics, $window) {
    $analytics.trackView('Skill Tree List');

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
      var flareChild = [];

      function getSkillPoint(skill, cb) {
        $storageServices.get(skill.text, function (result) {
          var rating = parseInt(result);
          if (rating) {
            var skillRating = {
              "name": skill.text,
              "size": rating
            };

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
            cb(skillRating);
          }
        });
      }

      angular.forEach(AllSkills, function (skills, index) {
        angular.forEach(skills, function (skill) {
          $scope.skillFlareChild = [];
          getSkillPoint(skill, function(rating){
            $scope.skillFlareChild.push(rating);
          });
        });
        flareChild.push({
          "name": index,
          "children": $scope.skillFlareChild
        });
      });

      var flare = {
        name: "Skill",
        "children": flareChild
      };

      var format = d3.format(",d"),
        color = d3.scale.category20c();

      var bubble = d3.layout.pack()
        .sort(null)
        .size([$window.innerWidth, $window.innerHeight])
        .padding(1);

      var svg = d3.select("#skill").append("svg")
        .attr("width", $window.innerWidth)
        .attr("height", $window.innerHeight)
        .attr("class", "bubble");

      console.log(JSON.stringify(flare));
      var node = svg.selectAll(".node")
        .data(bubble.nodes(classes(flare))
          .filter(function (d) {
            return !d.children;
          }))
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

      node.append("title")
        .text(function (d) {
          return d.className + ": " + format(d.value);
        });

      node.append("circle")
        .attr("r", function (d) {
          return d.r;
        })
        .style("fill", function (d) {
          return color(d.packageName);
        });

      node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function (d) {
          return d.className.substring(0, d.r / 3);
        });

      function classes(root) {
        var classes = [];

        function recurse(name, node) {
          if (node.children) node.children.forEach(function (child) {
            recurse(node.name, child);
          });
          else classes.push({packageName: name, className: node.name, value: node.size});
        }

        recurse(null, root);
        return {children: classes};
      }

      d3.select(self.frameElement).style("height", $window.innerHeight + "px");
    });
  })

  .controller('FeedbackCtrl', function ($scope, $http, $cordovaEmailComposer) {
    $scope.issues = [];
    $http.get('https://api.github.com/repos/phodal/growth/issues').then(function (response) {
      $scope.issues = response.data;
    });

    $scope.OpenIssue = function (url) {
      window.open(url, '_system', 'location=yes');
    };

    if (window.cordova) {
      $scope.sendMail = function () {
        $cordovaEmailComposer.isAvailable().then(function () {
        }, function () {
        });
        var email = {to: 'h@phodal.com', subject: '关于《Growth Ren》', body: '', isHtml: true};
        $cordovaEmailComposer.open(email).then(null, function () {
        });
      }
    }
  })

  .controller('ArticleCtrl', function ($scope, $sce, $stateParams, $http, $ionicLoading, marked, $filter, $analytics) {
    $analytics.trackView('Article Detail');

    $ionicLoading.show({
      animation: 'fade-in',
      template: 'Loading...'
    });
    $http({
      method: 'GET',
      url: 'article/' + $stateParams.slug + '.md'
    }).success(function (response) {
      $ionicLoading.hide();
      $scope.EditArticle = function () {
        window.open('https://github.com/phodal/growth/edit/master/www/article/' + $stateParams.slug + '.md', '_system', 'location=yes');
      };
      $scope.title = $filter('filter')(AllArticle, {"slug": $stateParams.slug})[0].title;
      $scope.htmlContent = $sce.trustAsHtml(marked(response))
    }).error(function (data, status) {
      alert(data + status);
    });
  })

  .controller('ArticleListCtrl', function ($scope, $analytics) {
    $analytics.trackView('Article List');
    $scope.articles = AllArticle;
  });
