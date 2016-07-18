环境搭建
---

Node.js (V6.0.0)

1.安装Cordova和Ionic Beta

```
npm install -g cordova ionic@beta
```

2.Clone工程

```
git clone git@github.com:phodal/growth2.git
```

初始化子模块 content

```
git submodule init
```

```
git submodule update
```


3.执行安装命令

```
npm install
```

4.运行Web界面

```
ionic serve
```

5.构建、构建手机安装包

构建:

```
ionic build android
```

直接运行

```
ionic run android
```

Setup for Android
---

Install Cordova,Ionic:

```
npm install -g cordova ionic@beta
```

Plugins:

```
cordova plugin add cordova-plugin-inappbrowser
```

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