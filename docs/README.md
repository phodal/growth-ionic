环境搭建
---

1. 安装Cordova和Ionic Beta

```
npm install -g cordova ionic@beta
```

2. 执行安装命令

```
npm install
```

3. 运行Web

```
ionic serve
```

4. 构建、构建手机安装包

构建:

```
ionic build android
```

直接运行

```
ionic run android
```

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

