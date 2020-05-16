import React from "react";
import { Button, Dropdown, Header, Icon, Segment } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "@reach/router";
import styled from "styled-components";

import { SEO } from "../templates/SEO";
import { TwitterConnectButton } from "../molecules/TwitterConnectButton";
import { TwitterUnConnectButton } from "../molecules/TwitterUnConnectButton";
import { TwitterProviderId, useAuth } from "../../hooks/useAuth";

const tweetTimeOptions = [...Array(24).keys()].map((i) => {
  const text = `${i + 1}:00`;
  let value = i + 1;
  if (value === 24) {
    value = 0;
  }
  return { text, value };
});

export const Setting: React.FC<RouteComponentProps> = () => {
  const { user, userDoc } = useSelector((state) => state.auth);
  const { changeTweetTime } = useAuth();
  const twitterUserData = user?.providerData.find((d) => d && d.providerId === TwitterProviderId);
  const tweetTime = userDoc?.setting.tweetTime;
  return (
    <>
      <SEO title="Setting" />
      <Segment vertical>
        <Header as="h1">設定</Header>
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

        <ButtonWrapper>
          <TwitterUnConnectButton />
        </ButtonWrapper>

        <Header as="h3" content="定期ツイート時刻" />
        <Dropdown
          value={tweetTime}
          options={tweetTimeOptions}
          selection
          disabled={!twitterUserData}
          onChange={(e, d) => changeTweetTime(d.value as number)}
        />
      </Segment>
    </>
  );
};

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;
