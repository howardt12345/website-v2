import React, { useEffect } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Head, Nav, Footer } from '@components';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles';
import { useTheme } from '@api/hooks';

// https://medium.com/@chrisfitkin/how-to-smooth-scroll-links-in-gatsby-3dc445299558
if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a[href*="#"]');
}

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children, isHome, animateNav, footer }) => {
  const [theme] = useTheme();

  useEffect(() => {
    
    function preventRightClick(e) {
      if (e.target.tagName === 'IMG') {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    document.addEventListener('contextmenu', preventRightClick);
    return () => document.removeEventListener('contextmenu', preventRightClick);
  });

  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          site {
            siteMetadata {
              title
              siteUrl
              description
            }
          }
        }
      `}
      render={({ site }) => (
        <div id="root">
          <ThemeProvider theme={theme}>
            <Head metadata={site.siteMetadata} />
            <GlobalStyle />
            <StyledContent>
              {!isHome ? <Nav animate={animateNav} /> : <br/>}
              <div id="content">
                {children}
                {footer && (<Footer />)}
              </div>
            </StyledContent>
          </ThemeProvider>
        </div>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isHome: PropTypes.bool.isRequired,
  animateNav: PropTypes.bool.isRequired,
  footer: PropTypes.bool.isRequired,
};

export default Layout;