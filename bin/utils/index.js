import fs from "fs";
import path from "path";
import chalk from "chalk";

export const cwdPath = (name) => path.join(process.cwd(), name);

export const isExists = (name) => {
  // 当前命令行选择的目录
  const cwd = process.cwd();
  // 需要创建的目录地址
  const targetAir = path.join(cwd, name);
  return fs.existsSync(targetAir);
};

export const removeDir = (name) => {
  fs.rmdir(cwdPath(name), { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
    console.log(chalk.cyan(`删除 ${cwdPath(name)} 成功`));
  });
};

export const writeFile = (projectName, filename, content) => {
  const __filename = cwdPath(path.join(projectName, filename));
  console.log(__filename);
  fs.writeFile(__filename, content, (err) => {
    if (err) {
      throw err;
    }
    console.log(chalk.greenBright(`写入 ${__filename} 成功`));
  });
};

export const readFile = (projectName, filename) => {
  return fs.readFileSync(cwdPath(path.join(projectName, filename)));
};
