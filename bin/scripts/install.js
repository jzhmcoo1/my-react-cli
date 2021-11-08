import { spawn } from "cross-spawn";
import { cwdPath, writeFile, readFile } from "../utils";
import chalk from "chalk";
import prettier from "prettier";

export default (projectName, dependencies) => {
  dependencies.forEach((item) => {
    item.split(" ").forEach((d) => {
      console.log(chalk.cyan("当前安装:", d));
      spawn.sync("yarn", ["add", "-D", d], {
        cwd: cwdPath(projectName),
        stdio: "inherit",
      });
    });
  });

  dependencies.forEach((item) => {
    item.split(" ").forEach((d) => {
      if (d === "prettier") {
        writeFile(projectName, ".prettierrc.json", "{}");
        writeFile(
          projectName,
          ".prettierignore",
          `# Ignore artifacts:
build
coverage
`
        );
        spawn.sync("npx", ["husky", "install"], {
          cwd: cwdPath(projectName),
          stdio: "inherit",
        });
        spawn.sync("npm", ["set-script", "prepare", "husky install"], {
          cwd: cwdPath(projectName),
          stdio: "inherit",
        });
        spawn.sync(
          "npx",
          ["husky", "add", ".husky/pre-commit", "npx lint-staged"],
          {
            cwd: cwdPath(projectName),
            stdio: "inherit",
          }
        );
        const packageObj = JSON.parse(
          readFile(projectName, "package.json").toString()
        );
        packageObj["lint-staged"] = {
          ["**/*"]: "prettier --write --ignore-unknown",
        };
        writeFile(
          projectName,
          "package.json",
          prettier.format(JSON.stringify(packageObj), {
            parser: "json",
            tabWidth: 2,
          })
        );
      } else if (d === "@commitlint/config-conventional") {
        writeFile(
          projectName,
          "commitlint.config.js",
          prettier.format(
            "module.exports = {extends: ['@commitlint/config-conventional']}",
            {
              parser: "babel",
              tabWidth: 2,
            }
          )
        );
        spawn.sync(
          "npx",
          [
            "husky",
            "add",
            ".husky/commit-msg",
            'npx --no -- commitlint --edit "$1"',
          ],
          {
            cwd: cwdPath(projectName),
            stdio: "inherit",
          }
        );
      }
    });
  });
};
