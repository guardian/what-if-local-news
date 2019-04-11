import React from "react";
import { Council } from "./services/councils";
import Map from "./Map";
import styled from "styled-components";
import { SidebarTitle } from "./SidebarTitle";

type CouncilSidebarProps = {
  council: Council;
};

const Body = styled.div`
  padding: 1em;
`;

const CouncilSidebar = ({ council }: CouncilSidebarProps) => (
  <>
    <SidebarTitle>{council.name}</SidebarTitle>
    <Body>
      <h2>Stats</h2>
    </Body>
    <Map mapData={council.mapData} />
  </>
);

export default CouncilSidebar;
