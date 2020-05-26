import React from "react"
import { Layout } from '@components';
import { Helmet } from 'react-helmet';

const PortfolioPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Portfolio | Howard Tseng</title>
        <link rel="canonical" href="https://howardt12345.com/portfolio" />
      </Helmet>
      <div>
        <h1>Photos</h1>
      </div>
    </Layout>
  )
}

export default PortfolioPage;