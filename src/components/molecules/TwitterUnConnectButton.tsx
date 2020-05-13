import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";

import { TwitterProviderId, useAuth } from "../../hooks/useAuth";

export const TwitterUnConnectButton: React.FC = () => {
  const { twitterUnconnect } = useAuth();
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return null;
  }
  const twitterUserData = user.providerData.find((d) => d && d.providerId === TwitterProviderId);
  if (!twitterUserData) {
    return null;
  }
  return (
    <Button color="red" size="big" onClick={() => twitterUnconnect()}>
      <Icon name="twitter" />
      Twitter連携解除
    </Button>
  );
};
