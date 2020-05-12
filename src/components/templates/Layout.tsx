import React from "react";
import styled from "styled-components";
import { Container } from "semantic-ui-react";
import { SemanticToastContainer } from "react-semantic-toasts";

import { Header } from "../molecules/Header";
import { Footer } from "../molecules/Footer";
import { useAuth } from "../../hooks/useAuth";

export const Layout: React.FC = ({ children }) => {
  const { setCurrentUser } = useAuth();

  React.useEffect(() => {
    setCurrentUser();
  }, []);

  return (
    <>
      <Wrapper>
        <Header />
        <MainContainer text>{children}</MainContainer>
        <Footer />
      </Wrapper>

      <SemanticToastContainer position="top-center" />
    </>
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
