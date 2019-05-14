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

const SidebarSubtitle = styled.h2`
  margin: 0;
`;

const Link = styled.a`
  text-decoration: underline;
  color: #9e5ace;
`;

const CouncilSidebar = ({ council }: CouncilSidebarProps) => (
  <>
    <SidebarTitle>{council.name}</SidebarTitle>
    <Body>
      <SidebarSubtitle>Overview</SidebarSubtitle>
      <ul>
        <li>
          <strong>MP -</strong> Emma Dent Coad
        </li>
        <li>
          <strong>Budget ('17/'18) -</strong> £268.44m
        </li>
        <li>
          <strong>Population ('17) -</strong> 155,741 (2017)
        </li>
        <li>
          <Link href="http://www.rbkc.gov.uk/" target="_blank" rel="noreferrer">
            Website
          </Link>
        </li>
        <li>
          <Link
            href="https://en.wikipedia.org/wiki/Royal_Borough_of_Kensington_and_Chelsea"
            target="_blank"
            rel="noreferrer"
          >
            Wikipedia
          </Link>
        </li>
      </ul>
    </Body>
    <Map mapData={council.mapData} />
  </>
);

export default CouncilSidebar;
