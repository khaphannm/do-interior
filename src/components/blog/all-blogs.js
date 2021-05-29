import React from 'react'
// import PropTypes from 'prop-types';
import { graphql } from "gatsby";
import { Row, Col, Container, ListGroup } from 'react-bootstrap'
import styled from 'styled-components';
import Helmet from 'react-helmet';
// import Layout from 'components/layout';
import AnimatedHeading from 'components/animated-heading';
import PortfolioItem from 'sections/portfolio/parts/PortfolioItem.js';
import { primaryLight, primaryMain, secondaryLight, secondaryMain } from '../../constants/color';
// import {LayoutContext} from '../../context/LayoutContext'
import { navigate } from "gatsby";

const Section = styled.section`
    position: relative;
    min-height: 100vh;
    padding: 100px 0;
`
const Wrapper = styled.div`
    margin-top: 16px;
    padding: 0 16px;
`
const ListGroupStyling = styled(ListGroup)`
    padding: 16px 64px;
    @media (max-width: 970px) {
        padding: 16px 24px;
    }
    @media (max-width: 576px) {
        flex-direction: row;
    }
    margin: 0 auto;
    flex-wrap: wrap;
`;
const ListCategoryItem= styled(ListGroup.Item)`
    border-radius: 25px !important;
    background-color: ${primaryLight};
    color: #ffffff;
    width: 15%;
    margin: 0 .45rem .45rem .45rem;
    padding:  .45rem .75rem;
    &:hover {
        color: #ffffff;
        background-color: ${primaryMain};
    }
    &:active {
        background-color: ${secondaryMain};
    }
    &:focus {
        background-color: ${secondaryMain};
    }
    @media (max-width: 913px) {
        width: 30%;
    }
    @media (max-width: 709px) {
        width: 45%;
    }
    @media (max-width: 576px) {
        width: 30%;
        font-size: 0.7rem
    }
    @media (max-width: 485px) {
        width: 40%;
        font-size: 0.5rem
    }
`;

export const query = graphql`
    query($categoryIds: [String]!) {
        allContentfulBlogPost (sort:{
            fields: publishedDate
            order: DESC
        }, filter:{
            categoryIds:{elemMatch:{id:{in: $categoryIds}}}
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
        allContentfulCategory(filter:{id:{
            in: $categoryIds
        }}) {
            edges {
                node {
                    id
                    name
                    slug
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
                <ListGroupStyling horizontal="sm">
                    {data.allContentfulCategory.edges.map(edge => (
                        <ListCategoryItem action onClick={() => navigate(`blog/${edge.node.slug}`)} key={edge.node.id}>
                            {edge.node.name}
                        </ListCategoryItem>
                    ))}
                </ListGroupStyling>
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

