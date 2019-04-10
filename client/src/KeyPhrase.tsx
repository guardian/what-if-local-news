import React from "react";
import styled from "styled-components";

type KeyPhraseProps = {
  children: JSX.Element;
};

const Blockquote = styled.blockquote`
  display: inline-block;
  font-size: 1.5em;
  font-style: italic;
  padding-left: 1em;
  position: relative;

  :before,
  :after {
    color: #aaa;
  }

  :before {
    content: "“";
    font-size: 4em;
    position: absolute;
    left: -0.25em;
    top: -0.375em;
  }

  :after {
    content: "”";
    font-size: 4em;
    position: absolute;
    right: -0.25em;
    top: -0.125em;
  }
`;

const KeyPhrase = ({ children }: KeyPhraseProps) => (
  <Blockquote>{children}</Blockquote>
);

export default KeyPhrase;
