import React from 'react';
import PropTypes from 'prop-types';
import { socialMedia } from '@config';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media } from '@styles';
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
  padding: 14px;
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
        <StyledLink
          href={url}
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label={name}>
          <FormattedIcon name={name} />
        </StyledLink>
      </li>
    ))}
  </StyledList>
);
  
  
export default Social;