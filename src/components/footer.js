import React from 'react';
import { Social } from '@components';
import styled from 'styled-components';
import { theme, mixins } from '@styles';
const { fontSizes, fonts } = theme;

const StyledContainer = styled.footer`
  ${mixins.flexCenter};
  flex-direction: column;
  padding: 8px;
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
  color: ${({ theme }) => theme.textSecondary};
  padding: 8px;
`;

const Footer = () => {
  return (
    <StyledContainer>
      <Social />
      <StyledMetadata tabindex="-1">
        <StyledGitHubLink
          href="https://github.com/howardt12345/website-v2"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <div>{`© ${new Date().getFullYear()} Howard Tseng`}</div>
        </StyledGitHubLink>
      </StyledMetadata>
    </StyledContainer>
  );
};

export default Footer;
