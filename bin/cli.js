#! /usr/bin/env node --experimental-specifier-resolution=node
import question from "./questions/index.js";
import { isExists, removeDir } from "./utils";
import chalk from "chalk";
import install from "./scripts/install.js";
import spawn from "cross-spawn";

const { projectName, dependency } = await question(); // 获取用户输入
if (isExists(projectName)) {
  console.log("项目已存在,删除");
  removeDir(projectName);
} else {
  console.log(chalk.greenBright("已经获取配置,开始安装React项目..."));
  spawn.sync("npx", ["create-react-app", projectName], { stdio: "inherit" });
  if (dependency.length !== 0) {
    console.log(chalk.greenBright("开始安装依赖..."));
    install(projectName, dependency);
  }
}
