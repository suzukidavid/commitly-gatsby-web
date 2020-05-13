require("dotenv").config();

const {
  env: {
    GATSBY_FIREBASE_API_KEY,
    GATSBY_FIREBASE_AUTH_DOMAIN,
    GATSBY_FIREBASE_DATABASE_URL,
    GATSBY_FIREBASE_PROJECT_ID,
    GATSBY_FIREBASE_STORAGE_BUCKET,
    GATSBY_FIREBASE_MESSAGING_SENDER_ID,
    GATSBY_FIREBASE_APP_ID,
    GATSBY_FIREBASE_MEASUREMENT_ID,
  },
} = process;

module.exports = {
  siteMetadata: {
    title: `Commitly`,
    description: `Commitlyはあなたの書いたコードを言語別に集計してシェアするサービスです`,
    author: `@commitly_jp`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo_icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    "gatsby-plugin-eslint",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-less",
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: GATSBY_FIREBASE_API_KEY,
          authDomain: GATSBY_FIREBASE_AUTH_DOMAIN,
          databaseURL: GATSBY_FIREBASE_DATABASE_URL,
          projectId: GATSBY_FIREBASE_PROJECT_ID,
          storageBucket: GATSBY_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: GATSBY_FIREBASE_MESSAGING_SENDER_ID,
          appId: GATSBY_FIREBASE_APP_ID,
          measurementId: GATSBY_FIREBASE_MEASUREMENT_ID,
        },
      },
    },
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        pathToCreateStoreModule: "./src/state/createStore",
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
        },
        cleanupOnClient: true,
        windowKey: "__PRELOADED_STATE__",
      },
    },
  ],
};
