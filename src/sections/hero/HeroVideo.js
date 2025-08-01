import React, {useState, useEffect} from 'react'
// import { Container } from 'react-bootstrap'
// import { graphql } from 'gatsby'
import styled from 'styled-components'
// import Typewriter from 'typewriter-effect'
// import LoopVideo from './assets/loop.mp4'
import {secondaryMain} from '../../constants/color'
import Slider from 'react-slick'
import { GatsbyImage } from "gatsby-plugin-image";// import { Trans } from '@lingui/macro'
// import {i18n} from '@lingui/core';

const settings = {
    dots: true,
    swipe: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    draggable: true,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 10000,
    loop: true,
    adaptiveHeight: true,
    responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 2
    //     }
    //   },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
}

    const Section = styled.section`
        position: relative;
    `

    const VideoContainer = styled.div`
        width: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;
        position: relative;
        
        .slider-img {
            position: absolute;
            width: 100vw;
            z-index:2;
            height: 100%;
            .slick-prev {
                left: 15px;
            }
            .slick-next {
                right: 15px;
            }
        }
        .slick-slide {
            display: block;
            margin: 0px 0 70px 0px;
        }
        .slick-dots {
            bottom: 0;
            li button:before,.slick-dots li.slick-active button:before {
            color: ${secondaryMain};
        }
        
    }
        
    `
        // background: linear-gradient(180deg, rgba(46,61,53,1) 0%, rgba(32,43,40,0.7175245098039216) 64%);
    // const Heading1 = styled.h1`
    //     font-size: 80px;
    //     font-family: Teko;
    //     line-height: 40px;
    //     color: #fff;
    //     font-weight: 400;
    //     text-transform: uppercase;
    //     @media (min-width:768px) {
    //         margin-left: 4px;
    //     }
    //     @media (max-width:767px) {
    //         margin-left: 2px;
    //     }
    //     @media (min-width:768px) and (max-width:1500px) {
    //         font-size: 40px;
    //     }
    //     @media (max-width:767px) {
    //         font-size: 20px;
    //         line-height: 20px;
    //     }
    // `

    // const Heading2 = styled.h2`
    //     font-size: 120px;
    //     color: #fff;
    //     font-weight: 700;
    //     text-transform: uppercase;
    //     background: -webkit-linear-gradient(180deg, rgba(168,149,89,1) 0%, rgba(255,247,195,1) 64%);
    //     background: -o-linear-gradient(180deg, rgba(168,149,89,1) 0%, rgba(255,247,195,1) 64%);
    //     background: -moz-linear-gradient(180deg, rgba(168,149,89,1) 0%, rgba(255,247,195,1) 64%);
    //     background: linear-gradient(180deg, rgba(168,149,89,1) 0%, rgba(255,247,195,1) 64%);
    //     -webkit-background-clip: text;
    //     -webkit-text-fill-color: transparent;
    //     @media (max-width:767px) {
    //         font-size: 40px;
    //         line-height: 40px;
    //     }
    //     @media (min-width:768px) and (max-width:1500px) {
    //         font-size: 70px;
    //     }
    //     @media (max-width:400px) {
    //         font-size: 35px;
    //         line-height: 35px;
    //     }
    // `

    // const Type = styled.div`
    //     font-size: 50px;
    //     line-height: 50px;
    //     color: #fff;
    //     text-transform: uppercase;
    //     @media (min-width:768px) {
    //         margin-left: 6px;
    //     }
    //     @media (max-width:767px) {
    //         margin-left: 2px;
    //     }
    //     @media (min-width:768px) and (max-width:1500px) {
    //         font-size: 23px;
    //         line-height: 20px;
    //     }
    //     @media (max-width:767px) {
    //         font-size: 20px;
    //         line-height: 20px;
    //     }
    //     span {
    //         font-family: Teko;
    //     }
    // `
    // const Content = styled.div`
    //     position: relative;
    //     z-index: 1
    // `

    // const Separator = styled.div`
    //     height: 5px;
    //     width: 50px;
    //     background-color: ${secondaryMain};
    //     margin-bottom: 30px;
    //     @media (min-width:768px) {
    //         margin-left: 6px;
    //     }
    //     @media (max-width:767px) {
    //         margin-left: 2px;
    //     }
    // `
    const Image = styled(GatsbyImage)`
        width: 100%;
        object-fit: cover;
        transition: .5s;
        height: 100vh;
        @media (max-width:500px) {
            height: 350px;
        }
        &:before {
            content:"";
            position: absolute;
            top:0;
            right:0;
            left:0;
            bottom:0;
            z-index:10;
            background: rgba(0, 0, 0, 0.5);
        }
    `

