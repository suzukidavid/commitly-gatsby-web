import React from "react";
import { RouteComponentProps } from "@reach/router";

import { SEO } from "../templates/SEO";

export const UserProfile: React.FC<RouteComponentProps<{ username: string }>> = ({ username }) => {
  console.log(username);
  return (
    <>
      <SEO title="Profile" />
      <div>UserProfile</div>
    </>
  );
};
