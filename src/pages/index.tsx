import React from "react";
import { Router } from "@reach/router";

import { Layout } from "../components/templates/Layout";
import { Index } from "../components/pages/Index";

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <Router>
        <Index path="/" />
      </Router>
    </Layout>
  );
};

export default IndexPage;
