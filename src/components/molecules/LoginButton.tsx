import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";

import { useAuth } from "../../hooks/useAuth";

export const LoginButton: React.FC = () => {
  const { login } = useAuth();
  const { user } = useSelector((state) => state.auth);
  return (
    <Button color="black" size="big" onClick={() => login()} disabled={!!user}>
      <Icon name="github" />
      {user ? "GitHubログイン中" : "GitHubログイン"}
    </Button>
  );
};
