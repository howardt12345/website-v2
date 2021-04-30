import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout, About, Jobs } from '@components';

const AboutPage = ({ data }) => {  
  return (
    <Layout animateNav={false} isHome={false} footer={true}>
      <Helmet>
        <title>About | Howard Tseng</title>
        <link rel="canonical" href="https://howardt12345.com/about" />
      </Helmet>
      <About data={data.about.edges} />
      <Jobs data={data.jobs.edges} />
    </Layout>
  )
}

export default AboutPage;


AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export const pageQuery = graphql`{
  about: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/about/"}}) {
    edges {
      node {
        frontmatter {
          title
          avatar {
            childImageSharp {
              gatsbyImageData(
                quality: 90
                layout: FULL_WIDTH
              )
            }
          }
          skills
        }
        html
      }
    }
  }
  jobs: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/jobs/"}}
    sort: {fields: [frontmatter___date], order: DESC}
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