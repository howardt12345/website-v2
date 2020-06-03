import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import sr from '@utils/sr';
import styled from 'styled-components';
import { getUrlsFor } from '@api';
import { theme, mixins, media, Section, Heading, Subheading, Button } from '@styles';
import { Fade } from 'react-slideshow-image';

const { colors, fonts, fontSizes } = theme;

const LineVisible = styled.hr`
  width: 100%;
  border: 2px solid ${colors.textPrimary};
  margin-left: 20px;
  ${media.tablet`margin-left: 0px`};
`;
const LineHidden = styled.hr`
  width: 100%;
  border: 2px solid ${colors.textSecondary};
  margin-left: 20px;
  ${media.tablet`margin-left: 0px`};
`;
const CategoryNameVisible = styled(Subheading)`
  color: ${colors.textPrimary};
  line-height: 1;
`;
const CategoryNameHidden= styled(Subheading)`
  color: ${colors.textSecondary};
  line-height: 1;
`;
const CategorySection = styled.div`
  flex-direction: column;
  ${media.tablet`margin-right: 0px`};
  margin-right: 100px;
`;
const CategoryTitleSection = styled.div`
  overflow-x: visible;
  margin-left: 20px;
  ${media.tablet`margin-left: 0px`};
`;
const CategoryLineSection = styled.div`
  overflow-x: visible;
  padding-bottom: 0.25rem;
  margin: 0px;
`;
const CategoryTilesSection = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: visible;
  justify-content: space-between;
  ${media.tablet`flex-direction: column`};
  ${media.tablet`padding-bottom: 16px`};
  ${media.tablet`padding-left: 0px`};
`;


export const Category = ({ category, data, isVisible }) => {
  return (
    <CategorySection>
      <CategoryTitleSection>
        {isVisible
          ? (<CategoryNameVisible>{category}</CategoryNameVisible>)
          : (<CategoryNameHidden>{category}</CategoryNameHidden>)
        }
      </CategoryTitleSection>
      <CategoryLineSection>
        {isVisible 
          ? (<LineVisible />) 
          : (<LineHidden />)
        }
      </CategoryLineSection>
      <CategoryTilesSection>
        {data && (
          data.getSubcategoriesAt(category).map(s => {
            if(s === 'icon') {
              return (
                <CategoryTile 
                  name={"All"} 
                  path={`/portfolio/#${category}/`}
                  pictures={data.getAllPicturesAt(category)}
                  key={`/portfolio/#${category}/`}
                />
              );
            } else {
              return (
                <CategoryTile 
                  name={s} 
                  path={`/portfolio/#${category}/${s}`}
                  pictures={data.getPicturesAt(category, s)}
                  key={`/portfolio/#${category}/${s}`}
                />
              );
            }
          })
        )}
      </CategoryTilesSection>
    </CategorySection>
  );
}

Category.propTypes = {
  category: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
}

const StyledName = styled.h2`
  position: absolute;
  bottom: 20px;
  left: 36px;
  font-size: ${fontSizes.xxl};
  font-family: ${fonts.Poppins};
  color: white;
`;
const StyledCategoryTile = styled(Link)`
  position: relative;
  height: 50vh;
  width: 40vh;
  margin-left: 20px;
  ${media.tablet`margin-bottom: 20px`};
  ${media.tablet`margin-left: 0px`};
  ${media.tablet`height: 112.5vw`};
  ${media.tablet`width: 90vw`};
`;
const StyledBackgroundImage = styled.img`
  height: 100%;
  max-width: 100%;
  -webkit-filter: blur(10px); 
  filter: blur(10px);
`;
const StyledImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;
const StyledImageDiv = styled.div`
  height: 50vh;
  width: 40vh;
  ${media.tablet`height: 112.5vw`};
  ${media.tablet`width: 90vw`};
`;

const CategoryTile = ({ name, path, pictures }) => {
  const isBrowser = typeof window !== 'undefined'
  const [height, setHeight] = useState(isBrowser ? window.innerHeight : 0)

  useEffect(() => {
    if (!isBrowser) return false

    const handleResize = () => setHeight(window.innerHeight)
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  });


  const fadeProperties = {
    duration: 2500,
    transitionDuration: 500,
    infinite: true,
    arrows: false,
  }

  return (
    <StyledCategoryTile to={path}>
      <StyledImageDiv className={"slide-container-"+name}>
        <Fade {...fadeProperties}>
          {pictures && 
          [...pictures.map(pic => {
            return (
              <StyledImageDiv className={'each-fade'}>
                <StyledImageDiv className={'image-container'}>
                  {(pic.height !== 5 && pic.width !== 4) && (
                    <StyledBackgroundImage    
                      src={pic.getUrl()}
                      alt={pic.getUrl()}
                      key={pic.name + '-bg'}
                    />
                  )}
                  <StyledImage 
                    src={pic.getUrl()}
                    alt={pic.getUrl()}
                    key={pic.name}
                  />
                </StyledImageDiv>
                
                <StyledName>{name}</StyledName>
              </StyledImageDiv>
            );
          })]}
        </Fade>
      </StyledImageDiv>
      <StyledName>{name}</StyledName>
    </StyledCategoryTile>
  );
}

CategoryTile.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  pictures: PropTypes.array.isRequired,
}