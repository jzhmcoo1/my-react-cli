import inquirer from "inquirer";
import projectName from "./project-name.js";
import lang from "./lang.js";
import dependency from "./dependency.js";

export default () => {
  return inquirer.prompt([projectName(), lang(), dependency()]);
};
