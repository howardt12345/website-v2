import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout, About, Jobs } from '@components';
import { Section } from '@styles';

const AboutPage = ({ data }) => {  
  return (
    <Layout>
      <About data={data.about.edges} />
      <Jobs data={data.jobs.edges} />
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
  jobs: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/jobs/" } }
    sort: { fields: [frontmatter___date], order: DESC }
  ) {
    edges {
      node {
        frontmatter {
          title
          company
          location
          range
          url
        }
        html
      }
    }
  }
}
`;