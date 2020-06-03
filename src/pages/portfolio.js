import React, { useEffect, useState } from "react"
import { Link } from 'gatsby';
import { Layout } from '@components';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { replaceAll, isEmpty, filter } from "@utils";
import { fromFirestore, getUrlsFor } from '@api';
import { TilesPage } from '@components/portfolio';
import { Button } from '@styles';
import { CategoriesPage } from "../components/portfolio";

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
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if(isEmpty(data)) {
        let tmp = await fromFirestore();
        setData(tmp);
        setIsLoading(false);
      }
    }
    fetchData();

    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setPath(id);
      setCurrentData([]);
      setIsHome(false);
    } else {
      setPath('');
      if(!isHome) {
        setCurrentData([]);
      }
      setIsHome(true);
    }
    if(!_.isEmpty(data)) {
      setCurrentData(data.getPicturesQuery(path));
    }
    function preventRightClick(e) {
      if (e.target.tagName === 'IMG') {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    document.addEventListener('contextmenu', preventRightClick);
    return () => document.removeEventListener('contextmenu', preventRightClick);
  }, [location.hash, data, path, currentData, isHome]);

  return (
    <Layout isHome={false} animateNav={false}>
      <Helmet>
        <title>Portfolio | Howard Tseng</title>
        <link rel="canonical" href="https://howardt12345.com/portfolio" />
      </Helmet>
      <StyledSection>
       {!isLoading && !isHome && !_.isEmpty(currentData) && (
          <TilesPage data={currentData} name={data.getNames(path)} path={path}></TilesPage>
       )}
       {!isLoading && isHome && (
         <CategoriesPage data={data} />
       )}
      </StyledSection>
    </Layout>
  );
}

PortfolioPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PortfolioPage;