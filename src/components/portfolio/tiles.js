import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { ImageMasonry, getUrlsFor } from '@api';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { theme, media, Heading, Button } from '@styles';

const { colors, fonts } = theme;
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
  align-self: flex-end;
  color: ${colors.textPrimary};
  font-family: ${fonts.Poppins};
  font-size: 54px;
  font-weight: 400;
  margin-bottom: 0px;
  ${media.desktop`font-size: 54px;`};
  ${media.tablet`font-size: 40px;`};
  ${media.phablet`font-size: 28px;`};
  ${media.phone`font-size: 28px;`};
  ${media.tablet`align-self: start;`};
`;
const StyledImg = styled.img`
  padding-bottom: 1rem;
`;
const StyledDialog = styled(Dialog)`
  width: 75vw;
`;


const TilesPage = ({ data, name, path }) => {
  const isBrowser = typeof window !== 'undefined'
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0)
  const [showDialog, setShowDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentPath, setCurrentPath] = useState(path);

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  useEffect(() => {
    if (!isBrowser) return false

    if(path !== currentPath) {
      close();
      setCurrentPath(path);
      setCurrentImage(0);
    }

    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, [isBrowser, path, currentPath, width]);

  return (
    <StyledSection>
      <StyledTitleSection>
        <Link to={'/portfolio'}>
          <StyledHeading>
            <span>{name.category}</span>
            <StyledSubheading>
              {_.isEmpty(name.subcategory) || width < 600 ? '' : ':'}&nbsp;
            </StyledSubheading>
          </StyledHeading>
        </Link>
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
      <StyledDialog isOpen={showDialog} onDismiss={close} aria-label="Image">
        <StyledImg 
          src={data[currentImage].getUrl()}
          alt={data[currentImage].getUrl()}
        />
        <Button onClick={close}>
          Close
        </Button>
      </StyledDialog>
    </StyledSection>
  );
}

TilesPage.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
}

export default TilesPage;