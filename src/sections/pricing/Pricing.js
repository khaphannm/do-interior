import React, {useState} from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Col, Row, Container, Tabs as BootTabs, Tab } from 'react-bootstrap';
import {StaticQuery, graphql} from 'gatsby'
import {Trans} from '@lingui/macro';
import PricingCard from 'sections/pricing/parts/PricingCard.js';
import AnimatedHeading from 'components/animated-heading';
import AnimationContainer from 'components/animation-container';
import ConstructionPrice from './parts/ConstructionPrice';
import { secondaryMain } from '../../constants/color';

const Section = styled.section`
    background-color: #161d18;
    padding: 100px 0;
    @media (max-width: 767px) {
        padding: 50px 0;
    }
`;

const Wrapper = styled.div`
    margin-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
`

const Tabs = styled(BootTabs)`
    justify-content: center;
    & > a {
        color: #fff;
    }
    .active {
        background-color: ${secondaryMain} !important;
        color: #e1eae8 !important;
    }
    .tabItem {
        border-radius: 16px;
    }
`

function Pricing(props) {
    // Fetch data
    // const data = useStaticQuery(graphql`
    //     query {
    //         items: allMarkdownRemark(filter:{fileAbsolutePath:{regex:"/pricing/(design)/"}}, sort:{fields:[frontmatter___id]}){
    //             edges {
    //             content: node {
    //                 frontmatter {
    //                     id
    //                     category
    //                     mainPrice
    //                     mainDesc
    //                     restPrices {
    //                         price
    //                         desc
    //                     }
    //                     services
    //                     highlight
    //                 }
    //             }
    //             }
    //         }
    //     }
    // `);

    const [key, setKey] = useState('design');
    const handleSetKey = k => {
        setKey(k);
    }

    return (
        <StaticQuery
      query={graphql`
      query {
          pricingItems: allMarkdownRemark(filter:{fileAbsolutePath:{regex:"/pricing/(design)/"}}, sort:{fields:[frontmatter___id]}){
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
                        services
                        highlight
                    }
                }
              }
          }
      }
  `}
    render={({pricingItems}) => 
        <Section id="pricing">
            <Container>
                <AnimatedHeading text={`Bảng Giá Dịch Vụ`} />
            </Container>
            <Wrapper>
                    <Tabs
                        id="tabs-control"
                        activeKey={key}
                        onSelect={handleSetKey}
                        variant="pills"
                    >
                        <Tab tabClassName="tabItem" eventKey="design" title={<Trans>Thiết kế</Trans>}>
                            <Row>
                                {pricingItems.edges.map((item, index) => (
                                    <Col key={`column-pricing-card-${index}`} md={3} style={{padding: 0}}>
                                        <AnimationContainer animation="fadeIn">
                                            <PricingCard 
                                                index={index} 
                                                id={item.content.frontmatter.id}
                                                category={item.content.frontmatter.category}    
                                                mainPrice={item.content.frontmatter.mainPrice}    
                                                mainDesc={item.content.frontmatter.mainDesc}    
                                                restPrices={item.content.frontmatter.restPrices} 
                                                services={item.content.frontmatter.services} 
                                                isHighlight={item.content.frontmatter.highlight}
                                            />
                                        </AnimationContainer>
                                    </Col>
                                ))}
                            </Row>
                        </Tab>
                        <Tab tabClassName="tabItem" eventKey="construction" title={<Trans>Xây dựng</Trans>}>
                            <Container>
                                <Row>
                                    <Col md={12} style={{padding: 0}}>
                                        <AnimationContainer animation="fadeIn">
                                            <ConstructionPrice />
                                        </AnimationContainer>
                                    </Col>
                                </Row>
                            </Container>
                        </Tab>
                    </Tabs>
                    
                
            </Wrapper>
        </Section>
    }
      />
    )
}

Pricing.propTypes = {

}

export default Pricing