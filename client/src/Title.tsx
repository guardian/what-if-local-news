import styled from "styled-components";

type TitleProps = {
  dark?: boolean;
};

const Title = styled.h1<TitleProps>`
  color: ${({ dark }) => (dark ? "#9e5ace" : "#75f8fa")};
  font-weight: 400;
  margin: 0;
`;

export default Title;
