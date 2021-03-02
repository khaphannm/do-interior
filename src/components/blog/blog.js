import React, {useContext} from 'react'
import PropTypes from 'prop-types';
import { graphql } from "gatsby";
import { Row, Col, Container } from 'react-bootstrap'
import styled from 'styled-components'
import Layout from 'components/layout';
import AnimatedHeading from 'components/animated-heading';
import PortfolioItem from 'sections/portfolio/parts/PortfolioItem.js';
import {LayoutContext} from '../../context/LayoutContext'

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
    query($categoryId: String!) {
        allContentfulBlogPost (sort:{
            fields: publishedDate
            order: DESC
        }, filter:{
            categoryIds:{elemMatch:{id:{eq: $categoryId}}}
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
                    }
                    thumbnailImage {
                        file {
                            url
                        }
                    }
                }
            }
        }
    }
`;

const BlogPage = ({data, pageContext, ...props}) => {
    // const contextData = useContext(LayoutContext);
    // console.log(contextData)
    return (
            <Section>
                <Container>
                    <AnimatedHeading fontSize={"48px"} space={"3px"} text={`Ảnh thực tế sau thi công`} />
                </Container>
                {/* Post gallery */}
                <Wrapper>
                    <Row>
                    {data.allContentfulBlogPost.edges.map((blog) => 
                        <Col key={blog.node.id} md={4} lg={3} sm={6} xs={12}>
                            <PortfolioItem 
                                fixedHeight={'450px'}
                                image={blog.node.thumbnailImage.file && blog.node.thumbnailImage.file.url} 
                                text={blog.node.title} 
                                category={blog.node.categoryIds.map(category => category.name).join(' ')}
                                link={`/blog/${pageContext.slug}/${blog.node.slug}`}
                                type="slider"
                            /> 
                        </Col>
                    )}
                    </Row>
                    
                </Wrapper>
            </Section>
    )
}

BlogPage.propTypes = {

}

export default BlogPage

