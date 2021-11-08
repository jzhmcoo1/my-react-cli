export default () => {
  return {
    type: "checkbox",
    message: "请选择需要开启的依赖插件",
    name: "dependency",
    choices: [
      { name: "prettier", value: "prettier husky lint-staged" },
      {
        name: "commitlint",
        value: "@commitlint/config-conventional @commitlint/cli",
      },
    ],
  };
};
