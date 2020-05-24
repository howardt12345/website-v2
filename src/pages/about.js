import React from "react"
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from '@components';
import { srConfig, github } from '@config';
import Img from 'gatsby-image';
import { theme, mixins, media, Section } from '@styles';
const { colors, fontSizes, fonts } = theme;

const AboutPage = ({ data }) => {

  const { frontmatter, html } = data.about.edges[0].node;
  const { title, avatar } = frontmatter;

  return (
    <Layout>
      <div>
        <h1>About</h1>
      </div>
    </Layout>
  )
}

export default AboutPage;


AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
{
  about: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
    edges {
      node {
        frontmatter {
          title
          avatar {
            childImageSharp {
              fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#64ffda" }) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        html
      }
    }
  }
}
`;