Ionic2 + Angular 2 + Growth + TypeScript
===

[![Build Status](https://travis-ci.org/phodal/growth2.svg?branch=master)](https://travis-ci.org/phodal/growth2) [![Code Climate](https://codeclimate.com/github/phodal/growth2/badges/gpa.svg)](https://codeclimate.com/github/phodal/growth2) [![Test Coverage](https://codeclimate.com/github/phodal/growth2/badges/coverage.svg)](https://codeclimate.com/github/phodal/growth2/coverage) [![Issue Count](https://codeclimate.com/github/phodal/growth2/badges/issue_count.svg)](https://codeclimate.com/github/phodal/growth2)

> A new version with new UI

Ionic 1 Version: [https://github.com/phodal/growth](https://github.com/phodal/growth)

Ionic 2 Tutorials: [http://ionicframework.com/docs/v2/getting-started/installation/](http://ionicframework.com/docs/v2/getting-started/installation/)

Skills
---

App:

 - JavaScript
 - TypeScript
 - Ionic 2
 - Angluar 2
 - SCSS / CSS
 - ReactiveJS
 - Cordova

Server:

Service 1:

 - Flarum (API：[http://flarum.org/docs/api/](http://flarum.org/docs/api/))
 - PHP

Service 2(TBC):

 - GitHub Page

Setup for Android
---

install deps:

    npm install -g cordova ionic@beta


Plugins:

    cordova plugin add cordova-plugin-inappbrowser


Issue of Setup
---



Cannot find name ‘cordova’:

```
npm install -g typings
typings install dt~cordova --save --global
```

Shell

```shell
typings install dt~cordova/plugins/inappbrowser --save --global
typings install dt~cordova/plugins/splashscreen --save --global
```

### Convert md to HTML

```shell
find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "html/${0%.md}.html"' {} \;
```

License
---

© 2015~2016 A [Phodal Huang](https://www.phodal.com)'s [Idea](http://github.com/phodal/ideas). . This code is distributed under the MIT license. See `LICENSE` in this directory.

[待我代码编成，娶你为妻可好](http://www.xuntayizhan.com/blog/ji-ke-ai-qing-zhi-er-shi-dai-wo-dai-ma-bian-cheng-qu-ni-wei-qi-ke-hao-wan/)