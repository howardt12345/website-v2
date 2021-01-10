//Projects page taken and modified from https://github.com/bchiang7/v4

import React, { useState, useEffect, useRef } from 'react';
import { Link, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Layout } from '@components';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Section, Button, Heading } from '@styles';

const { fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 50px;
  width: 80vw;
`;
const StyledArchiveLink = styled(Link)`
  ${mixins.inlineLink};
  text-align: center;
  margin: 0 auto;
  font-family: ${fonts.Raleway};
  font-size: ${fontSizes.sm};
  &:after {
    bottom: 0.1em;
  }
`;
const StyledGrid = styled.div`
  margin-top: 50px;
  .projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    ${media.desktop`grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));`};
  }
`;
const StyledProjectInner = styled.div`
  ${mixins.boxShadow};
  ${mixins.flexBetween};
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 2rem 1.75rem;
  height: 100%;
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
  background-color: ${({ theme }) => theme.background_secondary};
`;
const StyledProject = styled.div`
  transition: ${theme.transition};
  cursor: default;
  &:hover,
  &:focus {
    outline: 0;
    ${StyledProjectInner} {
      transform: translateY(-5px);
    }
  }
`;
const StyledProjectHeader = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 30px;
`;
const StyledFolder = styled.div`
  color: ${({ theme }) => theme.accent};
  svg {
    width: 40px;
    height: 40px;
  }
`;
const StyledProjectLinks = styled.div`
  margin-right: -10px;
  color: ${({ theme }) => theme.textSecondary};
`;
const StyledIconLink = styled.a`
  position: relative;
  top: -10px;
  padding: 10px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
const StyledProjectName = styled.h5`
  margin: 0 0 10px;
  font-size: ${fontSizes.xxl};
  color: ${({ theme }) => theme.textPrimary};
`;
const StyledProjectDescription = styled.div`
  font-size: 17px;
  color: ${({ theme }) => theme.textSecondary};
  a {
    ${mixins.inlineLink};
  }
`;
const StyledTechList = styled.ul`
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
  flex-wrap: wrap;
  padding: 0;
  margin: 20px 0 0 0;
  list-style: none;
  li {
    font-family: ${fonts.Raleway};
    font-size: ${fontSizes.xs};
    color: ${({ theme }) => theme.textSecondary};
    line-height: 1.75;
    margin-right: 15px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;
const StyledMoreButton = styled(Button)`
  margin: 100px auto 0;
`;

const ProjectsPage = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealTable = useRef(null);
  const revealProjects = useRef([]);

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    sr.reveal(revealTable.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const projects = data.projects.edges.filter(({ node }) => node);
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  return (
    <Layout isHome={false} animateNav={false} footer={true}>      
      <Helmet>
        <title>Projects | Howard Tseng</title>
        <link rel="canonical" href="https://howardt12345.com/projects" />
      </Helmet>
      <StyledContainer>
        <Heading ref={revealTitle}>Projects</Heading>
        <div ref={revealArchiveLink}>
          <StyledArchiveLink to="/archive">
            View the archive
          </StyledArchiveLink>
        </div>

        <StyledGrid ref={revealTable}>
          <TransitionGroup className="projects">
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => {
                const { frontmatter, html } = node;
                const { github, external, title, tech } = frontmatter;
                return (
                  <CSSTransition
                    key={i}
                    classNames="fadeup"
                    timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                    exit={false}>
                    <StyledProject
                      key={i}
                      ref={el => (revealProjects.current[i] = el)}
                      tabIndex="0"
                      style={{
                        transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                      }}>
                      <StyledProjectInner>
                        <header>
                          <StyledProjectHeader>
                            <StyledFolder>
                              <FormattedIcon name="Folder" />
                            </StyledFolder>
                            <StyledProjectLinks>
                              {github && (
                                <StyledIconLink
                                  href={github}
                                  target="_blank"
                                  rel="nofollow noopener noreferrer"
                                  aria-label="GitHub Link">
                                  <FormattedIcon name="GitHub" />
                                </StyledIconLink>
                              )}
                              {external && (
                                <StyledIconLink
                                  href={external}
                                  target="_blank"
                                  rel="nofollow noopener noreferrer"
                                  aria-label="External Link">
                                  <FormattedIcon name="External" />
                                </StyledIconLink>
                              )}
                            </StyledProjectLinks>
                          </StyledProjectHeader>
                          <StyledProjectName>{title}</StyledProjectName>
                          <StyledProjectDescription dangerouslySetInnerHTML={{ __html: html }} />
                        </header>
                        <footer>
                          {tech && (
                            <StyledTechList>
                              {tech.map((tech, i) => (
                                <li key={i}>{tech}</li>
                              ))}
                            </StyledTechList>
                          )}
                        </footer>
                      </StyledProjectInner>
                    </StyledProject>
                  </CSSTransition>
                );
              })}
          </TransitionGroup>
        </StyledGrid>

        <StyledMoreButton onClick={() => setShowMore(!showMore)}>
          Show {showMore ? 'Less' : 'More'}
        </StyledMoreButton>
      </StyledContainer>
    </Layout>
  );
};

ProjectsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProjectsPage;

export const pageQuery = graphql`
{
  projects: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/projects/" }
      frontmatter: { showInProjects: { ne: false } }
    }
    sort: { fields: [frontmatter___date], order: DESC }
  ) {
    edges {
      node {
        frontmatter {
          title
          tech
          github
          external
        }
        html
      }
    }
  }
}
`;