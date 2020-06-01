import React, { useEffect, useState } from "react"
import { Layout } from '@components';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { replaceAll, isEmpty } from "@utils";
import { fromFirestore } from '@api';

const url = "https://firebasestorage.googleapis.com/v0/b/portfolio-49b69.appspot.com/o/";
const token = "810d1310-0533-4e13-bc33-6fc77ac56ef1";

const StyledSection = styled.section`
  margin: auto 0;
  padding: 100px 0 0px;
`;

const PortfolioPage = ({ location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [path, setPath] = useState("");
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if(isEmpty(data)) {
        let tmp = await fromFirestore(url, token);
        setData(tmp);
        setIsLoading(false);
      }
    }
    fetchData();

    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setPath(id);
      /*setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);*/
    } 
  });

  return (
    <Layout isHome={false} animateNav={false}>
      <Helmet>
        <title>Portfolio | Howard Tseng</title>
        <link rel="canonical" href="https://howardt12345.com/portfolio" />
      </Helmet>
      <StyledSection>
        <div>
          <h1>{path}</h1>
        </div>
       {!isLoading && (
          /*<div dangerouslySetInnerHTML={
            //{ __html: JSON.stringify(data.menu, (key, value) => (value instanceof Map ? [...value] : value)) }
            {__html: JSON.stringify(data.getPicturesQuery(path))}
          } />*/
          <div>{JSON.stringify(data.getPicturesQuery(path))}</div>
       )}
      </StyledSection>
    </Layout>
  );
}

PortfolioPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PortfolioPage;