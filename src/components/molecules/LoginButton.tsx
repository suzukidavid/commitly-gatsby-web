import React from "react";
import firebase from "gatsby-plugin-firebase";
import { Button, Icon } from "semantic-ui-react";

const handleOnLogin = async () => {
  const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope("read:user");
  const credential = await firebase.auth().signInWithPopup(provider);
  console.log(credential);
};

export const LoginButton: React.FC = () => {
  return (
    <Button color="black" onClick={() => handleOnLogin()}>
      <Icon name="github" />
      ログイン
    </Button>
  );
};
