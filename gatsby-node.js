// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "esnext",
  },
});

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "../../theme.config$": path.join(__dirname, "src/semantic/theme.config"),
      },
    },
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path.match(/^\/user/)) {
    page.matchPath = "/user/*";
    createPage(page);
  }
};
