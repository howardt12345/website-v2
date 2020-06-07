import React from 'react';
import { socialMedia } from '@config';
import { IconButton } from '@components';
import styled from 'styled-components';
import { theme } from '@styles';
const { colors } = theme;

const StyledList = styled.ul`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
  color: ${colors.textPrimary};
`;
const StyledLink = styled.a`
  padding: 12px;
  &:hover,
  &:focus {
    transform: translateY(-3px);
  }
  svg {
    width: 24px;
    height: 24px;
  }
`;

const Social = () => (
  <StyledList>
    {socialMedia &&
      socialMedia.map(({ url, name }, i) => (
      <li key={i}>
        <IconButton name={name} url={url} />
      </li>
    ))}
  </StyledList>
);
  

export default Social;