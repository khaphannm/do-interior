import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { DropdownButton as BootDropdown } from 'react-bootstrap';
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { secondaryMain } from '../../constants/color'

class Footer extends React.Component{

    // handleSelectLanguage = async (eventKey, event) => {
    //     await dynamicActivate(eventKey);
    // }

    render() {
        const FooterMain = styled.div`
            background-color: #111;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        `

        const SocialIcons = styled.div`
            .social_icon {
                font-size: 15px;
                color: #555;
                margin: 0 5px;
                cursor: pointer;
                transition: .5s;
                &:hover {
                    color: ${secondaryMain};
                }
            }
        `
        // const LanguageZone = styled.div`
        //     position: absolute;
        //     right: 2%;
        //     bottom: 12%;
        // `
        // const DropdownButton = styled(BootDropdown)`
        //     width: 100px;
        //     & > .btn {
        //         border-radius: 24px;
        //         background-color: #111;
        //         border: 1px solid #fff;
        //     }
        //     & .dropdown-item {
        //         &:active {
        //             background-color:${secondaryMain}; 
        //         }
        //     }
        // `
        return (
            <FooterMain>
                <SocialIcons>
                    <FontAwesomeIcon icon={faFacebook} className="social_icon" onClick={() => window.open(`https://www.facebook.com/${process.env.GATSBY_FACEBOOK_PAGE}`)}/>
                    {/* <FontAwesomeIcon icon={faTwitter} className="social_icon" onClick={() => window.open('https://www.twitter.com')} /> */}
                    <FontAwesomeIcon icon={faYoutube} className="social_icon" onClick={() => window.open(`https://www.youtube.com/${process.env.GATSBY_YOUTUBE_PAGE}`)} />
                    {/* <FontAwesomeIcon icon={faLinkedin} className="social_icon" onClick={() => window.open('https://www.linkedin.com')} /> */}
                </SocialIcons>
                {/* <LanguageZone>
                    <DropdownButton
                        onSelect={this.handleSelectLanguage}
                        title={i18n._(t`Ngôn ngữ`)}
                        id="dropdown-menu-align-right"
                        variant="secondary"
                    >
                        <Dropdown.Item eventKey="vi"><Trans>Việt nam</Trans></Dropdown.Item>
                        <Dropdown.Item eventKey="en"><Trans>Tiếng anh</Trans></Dropdown.Item>
                    </DropdownButton>
                </LanguageZone> */}
            </FooterMain>
        )
    }
}
export default Footer