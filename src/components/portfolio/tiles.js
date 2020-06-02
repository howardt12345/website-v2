import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import sr from '@utils/sr';
import { srConfig, instalink } from '@config';
import styled from 'styled-components';
import { ImageMasonry } from '@api';
import { theme, mixins, media, Section, Heading, Subheading } from '@styles';

const { colors, fontSizes, fonts } = theme;
const _ = require('lodash');

const StyledSection = styled.section`
  margin: 0 auto;
  width: 80vw;
  ${media.thone`width: 90vw;`};
`;
const StyledTitleSection = styled.div`
  display: flex;
  align-items: left;
  flex-direction: row;
  ${media.thone`flex-direction: column;`};
  padding: 0px 0px 10px;
`;
const StyledHeading = styled(Heading)`
  align-self: baseline;
  line-height: 0.75;
`;
const StyledSubheading = styled.span`
  text-align: left;
  align-self: baseline;
  color: ${colors.textPrimary};
  font-family: ${fonts.Poppins};
  font-size: 54px;
  font-weight: 400;
  ${media.desktop`font-size: 54px;`};
  ${media.tablet`font-size: 40px;`};
  ${media.phablet`font-size: 28px;`};
  ${media.phone`font-size: 28px;`};
`;

const TilesPage = ({ data, name }) => {
  const [width, setWidth] = useState(window.innerWidth);


  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <StyledSection>
      <StyledTitleSection>
        <StyledHeading>
          <span>{name.category}</span>
          <StyledSubheading>
            {_.isEmpty(name.subcategory) || width < 600 ? '' : ':'}&nbsp;
          </StyledSubheading>
        </StyledHeading>
        <StyledSubheading>
          <span>{name.subcategory}</span>
        </StyledSubheading>
      </StyledTitleSection>
      <ImageMasonry 
        numCols={Math.ceil(width/450)}
        containerWidth={'100%'}
        forceOrder={true}
        animate={true}
        className={name.category +'/'+ name.subcategory}
        imageUrls={data}
      >
      </ImageMasonry>
    </StyledSection>
  );
}

TilesPage.prototypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.object.isRequired,
}

export default TilesPage;