import React, { useState, useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, mixins, media, Main } from '@styles';
import { Layout } from '@components';
import { motion } from 'framer-motion';
import { navLinks } from '@config';
import { IconButton, ToggleButton } from '@components';

const { fontSizes, fonts, navDelay } = theme;

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
  color: ${({ theme }) => theme.textPrimary};
  line-height: 1;
  ${media.bigDesktop`font-size: 36px;`};
  ${media.bigDesktop`text-align: left;`}
  ${media.tablet`font-size: 20px;`};
  ${media.thone`text-align: center;`}
`;
const StyledTitle = styled.h1`
  text-align: left;
  color: ${({ theme }) => theme.textPrimary};
  font-family: ${fonts.Poppins};
  font-size: 114px;
  line-height: 0.75;
  font-weight: 400;
  ${media.bigDesktop`font-size: 114px;`};
  ${media.bigDesktop`text-align: left;`}
  ${media.thone`text-align: center;`}
  ${media.desktop`font-size: 114px;`};
  ${media.tablet`font-size: 92px;`};
  ${media.phablet`font-size: 68px;`};
  ${media.phone`font-size: 56px;`};
`;
const StyledSubtitle = styled.h2`
  width: 800px;
  ${media.bigDesktop`width: 800px;`};
  ${media.desktop`width: 80vw;`};
  text-align: right;
  font-size: 30px;
  font-weight: 400;
  font-family: ${fonts.Poppins};
  color: ${({ theme }) => theme.textPrimary};
  line-height: 1;
  ${media.bigDesktop`font-size: 30px;`};
  ${media.bigDesktop`text-align: right;`}
  ${media.tablet`font-size: 20px;`};
  ${media.thone`text-align: center;`}
`;
const Line = styled.hr`
  width: 800px;
  height: 6px;
  ${media.bigDesktop`width: 800px;`};
  ${media.desktop`width: 80vw;`};
  background-color: ${({ theme }) => theme.textPrimary};
`;
const StyledNavLinks = styled.div`
  width: 800px;
  ${media.bigDesktop`width: 800px;`};
  ${media.desktop`width: 80vw;`};
  align-items: center;
`;
const StyledNavList = styled.ol`
  height: 40px;
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
  const isBrowser = typeof window !== 'undefined';
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isBrowser) return false;

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setWidth(window.innerWidth);
      }
    };
    window.addEventListener('resize', handleResize);

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, [width, isBrowser, isMounted]);

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
        ease: 'easeOut',
        duration: 0.5,
        delay: 0.5,
      },
    },
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
        ease: 'easeOut',
        duration: 0.5,
        delay: 0.75,
      },
    },
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
        ease: 'easeOut',
        duration: 0.5,
      },
    },
  };
  const navVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeOut',
        duration: 0.5,
        delay: i * 0.1 + 1,
      },
    }),
  };
  const toggleVariants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeOut',
        duration: 0.5,
        delay: 2.5,
      },
    },
  };

  return (
    <Layout isHome={true} animateNav={false} footer={true}>
      <StyledContainer className="fillHeight">
        {isMounted && (
          <motion.div
            key="overline"
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
            key="title"
            initial="hidden"
            animate="visible"
            variants={lineVariants}
          >
            <Line />
          </motion.div>
        )}
        {isMounted && (
          <motion.div
            key="subtitle"
            initial="hidden"
            animate="visible"
            variants={subtitleVariants}
          >
            <StyledSubtitle>
              {
                <div
                  dangerouslySetInnerHTML={{ __html: frontmatter.subtitle }}
                />
              }
            </StyledSubtitle>
          </motion.div>
        )}
        <StyledNavLinks>
          <StyledNavList>
            {isMounted &&
              navLinks &&
              navLinks.map(({ url, name }, i) => (
                <motion.div
                  key={'nav' + i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={navVariants}
                >
                  {width >= 600 && (
                    <StyledNavListItem>
                      <StyledNavListLink to={url}>{name}</StyledNavListLink>
                    </StyledNavListItem>
                  )}
                  {width < 600 && <IconButton name={name} url={url} />}
                </motion.div>
              ))}
          </StyledNavList>
        </StyledNavLinks>

        <motion.div
          key="toggle_button"
          initial="hidden"
          animate="visible"
          variants={toggleVariants}
        >
          <ToggleButton />
        </motion.div>
      </StyledContainer>
    </Layout>
  );
};

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
