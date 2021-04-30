import React, { useEffect, useState } from "react"
import { Layout } from '@components';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import firebase from "gatsby-plugin-firebase";
import { isEmpty } from "@utils";
import { fromFirestore } from '@api';
import { /*OldTilesPage, CategoriesPage,*/ NotFoundPage, /*LoadingPage*/ } from '@components/photography';

//const _ = require('lodash');

const StyledSection = styled.section`
  margin: auto 0;
  padding: 100px 0 0px;
`;

const OldPhotographyPage = ({ location }) => {
  const isBrowser = typeof window !== 'undefined'
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0)

  const [isHome, setIsHome] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [path, setPath] = useState("");
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!isBrowser) return false

    const handleResize = () => setWidth(window.innerWidth)

    async function fetchData() {
      try {
        await firebase.auth().signInAnonymously()
        console.log("signed in");
        let tmp = await fromFirestore();
        setData(tmp);
        setIsLoading(false);
        firebase.auth().currentUser.delete().then(() => {
          console.log('anonymous account deleted');
        });
      } catch(e) {
        console.log(e);
        setIsLoading(false);
      }
    }
    if(isEmpty(data) && isLoading && !fetching) {
      setFetching(true);
      fetchData();
    }

    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setPath(id);
      setIsHome(false);
    } else {
      setPath('');
      if(!isHome) {
      }
      setIsHome(true);
    }

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [isHome, isLoading, data, path, location.hash, fetching, width, isBrowser]);

  /*return (
    <Layout isHome={false} animateNav={false} footer={!isHome || width < 768}>
      <Helmet>
        <title>Portfolio | Howard Tseng</title>
        <link rel="canonical" href="https://howardt12345.com/photography" />
      </Helmet>
      <StyledSection>
       {!isLoading && !isHome && !_.isEmpty(data) && !_.isEmpty(data.getPicturesQuery(path)) && (
          <OldTilesPage data={data.getPicturesQuery(path) ?? []} name={data.getNames(path)} path={path} />
       )}
       {!isLoading && isHome && !_.isEmpty(data) && (
          <CategoriesPage data={data} />
       )}
       {!isLoading && (typeof data.menu === 'undefined' || _.isEmpty(data.menu) || (!isHome && _.isEmpty(data.getPicturesQuery(path)))) && (
          <NotFoundPage />
       )}
       {isLoading && (
         <LoadingPage />
       )} 
      </StyledSection>
    </Layout>
  );*/
  return (
    <Layout isHome={false} animateNav={false} footer={!isHome || width < 768}>
      <Helmet>
        <title>Portfolio | Howard Tseng</title>
        <link rel="canonical" href="https://howardt12345.com/photography" />
      </Helmet>
      <StyledSection>
        <NotFoundPage />
      </StyledSection>
    </Layout>
  )
}

OldPhotographyPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default OldPhotographyPage;