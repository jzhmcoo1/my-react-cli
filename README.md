## 一个 create-react-app 的二次封装 cli

学习项目,仅供参考和学习

### 💡 解决的问题

当我们有了自己的开发工具习惯后,每次要新建一个项目(这里拿 react 举例),都要自己在安装执行完脚手架安装命令后,再做不少的配置: 如下载依赖,添加依赖的配置文件等等.

这个脚手架通过一些 node 的 api 和三方库,做了一些开发依赖的自动化配置.

😓 代码很多配置目前还是比较死的,有很大优化空间(菜鸡 run 了)

### 手动配置:

1. 运行`npx create-react-app <app-name>`
2. 安装并配置`prettier husky lint-staged commitlint`等 CI 工具
3. 创建他们对应的配置文件,并写入自定义配置

### 编写思路:

参照手动配置的顺序, 仅仅是把官方脚手架做了一个封装,在安装完官方脚手架后,我们需要切换到该项目目录中,执行一些列`yarn add`的操作,然后进行文件的修改.

按照这个思路,我们可以先获取用户输入,得到用户想要安装的`dependencies`
,然后通过 nodeApi 执行对应的安装命令,最后也是通过 fs 的 api 创建文件并写入配置,为了格式化输入,也是在项目中引入了 prettier,格式化后进行文件的写入

### 本地运行:

1. 下载项目
2. 到对应目录安装依赖
3. 执行`npm link`或者`yarn link`
4. 随便新建个文件夹测试`my-react-cli`命令

### 用到的库

- [inquirer - 询问用户信息](https://github.com/SBoudrias/Inquirer.js/)
- [prettier - 格式化](https://prettier.io/)
- [husky & lint-staged - 提交代码时执行 Git hook](https://prettier.io/docs/en/install.html#git-hooks)
- [commitlint - git 提交时的 message 规范](https://github.com/conventional-changelog/commitlint)
- [chalk - 美化 CLI 的输出](https://www.npmjs.com/package/chalk)
- [cross-spawn - 跨平台 nodejs 子进程库](https://www.npmjs.com/package/cross-spawn)

### 参考的项目/视频/博客

- [cuixiaorui / teach-koa-setup](https://github.com/cuixiaorui/teach-koa-setup)
- [编写基于 nodejs 的 cli 工具 - 动态生成代码模板](https://www.bilibili.com/video/BV1jK4y197Ne)
- [从 0 构建自己的脚手架/CLI 知识体系（万字）🛠](https://juejin.cn/post/6966119324478079007)
