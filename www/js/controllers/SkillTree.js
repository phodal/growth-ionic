angular.module('app.skillTreeController', ['starter.factory', 'hljs', 'starter.utils'])

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

      angular.forEach(AllSkills, function (skills, index) {
        angular.forEach(skills, function (skill) {
          var skillFlareChild = [];
          $storageServices.get(skill.text, function (result) {
            var rating = parseInt(result);
            if (rating) {
              skillFlareChild.push({
                "name": skill.text,
                "size": rating
              });

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
          flareChild.push({
            "name": index,
            "children": skillFlareChild
          });
        });
      });

      RenderSkillTree({
        name: "Skill",
        "children": flareChild
      });

      function RenderSkillTree(data) {
        var format = d3.format(",d"),
          color = d3.scale.category20c();

        var bubble = d3.layout.pack()
          .sort(null)
          .size([$window.innerWidth, $window.innerHeight])
          .padding(1);

        d3.select("svg").remove();
        var svg = d3.select("#skill").append("svg")
          .attr("width", $window.innerWidth)
          .attr("height", $window.innerHeight)
          .attr("class", "bubble");

        console.log(JSON.stringify(data));
        var node = svg.selectAll(".node")
          .data(bubble.nodes(classes(data))
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
      }
    });
  });
