import React from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

import { Layout } from "../components/templates/Layout";
import { SEO } from "../components/templates/SEO";
import { LoginOnly } from "../components/templates/LoginOnly";
import { TwitterConnectButton, TwitterProviderId } from "../components/molecules/TwitterConnectButton";
import { useAuthState } from "../hooks/useAuthState";

const SettingPage = () => {
  const { user, userDoc } = useAuthState();
  const twitterUserData = user?.providerData.find((d) => d && d.providerId === TwitterProviderId);
  return (
    <Layout>
      <SEO title="Setting" />
      <LoginOnly>
        <Segment vertical>
          <Header as="h1">アカウント設定</Header>
        </Segment>

        <Segment vertical>
          <Header as="h2">
            <Icon name="github" />
            <Header.Content>GitHub</Header.Content>
          </Header>

          <p>
            コミットを計測するには<strong>GitHub App</strong>のインストールが必要です
            <br />
            次のページから計測したいリポジトリにアクセス権限（読み取り専用）を付与してください
          </p>
          <Button
            as="a"
            color="black"
            href="https://github.com/apps/commitly"
            target="_blank"
            rel="noopener noreferrer"
            size="big"
          >
            <Icon name="github" />
            GitHub App
          </Button>
        </Segment>

        <Segment vertical>
          <Header as="h2">
            <Icon name="twitter" />
            <Header.Content>Twitter</Header.Content>
          </Header>
          <p>定期ツイートするためにはTwitter連携が必要です</p>
          <TwitterConnectButton />
        </Segment>
      </LoginOnly>
    </Layout>
  );
};

export default SettingPage;
