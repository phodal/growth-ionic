function RenderBubble($storageServices, $window) {
  var flareChild = [];

  function getSkillPoint(skill, cb) {
    $storageServices.get(skill.text, function (result) {
      var rating = parseInt(result);
      if (rating) {
        var skillRating = {
          "name": skill.text,
          "size": rating
        };

        cb(skillRating);
      }
    });
  }

  angular.forEach(ALL_SKILLS, function (skills, index) {
    var skillFlareChild = [];
    angular.forEach(skills, function (skill) {
      getSkillPoint(skill, function (rating) {
        skillFlareChild.push(rating);
      });
    });
    flareChild.push({
      "name": index,
      "children": skillFlareChild
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
    .size([$window.innerWidth, $window.innerWidth])
    .padding(1);

  d3.select('#skillBubble svg').remove();
  var svg = d3.select("#skillBubble").append("svg")
    .attr("width", $window.innerWidth)
    .attr("height", $window.innerWidth)
    .attr("class", "bubble");

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
}
