import React from "react";
import styled from "styled-components";
import { Grid, Header, Image, Label, Segment } from "semantic-ui-react";

import { Layout } from "../components/templates/Layout";
import { SEO } from "../components/templates/SEO";
import { LoginButton } from "../components/molecules/LoginButton";
import { useAuthState } from "../hooks/useAuthState";

const IndexPage: React.FC = () => {
  const { user } = useAuthState();
  return (
    <Layout>
      <SEO title="Top" />

      <Segment vertical>
        <Image src="logo.png" />
      </Segment>

      <Segment vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width="8">
              <Header>あなたのコミットを共有しませんか？</Header>
              <p>Commitlyはあなたの書いたコードをプログラミング言語別に集計してシェアするためのサービスです</p>
            </Grid.Column>
            <Grid.Column width="8">
              <a
                className="twitter-timeline"
                data-height="400"
                href="https://twitter.com/commitly_jp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tweets by commitly_jp
              </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      {!user && (
        <Segment vertical textAlign="center" padded="very">
          <Header>あなたのコミットもシェアしてみませんか？</Header>
          <AlignMiddle>
            <LoginButton />
            <Label pointing="left" size="big" color="blue">
              Join Now!!
            </Label>
          </AlignMiddle>
        </Segment>
      )}
    </Layout>
  );
};

const AlignMiddle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default IndexPage;