const HeroVideo = ({imageCarousel, ...props}) => {

    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const updateDimensions = () => {
        if (height !== window.innerHeight) {
            setHeight(window.innerHeight);
        }
        if (width !== window.innerWidth) {
            setWidth(window.innerWidth)
        }
    }

    useEffect(() => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight);
        window.addEventListener('resize', updateDimensions, {passive: true})
        return () => {
            window.removeEventListener('resize', updateDimensions, {passive: true})
        }
    }, [])
    
    // componentDidMount() { this.setState({height: window.innerHeight, width: window.innerWidth})
    //     window.addEventListener('resize', this.updateDimensions, {passive: true})
    // }
    
    // componentWillUnmount() {
    //     window.removeEventListener('resize', this.updateDimensions, {passive: true})
    // }


        

        // const BottomContent = styled.div`
        //     position: absolute;
        //     width: 100%;
        //     bottom: -14%;
        //     z-index: 2;
        //     @media (min-width:1025px) and (max-width: 1400px) {    
        //         bottom: -35%;
        //     }
        //     @media (max-width:767px) {
        //         position: relative;
        //         bottom: 0;
        //     } 
        //     @media (min-width:768px) and (max-width: 1023px) {    
        //         bottom: -25%;
        //     }
        // `

        // const ServiceCol = styled(Col)`
        //     padding: 0;
        //     border-right: #444;
        //     &.no-border {
        //         border-right: none;
        //     }
        //     @media (max-width:500px) {
        //         border-right:none;
        //     }
        // `

        // const Service = styled.div`
        //     min-height: 300px;
        //     background-color: #202c26;
        //     transition: .2s;
        //     display: flex;
        //     justify-content: center;
        //     flex-direction: column;
        //     &:hover {
        //         background-color: #40594b;
        //     }
        // `
        // const ServiceContent = styled.div`
        //     padding: 40px;
        //     color: #fff;
        //     p {
        //         font-size: 14px;
        //         font-weight: 300;
        //         color: #efefef;
        //     }
        // `
        // const ServiceHeading = styled.h4`
        //     font-size: 30px;
        //     font-weight: 400;
        //     font-family: ${i18n.locale === 'vi' ? 'Cuprum' : 'Teko'};
        //     `
        // const ServiceSeparator = styled.div`
        //     height: 5px;
        //     width: 50px;
        //     background-color: ${secondaryLight};
        //     margin-bottom: 10px;
        // `

        // const ServiceIcon = styled.div`
        //     margin-bottom: 20px;
        //     img {
        //         max-height: 70px;
        //         max-width: 50px;
        //         &:before {
        //             content:"";
        //             position: absolute;
        //             top:0;
        //             right:0;
        //             left:0;
        //             bottom:0;
        //             z-index:1;
        //             background: linear-gradient(180deg, rgba(46,61,53,1) 0%, rgba(32,43,40,0.7175245098039216) 64%);
        //         }
        //     }
        // `

        // const ServiceText = styled.p`
        //     font-size: 14px;
        //     font-weight: 300;
        //     color: #c5c5c5;
        //     font-family: ${i18n.locale === 'vi' ? 'Cuprum' : 'Teko'};
        // `
        return (
            <Section id="home">
                <VideoContainer style={{height: `${width > 500 ? height : 350}px`}}>
                    {/* <video autoPlay="autoplay" loop="loop" muted style={{height: `${this.state.width >= 1024 && this.state.width < 1200 ? "100%": "auto"}`}}>
                        <source src={LoopVideo} type="video/mp4" />
                    </video> */}
                    <Slider className="slider-img" {...settings}>
                        {imageCarousel?.nodes[0].images.map(imageData => {
                            return (
                                <Image alt="" key={imageData.id} image={imageData.gatsbyImageData} loading="lazy" />
                            )
                        })}
                    </Slider> 
                    {/* <Container>
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
                    </Container> */}
                </VideoContainer>
                {/* <BottomContent>
                        <Container>
                            <Row>
                                <ServiceCol md={6} style={{borderRight: this.state.width > 500 ? "1px solid #444" : "none"}}>
                                    <Service>
                                        <ServiceContent>
                                            <ServiceIcon>
                                                <img src={this.props.designIcon.childImageSharp.fluid.src} alt="design" />
                                            </ServiceIcon>
                                            <ServiceHeading><Trans>Design</Trans></ServiceHeading>
                                            <ServiceSeparator/>
                                            <ServiceText>
                                                Nhà phố, biệt thự, khách sạn và các thể loại kiến trúc khác như cafe, văn phòng, bệnh viện ...
                                            </ServiceText>
                                        </ServiceContent>
                                    </Service>
                                </ServiceCol>
                                <ServiceCol md={6} style={{borderRight: this.state.width > 500 ? "1px solid #444" : "none"}}>
                                    <Service>
                                        <ServiceContent>
                                            <ServiceIcon>
                                                    <img src={this.props.interiorIcon.childImageSharp.fluid.src} alt="interior" />
                                            </ServiceIcon>
                                            <ServiceHeading><Trans>Interior</Trans></ServiceHeading>
                                            <ServiceSeparator/>
                                            <ServiceText>
                                                Phong cách hiện đại, phong cách Bắc Âu, phong cách tối giản, phong cách công nghiệp, phong cách Đông dương, phong cách bán cổ điển, phong cách cổ điển
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
                                </ServiceCol> 
                            </Row>
                        </Container>
                </BottomContent> */}
            </Section>
        )
    }

export default HeroVideo;

// export default props => (
//     <StaticQuery
//       query={graphql`
//       query {
//         background: file(relativePath: {eq: "background-poly.jpg"}) {
//           childImageSharp {
//             fluid(maxWidth: 2000, quality: 100) {
//               src
//             }
//           }
//         }
//         designIcon: file(relativePath: {eq: "icons/designIcon.png"}) {
//           childImageSharp {
//             fluid(maxWidth: 500) {
//               src
//             }
//           }
//         }
//         interiorIcon: file(relativePath: {eq: "icons/interiorIcon.png"}) {
//           childImageSharp {
//             fluid(maxWidth: 500) {
//               src
//             }
//           }
//         }
//         seoIcon: file(relativePath: {eq: "icons/seo.png"}) {
//           childImageSharp {
//             fluid(maxWidth: 500) {
//               src
//             }
//           }
//         }
//       }
//       `}
//       render={({ 
//         background, 
//         designIcon, 
//         interiorIcon, 
//         seoIcon}) => <HeroVideo  
//         background={background} 
//         designIcon={designIcon} 
//         interiorIcon={interiorIcon} 
//         seoIcon={seoIcon}
//         {...props} />}
//     />
//   )