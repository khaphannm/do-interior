import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Col, Row, Container } from 'react-bootstrap';
import {useStaticQuery, graphql} from 'gatsby'
import PricingCard from 'sections/pricing/parts/PricingCard.js';
import AnimatedHeading from 'components/animated-heading';
import AnimationContainer from 'components/animation-container';

const Section = styled.section`
    background-color: #161d18;
    padding: 100px 0;
`;

const Wrapper = styled.div`
    margin-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
`

function Pricing(props) {

    const data = useStaticQuery(graphql`
        query {
            items: allMarkdownRemark(filter:{fileAbsolutePath:{regex:"/(pricing)/"}}, sort:{fields:[frontmatter___id]}){
                edges {
                content: node {
                    frontmatter {
                        id
                        category
                        mainPrice
                        mainDesc
                        restPrices {
                            price
                            desc
                        }
                    }
                }
                }
            }
        }
    `);

    console.log(data);

    return (
        <Section id="pricing">
            <Container>
                <AnimatedHeading text="Pricing of our services" />
            </Container>
            <Wrapper>
                <Row>
                    {data.items.edges.map((item, index) => (
                        <Col md={3} style={{padding: 0}}>
                            <AnimationContainer animation="fadeIn">
                                <PricingCard 
                                    index={index} 
                                    id={item.content.frontmatter.id}
                                    category={item.content.frontmatter.category}    
                                    mainPrice={item.content.frontmatter.mainPrice}    
                                    mainDesc={item.content.frontmatter.mainDesc}    
                                    restPrices={item.content.frontmatter.restPrices}    
                                />
                            </AnimationContainer>
                        </Col>
                    ))}
                </Row>
            </Wrapper>
        </Section>
    )
}

Pricing.propTypes = {

}

export default Pricing

