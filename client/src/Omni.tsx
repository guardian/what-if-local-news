import React from "react";
import styled, { keyframes } from "styled-components";
import { useFocusInputOnMount } from "./hooks/useFocusInputOnMount";

type OmniProps = {
  loading?: boolean;
  label?: string;
  value: string;
  onChange: (value: string) => void;
};

const Container = styled.div`
  position: relative;
`;

const OmniInput = styled.input`
  border: 1px solid #ddd;
  font-size: 20px;
  height: 3em;
  padding: 0 1.5em 0 1.5em;
  width: 100%;

  &:focus {
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25);
    outline: none;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-360deg);
  }
`;

const Spinner = styled.span`
  animation: ${rotate} 2s linear infinite;
  display: inline-block;
  margin-top: -1em;
  position: absolute;
  right: 0.75em;
  top: 50%;
`;

const Omni = ({ label, value, onChange, loading }: OmniProps) => {
  const ref = useFocusInputOnMount();
  return (
    <Container>
      <OmniInput
        placeholder={label}
        ref={ref}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {loading ? <Spinner>🌀</Spinner> : null}
    </Container>
  );
};

export default Omni;
