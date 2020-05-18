import React from "react";
import { RouteComponentProps } from "@reach/router";
import { navigate } from "gatsby";
import { Header, Icon, Label, Segment } from "semantic-ui-react";
import styled from "styled-components";

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
          return (
            <CommitWrapper key={index}>
              <Label attached="top">{date.format("YYYY年M月D日(ddd)")}</Label>
              <TotalCommit>
                合計<ToralCommitNum>{totalCommits}</ToralCommitNum>行のコードを書きました！
              </TotalCommit>
              {commit.sortedExtensions().map((extention, extentionIndex) => {
                const { name, lineNum } = extention;
                return (
                  <CommitText key={extentionIndex}>
                    {name}: {lineNum}
                  </CommitText>
                );
              })}
            </CommitWrapper>
          );
        })}
      </Segment>
    </>
  );
};

const CommitWrapper = styled.div`
  position: relative;
  padding: 10px;
  border: 1px solid #22242626;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #fff;
`;

const TotalCommit = styled.div`
  display: flex;
  align-items: baseline;
`;

const ToralCommitNum = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin: 0 5px;
`;

const CommitText = styled.div``;
