import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import { Trans } from "@lingui/macro";
import AnimationContainer from 'components/animation-container'
// import ContactCreativeForm from './parts/ContactCreativeForm.js'
import { primaryLight, primaryMain, secondaryMain } from '../../constants/color.js'
import { i18n } from "@lingui/core";
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';


class ContactCreative extends React.Component {


    render() {

        const Section = styled.section`
            position: relative;
            overflow: hidden;
            background-color: #48614e;
            padding: 100px 0;
        `

        const FormRow = styled(Row)`
           background-color: #111;
        `

        const ContactCol = styled(Col)`
            min-height: 600px;
            max-height: 600px;
            padding: 0;
            display: flex;
            align-items: center;
        `

        const GoogleMap = styled(Map)`
            border: none;
            height: 100%;
            width: 100%;
        `

        const IconRow = styled(Row)`
            margin-top: 150px;
        `

        const IconCol = styled(Col)`
            @media (max-width: 500px) {
              margin-bottom: 140px;
            }
        `

        const IconContainer = styled.div`
            width: 150px;
            height: 150px;
            margin: auto;
            padding: 35px;
            text-align: center;
            position: relative;
            bottom: 75px;
            background-color: ${primaryLight};
            border-radius: 150px;
            transition: .5s;
        `
        
        const InfoPart = styled.div`
            min-height: 250px;
            background-color: ${primaryMain};
            border: 2px solid #444;
            &:hover ${IconContainer} {
              background-color: ${primaryLight};
            }
        `
        const Icon = styled.img`
            height: 70px;
            width: 70px;
            object-fit: contain;
        `

        const InfoTitle = styled.h4`
            font-size: 35px;
            color: #fff;
            font-family: ${i18n.locale === 'vi' ? 'Cuprum' : 'Teko'};  
            text-align: center;
        `

        const Info = styled.div`
            position: relative;
            bottom: 30px;
        `

        const InfoLinkContainer = styled.div`
            text-align: center;
        `

        const InfoLink = styled.a`
            color: ${secondaryMain};
            transition: .5s;
            &:hover {
              color: #fff;
              text-decoration: none;
            }
        `
        return(
            <Section id="contact">
                <Container>
                  <AnimationContainer animation="fadeIn">
                    <FormRow>
                      {/* <ContactCol md={6}>
                          <ContactCreativeForm />
                      </ContactCol> */}
                      <ContactCol md={12}>
                        {/* <Map  
                          title="map"
                          width="600" height="450" frameborder="0" allowfullscreen="" aria-hidden="false"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31429.559203594734!2d105.73072353063965!3d10.042015803758332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0886be6036a11%3A0xd38a4c0e493a689c!2zMTM5IMSQxrDhu51uZyBz4buRIDMwLCBQaMaw4budbmcgQW4gS2jDoW5oLCBOaW5oIEtp4buBdSwgQ-G6p24gVGjGoSwgVmlldG5hbQ!5e0!3m2!1sen!2sus!4v1614700386230!5m2!1sen!2sus"/> */}
                          <GoogleMap google={this.props.google} zoom={14} 
                           initialCenter={{
                            lat: 10.038797436522938,
                            lng: 105.75326236849821
                          }}
                          >
                            <Marker onClick={this.onMarkerClick}
                              name={'Do design'} />
                            {/* <InfoWindow onClose={this.onInfoWindowClose}>
                                <div>
                                  <h1>{this.state.selectedPlace.name}</h1>
                                </div>
                            </InfoWindow> */}
                          </GoogleMap>
                      </ContactCol>
                    </FormRow>
                  </AnimationContainer>
                  <IconRow>
                      <IconCol md={4}>
                        <AnimationContainer animation="fadeIn" delay={500}>
                          <InfoPart>
                            <IconContainer>
                                <Icon src={this.props.emailIcon.childImageSharp.fluid.src} alt="email" />
                            </IconContainer>
                            <Info>
                              <InfoTitle>
                                Email
                              </InfoTitle>
                              <InfoLinkContainer>
                                <InfoLink href="mailto:dodesign3939@gmail.com">
                                dodesign3939@gmail.com
                                </InfoLink>
                              </InfoLinkContainer>
                            </Info>
                          </InfoPart>
                        </AnimationContainer>
                      </IconCol>
                      <IconCol md={4}>
                        <AnimationContainer animation="fadeIn" delay={1000}>
                          <InfoPart>
                            <IconContainer>
                              <Icon src={this.props.phoneIcon.childImageSharp.fluid.src} alt="phone" />
                            </IconContainer>
                            <Info>
                              <InfoTitle>
                                <Trans>Điện thoại</Trans>
                              </InfoTitle>
                              <InfoLinkContainer>
                                <InfoLink href="tel:+(84)945-076-768">
                                  (84) 945076768
                                </InfoLink>
                              </InfoLinkContainer>
                            </Info>
                          </InfoPart>
                        </AnimationContainer>
                      </IconCol>
                      <IconCol md={4}>
                        <AnimationContainer animation="fadeIn" delay={1500}>
                          <InfoPart>
                            <IconContainer>
                              <Icon src={this.props.mapIcon.childImageSharp.fluid.src} alt="map" />
                            </IconContainer>
                            <Info>
                              <InfoTitle>
                                <Trans>Địa chỉ</Trans>
                              </InfoTitle>
                              <InfoLinkContainer>
                                <InfoLink target="_blank" href="https://goo.gl/maps/nz7N4RuXXSQWUocS8">
                                  139 đường số 30, phường An Khánh, Quận Ninh Kiều, Cần thơ, Việt nam
                                </InfoLink>
                              </InfoLinkContainer>
                            </Info>
                          </InfoPart>
                        </AnimationContainer>
                      </IconCol>
                  </IconRow>
                </Container>
            </Section>
        )
    }

}

export default GoogleApiWrapper({
  apiKey: process.env.GATSBY_API_KEY,
})(props => (
  <StaticQuery
    query={graphql`
    query {
      emailIcon: file(relativePath: {eq: "icons/email.png"}) {
        childImageSharp {
          fluid(maxWidth: 500) {
            src
          }
        }
      }
      mapIcon: file(relativePath: {eq: "icons/map.png"}) {
        childImageSharp {
          fluid(maxWidth: 500) {
            src
          }
        }
      }
      phoneIcon: file(relativePath: {eq: "icons/phone.png"}) {
        childImageSharp {
          fluid(maxWidth: 500) {
            src
          }
        }
      }
    }
    `}
    render={({ 
      emailIcon, 
      mapIcon, 
      phoneIcon}) => <ContactCreative  
      emailIcon={emailIcon} 
      mapIcon={mapIcon} 
      phoneIcon={phoneIcon}
      {...props} />}
  />
))