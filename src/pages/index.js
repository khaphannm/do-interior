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
import { defaultLocale, dynamicActivate } from '../utils/i18n'

const sectionData = [
  {id: 'home', display: <Trans>home</Trans>}, 
{id: 'about', display: <Trans>about</Trans>}, 
{id:'services', display: <Trans>services</Trans>}, 
{id: 'portfolio', display: <Trans>portfolio</Trans>}, 
{id: 'testimonials', display: <Trans>testimonials</Trans>}, 
{id: 'pricing', display: <Trans>pricing</Trans>}, 
{id: 'contact', display: <Trans>contact</Trans>}]

const Index = ({data, ...props}) => {
    const { site } = data;
    
    useEffect(() => {
      dynamicActivate(defaultLocale);
    }, [])

    return (
      <div>
        <Helmet>
          <title>{site.meta.title}</title>
          <meta name="description" content={site.meta.description} />
        </Helmet>
        <I18nProvider i18n={i18n}>
          <Layout
            isHome={true}
            sections={sectionData}
          >
            <HeroVideo />
            <AboutTwo />
            <ServicesTwo />
            <PortfolioTwo />
            <TestimonialsTwo />
            {/* <TeamTwo /> */}
            {/* <ClientsTwo /> */}
            <Pricing />
            <ContactCreative />
          </Layout>
        </I18nProvider>
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