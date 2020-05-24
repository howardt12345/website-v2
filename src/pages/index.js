import React, { useState, useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, mixins, media, Main } from '@styles';
import { Layout } from '@components';
import { motion } from "framer-motion"
import { navLinks } from '@config';

const { colors, fontSizes, fonts, navDelay } = theme;

const StyledContainer = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
`;
const StyledTitleBox = styled.div`
  flex-direction: column;
  width: 800px;
  ${media.bigDesktop`width: 800px;`};
  ${media.desktop`width: 80vw;`};
`;

const StyledOverline = styled.h2`
  text-align: left;
  font-size: 36px;
  font-weight: 400;
  font-family: ${fonts.Poppins};
  color: ${colors.textPrimary};
  line-height: 1;
  ${media.bigDesktop`font-size: 36px;`};
  ${media.bigDesktop`text-align: left;`}
  ${media.tablet`font-size: 20px;`};
  ${media.thone`text-align: center;`}
`;
const StyledTitle = styled.h1`
  text-align: left;
  color: ${colors.textPrimary};
  font-family: ${fonts.Poppins};
  font-size: 114px;
  line-height: 0.75;
  font-weight: 400;
  ${media.bigDesktop`font-size: 114px;`};
  ${media.bigDesktop`text-align: left;`}
  ${media.thone`text-align: center;`}
  ${media.desktop`font-size: 114px;`};
  ${media.tablet`font-size: 92px;`};
  ${media.phablet`font-size: 64px;`};
  ${media.phablet`font-size: 56px;`};
`;
const StyledSubtitle = styled.h2`
  width: 800px;
  ${media.bigDesktop`width: 800px;`};
  ${media.desktop`width: 80vw;`};
  text-align: right;
  font-size: 36px;
  font-weight: 400;
  font-family: ${fonts.Poppins};
  color: ${colors.textPrimary};
  line-height: 1;
  ${media.bigDesktop`font-size: 36px;`};
  ${media.bigDesktop`text-align: right;`}
  ${media.tablet`font-size: 20px;`};
  ${media.thone`text-align: center;`}
`;
const Line = styled.hr`
  width: 800px;
  ${media.bigDesktop`width: 800px;`};
  ${media.desktop`width: 80vw;`};
  border: 2px solid black;
`;
const StyledNavLink = styled.div`
  width: 800px;
  ${media.bigDesktop`width: 800px;`};
  ${media.desktop`width: 80vw;`};
  align-items: center;
`;
const StyledNavList = styled.ol`
  ${mixins.flexCenter};
  padding: 0;
  margin: 0;
  list-style: none;
`;
const StyledNavListItem = styled.li`
  margin: 0 10px;
  ${media.thone`margin: 0 0px;`}
  font-size: ${fontSizes.lg};
`;
const StyledNavListLink = styled(Link)`
  padding: 8px 6px;
`;


const HomePage = ({ data }) => {
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const { frontmatter } = data.home.edges[0].node;

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut", 
        duration: 0.5,
        delay: 0.5
      }
    }
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut", 
        duration: 0.5,
        delay: 0.75, 
      }
    }
  };

  const lineVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        ease: "easeOut", 
        duration: 0.5 
      }
    }
  };

  const navVariants = {
    hidden: {
      opacity: 0,
      y: -20
    },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut", 
        duration: 0.5,
        delay: i * 0.1 + 1
      }
    })
  };

  return (
    <Layout isHome={true} animateNav={false}>
      <StyledContainer className="fillHeight">
        {isMounted && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            <StyledTitleBox>
              <StyledOverline>{frontmatter.overline}</StyledOverline>
              <StyledTitle>{frontmatter.title}</StyledTitle>
            </StyledTitleBox>
          </motion.div>
        )}
        {isMounted && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={lineVariants}
          >
            <Line />
          </motion.div>
        )}
        {isMounted && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={subtitleVariants}
          >
            <StyledSubtitle>{<div dangerouslySetInnerHTML={{ __html: frontmatter.subtitle }} />}</StyledSubtitle>
          </motion.div>
        )}
        <StyledNavLink>
          <StyledNavList>
            {isMounted &&
              navLinks &&
              navLinks.map(({ url, name }, i) => (
                <motion.div
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={navVariants}
                >
                  <StyledNavListItem>
                    <StyledNavListLink to={url}>{name}</StyledNavListLink>
                  </StyledNavListItem>
                </motion.div>
              ))
            }
          </StyledNavList>
        </StyledNavLink>
      </StyledContainer>
    </Layout>
  )
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default HomePage;

export const pageQuery = graphql`
{
  home: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/home/" } }) {
    edges {
      node {
        frontmatter {
          overline
          title
          subtitle
        }
        html
      }
    }
  }
}
`;