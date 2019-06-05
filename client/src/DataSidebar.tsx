import React from "react";
import { Council } from "./services/councils";
import Map from "./Map";
import styled from "styled-components";
import { SidebarTitle } from "./SidebarTitle";

type DataSidebarProps = {
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

const DataSidebar = ({ council }: DataSidebarProps) => (
  <>
    <SidebarTitle>{council.name}</SidebarTitle>
    <Body>
      <SidebarSubtitle>Compiled statistics</SidebarSubtitle>
      <ul>
        <li>
          <Link
            href="https://www.contractsfinder.service.gov.uk/Search"
            target="_blank"
            rel="noreferrer"
          >
            Contracts sourced from contract finder.
          </Link>
        </li>
      </ul>
    </Body>
  </>
);

export default DataSidebar;
