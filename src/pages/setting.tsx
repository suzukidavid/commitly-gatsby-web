import React from "react";
import { Button, Dropdown, Header, Icon, Segment } from "semantic-ui-react";
import firebase from "gatsby-plugin-firebase";
import { toast } from "react-semantic-toasts";
import { useSelector } from "react-redux";

import { Layout } from "../components/templates/Layout";
import { SEO } from "../components/templates/SEO";
import { LoginOnly } from "../components/templates/LoginOnly";
import { TwitterConnectButton } from "../components/molecules/TwitterConnectButton";
import { TwitterUnConnectButton } from "../components/molecules/TwitterUnConnectButton";
import { TwitterProviderId } from "../hooks/useAuthState";
import { UserDocType } from "../types/userDoc";

const tweetTimeOptions = [...Array(24).keys()].map((i) => {
  const text = `${i + 1}:00`;
  let value = i + 1;
  if (value === 24) {
    value = 0;
  }
  return { text, value };
});

const changeTweetTime = async (uid: string, userDoc: UserDocType, tweetTime: number) => {
  const userData = {
    setting: { ...userDoc.setting, tweetTime },
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  } as UserDocType;

  await firebase.firestore().collection("users").doc(uid).set(userData, { merge: true });

  toast({
    type: "success",
    title: "定期ツイート時刻を設定しました！",
  });
};

const SettingPage = () => {
  const { user, userDoc } = useSelector((state) => state.auth);
  const twitterUserData = user?.providerData.find((d) => d && d.providerId === TwitterProviderId);
  const tweetTime = userDoc?.setting.tweetTime;
  return (
    <Layout>
      <SEO title="Setting" />
      <LoginOnly>
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

          <TwitterUnConnectButton />

          <Header as="h3" content="定期ツイート時刻" />
          <Dropdown
            value={tweetTime}
            options={tweetTimeOptions}
            selection
            disabled={!twitterUserData}
            onChange={(e, d) => changeTweetTime(user?.uid as string, userDoc as UserDocType, d.value as number)}
          />
        </Segment>
      </LoginOnly>
    </Layout>
  );
};

export default SettingPage;
