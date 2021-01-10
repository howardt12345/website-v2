//About section mostly taken from https://github.com/bchiang7/v4

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import sr from '@utils/sr';
import { srConfig, instalink } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading, FlexContainer } from '@styles';

const { fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  padding-bottom: 50px;
  position: relative;
  width: 80vw;
  flex-direction: column;
`;

const StyledContent = styled.div`
  width: 55%;
  max-width: 480px;
  ${media.tablet`width: 100%;`};
  a {
    ${mixins.inlineLink};
  }
`;
const StyledPic = styled.div`
  position: relative;
  width: 45%;
  max-width: 400px;
  margin-left: 60px;
  ${media.tablet`margin: 60px auto 0;`};
  ${media.phablet`width: 70%;`};
  a {
    &:focus {
      outline: 0;
    }
  }
`;
const StyledAvatar = styled(Img)`
  position: relative;
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1);
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
`;
const StyledAvatarLink = styled.a`
  ${mixins.boxShadow};
  width: 100%;
  position: relative;
  border-radius: ${theme.borderRadius};
  background-color: ${({ theme }) => theme.accent};
  margin-left: -20px;
  &:hover,
  &:focus {
    background: transparent;
    &:after {
      top: 15px;
      left: 15px;
    }
    ${StyledAvatar} {
      filter: none;
      mix-blend-mode: normal;
    }
  }
  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: ${theme.borderRadius};
    transition: ${theme.transition};
  }
  &:before {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.background};
    mix-blend-mode: screen;
  }
  &:after {
    border: 2px solid ${({ theme }) => theme.accent};
    top: 20px;
    left: 20px;
    z-index: -1;
  }
`;
const SkillsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(140px, 200px));
  overflow: hidden;
  padding: 0;
  margin: 20px 0 0 0;
  list-style: none;
`;
const Skill = styled.li`
  position: relative;
  margin-bottom: 10px;
  padding-left: 20px;
  font-family: ${fonts.Raleway};
  font-size: ${fontSizes.sm};
  color: ${({ theme }) => theme.textPrimary};
  &:before {
    content: '▹';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.accent};
    font-size: ${fontSizes.md};
    line-height: 12px;
  }
`;
const StyledResumeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
`;
const StyledResumeButton = styled.a`
  ${mixins.bigButton};
  margin-top: 40px;
`;

const About = ({ data }) => {
  const { frontmatter, html } = data[0].node;
  const { title, skills, avatar } = frontmatter;
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  const showSkills = false;

  return (
    <StyledContainer id="about" ref={revealContainer}>
      <Heading>{title}</Heading>
      <FlexContainer>
        <StyledContent>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          {showSkills && (
            <SkillsContainer>
              {skills && skills.map((skill, i) => <Skill key={i}>{skill}</Skill>)}
            </SkillsContainer>
          )}
        </StyledContent>
        <StyledPic>
          <StyledAvatarLink 
            href={instalink}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <StyledAvatar fluid={avatar.childImageSharp.fluid} alt="Avatar" />
          </StyledAvatarLink>
        </StyledPic>
      </FlexContainer>
      <StyledResumeContainer>
        <div>
          <StyledResumeButton
            href="/resume.pdf"
            target="_blank"
            rel="nofollow noopener noreferrer">
            Resume
          </StyledResumeButton>
        </div>
      </StyledResumeContainer>
    </StyledContainer>
  );
};

About.propTypes = {
  data: PropTypes.array.isRequired,
};

export default About;