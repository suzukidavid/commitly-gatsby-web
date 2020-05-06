import React from "react";
import { Grid, Header, Image, Segment } from "semantic-ui-react";

import { Layout } from "../components/templates/Layout";
import { SEO } from "../components/templates/SEO";
import { LoginButton } from "../components/molecules/LoginButton";

const IndexPage: React.FC = () => {
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
    </Layout>
  );
};

export default IndexPage;
