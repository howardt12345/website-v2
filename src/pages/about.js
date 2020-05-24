import React from "react"
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from '@components';
import { srConfig, github } from '@config';
import Img from 'gatsby-image';
import sr from '@utils/sr';
import { theme, mixins, media, Section } from '@styles';
const { colors, fontSizes, fonts } = theme;

const AboutPage = ({ data }) => {

  const { frontmatter, html } = data.about.edges[0].node;


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
        }
        html
      }
    }
  }
}
`;