import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Col, Container } from 'react-bootstrap'
import PricingCard from 'sections/pricing/parts/PricingCard.js';
import AnimatedHeading from 'components/animated-heading';
import AnimationContainer from 'components/animation-container';

const Section = styled.section`
    background-color: #161d18;
    padding: 100px 0;
`;

function Pricing(props) {
    return (
        <Section id="pricing">
            <Col md={3} style={{padding: 0}}>
                <AnimationContainer animation="fadeIn">
                    <PricingCard index={0} />
                </AnimationContainer>
            </Col>
        </Section>
    )
}

Pricing.propTypes = {

}

export default Pricing

