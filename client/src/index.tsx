import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, :before, :after {
      box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-family: 'Quicksand', sans-serif;
    margin: 0;
    width: 100%;
  }

  #root {
      height: 100%;
      width: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
);
