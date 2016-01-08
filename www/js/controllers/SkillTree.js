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

      RenderSkillTree();

      function RenderSkillTree() {
        var skillsdata;
        skillsdata = {
          "Skills": {
            "Server": {
              "Protocol": {
                "Propose": [0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 30, 50, 50, 50],
                "USSD": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 60, 50, 40, 30],
                "UAP": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 70, 50, 30],
                "Socket Raw": [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 50, 50, 50, 70, 80]
              },
              "Optimization": {
                "Performance": [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 40, 40, 50, 50, 50],
                "Distribute": [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 40, 50, 50],
                "Stability": [0, 10, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 80, 90]
              },
              "UI": {
                "WinForm": [0, 0, 20, 40, 50, 50, 50, 50, 60, 80, 90, 95, 95, 95, 95],
                "WPF": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 50],
                "GDI": [0, 0, 0, 0, 0, 40, 50, 40, 40, 30, 30, 20, 20, 10, 5],
                "DX": [0, 0, 0, 0, 0, 10, 50, 50, 40, 40, 30, 20, 10, 10, 5],
                "Flash": [0, 0, 10, 30, 40, 50, 50, 40, 30, 20, 10, 5, 5, 5, 5]
              },
              "Algorithm": {
                "Image Processing": [0, 0, 0, 0, 0, 0, 0, 10, 30, 50, 50, 50, 45, 45, 40],
                "Face recognition": [0, 0, 0, 0, 0, 0, 0, 10, 40, 70, 60, 50, 40, 40, 40]
              }
            },
            "Web Development": {
              "Server Side": {
                "Active Page": {
                  "ASP": [0, 0, 10, 30, 60, 60, 40, 20, 20, 20, 20, 20, 20, 20, 20],
                  "ASP.Net": [0, 0, 0, 0, 0, 0, 10, 30, 70, 80, 90, 90, 90, 90, 90]
                },
                "Node.js": {
                  "express": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 30],
                  "npm": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 40]
                },
                "DB": {
                  "SqlServer": [0, 0, 0, 0, 0, 10, 20, 40, 40, 40, 60, 90, 90, 90, 80],
                  "Sqlite": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 30, 20],
                  "Mongo": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 30]
                },
                "Server": {
                  "IIS": [0, 10, 10, 30, 40, 40, 40, 60, 70, 70, 80, 80, 80, 80, 80],
                  "Apache": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 20, 40]
                },
                "API": {
                  "OAuth2.0": [0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 40, 40, 40, 30, 30],
                  "WeChat": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 30],
                  "Propose": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 40, 30]
                }
              },
              "Front Side": {
                "HTML": [0, 0, 10, 30, 50, 50, 60, 80, 90, 60, 50, 30, 30, 30, 40],
                "CSS": {
                  "CSS": [0, 0, 10, 30, 50, 50, 60, 80, 85, 60, 50, 30, 20, 20, 30],
                  "LESS": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30],
                  "Responsive": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20]
                },
                "JSFramework": {
                  "jQuery": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 30, 30, 25, 30],
                  "ExtJs": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 30],
                  "BackboneJs": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
                  "D3.js": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
                  "Rapheal": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
                  "kinetic": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20]
                },
                "Template": {
                  "Jade": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
                  "Razor": [0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 50, 60, 80, 80, 80]
                }
              }
            },
            "Language": {
              "Dotnet": {
                "C#": [0, 0, 0, 0, 0, 0, 20, 50, 70, 80, 90, 95, 95, 95, 95],
                "Xaml": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 50],
                "F#": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 30, 30]
              },
              "Script": {
                "Javascript": [0, 0, 10, 30, 50, 50, 60, 60, 60, 80, 80, 60, 50, 50, 60],
                "VBScript": [0, 0, 0, 0, 20, 20, 30, 30, 40, 30, 20, 20, 20, 20, 20],
                "CoffeeScript": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 50],
                "Python": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20]
              },
              "Java": {
                "Android": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30]
              },
              "Embedded": {
                "X86 Asm": [0, 0, 0, 0, 0, 0, 0, 0, 10, 40, 40, 30, 25, 20, 20],
                "C": [0, 0, 0, 0, 0, 0, 0, 20, 25, 30, 50, 50, 45, 40, 40]
              },
              "Other": {
                "T-SQL": [0, 0, 0, 0, 0, 10, 20, 40, 40, 40, 60, 90, 90, 90, 80],
                "(E)BNF": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 30],
                "XSD/XSLT": [0, 0, 0, 0, 0, 0, 20, 40, 40, 40, 40, 40, 50, 50, 60],
                "QB": [40, 50, 40, 30, 20, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                "VB": [0, 10, 20, 50, 60, 80, 90, 80, 70, 60, 60, 60, 60, 50, 50],
                "Pascal": [0, 0, 0, 30, 50, 60, 40, 20, 10, 5, 5, 5, 5, 5, 5],
                "IEC61131": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 40]
              }
            },
            "Other": {
              "HW&FW": {
                "Protues": [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 30, 25, 20, 20, 25],
                "Keil": [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 30, 25, 20, 20, 25],
                "Code Warrior": [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 15, 15, 10, 10, 20],
                "Protel": [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 20, 15, 10, 10, 5],
                "Multisim": [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 30, 30, 25, 20, 15],
                "Lego": [0, 0, 0, 0, 10, 40, 50, 45, 40, 35, 30, 25, 20, 15, 10]
              },
              "Productivity": {
                "Vim": [0, 0, 0, 0, 0, 0, 0, 0, 10, 20, 30, 40, 45, 50, 55],
                "AHK": [0, 0, 0, 0, 0, 0, 0, 0, 10, 20, 30, 30, 30, 35, 40],
                "Office": [0, 10, 20, 50, 60, 60, 70, 70, 80, 90, 90, 90, 90, 90, 90],
                "Photoshop": [0, 10, 20, 30, 35, 40, 45, 50, 60, 65, 60, 60, 55, 60, 60],
                "Batch": [40, 45, 50, 50, 50, 60, 65, 70, 75, 75, 80, 80, 80, 80, 80],
                "Shell": [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 30, 35, 40],
                "Linux": [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 40, 50, 55],
                "Marked Text": [10, 20, 20, 30, 40, 40, 40, 40, 40, 50, 60, 70, 80, 80, 80]
              },
              "Project": {
                "Agile": [0, 0, 0, 0, 0, 0, 0, 0, 10, 30, 40, 50, 60, 70, 80],
                "CI": [0, 0, 0, 0, 0, 0, 0, 0, 10, 30, 50, 70, 70, 80, 80],
                "Repos": {
                  "Git": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 50],
                  "SVN": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 30, 50, 50, 50],
                  "Clearcase": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 30]
                },
                "Track": {
                  "Redmine": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 30],
                  "Trello": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 20]
                },
                "Wiki": [0, 0, 0, 0, 0, 0, 0, 0, 10, 40, 50, 40, 40, 40, 40],
                "Quality Assurance": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 30, 50, 60, 60]
              },
              "Cloud": {
                "IaaS": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 15],
                "PaaS": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 30, 30],
                "SaaS": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10]
              },
              "Test": {
                "TDD": [0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 5, 5, 15, 5, 5],
                "cucumber": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 10, 30],
                "Load test": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 30, 25, 20, 15]
              }
            }
          }
        };

        function initchart() {
          var data = {
            _proficiency: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            children: null,
            value: 0,
            key: "",
            depth: 1
          };
          chart.refreshChart(data)
        }
        function mouseover(data) {
          chart.refreshChart(data);
          var c = getcrumbpath(data);
          i(c);
          d3
            .selectAll(".skills-sunburst path")
            .style("opacity", .3), sunburst
            .selectAll("path")
            .filter(function (a) { return c.indexOf(a) >= 0 })
            .style("opacity", 1)
        }
        function mouseleave() {
          d3
            .selectAll("path")
            .on("mouseover", null);
          d3
            .selectAll("path")
            .transition()
            .duration(1e3)
            .style("opacity", 1)
            .each("end", function () { d3.select(this).on("mouseover", mouseover) })
        }
        function getcrumbpath(a) {
          for (var temp = [], c = a; c.parent;) temp.unshift(c), c = c.parent;
          return temp
        }
        function h(a, d3) {
          var c = [];
          c.push("0,0");
          c.push(r.w + ",0");
          c.push(r.w + r.t + "," + r.h / 2);
          c.push(r.w + "," + r.h);
          c.push("0," + r.h);
          d3 > 0 && c.push(r.t + "," + r.h / 2);
          return c.join(" ");
        }
        function i(a) {
          a[a.length - 1]._color, a.length;
          c = d3
            .select("#skills-chart-breadcrumb .trail")
            .selectAll("g")
            .data(a, function (a) { return a.key + a.depth });
          var d = c.enter().append("svg:g");
          d
            .append("svg:polygon")
            .attr("points", h)
            .style("fill", function (a) { return a._color }),
            d
              .append("svg:text")
              .attr("x", r.w / 2 + 2)
              .attr("y", r.h / 2)
              .attr("dy", "0.35em")
              .attr("text-anchor", "middle")
              .attr("class", "breadcumb-text")
              .style("fill", function (a) { return getcolor(d3.rgb(a._color)) < 150 ? "#fff" : "#000" })
              .text(function (a) { return a.key }),
            c
              .attr("transform", function (a, b) { return "translate(" + b * (r.w + r.s) + ", 0)" }),
            c.exit().remove(),
            d3.select(".trail").style("visibility", "")
        }
        function getcolor(color) {
          return .299 * color.r + .587 * color.g + .114 * color.b
        }
        function k(a) {
          var c = ["#4CC3D9", "#FFC65D", "#7BC8A4", "#93648D", "#404040"],
            d = [-.1, -.05, 0];
          if (1 == a.depth) {
            var e = c[coloralternative % 5];
            return coloralternative++, e
          }
          if (a.depth > 1) {
            var f = d[a.value % 3];
            return d3.rgb(a.parent._color).brighter(.2 * a.depth + f * a.depth)
          }
        }
        var l;
        var chart = function (d3) {
            function processdata(data) {
              var b = [],
                c = 0;
              return data._proficiency.forEach(function (a) {
                c <= i.length && (b.push({
                  p: a,
                  date: i[c]
                }), c++)
              }), b
            }
            function c(b, c) {
              j.domain(d3.extent(b, function (a) { return a.date }));
              k
                .domain([0, 100]), cpath
                .append("g")
                .attr("class", "x-axis axis")
                .attr("transform", "translate(0," + h + ")")
                .call(bottomtick)
                .append("text")
                .attr("x", 450)
                .attr("y", -8)
                .style("text-anchor", "end")
                .text("Time"), cpath
                .append("g")
                .attr("class", "y-axis axis")
                .call(lefttick)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".91em")
                .style("text-anchor", "end")
                .text("Proficiency"), cpath
                .append("path")
                .datum(b)
                .attr("class", "line")
                .attr("id", "skills-chart-line")
                .attr("d", n)
                .attr("stroke", function () { return c._color })
            }
            function refreshChart(data) {
              var e = processdata(data),
                f = d3.select("#skills-chart-line");
              null === f[0][0]
                ? c(e, data)
                : f
                .datum(e)
                .attr("d", n)
                .attr("stroke", function () { return data._color })
            }
            var chart = {},
              rect = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
              },
              g = 500 - rect.left - rect.right,
              h = 400 - rect.top - rect.bottom,
              i = [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013],
              j = d3.scale.linear().range([0, g]),
              k = d3.scale.linear().range([h, 0]),
              bottomtick = d3
                .svg
                .axis()
                .scale(j)
                .tickValues([1999, 2004, 2009, 2013])
                .tickFormat(d3.format(".0f"))
                .tickPadding(10)
                .tickSize(0)
                .orient("bottom"),
              lefttick = d3
                .svg
                .axis()
                .scale(k)
                .tickSize(0)
                .tickPadding(10)
                .tickValues([20, 40, 60, 80, 100])
                .orient("left"),
              n = d3.svg.line().interpolate("basis").x(function (a) {
                return j(a.date)
              }).y(function (a) {
                return k(a.p)
              }),
              cpath = d3
                .select(".skills-chart")
                .append("svg")
                .attr("width", g + rect.left + rect.right)
                .attr("height", h + rect.top + rect.bottom)
                .append("g")
                .attr("transform", "translate(" + rect.left + "," + rect.top + ")");
            chart.refreshChart = refreshChart;
            return chart;
          }(d3),
          width = 580,
          height = 580,
          rad = Math.min(width, height) / Math.PI - 25,
          q = k,
          r = {
            w: 116,
            h: 30,
            s: 3,
            t: 7
          },
          sunburst = d3
            .select(".skills-sunburst")
            .append("svg:svg")
            .attr("width", width)
            .attr("height", height)
            .append("svg:g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        sunburst.append("svg:circle").attr("r", rad).style("opacity", 0);
        var t = function (a, b) {
            var c = [],
              d = a.length;
            if (a.length !== b.length) c = a.length > b.length ? a : b;
            else for (var e = 0; d > e; e++) {
              var f = Math.max(a[e], b[e]) - Math.abs(a[e] - b[e]) / 8;
              c.push(f)
            }
            return c
          },
          u = function (a) {
            if (a instanceof Array) return a;
            var b = [];
            return angular.forEach(a, function (a, c) {
              b = t(u(c), b)
            }), b
          },
          proficiencydata = d3
            .layout
            .partition()
            .sort(null)
            .size([2 * Math.PI, rad])
            .children(function (a) {
              return a.value instanceof Array
                ? (a._proficiency = a.value, d3.entries([a.value[a.value.length - 1]]))
                : (a._proficiency = u(a.value), isNaN(a.value) ? d3.entries(a.value) : null)
            })
            .value(function (a) { return a.value }),
          arc = d3.svg
            .arc()
            .startAngle(function (a) { return a.x })
            .endAngle(function (a) { return a.x + a.dx - .01 / (a.depth + .5) })
            .innerRadius(function (a) { return rad / Math.PI * a.depth })
            .outerRadius(function (a) { return rad / Math.PI * (a.depth + 1) - 1 });

        var coloralternative = 0
        var path = sunburst
          .data(d3.entries(skillsdata))
          .selectAll("g")
          .data(proficiencydata)
          .enter()
          .append("svg:g")
          .attr("display", function (a) { return a.depth ? null : "none" });
        path
          .append("svg:path")
          .attr("d", arc)
          .attr("stroke", "#fff")
          .attr("fill", function (a) { return a._color = q(a), a._color })
          .attr("fill-rule", "evenodd").attr("display", function (a) { return a.children ? null : "none" })
          .on("mouseover", mouseover);
        path.
          append("svg:text")
          .attr("transform", function (a) {
            var r = 180 * ((a.x + a.dx / 2 - Math.PI / 2) / Math.PI);
            return "rotate(" + r + ")"
          })
          .attr("x", function (a) { return rad / Math.PI * a.depth})
          .attr("dx", "6").attr("dy", ".1em").text(function (a) { return a.key })
          .attr("display", function (a) { return a.children ? null : "none" })
          .on("mouseover", mouseover);
        d3
          .select(".skills-sunburst")
          .on("mouseleave", mouseleave);
        sunburst
          .append("circle")
          .attr("r", rad / Math.PI)
          .attr("opacity", 0);
        initchart();
      }

    });
  });
