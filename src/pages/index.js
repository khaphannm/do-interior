import React, {useEffect} from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { I18nProvider } from '@lingui/react';
import {Trans} from '@lingui/macro';
import { i18n } from '@lingui/core';
import Layout from 'components/layout'
import HeroVideo from 'sections/hero/HeroVideo.js'
import AboutTwo from 'sections/about/AboutTwo.js'
import ServicesTwo from 'sections/services/ServicesTwo.js'
import PortfolioTwo from 'sections/portfolio/PortfolioTwo.js'
import TestimonialsTwo from 'sections/testimonials/TestimonialsTwo.js'
// import TeamTwo from 'sections/team/TeamTwo.js'
// import ClientsTwo from 'sections/clients/ClientsTwo.js'
import ContactCreative from 'sections/contact/ContactCreative.js'
import Pricing from 'sections/pricing/Pricing.js'
// import { defaultLocale, dynamicActivate } from '../utils/i18n'

const Index = ({data, ...props}) => {
    const { site } = data;
    
    return (
      <div>
        <Helmet>
          <title>{site.meta.title}</title>
          <meta name="description" content={site.meta.description} />
        </Helmet>
          <Layout
            isHome={true}
          >
            <HeroVideo />
            <AboutTwo />
            {/* <ServicesTwo /> */}
            <PortfolioTwo />
            <TestimonialsTwo />
            {/* <TeamTwo /> */}
            {/* <ClientsTwo /> */}
            <Pricing />
            <ContactCreative />
          </Layout>
      </div>
    )
}

export default Index

export const creativeVideoTwoQuery = graphql`
  query {
    site {
      meta: siteMetadata {
        title
        description
      }
    }
  }
`