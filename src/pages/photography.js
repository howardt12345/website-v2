import React, { useEffect, useState }  from 'react';
import firebase from "gatsby-plugin-firebase";
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { isEmpty, replaceAll } from "@utils";
import { Layout } from '@components';
import { LoadingPage, TilesPage } from '@components/photography';
import { media, mixins, Heading, Section } from '@styles';

const _ = require('lodash');

const url = "https://firebasestorage.googleapis.com/v0/b/portfolio-49b69.appspot.com/o/";
const token = "ea925040-1fca-4eda-b1e8-0eb96567ab7e";

const StyledSection = styled.section`
  margin: auto 0;
  padding: 100px 0 0px;
`;

const StyledHeading = styled(Heading)`
  align-self: baseline;
  line-height: 0.75;
`;

class Picture {
  constructor(key, value) {
    this.name = key;
    this.date = value;
  }

  getUrl = () => `${url}photo%2F${replaceAll(this.name, ' ', '%20')}?alt=media&token=${token}`;
}

const fromFirestore = async () => {
  var list = [];

  await firebase.firestore()
  .collection("photo")
  .doc("all")
  .get().then(response => {
      const data = response.data();
      const map = data.photos;
      for(const [key, value] of Object.entries(map)) {
        list.push(new Picture(key, value));
        console.log(key, value);
      }
  });

  return list;
}

const PhotographyPage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState({});


  useEffect(() => {

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

  }, [isLoading, fetching, data]);


  return (
    <Layout animateNav={false} isHome={false} footer={true}>
      <Helmet>
        <title>Photography | Howard Tseng</title>
        <link rel="canonical" href="https://howardt12345.com/photography" />
      </Helmet>

      <StyledSection>
        {!isLoading && !_.isEmpty(data) && !_.isEmpty(data) && (
          <TilesPage data={data ?? []} />
        )}
        {isLoading && (
          <LoadingPage />
        )}
      </StyledSection>
    </Layout>
  );
}

export default PhotographyPage;