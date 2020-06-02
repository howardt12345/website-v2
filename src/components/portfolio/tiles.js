import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import sr from '@utils/sr';
import styled from 'styled-components';
import { ImageMasonry, getUrlsFor } from '@api';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { theme, mixins, media, Section, Heading, Subheading, Button } from '@styles';

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
const StyledImg = styled.img`
  padding-bottom: 1rem;
`;


const TilesPage = ({ data, name }) => {
  const isBrowser = typeof window !== 'undefined'
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0)
  const [showDialog, setShowDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  useEffect(() => {
    if (!isBrowser) return false

    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  });

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
        imageUrls={getUrlsFor(data)}
        onClick={(index) => {
          setCurrentImage(index);
          open();
        }}
      >
      </ImageMasonry>
      <Dialog isOpen={showDialog} onDismiss={close} aria-label="Image">
        <StyledImg 
          src={data[currentImage].getUrl()}
          alt={data[currentImage].getUrl()}
        />
        <Button onClick={close}>
          Close
        </Button>
      </Dialog>
    </StyledSection>
  );
}

TilesPage.prototypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.object.isRequired,
}

export default TilesPage;