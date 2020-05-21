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

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  createPage({
    path: "/profile/*",
    matchPath: "/profile/:username",
    component: path.resolve(`src/components/pages/UserProfile.tsx`),
  });
};
