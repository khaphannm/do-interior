import React from 'react'
// import PropTypes from 'prop-types';
import { graphql } from "gatsby";
import { Row, Col, Container } from 'react-bootstrap'
import styled from 'styled-components';
import Helmet from 'react-helmet';
// import Layout from 'components/layout';
import AnimatedHeading from 'components/animated-heading';
import PortfolioItem from 'sections/portfolio/parts/PortfolioItem.js';
// import {LayoutContext} from '../../context/LayoutContext'

const Section = styled.section`
    position: relative;
    min-height: 100vh;
    padding: 100px 0;
`
const Wrapper = styled.div`
    margin-top: 16px;
    padding: 0 16px;
`

export const query = graphql`
    query {
        allContentfulBlogPost (sort:{
            fields: publishedDate
            order: DESC
        }){
            edges {
                node {
                    id
                    title
                    metaTitle
                    slug
                    categoryIds {
                        id
                        name
                        slug
                    }
                    thumbnailImage {
                        gatsbyImageData(
         		            placeholder: BLURRED
         		            formats: [AUTO, WEBP]
       		            )
                    }
                }
            }
        },
        site {
            meta: siteMetadata {
                title
                description
            }
        },
    }
`;

const DuAnPage = ({data, pageContext, ...props}) => {
    // const contextData = useContext(LayoutContext);
    console.log(data)
    return (
        <React.Fragment>
            <Helmet>
                <title>{data.site.meta.title}</title>
                <meta name="description" content={data.site.meta.description} />
            </Helmet>
            <Section>
                <Container>
                    <AnimatedHeading fontSize={"48px"} space={"3px"} text={`Dự Án`} />
                </Container>
                {/* Post gallery */}
                <Wrapper>
                    <Row>
                    {data.allContentfulBlogPost.edges.map((blog) => 
                        <Col key={blog.node.id} md={4} lg={4} xl={3} sm={6} xs={12}>
                            <PortfolioItem 
                                fixedheight="450px"
                                image={blog.node.thumbnailImage} 
                                text={blog.node.title} 
                                category={blog.node.categoryIds.map(category => category.name).join(', ')}
                                link={`/blog/${blog.node.categoryIds.length > 0 ? blog.node.categoryIds[0].slug : ""}/${blog.node.slug}`}
                                type="slider"
                            /> 
                        </Col>
                    )}
                    </Row>
                    
                </Wrapper>
            </Section>
        </React.Fragment>
    )
}

DuAnPage.propTypes = {

}

export default DuAnPage

