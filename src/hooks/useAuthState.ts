import React from "react";
import firebase from "gatsby-plugin-firebase";
import "firebase/auth";

export const useAuthState = () => {
  const [user, setUser] = React.useState<null | firebase.User>(null);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      firebase.auth().onAuthStateChanged((currentUser) => setUser(currentUser));
    }
    return;
  }, []);
  return user;
};
