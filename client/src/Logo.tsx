import React from "react";
import styled, { keyframes, css } from "styled-components";

const Svg = styled.svg`
  fill: none;

  path {
    fill: none;
  }
`;

const tweenColors = (colors: [string, string]) => keyframes`
  0% {
    stroke: ${colors[0]};
  }

  50% {
    stroke: ${colors[1]};
  }

  100% {
    stroke: ${colors[0]};
  }
`;

const AnimatedCircle = styled.path<{
  animate: boolean;
  colors: [string, string];
}>`
  stroke: ${({ colors }) => colors[0]};
  ${({ animate, colors }) =>
    animate
      ? css`
          animation-name: ${tweenColors(colors)};
          animation-iteration-count: infinite;
        `
      : ""}
`;

type LogoProps = {
  animate?: boolean;
  style?: React.CSSProperties;
  width: number;
};

const circleDs = [
  "M315.42 122.91c0 2.33-1.89 4.21-4.22 4.21a4.21 4.21 0 0 1-4.21-4.21c0-2.32 1.89-4.21 4.21-4.21 2.33 0 4.22 1.89 4.22 4.21z",
  "M316.24 106.7c0 4.3-3.5 7.8-7.8 7.8s-7.8-3.5-7.8-7.8c0-4.31 3.5-7.8 7.8-7.8s7.8 3.49 7.8 7.8z",
  "M326.21 94.19c0 3.29-2.67 5.96-5.96 5.96s-5.96-2.67-5.96-5.96c0-3.3 2.67-5.97 5.96-5.97s5.96 2.67 5.96 5.97z",
  "M328.49 88.91a4.21 4.21 0 0 0 4.21 4.21c2.33 0 4.22-1.88 4.22-4.21 0-2.32-1.89-4.21-4.22-4.21-2.32 0-4.21 1.89-4.21 4.21z",
  "M344.17 84.79c0 1.42-1.16 2.58-2.59 2.58s-2.59-1.16-2.59-2.58a2.59 2.59 0 0 1 5.18 0z",
  "M348.49 85.79c0 1.42 1.16 2.58 2.59 2.58s2.59-1.16 2.59-2.58a2.59 2.59 0 0 0-5.18 0z",
  "M353.52 96.85c0 4.3-3.49 7.8-7.8 7.8-4.3 0-7.79-3.5-7.79-7.8s3.49-7.8 7.79-7.8c4.31 0 7.8 3.5 7.8 7.8z",
  "M363.92 91.91c0 2.33-1.89 4.21-4.22 4.21a4.21 4.21 0 0 1-4.21-4.21c0-2.32 1.89-4.21 4.21-4.21 2.33 0 4.22 1.89 4.22 4.21z",
  "M345.44 155.34c0 2.32 1.89 4.21 4.21 4.21 2.33 0 4.22-1.89 4.22-4.21a4.22 4.22 0 0 0-4.22-4.22c-2.32 0-4.21 1.89-4.21 4.22z",
  "M296.35 133.57c.36 3.27 3.32 5.63 6.59 5.27 3.27-.37 5.63-3.32 5.26-6.59-.36-3.27-3.32-5.63-6.59-5.27-3.27.37-5.63 3.32-5.26 6.59z",
  "M307 147.16a4.21 4.21 0 0 1-4.21 4.21c-2.33 0-4.22-1.88-4.22-4.21 0-2.32 1.89-4.21 4.22-4.21 2.32 0 4.21 1.89 4.21 4.21z",
  "M326.71 107.66c0 2.33-1.88 4.21-4.21 4.21s-4.21-1.88-4.21-4.21a4.21 4.21 0 0 1 8.42 0z",
  "M323.5 160.41c0 3.29-2.67 5.96-5.96 5.96s-5.97-2.67-5.97-5.96 2.68-5.96 5.97-5.96c3.29 0 5.96 2.67 5.96 5.96z",
  "M295.1 119.66a4.21 4.21 0 0 0 4.21 4.21c2.33 0 4.22-1.88 4.22-4.21 0-2.32-1.89-4.21-4.22-4.21-2.32 0-4.21 1.89-4.21 4.21z",
  "M318.33 133.11a2.59 2.59 0 1 1-5.181-.001 2.59 2.59 0 0 1 5.181.001z",
  "M335.38 161.66a4.21 4.21 0 0 1-4.21 4.21c-2.33 0-4.22-1.88-4.22-4.21 0-2.32 1.89-4.21 4.22-4.21 2.32 0 4.21 1.89 4.21 4.21z",
  "M327.07 100.73a4.22 4.22 0 0 0 4.22 4.22c2.32 0 4.21-1.89 4.21-4.22 0-2.32-1.89-4.21-4.21-4.21-2.33 0-4.22 1.89-4.22 4.21z",
  "M349.32 167.23a5.964 5.964 0 1 0 11.93 0c0-3.29-2.67-5.96-5.96-5.96s-5.97 2.67-5.97 5.96z",
  "M319.75 171.23c0 2.33 1.89 4.22 4.21 4.22a4.22 4.22 0 0 0 4.22-4.22c0-2.32-1.89-4.21-4.22-4.21-2.32 0-4.21 1.89-4.21 4.21z",
  "M304.57 160.61a2.59 2.59 0 1 0 5.181-.001 2.59 2.59 0 0 0-5.181.001z",
  "M338.93 172.5c-.88-2.16.16-4.62 2.31-5.5 2.15-.88 4.61.16 5.49 2.31.88 2.16-.15 4.62-2.31 5.5-2.15.87-4.61-.16-5.49-2.31z",
  "M356.82 154.76a5.98 5.98 0 0 0 5.97 5.97c3.29 0 5.96-2.68 5.96-5.97 0-3.29-2.67-5.96-5.96-5.96s-5.97 2.67-5.97 5.96z",
  "M330.57 172.11a2.59 2.59 0 1 0 5.181-.001 2.59 2.59 0 0 0-5.181.001z",
  "M339.07 161.36a2.59 2.59 0 1 0 5.181-.001 2.59 2.59 0 0 0-5.181.001z",
  "M317.62 143.09c0 2.32-1.89 4.21-4.22 4.21-2.32 0-4.21-1.89-4.21-4.21 0-2.33 1.89-4.22 4.21-4.22a4.22 4.22 0 0 1 4.22 4.22z",
  "M308.07 151.36a2.59 2.59 0 1 0 5.181-.001 2.59 2.59 0 0 0-5.181.001z",
  "M320.08 115.86a2.59 2.59 0 1 1-5.181-.001 2.59 2.59 0 0 1 5.181.001z",
  "M360.58 101.11a2.59 2.59 0 1 1-5.181-.001 2.59 2.59 0 0 1 5.181.001z"
];

