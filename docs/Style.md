CI Workflow
---

在CI上我们主要依据下面的步骤来构建(详细见: ``.travis.yml``文件)

1. Run Unit Tests - 单元测试
2. Run E2E Tests - 功能测试
3. Send Coverage - 发送测试覆盖庇
4. Build Apk - 打包
5. Publish to Fir.im - 上传Apk包


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

Git提交信息建议
---

主要格式

```
[页面] 做了些什么
```

一般的功能卡:

```
[commnuity] add commnuity index page
```


Bug 卡:

```
[Bug] do something
```

有相关Issue的Bug卡

```
[Issue-#1] do somethign
```

技术卡:

```
[T] do something
```