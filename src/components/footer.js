import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedIcon } from '@components/icons';
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
const StyledGitHubInfo = styled.div`
  margin-top: 10px;
  & > span {
    display: inline-flex;
    align-items: center;
    margin: 0 7px;
  }
  svg {
    display: inline-block;
    height: 15px;
    width: auto;
    margin-right: 5px;
  }
`;

const Footer = () => {
  const [githubInfo, setGitHubInfo] = useState({
    stars: null,
    forks: null,
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    fetch('https://api.github.com/repos/howardt12345/website-v2')
      .then(response => response.json())
      .then(json => {
        const { stargazers_count, forks_count } = json;
        setGitHubInfo({
          stars: stargazers_count,
          forks: forks_count,
        });
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <StyledContainer>
      <Social />
      <StyledMetadata tabindex="-1">
        <StyledGitHubLink
          href="https://github.com/howardt12345/website-v2"
          target="_blank"
          rel="nofollow noopener noreferrer">
          <div>© 2020 Howard Tseng</div>

          {githubInfo.stars && githubInfo.forks && (
            <StyledGitHubInfo>
              <span>
                <FormattedIcon name="Star" />
                <span>{githubInfo.stars.toLocaleString()}</span>
              </span>
              <span>
                <FormattedIcon name="Fork" />
                <span>{githubInfo.forks.toLocaleString()}</span>
              </span>
            </StyledGitHubInfo>
          )}
        </StyledGitHubLink>
      </StyledMetadata>
    </StyledContainer>
  );
};

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;