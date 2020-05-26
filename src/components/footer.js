import React from 'react';
import PropTypes from 'prop-types';
import { Social } from '@components'; 
import styled from 'styled-components';
import { theme, mixins } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled.footer`
  ${mixins.flexCenter};
  flex-direction: column;
  padding: 15px;
  text-align: center;
  height: auto;
  min-height: 70px;
`;
const StyledMetadata = styled.div`
  font-family: ${fonts.Raleway};
  font-size: ${fontSizes.smish};
  line-height: 1;
`;
const StyledGitHubLink = styled.a`
  color: ${colors.textSecondary};
  padding: 10px;
`;

const Footer = () => {
  return (
    <StyledContainer>
      <Social />
      <StyledMetadata tabindex="-1">
        <StyledGitHubLink
          href="https://github.com/howardt12345/website-v2"
          target="_blank"
          rel="nofollow noopener noreferrer">
          <div>© 2020 Howard Tseng</div>
        </StyledGitHubLink>
      </StyledMetadata>
    </StyledContainer>
  );
};

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;