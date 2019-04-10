import React from "react";
import Link from "./routing/Link";
import styled from "styled-components";
import Logo from "./Logo";
import Title from "./Title";

type LayoutProps = {
  children: React.ReactNode;
};

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  width: 100%;
`;

const Header = styled.header`
  background-color: #222;
  padding: 1em;
`;

const LogoWrapper = styled.div`
  margin-right: 1em;
`;

const TitleWrapper = styled.div`
  align-items: left;
  display: inline-flex;
  flex-direction: column;
`;

const MainTitle = styled(Title)`
  align-items: center;
  color: #75f8fa;
  display: inline-block;
  font-weight: 300;
  line-height: 1;
  margin: 0;
`;

const SubTitle = styled.h2`
  color: #fff;
  font-weight: 300;
  font-size: 16px;
  margin: 0;
`;

const Main = styled.main`
  overflow-y: auto;
`;

const Footer = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 1em;
`;

const Layout = ({ children }: LayoutProps) => (
  <Container>
    <Header>
      <Link path="/" style={{ display: "inline-flex", alignItems: "center" }}>
        <LogoWrapper>
          <Logo width={50} />
        </LogoWrapper>
        <TitleWrapper>
          <MainTitle>Councillor</MainTitle>
          <SubTitle>structured data from local councils</SubTitle>
        </TitleWrapper>
      </Link>
    </Header>
    <Main>{children}</Main>
    <Footer>&copy; gu.com</Footer>
  </Container>
);

export default Layout;
