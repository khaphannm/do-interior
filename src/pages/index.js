import React, {useEffect, useContext, useState} from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import loadable from '@loadable/component';
// import { window } from "browser-monads";
// import HeroVideo from 'sections/hero/HeroVideo.js'
// import AboutTwo from 'sections/about/AboutTwo.js'
// import PortfolioTwo from 'sections/portfolio/PortfolioTwo.js'
// import TestimonialsTwo from 'sections/testimonials/TestimonialsTwo.js'
// import TeamTwo from 'sections/team/TeamTwo.js'
// import ClientsTwo from 'sections/clients/ClientsTwo.js'
// import ContactCreative from 'sections/contact/ContactCreative.js'
// import Pricing from 'sections/pricing/Pricing.js'
import {LayoutContext} from '../context/LayoutContext'
import { setDynamicCategory } from '../utils/localStorage'
// import { secondaryMain } from '../constants/color';

// Code splitting
const HeroVideo = loadable(() => import('sections/hero/HeroVideo.js'))
const AboutTwo = loadable(() => import('sections/about/AboutTwo.js'))
const PortfolioTwo = loadable(() => import('sections/portfolio/PortfolioTwo.js'))
const ContactCreative = loadable(() => import('sections/contact/ContactCreative.js'))
const Pricing = loadable(() => import('sections/pricing/Pricing.js'))
// const MessengerCustomerChat = loadable(() => import('../utils/MessengerCustomerChat'));



const Index = ({data, ...props}) => {
  const contextLayout = useContext(LayoutContext);
  const [loadContact, setLoadContact] = useState(false)
  // Timeout
  let timeout;
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
  useEffect(() => {
    timeout = setTimeout(()=>{
      setLoadContact(true)
    }, 3000);
    return () => {
      if(timeout)
        clearTimeout(timeout);
    }
  }, [])

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
          {/* <MessengerCustomerChat
            pageId={process.env.GATSBY_PAGE_ID}
            version={process.env.GATSBY_MESSENGER_PLUGIN_VERSION}
            loggedInGreeting={process.env.GATSBY_MESSENGER_MSG_IN}
            loggedOutGreeting={process.env.GATSBY_MESSENGER_MSG_OUT}
            htmlRef={window.location.pathname}
            themeColor={secondaryMain}
            greetingDialogDisplay="show"
            greetingDialogDelay={parseInt(process.env.GATSBY_MESSENGER_PLUGIN_DELAY)}
            shouldShowDialog={window.location.pathname === "/" ? true : false}
          /> */}
            <HeroVideo imageCarousel={data.imageCarousel} />
            <AboutTwo />
            {/* <ServicesTwo /> */}
            {/* PortfolioTwo is presented for Special posts */}
            <PortfolioTwo specialPosts={data.specialPosts} />
            {/* <TestimonialsTwo /> */}
            {/* <TeamTwo /> */}
            {/* <ClientsTwo /> */}
            <Pricing />
            {loadContact && <ContactCreative />}
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
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP]
       		  )
          }
          categoryIds {
            id
            slug
            name
          }
        }
      }
    },
    imageCarousel: allContentfulCarouselImg {
      nodes {
          images {
            id
            gatsbyImageData(
                width: 800
                placeholder: BLURRED
                formats: [AUTO, WEBP]
            )
          }
      }
    }
}
`; 