import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media, theme } from '@styles';
import { Category } from './category';
const { colors } = theme;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  margin-bottom: 6px;
  &:hover {
    margin-bottom: 0px;
    scrollbar-width: thin;
  }
  &::-webkit-scrollbar {
    display: none;
    height: 6px;
    width: 4px;
    border: 1px solid ${colors.textSecondary};
  }
  &:hover::-webkit-scrollbar {
      display: block;
  }
  &::-webkit-scrollbar-track {
    background: ${colors.background};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.textSecondary};
    border-radius: 20px;
  }
  & {
    scrollbar-width: none;
    scrollbar-color: ${colors.textSecondary} ${colors.background};
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
        document.getElementById('scroll_container').scrollLeft += e.deltaY;
      }
    }

    window.addEventListener('wheel', horizontalScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener('wheel', horizontalScroll);
      window.removeEventListener("resize", handleResize);
    }
  }, [width, isBrowser]);

  return (
   (width >= 768) 
   ? (
    <Categories id='scroll_container'>
      {data && (width > 0) && (
        data.getCategories()
        .filter(c => data.getAllPicturesAt(c).length !== 0)
        .map(c => {
          return (
            <Category category={c} data={data} isVisible={true} key={c}/>
          )
        })
      )}
    </Categories>
  ) : (
     <CategoriesMobile>
      {data && (width > 0) && (
        data.getCategories()
        .filter(c => data.getAllPicturesAt(c).length !== 0)
        .map(c => {
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