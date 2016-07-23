export const SOLUTIONS = [
  {
    "slug": "nginx-apache-log-analytics",
    "name": "Nginx/Apache日志分析",
    "type": "server",
    "stacks": ["Hadoop", "amMap", "ElasticSearch"],
    "description": "用Hadoop分析、解析数据，将数据存储到ElasticSearch中，通过API与amMap再显示到地图上。"
  },
  {
    "slug": "ionic-mobile-hybrid-application",
    "name": "移动混合应用",
    "type": "mobile",
    "stacks": ["Ionic", "Cordova", "ngCordova"],
    "description": "Ionic封装了Cordova和Angular，并辅助以ngCordova来封装一些Cordova插件。"
  },
  {
    "slug": "flarum-based-hybrid-application",
    "name": "Flarum与Ionic的论坛应用",
    "type": "generic",
    "stacks": ["Cordova", "Angular.js", "Ionic", "Flarum"],
    "description": "Flarum提供JSON Web Tokens API，APP通过HTTP请求来登录和授权。"
  },
  {
    "slug": "nodejs-react-web-appliction",
    "name": "Node.js React Web应用",
    "type": "generic",
    "stacks": ["React", "WebPack", "Babel", "Express"],
    "description": "Babel用于转换React中的ES6的语法，再中WebPack打包js。"
  },
  {
    "slug": "python-flask-web-jinja-app",
    "name": "Python Flask Web应用",
    "type": "server",
    "stacks": ["Flask", "Jinja2", "SQLAlchemy"],
    "description": "Jinja2作为模板引擎，SQLAlchemy作为ORM，Flask就可以起飞了~~。"
  },
  {
    "slug": "classic-java-web-application",
    "name": "Java Web应用",
    "type": "server",
    "stacks": ["Spring MVC", "iBATIS", "Gradle"],
    "description": "Java Web的经典。"
  },
  {
    "slug": "django-based-backend",
    "name": "Python Web应用",
    "type": "server",
    "stacks": ["Django", "Django JWT", "Django DRF"],
    "description": "单页面应用后台。"
  },
  {
    "slug": "lucene-based-search-engine",
    "name": "全文搜索",
    "type": "server",
    "stacks": ["Lucene", "Java"],
    "description": "全文搜索解决方案。"
  },
  {
    "slug": "mean",
    "name": "Web应用 - MEAN",
    "type": "generic",
    "stacks": ["MongoDB", "Express", "Angular.js", "Node.js"],
    "description": "Node.js的Web解决方案——MEAN。"
  },
  {
    "slug": "scala-play-web-application",
    "name": "Scala Web应用",
    "type": "generic",
    "stacks": ["Scala", "Play"],
    "description": "Play是Scala的Web框架。"
  },
  {
    "slug": "elasticsearch-leaflet-jquery-app",
    "name": "WebGis",
    "type": "generic",
    "stacks": ["Leaflet", "ElasticSearch", "Bootstrap", "jQuery"],
    "description": "基于ElasticSearch与Leaflet的先进WebGIS系统。"
  },
  {
    "slug": "assemble-static-cms",
    "name": "静态网站",
    "type": "generic",
    "stacks": ["Assemble", "Gulp"],
    "description": "编辑-发布-开发分离的CMS。"
  },
  {
    "slug": "hybrid-bluetooth-hardware-application",
    "name": "硬件应用",
    "type": "hardware",
    "stacks": ["cordova", "BLE", "Bluetooth"],
    "description": "蓝牙低功耗手机应用。"
  }
];
