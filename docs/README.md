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

Workflow
----

1.Pull

``` shell
git pull --rebase
```

2.Do Something

3.Commit

``` shell
git commit -m "[CARD-num] some words"
```
run test

``` shell
npm test
```

``` shell
git pull --rebase
npm test
```

CI Workflow
---

详细见: ``.travis.yml``文件

1. Run Unit Tests
2. Run E2E Tests
3. Send Coverage
4. Build Apk
5. Publish to Fir.im


流程规范
---

1. 写单元测试
2. 写单元测试
3. 写单元测试

代码提交流程
---

代码提交前做好以下的操作:

### 运行单元测试

```
npm test
```

在这个过程中会:

1. 检测TypeScript语法
2. 运行单元测试
3. 计算测试覆盖率

确保每一步都是正确的。

### 运行集成测试

```
npm run e2e
```
