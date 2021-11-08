import fs from "fs";
import path from "path";

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
    console.log("删除成功");
  });
};

export const writeFile = (projectName, filename, content) => {
  fs.writeFile(
    cwdPath(path.join(projectName, filename)),
    typeof content === "object" ? JSON.stringify(content) : content,
    (err) => {
      if (err) {
        throw err;
      }
      console.log("写入成功");
    }
  );
};

export const readFile = (projectName, filename) => {
  return fs.readFileSync(cwdPath(path.join(projectName, filename)));
};
