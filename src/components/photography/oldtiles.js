import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { ImageMasonry, getUrlsFor } from '@api';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import { theme, media, mixins, Heading, Button } from '@styles';

const { fonts } = theme;
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
  color: ${({ theme }) => theme.textPrimary};
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
const StyledDialogButtons = styled.div`
  ${mixins.flexBetween}
`;
const StyledImgActions = styled.div`
  justify-content: end;
`;
const StyledImgContainer = styled.div`
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
`;
const StyledImg = styled.img``;
const StyledButton = styled.a`
  ${mixins.bigButton}
  margin-left: 10px;
`;
const StyledDialog = styled(Dialog)`
  width: 60vw;
  ${media.tablet`width: 100vw;`};
  background-color: ${({ theme }) => theme.background};
`;

const OldTilesPage = ({ data, name, path }) => {
  const isBrowser = typeof window !== 'undefined';
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0);
  const [showDialog, setShowDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentPath, setCurrentPath] = useState(path);

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  useEffect(() => {
    if (!isBrowser) return false;

    if (path !== currentPath) {
      close();
      setCurrentPath(path);
      setCurrentImage(0);
    }

    const handleResize = () => {
      if (typeof window !== 'undefined' && window !== null) {
        try {
          setWidth(window.innerWidth);
        } catch (e) {
          console.log(e);
        }
      }
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isBrowser, path, currentPath, width]);

  return (
    <StyledSection>
      <StyledTitleSection>
        <Link to={'/photography'}>
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
        numCols={Math.ceil(width / 450)}
        containerWidth={'100%'}
        forceOrder={true}
        animate={true}
        imageUrls={getUrlsFor(data)}
        onClick={index => {
          setCurrentImage(index);
          open();
        }}
      ></ImageMasonry>
      <StyledDialog isOpen={showDialog} onDismiss={close} aria-label="Image">
        <StyledImgContainer>
          <Zoom>
            <StyledImg
              src={data[currentImage].getUrl()}
              alt={data[currentImage].getUrl()}
            />
          </Zoom>
        </StyledImgContainer>
        <StyledDialogButtons>
          <Button onClick={close}>Close</Button>
          <StyledImgActions>
            {data[currentImage].buy.length > 0 && (
              <StyledButton
                href={data[currentImage].buy}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                Buy
              </StyledButton>
            )}
            {data[currentImage].download.length > 0 && (
              <StyledButton
                href={data[currentImage].download}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                Download
              </StyledButton>
            )}
          </StyledImgActions>
        </StyledDialogButtons>
      </StyledDialog>
    </StyledSection>
  );
};

OldTilesPage.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
};

export default OldTilesPage;
