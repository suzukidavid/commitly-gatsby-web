import React from "react";
import { Router } from "@reach/router";

import { Layout } from "../components/templates/Layout";
import { UserProfile } from "../components/pages/UserProfile";

const UserPage: React.FC = () => {
  return (
    <Layout>
      <Router basepath="/user">
        <UserProfile path="/profile" />
      </Router>
    </Layout>
  );
};

export default UserPage;
