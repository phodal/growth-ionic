# Growth —— Be Awesome Developer

**Android**:

Download：[http://fir.im/phodal](http://fir.im/phodal) 

<a href="https://play.google.com/store/apps/details?id=ren.growth&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-AC-global-none-all-co-pr-py-PartBadges-Oct1515-1"><img alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/images/apps/en-play-badge-border.png" width="180"/></a>

(ps: 已在其他各大Android应用商店发布)

**Windows Phone & Windows 10**:

<a href="http://windowsphone.com/s?appid=a6022e5d-b101-4d8f-a836-d3bfb6fd73ef"><img src="https://assets.windowsphone.com/8d997df3-5b6e-496c-88b3-e3f40117c8fd/English-get-it-from-MS_InvariantCulture_Default.png" srcset="https://assets.windowsphone.com/0100c7e5-1455-40bc-a351-b77d2801ad5a/English_get-it-from-MS_InvariantCulture_Default.png 2x"  alt="Get it from Microsoft" /></a>
<a href="https://www.microsoft.com/store/apps/9nblggh5g8kx"><img src="https://assets.windowsphone.com/d86ab9b4-2f3d-4a94-92f8-1598073e7343/English_Get_it_Win_10_InvariantCulture_Default@2x.png" srcset="https://assets.windowsphone.com/5d2bd562-d242-4538-85f4-857d6457404b/English_Get_it_Win_10_InvariantCulture_Default.png 2x"  alt="Get it on Windows 10" /></a>

**iOS**:

In development...

**Desktop**

Powered by Electron

In Build...

**Web**:

Online: [http://www.growth.ren/](http://www.growth.ren/)

QQ群: 529600394，我的微信公众号: phodal

![QRCode](www/img/wechat.jpg)

##简介

Growth关注于**Web开发的流程及其技术栈、学习路线、成长衡量**，如：

 - 完整的Web开发,运维,部署,维护介绍   
 - 如何写好代码——重构、测试、模式
 - 遗留代码、遗留系统的形成
 - 不同阶段所需的技能
 - 书籍推荐
 - 技术栈推荐
 - Web应用解决方案
 
**en**

Growth is a app to help you become awesome developer:

We design those for you:
 
 - full web developer learn, development, deploy, manitance introduction
 - skill roadmap 
 - book roadmap
 - web solution
 - how to test and refactor
 
###主视图
 
如下图所示：

<img src="www/img/help/start.jpg" width="400">

1. 技能图谱。点击右上角的图标可以进入技能图谱，技能图谱将展示现在你学到的技术栈，并且可以向你推荐未来应该学习的技术栈。图标上的10则表示你新GET到的功能点数。
2. 学习路线。学习路线是依据七日来规划的，每一日关注的点不同，如在第一天关注于如何从零开始去搭建项目。
3. 切换视图。当前有两种视图，即路线图和七日谈。
 
###七日谈模式——侧重于理论
 
如下图所示：

<img src="www/img/help/day.jpg" width="400">

1. 右上角的简介。会介绍一些每一个事项相关的信息。
2. GET技能。用于构建技能图谱、提供成长指南。
3. 工具和书单。提供一些实用的工具，以及阅读书单等等。 
 
###路线图模式——侧重于实战
 
如下图所示：

<img src="www/img/help/roadmap.jpg" width="400">

在每个Card中会包含如下的Todo List:

<img src="www/img/help/todo.jpg" width="400">

###菜单

向左滑动即可以完成这个事项。
 
<img src="www/img/help/menu.jpg" width="400"> 

1. 技能测验。用于验证我们学习的内容，以及查找补漏。
2. 读书路线。提供不同方向的书单，如前端。
3. 解决方案。提供一些现有框架的框架示例。
4. 意见和反馈。使用Github Issues来收集用户意见。 

##Setup && Develop 

###Architecture

![Architecture](growth-arch.png)

###Tech Stack

1. Angular.js
2. Cordova
3. Ionic
4. ngCordova
5. jQuery
6. Nools
7. D3.js
8. collide

Angular Plugins: angular-highlightjs, angular-marked, angular-translate

Angular Plugins: ionic-rating, ionic-ion-tinder-cards, ionic.swipecards, ionic-filter-bar 

###Setup

1.Clone

    git clone git@github.com:phodal/growth.git

2.Install Deps

    npm install -g cordova
    npm install -g ionic
    ionic serve

Plugins:


App in Browser:

    cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git
    
Google Analytics     
     
    cordova plugin add https://github.com/danwilson/google-analytics-plugin.git // 
    
I18N:
   
    cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-globalization.git
    
####Android
    
Auto Update:    
    
    cordova plugin add cordova-plugin-file  //文件
    cordova plugin add cordova-plugin-file-transfer //下载
    cordova plugin add https://github.com/pwlin/cordova-plugin-file-opener2.git //安装
    cordova plugin add https://github.com/whiteoctober/cordova-plugin-app-version.git //For Update
    cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git

####Windows Phone & Windows 10: 

Install GA SDK With NuGet

    PM>  Install-Package GoogleAnalyticsSDK 

Google Analytics:  

    cordova plugin add https://github.com/dpolivy/google-analytics-plugin#f516ba05835e6c5ce35c572a912b966949b488eb

1. [https://github.com/Microsoft/cordova-docs/blob/master/articles/getting-started/tutorial-ionic.md](https://github.com/Microsoft/cordova-docs/blob/master/articles/getting-started/tutorial-ionic.md)
2. [http://blog.vjrantal.net/2015/01/08/experiences-with-ionic-on-windows-phone-8-1/](http://blog.vjrantal.net/2015/01/08/experiences-with-ionic-on-windows-phone-8-1/) 
3. [http://www.badpenguin.org/how-to-make-your-ionic-cordova-app-to-run-under-windows-phone-8-1-and-desktop](http://www.badpenguin.org/how-to-make-your-ionic-cordova-app-to-run-under-windows-phone-8-1-and-desktop)

##其他

###Thinking

1. [https://github.com/braydie/HowToBeAProgrammer](https://github.com/braydie/HowToBeAProgrammer)

2. [http://stackshare.io/](http://stackshare.io/)

3. [http://stackshare.io/featured-posts](http://stackshare.io/featured-posts)

4. [https://www.awesomes.cn/](https://www.awesomes.cn/)

前端问题来源于: [http://markyun.github.io/2015/Front-end-Developer-Questions/](http://markyun.github.io/2015/Front-end-Developer-Questions/)

Skill Map基于: [http://bl.ocks.org/wizicer/f662a0b04425fc0f7489](http://bl.ocks.org/wizicer/f662a0b04425fc0f7489)

前端资料基于: [https://github.com/dypsilon/frontend-dev-bookmarks](https://github.com/dypsilon/frontend-dev-bookmarks)

部分书评来自于亚马逊、豆瓣。

###内容贡献者

感谢以下的内容贡献者们，结果由git-summary生成

     project  : growth
     repo age : 4 weeks
     active   : 28 days
     commits  : 731
     files    : 778
     authors  :
       724	Fengda HUANG  99.0%
         7	Le Deng       1%

英语版:  [Le Deng](https://github.com/raydeng83)

##License

© 2015~2016 [Phodal Huang](https://www.phodal.com). This code is distributed under the CC0 1.0 Universal license. See `LICENSE` in this directory.

[待我代码编成，娶你为妻可好](http://www.xuntayizhan.com/person/ji-ke-ai-qing-zhi-er-shi-dai-wo-dai-ma-bian-cheng-qu-ni-wei-qi-ke-hao-wan/)
