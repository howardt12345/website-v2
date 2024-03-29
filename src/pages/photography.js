import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { isEmpty, replaceAll } from '@utils';
import { Layout } from '@components';
import { LoadingPage, TilesPage } from '@components/photography';

const url =
  'https://firebasestorage.googleapis.com/v0/b/portfolio-49b69.appspot.com/o/';
const token = 'ea925040-1fca-4eda-b1e8-0eb96567ab7e';

const StyledSection = styled.section`
  margin: auto 0;
  padding: 100px 0 0px;
`;

class Picture {
  constructor(key, value) {
    this.date = key;
    this.name = value.split('"')[1];
    this.width = parseInt(value.split(',')[1]);
    this.height = parseInt(value.split(',')[2]);
  }

  getUrl = () =>
    `${url}photo%2F${replaceAll(
      this.name,
      ' ',
      '%20',
    )}?alt=media&token=${token}`;
}

const fromFirestore = async () => {
  let list = [];

  await firebase
    .firestore()
    .collection('photo')
    .doc('all')
    .get()
    .then(response => {
      const data = response.data();
      const map = data.photos;
      for (const [key, value] of Object.entries(map)) {
        list.push(new Picture(key, value));
      }
    });

  return list;
};

const PhotographyPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        await firebase.auth().signInAnonymously();
        let tmp = await fromFirestore();
        setData(tmp);
        setIsLoading(false);
        await firebase
          .auth()
          .currentUser.delete()
          .then(() => {});
        setFetching(false);
      } catch (e) {
        setIsLoading(false);
      }
    }

    if (isEmpty(data) && isLoading && !fetching) {
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
        {!isLoading && <TilesPage data={data ?? []} />}
        {isLoading && <LoadingPage />}
      </StyledSection>
    </Layout>
  );
};

export default PhotographyPage;
