import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Section, Subheading } from '@styles';

const { fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  padding-top: 0px;
  position: relative;
  width: 80vw;
`;
const StyledTabContent = styled.div`
  font-family: ${fonts.Raleway};
  position: relative;
  width: 100%;
  height: auto;
  padding-top: 10px;
  padding-left: 30px;
  ${media.tablet`padding-left: 20px;`};
  ${media.thone`padding-left: 0;`};
  ul {
    ${mixins.fancyList};
  }
  a {
    ${mixins.inlineLink};
  }
`;
const StyledJobTitle = styled.h4`
  color: ${({ theme }) => theme.textPrimary};
  font-family: ${fonts.Poppins};
  font-size: ${fontSizes.xxl};
  font-weight: 400;
  margin-bottom: 5px;
`;
const StyledCompany = styled.span`
  color: ${({ theme }) => theme.accent};
  font-family: ${fonts.Poppins};
`;
const StyledJobRange = styled.h5`
  width: 40vw;
  font-family: ${fonts.Poppins};
  font-size: ${fontSizes.md};
  font-weight: normal;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 10px;
  svg {
    width: 15px;
  }
`;
const StyledLocation = styled.h5`
  display: flex;
  width: 40vw;
  text-align: left;
  font-family: ${fonts.Poppins};
  font-size: ${fontSizes.md};
  font-weight: normal;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 0px;
  svg {
    width: 15px;
  }
`;
const StyledDetailsBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const StyledIcon = styled.div`
  padding-right: 6px;
  svg {
    width: 15px;
  }
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 14px;
`;

const Jobs = ({ data }) => {
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <StyledContainer id="jobs" ref={revealContainer}>
      <Subheading>Where I&apos;ve Worked</Subheading>
      {data &&
        data.map(({ node }, i) => {
          const { frontmatter, html } = node;
          const { title, url, company, location, range } = frontmatter;
          return (
            <StyledTabContent key={i} id={`panel-${i}`} role="tabpanel">
              <StyledJobTitle>
                <span>{title}</span>
                <StyledCompany>
                  <span>&nbsp;@&nbsp;</span>
                  <a
                    href={url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    {company}
                  </a>
                </StyledCompany>
              </StyledJobTitle>
              <StyledDetailsBar>
                <StyledJobRange>
                  <span>{range}</span>
                </StyledJobRange>
                <StyledLocation>
                  <StyledIcon>
                    <FormattedIcon name="Location" />
                  </StyledIcon>
                  <span>{location}</span>
                </StyledLocation>
              </StyledDetailsBar>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </StyledTabContent>
          );
        })}
    </StyledContainer>
  );
};

Jobs.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Jobs;
