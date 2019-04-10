import React from "react";
import styled from "styled-components";
import Paper from "./Paper";

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-column-gap: 1em;
  height: 100%;
  width: 100%;
`;

type InfoPageProps = {
  children: JSX.Element | JSX.Element[];
  sidebar: JSX.Element | JSX.Element[];
};

const InfoPage = ({ children, sidebar }: InfoPageProps) => (
  <Container>
    <div>{children}</div>
    <div>
      <Paper>{sidebar}</Paper>
    </div>
  </Container>
);

export default InfoPage;
