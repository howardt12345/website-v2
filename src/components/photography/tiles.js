import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { ImageMasonry, getUrlsFor } from '@api';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { theme, media, mixins, Heading, Button } from '@styles';

const { colors } = theme;
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
`;
const StyledDialog = styled(Dialog)`
  width: 60vw;
  ${media.tablet`width: 100vw;`};
  background-color: ${colors.background};
`;
const StyledDialogButtons = styled.div`
  ${mixins.flexBetween}
`;
const StyledImgContainer = styled.div`
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
`;

const TilesPage = ({ data }) => {
  const isBrowser = typeof window !== 'undefined'
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0)
  const [showDialog, setShowDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  useEffect(() => {
    if (!isBrowser) return false;

    const handleResize = () => {
      if(typeof window !== 'undefined' && window !== null) {
        try {
          setWidth(window.innerWidth);
        } catch(e) {
          console.log(e);
        }
      }
    }
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, [isBrowser, width]);

  return (
    <StyledSection>
      <StyledTitleSection>
        <StyledHeading>
        <span>{"Photography"}</span>
        </StyledHeading>
      </StyledTitleSection>
      <ImageMasonry 
        numCols={Math.ceil(width/600)}
        containerWidth={'100%'}
        forceOrder={true}
        animate={true}
        imageUrls={getUrlsFor(data)}
        onClick={(index) => {
          setCurrentImage(index);
          open();
        }}
      >
      </ImageMasonry>
      <StyledDialog isOpen={showDialog} onDismiss={close} aria-label="Image">
        <StyledImgContainer>
          <Zoom>
            <img 
              src={data[currentImage].getUrl()}
              alt={data[currentImage].getUrl()}
            />
          </Zoom>
        </StyledImgContainer>
        <StyledDialogButtons>
          <Button onClick={close}>
            Close
          </Button>
        </StyledDialogButtons>
      </StyledDialog>
    </StyledSection>
  );
}

TilesPage.propTypes = {
  data: PropTypes.array.isRequired,
}

export default TilesPage;