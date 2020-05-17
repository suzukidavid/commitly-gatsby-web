import React from "react";
import { RouteComponentProps } from "@reach/router";
import { navigate } from "gatsby";

import { SEO } from "../templates/SEO";
import { useProfileData } from "../../hooks/useProfileData";

export const UserProfile: React.FC<RouteComponentProps<{ username: string }>> = ({ username }) => {
  React.useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username]);

  const { profileData } = useProfileData(username);
  console.log(profileData);

  if (!username || !profileData) {
    return null;
  }

  return (
    <>
      <SEO title={`Profile of ${username}`} />
      <div>UserProfile: {username}</div>
    </>
  );
};