const lineDs = [
  "M336.5 90.82l3 1.5",
  "M358 98.32l.5-2",
  "M337.93 98.32l-3.18.58",
  "M321 103.45l-.75-3.3",
  "M309.75 118.7l-.56-4.2",
  "M316.24 117.82l-1.95 1.84",
  "M306.99 121.32h-4.2",
  "M320.08 110.82l-1.79 2.45",
  "M348.49 84.7h-4.32",
  "M342.83 89.05l-1.25-1.68",
  "M359.7 159.55l-1.45 2.77",
  "M352 161.66l-.92-2.11",
  "M342.2 166.69l-.62-2.74",
  "M327.07 161.36h-3.57",
  "M321.75 167.23l-1.12-1.91",
  "M330.57 171.23h-2.08",
  "M338.62 171.23l-2.28.88",
  "M332 165.32l.7 4.2",
  "M349.65 165.32l-5.48-3.66",
  "M314.29 138.87l1.45-3.17",
  "M312.36 126.95l1.93 3.57",
  "M302.28 142.95v-4.08",
  "M308.24 150.07l-2.24-.75",
  "M311.57 160.94l-2.1-.33",
  "M308.07 158.02l1.12-4.07",
  "M352.75 94.19l2.65-1.07"
];

const lineColor = "#fff";
const colors = ["#75f8fa", "#d08eff"] as [string, string];

const Logo = ({ animate = false, width, style }: LogoProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="294.099 81.197 77.651 97.25"
    width={width}
    height={width * 1.27}
    style={style}
  >
    {lineDs.map((d, i) => (
      <path d={d} key={i} stroke={lineColor} />
    ))}
    {circleDs.map((d, i) => (
      <AnimatedCircle
        d={d}
        key={i}
        colors={[colors[i % 2], colors[(i + 1) % 2]]}
        animate={animate}
        style={{
          animationDuration: `${1 + Math.random() * 2}s`
        }}
      />
    ))}
  </Svg>
);

export default Logo;