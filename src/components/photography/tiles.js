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
import sizeMe from 'react-sizeme';

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
  width: ${props => ((props.width/props.height)*40 > 100 ? 100 : (props.width/props.height)*40)}vw;
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

const TilesPage = ({ data, size }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <StyledSection>
      <StyledTitleSection>
        <StyledHeading>
        <span>{"Photography"}</span>
        </StyledHeading>
      </StyledTitleSection>
      {!_.isEmpty(data) && (
        <div>
          <ImageMasonry 
            numCols={Math.ceil(size.width/600)}
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
          <StyledDialog width={data[currentImage].width} height={data[currentImage].height} isOpen={showDialog} onDismiss={close} aria-label="Image">
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
        </div>
      )}
    </StyledSection>
  );
}

TilesPage.propTypes = {
  data: PropTypes.array.isRequired,
}

export default sizeMe()(TilesPage);