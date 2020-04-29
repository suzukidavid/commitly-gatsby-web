/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "../../theme.config$": path.join(__dirname, "src/semantic/theme.config"),
      },
    },
  });
};
