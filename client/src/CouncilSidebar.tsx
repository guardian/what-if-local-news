import React from "react";
import { CouncilWithPeopleAndKeyPhrases } from "./services/CouncillorService";
import Map from "./Map";
import styled from "styled-components";
import PersonList from "./PersonList";
import { SidebarTitle } from "./SidebarTitle";

type CouncilSidebarProps = {
  council: CouncilWithPeopleAndKeyPhrases;
};

const Body = styled.div`
  padding: 1em;
`;

const CouncilSidebar = ({ council }: CouncilSidebarProps) => (
  <>
    <SidebarTitle>{council.name}</SidebarTitle>
    <Body>
      <h2>Frequently mentioned people</h2>
      <PersonList people={council.people} />
    </Body>
    <Map mapData={council.mapData} />
  </>
);

export default CouncilSidebar;
