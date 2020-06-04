import React, { useEffect, useState } from "react"
import { Layout } from '@components';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { isEmpty } from "@utils";
import { fromFirestore } from '@api';
import { TilesPage, CategoriesPage, NotFoundPage } from '@components/portfolio';

const _ = require('lodash');

const StyledSection = styled.section`
  margin: auto 0;
  padding: 100px 0 0px;
`;

const PortfolioPage = ({ location }) => {
  const [isHome, setIsHome] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [path, setPath] = useState("");

  useEffect(() => {
    async function fetchData() {
      if(isEmpty(data) && isLoading) {
        let tmp = await fromFirestore();
        setData(tmp);
        setIsLoading(false);
      }
    }
    if(isEmpty(data) && isLoading) {
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
  }, [isHome, isLoading, data, path, location.hash]);

  return (
    <Layout isHome={false} animateNav={false}>
      <Helmet>
        <title>Portfolio | Howard Tseng</title>
        <link rel="canonical" href="https://howardt12345.com/portfolio" />
      </Helmet>
      <StyledSection>
       {!isLoading && !isHome && !_.isEmpty(data) && !_.isEmpty(data.getPicturesQuery(path)) && (
          <TilesPage data={data.getPicturesQuery(path) ?? []} name={data.getNames(path)} path={path}></TilesPage>
       )}
       {!isLoading && isHome && !_.isEmpty(data) && (
         <CategoriesPage data={data} />
       )}
       {!isLoading && (typeof data.menu === 'undefined' || _.isEmpty(data.menu) || (!isHome && _.isEmpty(data.getPicturesQuery(path)))) && (
         <NotFoundPage />
       )}
      </StyledSection>
    </Layout>
  );
}

PortfolioPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PortfolioPage;