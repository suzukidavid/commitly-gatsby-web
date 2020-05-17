import React from "react";
import { RouteComponentProps } from "@reach/router";
import { navigate } from "gatsby";
import { Feed, Header, Icon, Segment } from "semantic-ui-react";

import { SEO } from "../templates/SEO";
import { useProfileData } from "../../hooks/useProfileData";

export const UserProfile: React.FC<RouteComponentProps<{ username: string }>> = ({ username }) => {
  React.useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username]);

  const { profileData } = useProfileData(username);

  if (!username || !profileData) {
    return null;
  }

  const { commits } = profileData;

  return (
    <>
      <SEO title={`Profile of ${username}`} />

      <Segment vertical>
        <Header as="h1">
          <Icon name="github" />
          <Header.Content>{username}</Header.Content>
        </Header>
      </Segment>

      <Segment vertical>
        {commits.map((commit, index) => {
          const { date, totalCommits } = commit;
          console.log(date);
          return (
            <Feed.Event key={index}>
              <Feed.Label>
                <Icon name="github" />
              </Feed.Label>
              <Feed.Content>
                <Feed.Date>{date.format("YYYY/MM/DD")}</Feed.Date>
                <Feed.Summary>{totalCommits} 行のコードを書きました！</Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          );
        })}
      </Segment>
    </>
  );
};
