import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { FormattedIcon } from '@components/icons';
import { theme, mixins, media } from '@styles';

const { fonts, navDelay } = theme;

const StyledMainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 75vh;
  padding-top: 200px;
  padding-bottom: 200px;
  margin: 0 auto;
  ${media.desktop`
    padding-top: 200px;
    padding-bottom: 200px;
  `};
  ${media.tablet`
    padding-top: 150px;
    padding-bottom: 150px;
  `};
  ${media.phablet`
    padding-top: 125px;
    padding-bottom: 125px;
  `};
  &.fillHeight {
    padding-top: 0;
    padding-bottom: 0;
    ${media.desktop`
    padding-top: 0;
    padding-bottom: 0;
  `};
    ${media.tablet`
    padding-top: 0;
    padding-bottom: 0;
  `};
    ${media.phablet`
    padding-top: 0;
    padding-bottom: 0;
  `};
`;
const StyledSubtitle = styled.h2`
  font-size: 3vw;
  font-weight: 400;
  font-family: ${fonts.Raleway};
  ${media.bigDesktop`font-size: 48px;`};
  ${media.tablet`font-size: 38px;`};
  ${media.phablet`font-size: 28px;`};
`;
const StyledButton = styled.a`
  ${mixins.bigButton};
  margin-top: 20px;
`;
const NotFoundIcon = styled.div`
  height: 40vh;
`;

const NotFoundPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <TransitionGroup component={null}>
      {isMounted && (
        <CSSTransition timeout={500} classNames="fade">
          <StyledMainContainer className="fillHeight">
            <NotFoundIcon>
              <FormattedIcon name="NotFound" />
            </NotFoundIcon>
            <StyledSubtitle>Data Not Found</StyledSubtitle>
            <StyledButton href="/photography">Return to Photography</StyledButton>
          </StyledMainContainer>
        </CSSTransition>
      )}
    </TransitionGroup>
  )
}

export default NotFoundPage;