import React from "react";
import { RouteComponentProps } from "@reach/router";
import { navigate } from "gatsby";

import { SEO } from "../templates/SEO";

export const UserProfile: React.FC<RouteComponentProps<{ username: string }>> = ({ username }) => {
  React.useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username]);

  if (!username) {
    return null;
  }
  return (
    <>
      <SEO title="Profile" />
      <div>UserProfile: {username}</div>
    </>
  );
};
