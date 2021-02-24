import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap'
import styled from 'styled-components'
import Layout from 'components/layout';
import AnimatedHeading from 'components/animated-heading';
import PortfolioItem from 'sections/portfolio/parts/PortfolioItem.js'

const Section = styled.section`
    position: relative;
    min-height: 100vh;
    padding: 100px 0;
`
const Wrapper = styled.div`
    margin-top: 16px;
    padding: 0 16px;
`

const images = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

const BlogPage = (props) => {

    return (
        <Layout
            isHome={true}
        >
            <Section>
                <Container>
                    <AnimatedHeading fontSize={"48px"} space={"3px"} text={`Ảnh thực tế sau thi công`} />
                </Container>
                {/* Post gallery */}
                <Wrapper>
                    <Row>
                    {images.map((item, index) => 
                        <Col md={4} lg={3} sm={6} xs={12}>
                            <PortfolioItem 
                                fixedHeight={'450px'}
                                key={index}
                                index={index} 
                                image={'https://source.unsplash.com/random/800x600'} 
                                text={'Title title'} 
                                category={'Ảnh thực tế sau thi công'}
                                link={'/'}
                                type="slider"
                            /> 
                        </Col>
                    )}
                    </Row>
                    
                </Wrapper>
            </Section>
        </Layout>
    )
}

BlogPage.propTypes = {

}

export default BlogPage

