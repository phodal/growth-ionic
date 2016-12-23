export const SKILL_TREE = [
  {
    "id": 1,
    "title": "HTML",
    "description": "Internet主要由从服务器通过HTTP协议向浏览器发送的HTML文档组成。HTML被用来结构化信息——例如标题、段落和列表等等，也可用来在一定程度上描述文档的外观和语义。",
    "rankDescriptions": [
      "理解如何创建和浏览一个基本的网页",
      "理解网页间是如何链接的、如何设计多列布局，可以处理表单字段和媒体元素"
    ],
    "links": [
      {
        "label": "无处不在的html",
        "url": "http://www.phodal.com/blog/be-a-geek-chapter-1-anywhere-html/"
      }
    ],
    "books": [
      {
        "label": "Head First HTML与CSS",
        "url": "http://www.amazon.cn/Head-First-HTML%E4%B8%8ECSS-%E7%BD%97%E5%B8%83%E6%A3%AE/dp/B00FF3P8FY/ref=sr_1_1?ie=UTF8&qid=1424182950&sr=8-1&keywords=html"
      },
      {
        "label": "图灵程序设计丛书:HTML5权威指南",
        "url": "http://www.amazon.cn/%E5%9B%BE%E7%81%B5%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1…9B%BC/dp/B00H706BIG/ref=sr_1_4?ie=UTF8&qid=1424220765&sr=8-4&keywords=html"
      }
    ],
    "maxPoints": 2,
    "stats": [
      {
        "title": "智力",
        "value": 1
      },
      {
        "title": "魅力",
        "value": 1
      },
      {
        "title": "力量",
        "value": 1
      }
    ]
  },
  {
    "id": 2,
    "title": "CSS",
    "depends": [
      1
    ],
    "links": [
      {
        "label": "无处不在的css",
        "url": "http://www.phodal.com/blog/be-a-geek-chapter-6-anywhere-css/"
      },
      {
        "label": "Can I use... (browser support)",
        "url": "http://caniuse.com/#cats=CSS"
      }
    ],
    "books": [
      {
        "label": "Head First HTML与CSS",
        "url": "http://www.amazon.cn/Head-First-HTML%E4%B8%8ECSS-%E7%BD%97%E5%B8%83%E6%A3%AE/dp/B00FF3P8FY/ref=sr_1_1?ie=UTF8&qid=1424182950&sr=8-1&keywords=html"
      },
      {
        "label": "CSS权威指南",
        "url": "http://www.amazon.cn/CSS%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97-%E8%BF%88%E8%80%B6/dp/B0011F5SIC/ref=sr_1_1?ie=UTF8&qid=1424220922&sr=8-1&keywords=css"
      },
      {
        "label": "CSS禅意花园",
        "url": "http://www.amazon.cn/CSS%E7%A6%85%E6%84%8F%E8%8A%B1%E5%9B%AD-%E8%B0%A2%E4%BC%8A/dp/B008HN791U/ref=sr_1_3?ie=UTF8&qid=1424220922&sr=8-3&keywords=css"
      }
    ],
    "maxPoints": 2,
    "stats": [
      {
        "title": "魅力",
        "value": 3
      }
    ],
    "rankDescriptions": [
      "熟悉基础CSS的格式和CSS盒模式",
      "熟悉媒体查询和响应式设计，使得设计有适配不同的移动"
    ],
    "description": "CSS能够对网页中的对象的位置排版进行像素级的精确控制，支持几乎所有的字体字号样式，拥有对网页对象和模型样式编辑的能力，并能够进行初步交互设计。",
    "talents": [
      "时尚"
    ]
  },
  {
    "id": 3,
    "title": "CSS 工具",
    "depends": [
      2
    ],
    "links": [
      {
        "label": "Sass vs. LESS",
        "url": "http://css-tricks.com/sass-vs-less/"
      },
      {
        "label": "LESS",
        "url": "http://lesscss.org/"
      },
      {
        "label": "Sass",
        "url": "http://sass-lang.com/"
      },
      {
        "label": "Stylus",
        "url": "http://learnboost.github.io/stylus/"
      }
    ],
    "books": [
      {
        "label": "Sass与Compass实战",
        "url": "http://www.amazon.cn/Sass%E4%B8%8ECompass%E5%AE%9E%E6%88%98-%E5%B0%BC%E5%BE…85%B0/dp/B00K5KNZSE/ref=sr_1_1?ie=UTF8&qid=1424221572&sr=8-1&keywords=SASS"
      }
    ],
    "maxPoints": 2,
    "rankDescriptions": [
      "熟悉变量和嵌套",
      "可以使用高级工具写你自己的代码，如mix-ins"
    ],
    "description": "LESS与SASS可以帮助你用变量、函数和嵌套编写更加结构化和高效的CSS",
    "stats": [
      {
        "title": "魅力",
        "value": 2
      },
      {
        "title": "灵巧",
        "value": 1
      }
    ]
  },
  {
    "id": 4,
    "title": "精通Web设计",
    "depends": [
      2
    ],
    "books": [
      {
        "label": "瞬间之美:Web界面设计如何让用户心动",
        "url": "http://www.amazon.cn/%E7%9E%AC%E9%97%B4%E4%B9%8B%E7%BE%8E-Web%E7%95%8C%E9%9D%A2%E8%AE%BE%E8%AE%A1%E5%A6%82%E4%BD%95%E8%AE%A9%E7%94%A8%E6%88%B7%E5%BF%83%E5%8A%A8-Robert-Hoekman-Jr/dp/B002JCU2TG/ref=sr_1_1?s=books&ie=UTF8&qid=1424747730&sr=1-1&keywords=web%E8%AE%BE%E8%AE%A1"
      },
      {
        "label": "写给大家看的Web设计书",
        "url": "http://www.amazon.cn/%E5%86%99%E7%BB%99%E5%A4%A7%E5%AE%B6%E7%9C%8B%E7%9A%84Web%E8%AE%BE%E8%AE%A1%E4%B9%A6-%E4%B8%BD%E8%8E%8E%C2%B7%E6%B4%9B%E6%99%AE%E5%85%8B/dp/B00NG9MOO2/ref=sr_1_1?s=books&ie=UTF8&qid=1424747761&sr=1-1&keywords=%E5%86%99%E7%BB%99%E5%A4%A7%E5%AE%B6%E7%9C%8B%E7%9A%84Web%E8%AE%BE%E8%AE%A1%E4%B9%A6"
      }
    ],
    "description": "可以将设计转化为HTML与CSS",
    "stats": [
      {
        "title": "魅力",
        "value": 10
      }
    ]
  },
  {
    "id": 5,
    "title": "jQuery效果",
    "depends": [
      4
    ],
    "links": [
      {
        "label": "Codecademy jQuery",
        "url": "http://www.codecademy.com/tracks/jquery"
      },
      {
        "label": "jQuery Category: Manipulation",
        "url": "http://api.jquery.com/category/manipulation/"
      },
      {
        "label": "jQuery Category: Effects",
        "url": "http://api.jquery.com/category/effects/"
      }
    ],
    "books": [
      {
        "label": "精通jQuery",
        "url": "http://www.amazon.cn/%E5%9B%BE%E7%81%B5%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E4%B8%9B%E4%B9%A6-%E7%B2%BE%E9%80%9AjQuery-%E5%BC%97%E9%87%8C%E6%9B%BC/dp/B00N42VIW0/ref=sr_1_3?ie=UTF8&qid=1424742187&sr=8-3&keywords=jquery"
      },
      {
        "label": "jQuery实战",
        "url": "http://www.amazon.cn/jQuery%E5%AE%9E%E6%88%98-%E6%AF%94%E4%BC%AF%E5%A5%A5%E7%89%B9/dp/B007QP94JA/ref=sr_1_5?ie=UTF8&qid=1424742233&sr=8-5&keywords=jquery"
      }
    ],
    "maxPoints": 3,
    "rankDescriptions": [
      "熟练操作DOM模型",
      "能熟练添加标准的动画效果到网页上",
      "能创造或添加自定义效果到网页上"
    ],
    "description": "jQuery提供技术和方法在前端操纵网页元素。",
    "talents": [
      "咝咝"
    ],
    "stats": [
      {
        "title": "魅力",
        "value": 2
      },
      {
        "title": "灵巧",
        "value": 1
      }
    ]
  },
  {
    "id": 6,
    "title": "搜索引擎优化",
    "depends": [
      1
    ],
    "links": [
      {
        "label": "每个程序员必知之SEO",
        "url": "http://www.phodal.com/blog/every-programmer-should-know-how-seo/"
      },
      {
        "label": "Webmaster Tools (Google)",
        "url": "http://www.google.com/webmasters/tools/"
      },
      {
        "label": "Bing - Webmaster Tools",
        "url": "http://www.bing.com/toolbox/webmaster"
      }
    ],
    "books": [
      {
        "label": "SEO艺术",
        "url": "http://www.amazon.cn/SEO%E8%89%BA%E6%9C%AF-%E5%9F%83%E9%87%8C%E5%85%8B%E2%8…%90%89/dp/B007VEF454/ref=sr_1_5?ie=UTF8&qid=1424223774&sr=8-5&keywords=SEO"
      },
      {
        "label": "SEO深度解析:全面挖掘搜索引擎优化的核心秘密",
        "url": "http://www.amazon.cn/SEO%E6%B7%B1%E5%BA%A6%E8%A7%A3%E6%9E%90-%E5%85%A8%E9%9…%91%9E/dp/B00IRQVFSU/ref=sr_1_2?ie=UTF8&qid=1424223774&sr=8-2&keywords=SEO"
      }
    ],
    "description": "SEO是指从自然搜索结果获得网站流量的技术和过程。",
    "stats": [
      {
        "title": "智力",
        "value": 2
      },
      {
        "title": "智慧",
        "value": 1
      }
    ]
  },
  {
    "id": 7,
    "title": "搜索引擎营销(SEM)",
    "depends": [
      6
    ],
    "links": [
      {
        "label": "十个你应该使用的SEO工具",
        "url": "http://www.webgnomes.org/blog/10-seo-analysis-tools/"
      },
      {
        "label": "在 Google Analytics（分析）中配置“搜索引擎优化”数据",
        "url": "https://support.google.com/analytics/answer/1308621?hl=zh-Hans"
      },
      {
        "label": "Using the SEO Reports (Google)",
        "url": "http://www.bing.com/toolbox/webmaster"
      },
      {
        "label": "Bing - SEO Analyzer",
        "url": "http://www.bing.com/toolbox/seo-analyzer"
      }
    ],
    "books": [
      {
        "label": "Google Analytics网站分析与优化技巧",
        "url": "http://www.amazon.cn/%E6%B5%81%E9%87%8F%E7%9A%84%E7%A7%98%E5%AF%86-Google-A…e=UTF8&qid=1424223920&sr=8-3&keywords=%E7%BD%91%E7%AB%99%E5%88%86%E6%9E%90"
      }
    ],
    "description": "仅仅做到被搜索引擎收录 并且在搜索结果中排名靠前还很不够，因为取得这样的效果实际上并不一定能增加用户的点击率，更不能保证将访问者转化为顾客或者潜在顾客，因此只能说是搜索引擎营销策略中两个最基本的目标。 SEM追求最高的性价比，以最小的投入，获最大的来自搜索引擎的访问量，并产生商业价值。",
    "stats": [
      {
        "title": "智力",
        "value": 1
      },
      {
        "title": "智慧",
        "value": 2
      }
    ],
    "talents": [
      "狡猾"
    ]
  },
  {
    "id": 8,
    "title": "Javascript",
    "depends": [
      1
    ],
    "maxPoints": 3,
    "rankDescriptions": [
      "熟悉JavaScript基本语法",
      "熟练使用闭包、高级函数、立即执行函数(匿名函数)等",
      "熟练使用元编程，解决Callback等"
    ],
    "links": [
      {
        "label": "Javascript 匿名函数与封装",
        "url": "http://www.phodal.com/blog/javascript-anonymous-function-encapsulation/"
      },
      {
        "label": "Douglas Crockford on Javascript",
        "url": "http://javascript.crockford.com/"
      }
    ],
    "books": [
      {
        "label": "JavaScript高级程序设计",
        "url": "http://www.amazon.cn/JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%B…dp/B007OQQVMY/ref=sr_1_1?ie=UTF8&qid=1424309806&sr=8-1&keywords=javascript"
      },
      {
        "label": "JavaScript语言精粹",
        "url": "http://www.amazon.cn/JavaScript%E8%AF%AD%E8%A8%80%E7%B2%BE%E7%B2%B9-%E9%81%…dp/B0097CON2S/ref=sr_1_4?ie=UTF8&qid=1424309806&sr=8-4&keywords=javascript"
      },
      {
        "label": "JavaScript DOM编程艺术",
        "url": "http://www.amazon.cn/JavaScript-DOM%E7%BC%96%E7%A8%8B%E8%89%BA%E6%9C%AF-%E5…dp/B004VJM5KE/ref=sr_1_5?ie=UTF8&qid=1424309806&sr=8-5&keywords=javascript"
      },
      {
        "label": "Effective JavaScript:编写高质量JavaScript代码的68个有效方法",
        "url": "http://www.amazon.cn/Effective-JavaScript-%E7%BC%96%E5%86%99%E9%AB%98%E8%B4…/B00GMXI1QY/ref=sr_1_13?ie=UTF8&qid=1424309806&sr=8-13&keywords=javascript"
      }
    ],
    "description": "JavaScript一种直译式脚本语言，是一种动态类型、弱类型、基于原型的语言，内置支持类型。它的解释器被称为JavaScript引擎，为浏览器的一部分，广泛用于客户端的脚本语言，最早是在HTML（标准通用标记语言下的一个应用）网页上使用，用来给HTML网页增加动态功能。",
    "stats": [
      {
        "title": "灵巧",
        "value": 3
      }
    ]
  },
  {
    "id": 9,
    "title": "JS库和框架",
    "depends": [
      8
    ],
    "maxPoints": 2,
    "rankDescriptions": [
      "熟练使用jQuery, MooTools, Prototype, Dojo, YUI等框架简单工作",
      "熟练使用KnockoutJS, Ember.js, AngularJS, 及Backbone.js等框架完成复杂的前端功能"
    ],
    "books": [
      {
        "label": "用AngularJS开发下一代Web应用",
        "url": "http://www.amazon.cn/%E7%94%A8AngularJS%E5%BC%80%E5%8F%91%E4%B8%8B%E4%B8%80…7/dp/B00G3XSBG8/ref=sr_1_6?ie=UTF8&qid=1424310373&sr=8-6&keywords=backbone"
      },
      {
        "label": "单页Web应用:JavaScript从前端到后端",
        "url": "http://www.amazon.cn/%E5%8D%95%E9%A1%B5Web%E5%BA%94%E7%94%A8-JavaScript%E4%…A/dp/B00NN8GJGA/ref=sr_1_5?ie=UTF8&qid=1424310373&sr=8-5&keywords=backbone"
      },
      {
        "label": "精通jQuery",
        "url": "http://www.amazon.cn/%E5%9B%BE%E7%81%B5%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1…%BC/dp/B00N42VIW0/ref=sr_1_3?ie=UTF8&qid=1424310743&sr=8-3&keywords=jquery"
      }
    ],
    "links": [
      {
        "label": "一步步搭建JavaScript框架",
        "url": "http://www.phodal.com/blog/build-javascript-framework-init-project/"
      },
      {
        "label": "Backbone.js",
        "url": "http://backbonejs.org/"
      },
      {
        "label": "jQuery",
        "url": "http://jquery.com/"
      }
    ],
    "description": "当你熟悉了JavaScript之后，会发现有大量的库和框架可以完成相同的任务，加速你的开发",
    "stats": [
      {
        "title": "灵巧",
        "value": 2
      },
      {
        "title": "智慧",
        "value": 1
      }
    ],
    "talents": [
      "灵活"
    ]
  },
  {
    "id": 10,
    "title": "精通前端开发",
    "depends": [
      9
    ],
    "books": [
      {
        "label": "O'Reilly:基于MVC的JavaScript Web富应用开发",
        "url": "http://www.amazon.cn/O-Reilly-%E5%9F%BA%E4%BA%8EMVC%E7%9A%84JavaScript-Web%E5%AF%8C%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91-%E9%BA%A6%E5%8D%A1%E5%8A%B3/dp/B0082226FU/ref=sr_1_6?s=books&ie=UTF8&qid=1424747838&sr=1-6&keywords=mvc"
      },
      {
        "label": "JavaScript框架设计",
        "url": "http://www.amazon.cn/JavaScript%E6%A1%86%E6%9E%B6%E8%AE%BE%E8%AE%A1-%E5%8F%B8%E5%BE%92%E6%AD%A3%E7%BE%8E/dp/B00JD96R2Y/ref=sr_1_9?s=books&ie=UTF8&qid=1424747885&sr=1-9&keywords=%E6%A1%86%E6%9E%B6"
      }
    ],
    "stats": [
      {
        "title": "灵巧",
        "value": 10
      }
    ]
  },
  {
    "id": 11,
    "title": "服务端编程",
    "depends": [
      1
    ],
    "links": [
      {
        "label": "Server-side scripting Wiki",
        "url": "http://en.wikipedia.org/wiki/Server-side_scripting"
      }
    ],
    "description": "在web服务器上编写程序并使之正常运行",
    "stats": [
      {
        "title": "力量",
        "value": 3
      }
    ]
  },
  {
    "id": 12,
    "title": "服务端框架",
    "depends": [
      11
    ],
    "links": [
      {
        "label": "Web应用程序框架比较",
        "url": "http://en.wikipedia.org/wiki/Comparison_of_web_application_frameworks"
      }
    ],
    "description": "Web应用框架有助于减轻网页开发时共通性活动的工作负荷，例如许多框架提供数据库访问接口、标准样板以及会话管理等，可提升代码的可再用性。",
    "stats": [
      {
        "title": "力量",
        "value": 2
      },
      {
        "title": "智慧",
        "value": 1
      }
    ],
    "talents": [
      "美型男"
    ]
  },
  {
    "id": 13,
    "title": "Database Authoring",
    "links": [
      {
        "label": "w3schools.com SQL Tutorial",
        "url": "http://www.w3schools.com/sql/"
      },
      {
        "label": "SQLZOO Interactive SQL Tutorial",
        "url": "http://sqlzoo.net/wiki/"
      },
      {
        "label": "Database Normalization Wiki",
        "url": "https://en.wikipedia.org/wiki/Database_normalization"
      }
    ],
    "books": [
      {
        "label": "Head First PHP & MySQL",
        "url": "http://www.amazon.cn/Head-First-PHP-amp-MySQL-%E8%B4%9D%E4%BC%8A%E5%88%A9/dp/B004R1QIJU/ref=sr_1_9?ie=UTF8&qid=1424744114&sr=8-9&keywords=mysql"
      },
      {
        "label": "Php和Mysql Web开发",
        "url": "http://www.amazon.cn/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6%E4%B8%9B%E4%B9%A6-Php%E5%92%8CMysql-Web%E5%BC%80%E5%8F%91-Luke-Welling/dp/B001TDLD80/ref=sr_1_8?ie=UTF8&qid=1424744114&sr=8-8&keywords=mysql"
      }
    ],
    "maxPoints": 2,
    "rankDescriptions": [
      "理解如何创建表",
      "理解关系数据库如何组织数据"
    ],
    "description": "数据库是依照某种数据模型组织起来并存放二级存储器中的数据集合。这种数据集合具有如下特点：尽可能不重复，以最优方式为某个特定组织的多种应用服务，其数据结构独立于使用它的应用程序，对数据的增、删、改、查由统一软件进行管理和控制。",
    "stats": [
      {
        "title": "力量",
        "value": 3
      }
    ]
  },
  {
    "id": 14,
    "title": "高级数据库管理",
    "depends": [
      13
    ],
    "links": [
      {
        "label": "Stored Procedure - Wiki",
        "url": "http://en.wikipedia.org/wiki/Stored_procedure"
      },
      {
        "label": "User-defined function Wiki",
        "url": "http://en.wikipedia.org/wiki/User_defined_function"
      },
      {
        "label": "Oracle database Performance Tuning FAQ",
        "url": "http://www.orafaq.com/wiki/Oracle_database_Performance_Tuning_FAQ"
      }
    ],
    "books": [
      {
        "label": "数据库重构",
        "url": ""
      },
      {
        "label": "高性能MySQL",
        "url": "http://www.amazon.cn/%E9%AB%98%E6%80%A7%E8%83%BDMySQL-%E6%96%BD%E7%93%A6%E8%8C%A8/dp/B00C1W58DE/ref=sr_1_1?ie=UTF8&qid=1424744114&sr=8-1&keywords=mysql"
      }
    ],
    "maxPoints": 2,
    "rankDescriptions": [
      "能写存储过程和自定义函数,使得查询更高效",
      "能检测出影响性能的缺陷"
    ],
    "description": "仅仅架构数据库是不够的,数据库还需要优化或调整,以提高性能.除了基本的表和关系数据,数据库允许创建存储过程,这一些SQL语句被存在数据库中.MySQL支持用户自定义函数（UDF, User-Defined Functions）.",
    "stats": [
      {
        "title": "力量",
        "value": 2
      },
      {
        "title": "灵巧",
        "value": 1
      }
    ],
    "talents": [
      "XXL 背包"
    ]
  },
  {
    "id": 15,
    "title": "精通服务端开发",
    "books": [
      {
        "label": "NoSQL精粹",
        "url": "http://www.amazon.cn/NoSQL%E7%B2%BE%E7%B2%B9-%E5%A1%9E%E5%BE%97%E6%8B%89%E5%90%89/dp/B00EEQ2GPS/ref=sr_1_1?ie=UTF8&qid=1424744772&sr=8-1&keywords=nosql"
      },
      {
        "label": "网站性能监测与优化",
        "url": "http://www.amazon.cn/%E7%BD%91%E7%AB%99%E6%80%A7%E8%83%BD%E7%9B%91%E6%B5%8B%E4%B8%8E%E4%BC%98%E5%8C%96-%E5%85%8B%E9%B2%81%E5%B0%94/dp/B004BNA3HC/ref=sr_1_4?ie=UTF8&qid=1424744831&sr=8-4&keywords=web%E6%80%A7%E8%83%BD"
      },
      {
        "label": "实用负载均衡技术:网站性能优化攻略 ",
        "url": "http://www.amazon.cn/%E5%AE%9E%E7%94%A8%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E6%8A%80%E6%9C%AF-%E7%BD%91%E7%AB%99%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E6%94%BB%E7%95%A5-%E9%97%A8%E4%BC%AF%E9%87%8C/dp/B00COZI7XQ/ref=pd_sim_b_8?ie=UTF8&refRID=0B6S0AP07MQBNWSAY3MC"
      }
    ],
    "depends": [
      12,
      14
    ],
    "description": "你有能力设计和构建应用程序的后台,同时高效地存储和检索数据。",
    "stats": [
      {
        "title": "力量",
        "value": 10
      }
    ]
  },
  {
    "id": 16,
    "title": "用户授权和认证",
    "depends": [
      15
    ],
    "links": [
      {
        "label": "ASP.NET authentication and authorization - CodeProject",
        "url": "http://www.codeproject.com/Articles/98950/ASP-NET-authentication-and-authorization"
      },
      {
        "label": "OpenID Wiki (authentication)",
        "url": "http://en.wikipedia.org/wiki/OpenID"
      },
      {
        "label": "OAuth Community",
        "url": "http://oauth.net/"
      },
      {
        "label": "ASP.NET Authorization",
        "url": "http://msdn.microsoft.com/en-us/library/wce3kxhd(v=vs.100).aspx"
      }
    ],
    "description": "认证的过程是确定某人或某事是否是谁或什么。授权是当用户被允许执行动作或具有对资源的访问确定的过程。",
    "stats": [
      {
        "title": "坚韧",
        "value": 5
      }
    ],
    "talents": [
      "真理探寻者"
    ]
  },
  {
    "id": 17,
    "title": "AJAX & APIs",
    "depends": [
      10,
      15
    ],
    "links": [
      {
        "label": "AJAX (programming) Wiki",
        "url": "http://en.wikipedia.org/wiki/Ajax_(programming)"
      },
      {
        "label": "Representational state transfer (REST) Wiki",
        "url": "http://en.wikipedia.org/wiki/Representational_state_transfer"
      }
    ],
    "books": [
      {
        "label": "RESTful Web APIs中文版",
        "url": "http://www.amazon.cn/RESTful-Web-APIs%E4%B8%AD%E6%96%87%E7%89%88-%E4%BC%A6%E7%BA%B3%E5%BE%B7%C2%B7%E7%90%86%E6%9F%A5%E5%BE%B7%E6%A3%AE/dp/B00KWGEI64/ref=sr_1_1?ie=UTF8&qid=1424745370&sr=8-1&keywords=restful"
      },
      {
        "label": "REST实战:中文版超媒体和系统架构",
        "url": "http://www.amazon.cn/REST%E5%AE%9E%E6%88%98-%E4%B8%AD%E6%96%87%E7%89%88%E8%B6%85%E5%AA%92%E4%BD%93%E5%92%8C%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84-%E9%9F%A6%E4%BC%AF/dp/B005XGSFE4/ref=sr_1_2?ie=UTF8&qid=1424745421&sr=8-2&keywords=REST"
      },
      {
        "label": "Head First Ajax",
        "url": "http://www.amazon.cn/Head-First-Ajax-%E8%8E%B1%E5%B0%94/dp/B003VTM8C0/ref=sr_1_2?ie=UTF8&qid=1424745464&sr=8-2&keywords=ajax"
      },
      {
        "label": "Ajax权威指南",
        "url": "http://www.amazon.cn/Ajax%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97-%E8%B5%AB%E5%B0%94%E5%BE%B7%E5%B0%94/dp/B002T9VGG2/ref=sr_1_4?ie=UTF8&qid=1424745464&sr=8-4&keywords=ajax"
      }
    ],
    "description": "API是一些预先定义的函数，目的是提供应用程序与开发人员基于某软件或硬件得以访问一组例程的能力，而又无需访问源码，或理解内部工作机制的细节。通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。",
    "stats": [
      {
        "title": "力量",
        "value": 1
      },
      {
        "title": "灵巧",
        "value": 1
      },
      {
        "title": "智力",
        "value": 1
      }
    ],
    "talents": [
      "心灵编织"
    ]
  },
  {
    "id": 18,
    "title": "用户探索",
    "maxPoints": 2,
    "rankDescriptions": [
      "你知道要问的问题,可以用草图来明确你的想法",
      "你可以使用先进的技术，如经验映射去指导利益相关方的对话。"
    ],
    "links": [
      {
        "label": "The anatomy of an experience map",
        "url": "http://www.adaptivepath.com/ideas/the-anatomy-of-an-experience-map"
      }
    ],
    "description": "在开始设计之前确定哪些是客户(网站访问者和网站用户)希望或者需要的.技术栈包括素描基础,卡分类和经验映射",
    "stats": [
      {
        "title": "智慧",
        "value": 2
      },
      {
        "title": "魅力",
        "value": 1
      }
    ],
    "talents": [
      "思想穿透者"
    ]
  },
  {
    "id": 19,
    "title": "平面设计",
    "maxPoints": 2,
    "rankDescriptions": [
      "能创建传达明确信息的平衡,补充布局",
      "了解如何创建一个引人注目的独特设计，它支持传统的设计值，以及您的基础信息。"
    ],
    "depends": [
      18
    ],
    "links": [
      {
        "label": "Graphic Design Wiki",
        "url": "http://en.wikipedia.org/wiki/Graphic_design"
      },
      {
        "label": "Behance",
        "url": "http://www.behance.net/"
      },
      {
        "label": "User experience design Wiki",
        "url": "http://en.wikipedia.org/wiki/User_experience_design"
      },
      {
        "label": "Awwwards",
        "url": "http://www.awwwards.com/"
      }
    ],
    "books": [
      {
        "label": "设计中的设计",
        "url": "http://www.amazon.cn/%E8%AE%BE%E8%AE%A1%E4%B8%AD%E7%9A%84%E8%AE%BE%E8%AE%A1-%E5%8E%9F%E7%A0%94%E5%93%89/dp/B0046ZS8XG/ref=sr_1_1?ie=UTF8&qid=1424746851&sr=8-1&keywords=%E8%AE%BE%E8%AE%A1"
      },
      {
        "label": "写给大家看的设计书",
        "url": "http://www.amazon.cn/%E5%86%99%E7%BB%99%E5%A4%A7%E5%AE%B6%E7%9C%8B%E7%9A%84%E8%AE%BE%E8%AE%A1%E4%B9%A6-%E5%A8%81%E5%BB%89%E6%96%AF/dp/B00ALPRKG6/ref=sr_1_6?ie=UTF8&qid=1424746851&sr=8-6&keywords=%E8%AE%BE%E8%AE%A1"
      },
      {
        "label": "超越平凡的平面设计:版式设计原理与应用",
        "url": "http://www.amazon.cn/%E8%B6%85%E8%B6%8A%E5%B9%B3%E5%87%A1%E7%9A%84%E5%B9%B3%E9%9D%A2%E8%AE%BE%E8%AE%A1-%E7%89%88%E5%BC%8F%E8%AE%BE%E8%AE%A1%E5%8E%9F%E7%90%86%E4%B8%8E%E5%BA%94%E7%94%A8-%E9%BA%A6%E5%85%8B%E9%9F%A6%E5%BE%B7/dp/B0046UT08S/ref=sr_1_15?ie=UTF8&qid=1424746851&sr=8-15&keywords=%E8%AE%BE%E8%AE%A1"
      },
      {
        "label": "点石成金:访客至上的网页设计秘笈",
        "url": "http://www.amazon.cn/%E7%82%B9%E7%9F%B3%E6%88%90%E9%87%91-%E8%AE%BF%E5%AE%A2%E8%87%B3%E4%B8%8A%E7%9A%84%E7%BD%91%E9%A1%B5%E8%AE%BE%E8%AE%A1%E7%A7%98%E7%AC%88-Steve-Krug/dp/B0011BTJV8/ref=sr_1_27?ie=UTF8&qid=1424746981&sr=8-27&keywords=%E8%AE%BE%E8%AE%A1"
      }
    ],
    "description": "平面设计是以“视觉”作为沟通和表现的方式，透过多种方式来创造和结合符号、图片和文字，借此作出用来传达想法或讯息的视觉表现。",
    "stats": [
      {
        "title": "魅力",
        "value": 3
      }
    ],
    "talents": [
      "艺术家"
    ]
  },
  {
    "id": 20,
    "title": "平面设计工具",
    "depends": [
      19
    ],
    "links": [
      {
        "label": "100 Top Tools for Graphic Designers | Graphic Design Classes",
        "url": "http://graphicdesignclasses.net/design-tools/"
      }
    ],
    "books": [
      {
        "label": "图解力:跟顶级设计师学作信息图 ",
        "url": "http://www.amazon.cn/%E5%9B%BE%E8%A7%A3%E5%8A%9B-%E8%B7%9F%E9%A1%B6%E7%BA%A7%E8%AE%BE%E8%AE%A1%E5%B8%88%E5%AD%A6%E4%BD%9C%E4%BF%A1%E6%81%AF%E5%9B%BE-%E6%9C%A8%E6%9D%91%E5%8D%9A%E4%B9%8B/dp/B00D10E2NC/ref=sr_1_1?ie=UTF8&qid=1424747261&sr=8-1&keywords=%E5%9B%BE%E8%A7%A3%E5%8A%9B"
      },
      {
        "label": "文字设计",
        "url": "http://www.amazon.cn/%E6%96%87%E5%AD%97%E8%AE%BE%E8%AE%A1-%E6%97%A5%E6%9C%AC%E5%B9%B3%E9%9D%A2%E8%AE%BE%E8%AE%A1%E5%B8%88%E5%8F%82%E8%80%83%E6%89%8B%E5%86%8C-%E6%97%A5%E6%9C%AC-DESIGNING%E7%BC%96%E8%BE%91%E9%83%A8/dp/B00FG1OL2Q/ref=sr_1_27?s=books&ie=UTF8&qid=1424747321&sr=1-27&keywords=%E5%B9%B3%E9%9D%A2%E8%AE%BE%E8%AE%A1  "
      },
      {
        "label": "Adobe Photoshop CS6标准培训教材",
        "url": "http://www.amazon.cn/Adobe-Photoshop-CS6%E6%A0%87%E5%87%86%E5%9F%B9%E8%AE%AD%E6%95%99%E6%9D%90-ACAA%E4%B8%93%E5%AE%B6%E5%A7%94%E5%91%98%E4%BC%9A/dp/B00AD2D4QM/ref=sr_1_12?s=books&ie=UTF8&qid=1424747376&sr=1-12&keywords=photoshop"
      }
    ],
    "description": "用如Photoshop之类的软件与手绘板一起创建布局、字体排印、视觉艺术、版面等以添加专业润色你的设计。",
    "stats": [
      {
        "title": "魅力",
        "value": 2
      },
      {
        "title": "智力",
        "value": 1
      }
    ]
  },
  {
    "id": 21,
    "title": "原型",
    "depends": [
      18
    ],
    "links": [
      {
        "label": "Design Better And Faster With Rapid Prototyping",
        "url": "http://www.smashingmagazine.com/2010/06/16/design-better-faster-with-rapid-prototyping/"
      },
      {
        "label": "16 Design Tools for Prototyping and Wireframing",
        "url": "http://www.sitepoint.com/tools-prototyping-wireframing/"
      }
    ],
    "books": [
      {
        "label": "原型设计:实践者指南",
        "url": "http://www.amazon.cn/%E5%8E%9F%E5%9E%8B%E8%AE%BE%E8%AE%A1-%E5%AE%9E%E8%B7%B5%E8%80%85%E6%8C%87%E5%8D%97-%E6%B2%83%E8%8F%B2%E5%B0%94/dp/B00AX1MC3Y/ref=sr_1_3?ie=UTF8&qid=1424746558&sr=8-3&keywords=%E5%8E%9F%E5%9E%8B"
      },
      {
        "label": "Axure RP 6原型设计精髓",
        "url": "http://www.amazon.cn/Axure-RP-6%E5%8E%9F%E5%9E%8B%E8%AE%BE%E8%AE%A1%E7%B2%BE%E9%AB%93-Ezra-Schwartz/dp/B00COWGEX4/ref=sr_1_16?ie=UTF8&qid=1424746558&sr=8-16&keywords=%E5%8E%9F%E5%9E%8B"
      },
      {
        "label": "用户体验草图设计工具手册",
        "url": "http://www.amazon.cn/%E7%94%A8%E6%88%B7%E4%BD%93%E9%AA%8C%E8%8D%89%E5%9B%BE%E8%AE%BE%E8%AE%A1%E5%B7%A5%E5%85%B7%E6%89%8B%E5%86%8C-%E6%AF%94%E5%B0%94%C2%B7%E5%B7%B4%E5%85%8B%E6%96%AF%E9%A1%BF/dp/B00K67SPX6/ref=sr_1_4?s=books&ie=UTF8&qid=1424747535&sr=1-4&keywords=%E7%94%A8%E6%88%B7%E4%BD%93%E9%AA%8C"
      }
    ],
    "description": "产品原型可以概括的说是整个产品面市之前的一个框架设计。以网站注册作为例子,整个前期的交互设计流程图之后,就是原形开发的设计阶段,简单的来说是将页面的模块、原素、人机交互的形式，利用线框描述的方法，将产品脱离皮肤状态下更加具体跟生动的进行表达.",
    "stats": [
      {
        "title": "智慧",
        "value": 1
      },
      {
        "title": "智力",
        "value": 2
      }
    ],
    "talents": [
      "咒术师"
    ]
  },
  {
    "id": 22,
    "title": "精通用户体验设计",
    "depends": [
      19,
      21
    ],
    "books": [
      {
        "label": "用户体验要素:以用户为中心的产品设计",
        "url": "http://www.amazon.cn/%E7%94%A8%E6%88%B7%E4%BD%93%E9%AA%8C%E8%A6%81%E7%B4%A0…E8VDS/ref=sr_1_2?ie=UTF8&qid=1424396126&sr=8-2&keywords=%E7%94%A8%E6%88%B7"
      }
    ],
    "description": "能够依靠的项目要求变成一个有吸引力的设计，促进了愉快的用户体验。",
    "stats": [
      {
        "title": "智慧",
        "value": 1
      },
      {
        "title": "魅力",
        "value": 2
      }
    ]
  },
  {
    "id": 23,
    "title": "用户测试",
    "depends": [
      22
    ],
    "links": [
      {
        "label": "可用性测试",
        "url": "http://en.wikipedia.org/wiki/Usability_testing"
      }
    ],
    "books": [
      {
        "label": "用户体验度量:量化用户体验的统计学方法",
        "url": "http://www.amazon.cn/%E7%94%A8%E6%88%B7%E4%BD%93%E9%AA%8C%E5%BA%A6%E9%87%8F-%E9%87%8F%E5%8C%96%E7%94%A8%E6%88%B7%E4%BD%93%E9%AA%8C%E7%9A%84%E7%BB%9F%E8%AE%A1%E5%AD%A6%E6%96%B9%E6%B3%95-%E9%82%B5%E7%BD%97/dp/B00JL2ZNX2/ref=sr_1_3?s=books&ie=UTF8&qid=1424747535&sr=1-3&keywords=%E7%94%A8%E6%88%B7%E4%BD%93%E9%AA%8C"
      }
    ],
    "description": "它是一种技术，也被称为可用性测试，所使用的用户测试它来评估一个网站。",
    "stats": [
      {
        "title": "魅力",
        "value": 1
      },
      {
        "title": "智慧",
        "value": 2
      }
    ],
    "talents": [
      "炼金"
    ]
  },
  {
    "id": 24,
    "title": "服务器管理",
    "links": [
      {
        "label": "Web服务器比较",
        "url": "http://en.wikipedia.org/wiki/Comparison_of_web_server_software"
      }
    ],
    "books": [
      {
        "label": "鸟哥的Linux私房菜:服务器架设篇",
        "url": "http://www.amazon.cn/%E9%B8%9F%E5%93%A5%E7%9A%84Linux%E7%A7%81%E6%88%BF%E8%8F%9C-%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%9E%B6%E8%AE%BE%E7%AF%87-%E9%B8%9F%E5%93%A5/dp/B008AEI8A2/ref=sr_1_1?ie=UTF8&qid=1424745898&sr=8-1&keywords=linux+%E6%9C%8D%E5%8A%A1%E5%99%A8"
      }
    ],
    "maxPoints": 2,
    "rankDescriptions": [
      "能够在新的环境(操作系统)中搭建你的应用",
      "熟悉HTTP服务器模块的编译、使用"
    ],
    "description": "无论是哪种类型的语言都需要一个Web服务器来运行，不同语言可能会限制Web服务器，学习Web服务器的配置将会帮助网站更好的运行。",
    "stats": [
      {
        "title": "坚韧",
        "value": 3
      }
    ],
    "talents": [
      "监管者"
    ]
  },
  {
    "id": 25,
    "title": "部署",
    "depends": [
      24
    ],
    "links": [
      {
        "label": "SSL Certificate Installation",
        "url": "http://www.sslshopper.com/ssl-certificate-installation.html"
      },
      {
        "label": "Minimize payload size - Google Developers",
        "url": "https://developers.google.com/speed/docs/best-practices/payload"
      }
    ],
    "books": [
      {
        "label": "构建高性能Web站点",
        "url": "http://www.amazon.cn/%E6%9E%84%E5%BB%BA%E9%AB%98%E6%80%A7%E8%83%BDWeb%E7%AB…eywords=%E6%9E%84%E5%BB%BA%E9%AB%98%E6%80%A7%E8%83%BDweb%E7%AB%99%E7%82%B9"
      },
      {
        "label": "深入理解Nginx:模块开发与架构解析",
        "url": "http://www.amazon.cn/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3Nginx-%E6%A8%A1%E5…316&sr=8-9&keywords=%E9%AB%98%E6%80%A7%E8%83%BD%E6%9C%8D%E5%8A%A1%E5%99%A8"
      },
      {
        "label": "Web性能权威指南",
        "url": "http://www.amazon.cn/Web%E6%80%A7%E8%83%BD%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D…FU/ref=sr_1_1?ie=UTF8&qid=1424396385&sr=8-1&keywords=web%E6%80%A7%E8%83%BD"
      }
    ],
    "maxPoints": 2,
    "rankDescriptions": [
      "能最小化公共文件(js,css)和服务压缩(gzip)以节省带宽,同时提高网站速度",
      "确保敏感流量通过HTTPS,并使用SSL证书"
    ],
    "description": "在与世界分享你的应用程序，请在服务器上的安全性和性能的最佳实践。",
    "stats": [
      {
        "title": "坚韧",
        "value": 2
      },
      {
        "title": "灵巧",
        "value": 1
      }
    ],
    "talents": [
      "频谱指南"
    ]
  },
  {
    "id": 26,
    "title": "精通Web开发",
    "depends": [
      4,
      5,
      10,
      15,
      22,
      25
    ],
    "books": [
      {
        "label": "企业应用架构模式",
        "url": "http://www.amazon.cn/%E4%BC%81%E4%B8%9A%E5%BA%94%E7%94%A8%E6%9E%B6%E6%9E%84%E6%A8%A1%E5%BC%8F-%E7%A6%8F%E5%8B%92/dp/B003LBSRDM/ref=sr_1_1?s=books&ie=UTF8&qid=1424747956&sr=1-1&keywords=%E4%BC%81%E4%B8%9A+%E6%A8%A1%E5%BC%8F"
      },
      {
        "label": "实现领域驱动设计",
        "url": "http://www.amazon.cn/%E5%AE%9E%E7%8E%B0%E9%A2%86%E5%9F%9F%E9%A9%B1%E5%8A%A8%E8%AE%BE%E8%AE%A1-%E5%BC%97%E5%86%9C/dp/B00IYTVWA6/ref=pd_sim_b_1?ie=UTF8&refRID=12M5BEX6D1VPR9RNBCE8"
      },
      {
        "label": "持续交付:发布可靠软件的系统方法",
        "url": "http://www.amazon.cn/%E6%8C%81%E7%BB%AD%E4%BA%A4%E4%BB%98-%E5%8F%91%E5%B8%83%E5%8F%AF%E9%9D%A0%E8%BD%AF%E4%BB%B6%E7%9A%84%E7%B3%BB%E7%BB%9F%E6%96%B9%E6%B3%95-Jez-Humble-David-Farley/dp/B005V9BB1M/ref=pd_sim_b_27?ie=UTF8&refRID=0CSMABP0CX12RC5KQ703"
      }
    ],
    "links": [
      {
        "label": "Web Development Wiki",
        "url": "http://en.wikipedia.org/wiki/Web_development"
      }
    ],
    "description": "这里指的是设计，制造和维护一个网站。",
    "stats": [
      {
        "title": "魅力",
        "value": 3
      },
      {
        "title": "灵巧",
        "value": 3
      },
      {
        "title": "坚韧",
        "value": 3
      },
      {
        "title": "智力",
        "value": 3
      },
      {
        "title": "力量",
        "value": 3
      },
      {
        "title": "智慧",
        "value": 3
      }
    ],
    "talents": [
      "半仙"
    ]
  }
];
