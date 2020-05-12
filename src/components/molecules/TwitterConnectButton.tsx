import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";

import { TwitterProviderId, useAuth } from "../../hooks/useAuth";

export const TwitterConnectButton: React.FC = () => {
  const { twitterConnect } = useAuth();
  const { user, userDoc } = useSelector((state) => state.auth);
  if (!user || !userDoc) {
    return null;
  }
  const twitterUserData = user.providerData.find((d) => d && d.providerId === TwitterProviderId);
  return (
    <Button color="twitter" size="big" onClick={() => twitterConnect()} disabled={!!twitterUserData}>
      <Icon name="twitter" />
      {twitterUserData ? "Twitter連携中" : "Twitter連携"}
    </Button>
  );
};
