import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeManagerContext, ThemeSetting } from "gatsby-styled-components-dark-mode"

import { FormattedIcon } from '@components/icons';

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
const ToggleButton = () => {
  const themeContext = useContext(ThemeManagerContext);

  return (
    <StyledLink
      onClick={() => themeContext.toggleDark()}>
      <FormattedIcon name={themeContext.themeSetting === ThemeSetting.LIGHT ? 'light' : 'dark'} />
    </StyledLink>
  );
}

export default ToggleButton;