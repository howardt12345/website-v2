//Archive page taken and modified from https://github.com/bchiang7/v4

import React, { useRef, useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Layout } from '@components';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Heading, Section } from '@styles';

const { fonts, fontSizes } = theme;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 50px;
  width: 80vw;
`;
const StyledProjectsLink = styled(Link)`
  ${mixins.inlineLink};
  text-align: center;
  margin: 0 auto;
  font-family: ${fonts.Raleway};
  font-size: ${fontSizes.sm};
  &:after {
    bottom: 0.1em;
  }
`;

const StyledTableContainer = styled.div`
  margin: 40px -20px;
  ${media.tablet`
    margin: 40px -10px;
  `};
`;
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  .hide-on-mobile {
    ${media.tablet`
      display: none;
    `};
  }
  tbody tr {
    transition: ${theme.transition};
    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.background_secondary};
    }
  }
  th,
  td {
    cursor: default;
    line-height: 1.5;
    padding: 10px 20px;
    ${media.tablet`
      padding: 10px;
    `};
  }
  th {
    text-align: left;
  }
  td {
    &.year {
      width: 10%;
      ${media.tablet`
        font-size: ${fontSizes.sm};
      `};
    }
    &.title {
      padding-top: 15px;
      color: ${({ theme }) => theme.textSecondary};
      font-size: ${fontSizes.xl};
      font-weight: 700;
    }
    &.company {
      width: 15%;
      padding-top: 15px;
      font-size: ${fontSizes.lg};
      color: ${({ theme }) => theme.textSecondary};
    }
    &.tech {
      font-size: ${fontSizes.smish};
      font-family: ${fonts.Raleway};
      .separator {
        margin: 0 5px;
      }
      span {
        display: inline-block;
      }
    }
    &.links {
      span {
        display: flex;
        align-items: center;
        a {
          ${mixins.flexCenter};
        }
        a + a {
          margin-left: 10px;
        }
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

const ArchivePage = ({ data }) => {
  const projects = data.allMarkdownRemark.edges;

  const revealTitle = useRef(null);
  const revealProjectsLink = useRef(null);
  const revealTable = useRef(null);
  const revealProjects = useRef([]);
  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealProjectsLink.current, srConfig());
    sr.reveal(revealTable.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 10)));
  }, []);

  return (
    <Layout animateNav={false} isHome={false} footer={true}>
      <Helmet>
        <title>Archive | Howard Tseng</title>
        <link rel="canonical" href="https://howardt12345.com/archive" />
      </Helmet>
      <StyledContainer>
        <header ref={revealTitle}>
          <Heading>Archive</Heading>
          <p className="subtitle">A list of things I’ve worked on in the past</p>
        </header>
        <div ref={revealProjectsLink}>
          <StyledProjectsLink to="/projects">
            Back to Projects
          </StyledProjectsLink>
        </div>

        <StyledTableContainer ref={revealTable}>
          <StyledTable>
            <thead>
              <tr>
                <th>Year</th>
                <th>Title</th>
                <th className="hide-on-mobile">Made at</th>
                <th className="hide-on-mobile">Built with</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 &&
                projects.map(({ node }, i) => {
                  const {
                    date,
                    github,
                    external,
                    //ios,
                    //android,
                    title,
                    tech,
                    company,
                  } = node.frontmatter;
                  return (
                    <tr key={i} ref={el => (revealProjects.current[i] = el)}>
                      <td className="overline year">{`${new Date(date).getFullYear()}`}</td>

                      <td className="title">{title}</td>

                      <td className="company hide-on-mobile">
                        {company ? <span>{company}</span> : <span>—</span>}
                      </td>

                      <td className="tech hide-on-mobile">
                        {tech.length > 0 &&
                          tech.map((item, i) => (
                            <span key={i}>
                              {item}
                              {''}
                              {i !== tech.length - 1 && <span className="separator">&middot;</span>}
                            </span>
                          ))}
                      </td>

                      <td className="links">
                        <span>
                          {external && (
                            <a
                              href={external}
                              target="_blank"
                              rel="nofollow noopener noreferrer"
                              aria-label="External Link">
                              <FormattedIcon name="External" />
                            </a>
                          )}
                          {github && (
                            <a
                              href={github}
                              target="_blank"
                              rel="nofollow noopener noreferrer"
                              aria-label="GitHub Link">
                              <FormattedIcon name="GitHub" />
                            </a>
                          )}
                          {/*
                          ios && (
                            <a
                              href={ios}
                              target="_blank"
                              rel="nofollow noopener noreferrer"
                              aria-label="Apple App Store Link">
                              <FormattedIcon name="AppStore" />
                            </a>
                          )
                          */}
                          {/* 
                          android && (
                            <a
                              href={android}
                              target="_blank"
                              rel="nofollow noopener noreferrer"
                              aria-label="Google Play Store Link">
                              <FormattedIcon name="PlayStore" />
                            </a>
                          )
                          */} 
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </StyledTable>
        </StyledTableContainer>
      </StyledContainer>
    </Layout>
  );
};
ArchivePage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ArchivePage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            date
            title
            tech
            github
            external
            # ios
            # android
            company
          }
          html
        }
      }
    }
  }
`;