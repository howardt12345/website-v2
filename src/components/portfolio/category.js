import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { theme, media, Subheading } from '@styles';
import { Fade } from '@api/react-image-slideshow';

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
  margin-bottom: 4px;
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
          data.getSubcategoriesAt(category).map((s, i) => {
            if(s === 'icon') {
              return (
                <CategoryTile 
                  name={"All"} 
                  path={`/portfolio/#${category}/`}
                  pictures={data.getAllPicturesAt(category)}
                  key={`/portfolio/#${category}/${i}`}
                />
              );
            } else {
              return (
                <CategoryTile 
                  name={s} 
                  path={`/portfolio/#${category}/${s}`}
                  pictures={data.getPicturesAt(category, s)}
                  key={`/portfolio/#${category}/${s}${i}`}
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
  bottom: 16px;
  left: 30px;
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
          [...pictures.map((pic, i) => {
            return (
              <StyledImageDiv className={'each-fade'} key={'each-fade-' + i}>
                <StyledImageDiv className={'image-container'} key={'image-container-' + i}>
                  {(pic.height !== 5 && pic.width !== 4) && (
                    <StyledBackgroundImage    
                      src={pic.getUrl()}
                      alt={pic.getUrl()}
                      key={pic.name + '-bg' + i}
                    />
                  )}
                  <StyledImage 
                    src={pic.getUrl()}
                    alt={pic.getUrl()}
                    key={pic.name + i}
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