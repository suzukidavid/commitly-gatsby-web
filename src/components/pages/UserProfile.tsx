import React from "react";
import { RouteComponentProps } from "@reach/router";

import { SEO } from "../templates/SEO";

export const UserProfile: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <SEO title="Profile" />
      <div>UserProfile</div>
    </>
  );
};
