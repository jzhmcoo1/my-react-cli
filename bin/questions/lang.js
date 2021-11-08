export default () => {
  return {
    type: "list",
    name: "lang",
    message: "项目使用javascript还是typescript?",
    default: "javascript",
    choices: [{ name: "javascript" }, { name: "typescript" }],
  };
};
