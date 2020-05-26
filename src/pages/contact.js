import React from "react"
import { Helmet } from 'react-helmet';
import { Layout } from '@components';


const ContactPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Contact | Howard Tseng</title>
        <link rel="canonical" href="https://howardt12345.com/contact" />
      </Helmet>
      <div>
        <h1>Contact</h1>
      </div>
    </Layout>
  )
}

export default ContactPage;