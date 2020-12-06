import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Col, Row, Container } from 'react-bootstrap'
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
    return (
        <Section id="pricing">
            <Container>
                <AnimatedHeading text="Pricing of our services" />
            </Container>
            <Wrapper>
                <Row>
                    <Col md={3} style={{padding: 0}}>
                        <AnimationContainer animation="fadeIn">
                            <PricingCard index={0} />
                        </AnimationContainer>
                    </Col>
                    <Col md={3} style={{padding: 0}}>
                        <AnimationContainer animation="fadeIn">
                            <PricingCard index={1} />
                        </AnimationContainer>
                    </Col>
                    <Col md={3} style={{padding: 0}}>
                        <AnimationContainer animation="fadeIn">
                            <PricingCard index={2} />
                        </AnimationContainer>
                    </Col>
                    <Col md={3} style={{padding: 0}}>
                        <AnimationContainer animation="fadeIn">
                            <PricingCard index={3} />
                        </AnimationContainer>
                    </Col>
                </Row>
            </Wrapper>
        </Section>
    )
}

Pricing.propTypes = {

}

export default Pricing

