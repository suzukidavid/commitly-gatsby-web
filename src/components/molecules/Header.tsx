import { Link } from "gatsby";
import React from "react";
import { Dropdown, Icon, Image } from "semantic-ui-react";
import styled from "styled-components";

export const Header: React.FC = () => {
  return (
    <Wrapper>
      <LogoLink to="/page-2/">
        <LogoImage src="logo_header.png" />
      </LogoLink>

      <Dropdown icon={<BarIcon name="bars" size="big" />}>
        <Dropdown.Menu direction="left">
          <Dropdown.Item>ログイン</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #fdd101;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoLink = styled(Link)`
  &&& {
    height: 100%;
  }
`;

const LogoImage = styled(Image)`
  &&& {
    height: 100%;
  }
`;

const BarIcon = styled(Icon)`
  &&& {
    margin-right: 10px;
  }
`;
