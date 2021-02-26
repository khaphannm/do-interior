import React, {useEffect, useContext} from 'react'
import { useStaticQuery, graphql } from 'gatsby'
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
import LayoutContext from '../context/LayoutContext'
// import { defaultLocale, dynamicActivate } from '../utils/i18n'



const Index = ({data, ...props}) => {
  const contextLayout = useContext(LayoutContext);
  // const staticData = useStaticQuery(graphql`
  //   query {
  //     site {
  //       meta: siteMetadata {
  //         title
  //         description
  //       }
  //     }
  //   }
  // `)
    useEffect(() => {
      if(contextLayout.data.dynamicSections.length === 0) {
        console.log(contextLayout.data.dynamicSections.length)
        const saveData = {
          data: {
            dynamicSections: data.allContentfulNavigation.edges
          }
        }
        contextLayout.set(saveData);
      }
    }, [])
    console.log(contextLayout.data.dynamicSections)
    return (
      <div>
        <Helmet>
          <title>{data.site.meta.title}</title>
          <meta name="description" content={data.site.meta.description} />
        </Helmet>
          {/* <Layout */}
            {/* dynamicSections={data.allContentfulNavigation.edges} */}
            {/* isHome={true} */}
          {/* > */}
            <HeroVideo />
            <AboutTwo />
            {/* <ServicesTwo /> */}
            <PortfolioTwo />
            <TestimonialsTwo />
            {/* <TeamTwo /> */}
            {/* <ClientsTwo /> */}
            <Pricing />
            <ContactCreative />
          {/* </Layout> */}
      </div>
    )
}

export default Index

export const query = graphql`
  query {
    site {
      meta: siteMetadata {
        title
        description
      }
    },
    allContentfulNavigation {
      edges {
        node {
          id
          navigationTitle
          categoryNestedList{
            id
            name
            slug
            category {
              id
              name
              slug
            }
          }
        }
      }
    }
}
`; 