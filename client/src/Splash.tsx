import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import styled, { keyframes } from "styled-components";

type SplashProps = {
  children: JSX.Element;
};

const Container = styled.div`
  align-items: center;
  background: #333;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Splash = ({ children }: SplashProps) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 2000);
  }, []);
  return loaded ? (
    children
  ) : (
    <Container>
      <Logo width={300} animate />
    </Container>
  );
};

export default Splash;
