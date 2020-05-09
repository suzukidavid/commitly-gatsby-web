import React from "react";

import { Layout } from "../components/templates/Layout";
import { SEO } from "../components/templates/SEO";
import { LoginOnly } from "../components/templates/LoginOnly";
import { useAuthState } from "../hooks/useAuthState";

const SettingPage = () => {
  const { userDoc } = useAuthState();
  console.log(userDoc);
  return (
    <Layout>
      <SEO title="Setting" />
      <LoginOnly>TEST</LoginOnly>
    </Layout>
  );
};

export default SettingPage;
