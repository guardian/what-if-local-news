import React from "react";
import Layout from "./Layout";
import Router from "./routing/Router";
import CouncilPage from "./pages/CouncilPage";
import DocumentPage from "./pages/DocumentPage";
import CouncilPickerPage from "./pages/CouncilPickerPage";
import PersonPage from "./pages/PersonPage";
import Splash from "./Splash";
import styled from "styled-components";
import PlacePage from "./pages/PlacePage";

const Padding = styled.div`
  height: 100%;
  padding: 1em;
`;

const App = () => (
  <Layout>
    <Splash>
      <Padding>
        <Router
          routes={{
            "/": () => <CouncilPickerPage />,
            "/council/:id": ({ id }) => <CouncilPage id={id} />,
            "/council/:id/document/:id": ({ id }) => <DocumentPage id={id} />,
            "/person/:id": ({ id }) => <PersonPage id={id} />,
            "/place/:id": ({ id }) => <PlacePage id={id} />
          }}
        />
      </Padding>
    </Splash>
  </Layout>
);

export default App;
