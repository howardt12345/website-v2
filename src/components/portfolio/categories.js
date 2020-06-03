import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import sr from '@utils/sr';
import styled from 'styled-components';
import { getUrlsFor } from '@api';
import { theme, mixins, media, Section, Heading, Subheading, Button } from '@styles';
import { Category } from './category';
import HorizontalScroll from 'react-scroll-horizontal'

const { colors, fonts } = theme;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const CategoriesMobile = styled.div`
  ${media.tablet`flex-direction: column;`};
  ${media.tablet`width: 90vw;`};
  ${media.tablet`margin-left: auto;`};
  ${media.tablet`margin-right: auto;`};
`;

const CategoriesPage = ({ data }) => {
  const isBrowser = typeof window !== 'undefined'
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0)


  useEffect(() => {
    if (!isBrowser) return false

    const handleResize = () => setWidth(window.innerWidth)
    const horizontalScroll = (e) => {
      if(width > 768) {
        e.preventDefault();
        e.stopPropagation()
        document.getElementById('scroll_container').scrollLeft += e.deltaY;
      }
    }

    window.addEventListener('wheel', horizontalScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener('wheel', horizontalScroll);
      window.removeEventListener("resize", handleResize);
    }
  });

  return (
   (width > 768) 
   ? (
    <Categories id='scroll_container'>
      {data && (
        data.getCategories().map(c => {
          return (
            <Category category={c} data={data} isVisible={true} key={c}/>
          )
        })
      )}
    </Categories>
  ) : (
     <CategoriesMobile>
      {data && (
        data.getCategories().map(c => {
          return (
            <Category category={c} data={data} isVisible={true} key={c}/>
          )
        })
      )}
      </CategoriesMobile>
   )
  );
}

CategoriesPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default CategoriesPage;