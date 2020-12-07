import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Typewriter from 'typewriter-effect'
import LoopVideo from './assets/loop.mp4'
import {secondaryMain, secondaryLight} from '../../constants/color'

class HeroVideo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            height: 0,
            width: 0
        }
    }
    updateDimensions = () => {
        if (this.state.height !== window.innerHeight) {
            this.setState({height: window.innerHeight})
        }
        if (this.state.width !== window.innerWidth) {
            this.setState({width: window.innerWidth})
        }
    }

    
    componentDidMount() {
        this.setState({height: window.innerHeight, width: window.innerWidth})
        window.addEventListener('resize', this.updateDimensions)
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions)
    }

    render() {

        const Section = styled.section`
            position: relative;
            .particles {
                position: absolute;
                width: 100%;
                height: 100%;
            }

            background-size: cover;
            background-repeat: no-repeat;
        `

        const VideoContainer = styled.div`
            width: 100%;
            display: flex;
            align-items: center;
            overflow: hidden;
            position: relative;
            video {
                position: absolute;
            }
            &:before {
                content:"";
                position: absolute;
                top:0;
                right:0;
                left:0;
                bottom:0;
                z-index:1;
                background: linear-gradient(180deg, rgba(46,61,53,1) 0%, rgba(32,43,40,0.7175245098039216) 64%);
            }
        `
        const Heading1 = styled.h1`
            font-size: 80px;
            font-family: Teko;
            line-height: 40px;
            color: #fff;
            font-weight: 400;
            text-transform: uppercase;
            @media (min-width:768px) {
                margin-left: 4px;
            }
            @media (max-width:767px) {
                margin-left: 2px;
            }
            @media (min-width:768px) and (max-width:1500px) {
                font-size: 40px;
            }
            @media (max-width:767px) {
                font-size: 20px;
                line-height: 20px;
            }
        `

        const Heading2 = styled.h2`
            font-size: 120px;
            color: #fff;
            font-weight: 700;
            text-transform: uppercase;
            background: -webkit-linear-gradient(180deg, rgba(168,149,89,1) 0%, rgba(255,247,195,1) 64%);
            background: -o-linear-gradient(180deg, rgba(168,149,89,1) 0%, rgba(255,247,195,1) 64%);
            background: -moz-linear-gradient(180deg, rgba(168,149,89,1) 0%, rgba(255,247,195,1) 64%);
            background: linear-gradient(180deg, rgba(168,149,89,1) 0%, rgba(255,247,195,1) 64%);
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
           @media (max-width:767px) {
                font-size: 40px;
                line-height: 40px;
            }
           @media (min-width:768px) and (max-width:1500px) {
                font-size: 70px;
            }
        `

        const Type = styled.div`
            font-size: 50px;
            line-height: 50px;
            color: #fff;
            text-transform: uppercase;
            @media (min-width:768px) {
                margin-left: 6px;
            }
            @media (max-width:767px) {
                margin-left: 2px;
            }
            @media (min-width:768px) and (max-width:1500px) {
                font-size: 23px;
                line-height: 20px;
            }
            @media (max-width:767px) {
                font-size: 20px;
                line-height: 20px;
            }
            span {
                font-family: Teko;
            }
        `
        const Content = styled.div`
            position: relative;
            z-index: 10
        `

        const Separator = styled.div`
            height: 5px;
            width: 50px;
            background-color: ${secondaryMain};
            margin-bottom: 30px;
            @media (min-width:768px) {
                margin-left: 6px;
            }
            @media (max-width:767px) {
                margin-left: 2px;
            }
        `

        const BottomContent = styled.div`
            position: absolute;
            width: 100%;
            bottom: -14%;
            z-index: 2;
            @media (min-width:1025px) and (max-width: 1400px) {    
                bottom: -35%;
            }
            @media (max-width:767px) {
                position: relative;
                bottom: 0;
            } 
            @media (min-width:768px) and (max-width: 1023px) {    
                bottom: -25%;
            }
        `

        const ServiceCol = styled(Col)`
            padding: 0;
            border-right: #444;
            &.no-border {
                border-right: none;
            }
            @media (max-width:500px) {
                border-right:none;
            }
        `

        const Service = styled.div`
            min-height: 300px;
            background-color: #202c26;
            transition: .2s;
            display: flex;
            justify-content: center;
            flex-direction: column;
            &:hover {
                background-color: #40594b;
            }
        `
        const ServiceContent = styled.div`
            padding: 40px;
            color: #fff;
            p {
                font-size: 14px;
                font-weight: 300;
                color: #efefef;
            }
        `
        const ServiceHeading = styled.h4`
            font-size: 30px;
            font-weight: 400;
            font-family: Teko;
        `
        const ServiceSeparator = styled.div`
            height: 5px;
            width: 50px;
            background-color: ${secondaryLight};
            margin-bottom: 10px;
        `

        const ServiceIcon = styled.div`
            margin-bottom: 20px;
            img {
                max-height: 70px;
            }
        `

        const ServiceText = styled.p`
            font-size: 14px;
            font-weight: 300;
            color: #c5c5c5;
        `
 
        return (
            <Section id="home">
                <VideoContainer style={{height: `${this.state.width > 500 ? this.state.height : 350}px`}}>
                    <video autoPlay="autoplay" loop="loop" muted style={{height: `${this.state.width >= 1024 && this.state.width < 1200 ? "100%": "auto"}`}}>
                        <source src={LoopVideo} type="video/mp4" />
                    </video>
                    <Container>
                        <Content>
                            <Heading1>
                                Mission
                            </Heading1>
                            <Heading2>
                                Design&Interior
                            </Heading2>
                            <Separator/>
                            <Type>
                                <Typewriter
                                    options={{
                                    strings: [
                                        'Do Design',
                                        'Do Interior',
                                    ],
                                    autoStart: true,
                                    loop: true,
                                    }}
                                />
                            </Type>
                        </Content>
                    </Container>
                </VideoContainer>
                <BottomContent>
                        <Container>
                            <Row>
                                <ServiceCol md={6} style={{borderRight: this.state.width > 500 ? "1px solid #444" : "none"}}>
                                    <Service>
                                        <ServiceContent>
                                            <ServiceIcon>
                                                <img src={this.props.webexpertIcon.childImageSharp.fluid.src} alt="web experts" />
                                            </ServiceIcon>
                                            <ServiceHeading>Design</ServiceHeading>
                                            <ServiceSeparator/>
                                            <ServiceText>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae ultricies lacus, vitae varius velit. 
                                                Pellentesque blandit libero eu turpis condimentum bibendum.
                                            </ServiceText>
                                        </ServiceContent>
                                    </Service>
                                </ServiceCol>
                                <ServiceCol md={6} style={{borderRight: this.state.width > 500 ? "1px solid #444" : "none"}}>
                                    <Service>
                                        <ServiceContent>
                                            <ServiceIcon>
                                                    <img src={this.props.mobileIcon.childImageSharp.fluid.src} alt="mobile experts" />
                                            </ServiceIcon>
                                            <ServiceHeading>Interior</ServiceHeading>
                                            <ServiceSeparator/>
                                            <ServiceText>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae ultricies lacus, vitae varius velit. 
                                                Pellentesque blandit libero eu turpis condimentum bibendum.
                                            </ServiceText>
                                        </ServiceContent>
                                    </Service>
                                </ServiceCol>
                                {/* <ServiceCol md={4}>
                                    <Service>
                                        <ServiceContent>
                                            <ServiceIcon>
                                                    <img src={this.props.seoIcon.childImageSharp.fluid.src} alt="seo experts" />
                                            </ServiceIcon>
                                            <ServiceHeading>SEO Experts</ServiceHeading>
                                            <ServiceSeparator/>
                                            <ServiceText>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae ultricies lacus, vitae varius velit. 
                                                Pellentesque blandit libero eu turpis condimentum bibendum.
                                            </ServiceText>
                                        </ServiceContent>
                                    </Service>
                                </ServiceCol> */}
                            </Row>
                        </Container>
                </BottomContent>
            </Section>
        )
    }
}

export default props => (
    <StaticQuery
      query={graphql`
      query {
        background: file(relativePath: {eq: "background-poly.jpg"}) {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 100) {
              src
            }
          }
        }
        webexpertIcon: file(relativePath: {eq: "icons/web.png"}) {
          childImageSharp {
            fluid(maxWidth: 500) {
              src
            }
          }
        }
        mobileIcon: file(relativePath: {eq: "icons/mobile.png"}) {
          childImageSharp {
            fluid(maxWidth: 500) {
              src
            }
          }
        }
        seoIcon: file(relativePath: {eq: "icons/seo.png"}) {
          childImageSharp {
            fluid(maxWidth: 500) {
              src
            }
          }
        }
      }
      `}
      render={({ 
        background, 
        webexpertIcon, 
        mobileIcon, 
        seoIcon}) => <HeroVideo  
        background={background} 
        webexpertIcon={webexpertIcon} 
        mobileIcon={mobileIcon} 
        seoIcon={seoIcon}
        {...props} />}
    />
  )