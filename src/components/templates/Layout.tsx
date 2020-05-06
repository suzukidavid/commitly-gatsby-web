/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import styled from "styled-components";
import { Container } from "semantic-ui-react";

import { Header } from "../molecules/Header";
import { Footer } from "../molecules/Footer";

export const Layout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <MainContainer text>{children}</MainContainer>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #f7f7f7;
`;

const MainContainer = styled(Container)`
  &&& {
    flex: 1;
    margin-top: 60px;
  }
`;
