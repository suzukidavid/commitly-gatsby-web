import React from "react";
import firebase from "gatsby-plugin-firebase";
import { navigate } from "gatsby";

import { ProfileData } from "../models/ProfileData";

export const useProfileData = (username?: string) => {
  const [profileData, setProfileData] = React.useState<ProfileData | null>(null);

  const getDailyCommits = async (username: string) => {
    const getProfileDataHttps = firebase.app().functions("asia-northeast1").httpsCallable("getProfileDataHttps");
    const { data } = await getProfileDataHttps({ username });
    if (data) {
      setProfileData(new ProfileData(data));
    } else {
      await navigate("/");
    }
  };

  React.useEffect(() => {
    if (username) {
      getDailyCommits(username);
    }
  }, [username]);

  return { profileData, getDailyCommits };
};
