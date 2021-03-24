import React, {useEffect, useContext} from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import HeroVideo from 'sections/hero/HeroVideo.js'
import AboutTwo from 'sections/about/AboutTwo.js'
import PortfolioTwo from 'sections/portfolio/PortfolioTwo.js'
import TestimonialsTwo from 'sections/testimonials/TestimonialsTwo.js'
// import TeamTwo from 'sections/team/TeamTwo.js'
// import ClientsTwo from 'sections/clients/ClientsTwo.js'
import ContactCreative from 'sections/contact/ContactCreative.js'
import Pricing from 'sections/pricing/Pricing.js'
import {LayoutContext} from '../context/LayoutContext'
import { setDynamicCategory } from '../utils/localStorage'



const Index = ({data, ...props}) => {
  const contextLayout = useContext(LayoutContext);
  useEffect(() => {
      if(contextLayout.dynamicSections.length === 0) {
        // console.log(contextLayout.dynamicSections.length)
        const saveData = {
          dynamicSections: data.allContentfulNavigation.edges,
        }
        contextLayout.setSomeState(saveData);
  
        // Store in localStorage
        setDynamicCategory(JSON.stringify(saveData.dynamicSections))
      }

  }, [contextLayout])
    // console.log(contextLayout.dynamicSections)
    return (
      <div>
        <Helmet>
          <title>{data.site.meta.title}</title>
          <meta name="description" content={data.site.meta.description} />
        </Helmet>
         {/* <I18nProvider i18n={i18n}> */}
          {/* <Layout
            // dynamicSections={data.allContentfulNavigation.edges}
          >  */}
            <HeroVideo />
            <AboutTwo />
            {/* <ServicesTwo /> */}
            {/* PortfolioTwo is presented for Special posts */}
            <PortfolioTwo specialPosts={data.specialPosts} />
            <TestimonialsTwo />
            {/* <TeamTwo /> */}
            {/* <ClientsTwo /> */}
            <Pricing />
            <ContactCreative />
          {/* </I18nProvider> */}
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
              category {
                id
                name
                slug
              }
            }
          }
        }
      }
    },
    specialPosts: allContentfulBlogPost(filter:{isSpecial:{eq:true}})
    {
      edges {
        node {
          id
          title
          slug
          thumbnailImage {
            file {
              url
            }
          }
          categoryIds {
            id
            slug
            name
          }
        }
      }
    }
}
`; 