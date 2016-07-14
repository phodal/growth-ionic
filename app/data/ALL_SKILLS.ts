export const ALL_SKILLS = {
  "hello": [
    {text: "HTML5"},
    {text: "JavaScript"},
    {text: "Java"},
    {text: "Python"}
  ],
  "env": [
    {text: "Windows"},
    {text: "Chrome"},
    {text: "IE / Edge"},
    {text: "Firefox"},
    {text: "GNU/Linux"}
  ],
  "build": [
    {text: "Npm"},
    {text: "Grunt"},
    {text: "Make"},
    {text: "Gradle"}
  ],
  "before": [
    {text: "Tasking"},
    {text: "KickOff"}
  ],
  "test": [
    {text: "Unit Test", display: "单元测试"},
    {text: "Functional Test", display: "功能测试"},
    {text: "Integration Test", display: "集成测试"},
    {text: "TDD"}
  ],
  "coding": [
    {text: "Rename"},
    {text: "Extract"},
    {text: "Inline"}
  ],
  "container": [
    {text: "Docker"},
    {text: "Tomcat"},
    {text: "CoreOS"}
  ],
  "server": [
    {text: "Nginx"},
    {text: "Apache"},
    {text: "Varnish"},
    {text: "Squid"}
  ],
  "analytics": [
    {text: "GA"},
    {text: "Webmaster"},
    {text: "Omniture"},
    {text: "Spark"},
    {text: "Hadoop"}
  ],
  "ux": [
    {text: "Learning Design", display: "认知设计"},
    {text: "Human Factors", display: "人因工程学"},
    {text: "Photoshop"}
  ],
  "ci": [
    {text: "Auto Test"},
    {text: "Auto Package"}
  ],
  "cd": [
    {text: "Auto Deploy"}
  ],
  "front": [
    {text: "Angular.js"},
    {text: "BootStrap"},
    {text: "React.js"},
    {text: "Backbone"},
    {text: "jQuery"},
    {text: "Ember.js"},
    {text: "Knockout.js"},
    {text: "Vue.js"}
  ],
  "framework": [
    {text: "Express.js/Koa"},
    {text: "Spring MVC"},
    {text: "Domain"},
    {text: "Django"},
    {text: "Flask"}
  ],
  "configurable": [
    {text: "Toggle"},
    {text: "Manager"}
  ]
};

export const SkillMap = {
  "basic": ["hello", "front"],
  "middle": ["framework", "test", "build"],
  "high": ["configurable", "coding"],
  "devops": ["ci", "server", "container", "cd"]
};
