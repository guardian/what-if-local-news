import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import Paper from "./Paper";

type ChipProps = {
  label: string;
  children: JSX.Element | string;
  isActive?: boolean;
  button?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ChipWrapper = styled.button`
  appearance: none;
  background: transparent;
  border: none;
  cursor: pointer;
  display: inline-block;
  margin: 0.5em 1em 0.5em 0;
  padding: 0;
`;

const ChipLabel = styled(Paper)<{ isActive?: boolean }>`
  background: ${({ isActive }) => (isActive ? "green" : "#9e5ace")};
  color: #fff;
  display: inline-block;
  padding: 0.5em;
`;

const ChipValue = styled(Paper)<{ isActive?: boolean }>`
  background: #fff;
  color: ${({ isActive }) => (isActive ? "green" : "#9e5ace")};
  display: inline-block;
  padding: 0.5em;
`;

const ChipToggle = styled(Paper)<{ isActive?: boolean }>`
  background: ${({ isActive }) => (isActive ? "green" : "#9e5ace")};
  color: #fff;
  display: inline-block;
  padding: 0.5em;
`;

const Chip = ({ label, children, isActive, button, ...rest }: ChipProps) => (
  <ChipWrapper disabled={!button} {...rest} ref={undefined}>
    <ChipLabel isActive={isActive}>{label}</ChipLabel>
    <ChipValue isActive={isActive}>{children}</ChipValue>
    {button && (
      <ChipToggle isActive={isActive}>{isActive ? "-" : "+"}</ChipToggle>
    )}
  </ChipWrapper>
);

export default Chip;
