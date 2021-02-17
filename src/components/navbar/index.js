import React from 'react'
import styled, { css } from 'styled-components'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { primaryMain, primaryLight, secondaryLight, secondaryMain, primaryContrast } from '../../constants/color'
// import { i18n } from '@lingui/core'
import '@trendmicro/react-dropdown/dist/react-dropdown.css';
import {StaticQuery} from 'gatsby';
import sizeMe from 'react-sizeme';
import Dropdown, {
    DropdownToggle,
    DropdownMenu,
    DropdownMenuWrapper,
    MenuItem,
} from '@trendmicro/react-dropdown';
import { Accordion, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
var scrollToElement = require('scroll-to-element')

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          collapse: false,
          sticky: false,
          sections: this.props.sections
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, { passive: true })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (window.pageYOffset >= 50 && this.state.sticky) {
            if (this.state.collapse !== nextState.collapse) {
                return true
            }
            return false
        } else {
            return true
        }
    }

    handleScroll = event => {
        if (window.pageYOffset >= 50) {
            this.setState({ sticky: true })
        } else {
            this.setState({ sticky: false })
        }
    }

    collapseNav() {
        console.log(this.state, 'col')
        if (!this.state.collapse) {
            this.setState({ collapse: true })
        } else {
            this.setState({ collapse: false })
        }
    }
    

    render() {

        const NavbarWrapper = styled.div`
            position: absolute;
            z-index: 1;
            width: 100%;
            padding: 20px 0;
            z-index: 100;
            &.sticky {
                position: fixed;
                background-color: ${primaryMain};
                padding: 0 0;
                @media (max-width: 500px) {
                    padding: 20px 0;
                }
            }
        `

        const NavbarContainer = styled(Container)`
            display: flex;
            position: relative;
            @media (max-width: 500px) {
                display: block;
                padding: 0;
            }
            
        `

        const Nav = styled.nav`
            flex: 0 0 80%;
            max-width: 80%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            @media (max-width: 500px) {
                flex: 0 0 100%;
                max-width: 100%;
                justify-content: center;
                background-color: rgba(0,0,0,.8);
                margin-top: 20px;
                &.hidden_mobile {
                    display: none;
                }
            }
        `

        const LogoWrapper = styled.div`
            flex: 0 0 20%;
            max-width: 20%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            @media (max-width: 500px) {
                flex: 0 0 100%;
                max-width: 100%;
                justify-content: center;
            }
        `

        const Logo = styled.img`
            height: 40px;
            @media (max-width: 1023px) {
                height: 30px;
            }
        `

        const NavInner = styled.div`
            justify-content: flex-end;
        `

        const Toggler = styled.button`
            color: #fff;
            position: absolute;
            right: 0;
            top: 0;
            @media (min-width: 500px) {
                display: none;
            }
        `
        
        
        return(
            <NavbarWrapper className={`header${this.state.sticky === true ? ' sticky' : ''}`}>
                <NavbarContainer>
                    <LogoWrapper className="logo">
                        <Logo src="/img/logo.png" alt="logo" />
                    </LogoWrapper>
                    <Toggler
                        onClick={() => this.collapseNav()}
                        className="navbar-toggler navbar-toggler-right"
                    >
                        <FontAwesomeIcon icon={faBars} className="bars" />
                    </Toggler>
                    <Nav className={`navbar navbar-expand-sm ${this.state.collapse === true ? 'expand' : 'hidden_mobile'}`}>
                        <NavInner className={`navbar-collapse collapse ${this.state.collapse === true ? 'show' : ''}`}>
                            <div className="navbar-nav">{this.navItems(this.props.size.width)}</div>
                        </NavInner>
                    </Nav>
                </NavbarContainer>
            </NavbarWrapper>
        )
    }

    navigate(id) {
        if (this.props.scroll) {
            const el = document.getElementById(id)
            scrollToElement(el, {
                offset: 0,
                ease: 'in-out-expo',
                duration: 2000
            })
        } else {
            window.location.href = `./#${id}`;
        }
    }

    navItems(width) {
        const NavItem = styled.button`
            background: none;
            border: none;
            color: #fff;
            text-transform: capitalize;
            font-weight: 500;
            margin: 10px 5px;
            transition: .5s;
            &:hover {
                color: ${secondaryLight};
            }
            &:focus {
                outline: none;
            }
            @media (min-width: 501px) and (max-width: 1023px) {
                font-size: 11px;
                margin: 2px;
            }
            
        `
        const baseDropdown = css`
            display: inline-flex;
            align-items: center;
            text-transform: capitalize;
            font-weight: 500;
            color: #fff;
            transition: .5s;
            cursor: pointer;
            
            @media (min-width: 501px) and (max-width: 1023px) {
                font-size: 11px;
                margin: 2px;
            }

        `;

        const StyleDropdown = styled(Dropdown)`
           ${baseDropdown} 
            &:hover {
             color: ${secondaryLight};
            }
            &:focus {
                outline: none;
            }
           margin: 10px 5px;
           @media (max-width: 500px) {
                margin: 0 auto;
           }
        `;

        const StyleDropdownMenuWrapper = styled(DropdownMenuWrapper)`
            white-space: nowrap;
            border: none;
            overflow: hidden;
            border-radius: 12px;
            padding: 32px 24px;
            opacity: 0.7;
            .borderLeft {
                border-left: 1px solid #fff !important;
            } 
            background-color: ${primaryLight};
        `;

        const StyleDropdownMenu = styled(DropdownMenu)`
            background-color: ${primaryLight};
            .headerItem {
                color: #fff;
                font-weight: bold;
                font-size: 1.1rem;
                transform: translateY(6px);
            }
        `;
        
        const StyleMenuItem = styled(MenuItem)`
            font-size: 1.0rem;
            padding-top: 6px;
            padding-bottom: 6px;
            & > div {
                color: ${secondaryMain} !important;

                &:hover {
                    color: ${primaryMain} !important;
                    background-color: ${secondaryLight} !important;
                }
                &:focus {
                    color: ${primaryMain} !important;
                    background-color: ${secondaryLight} !important;
                }
                transition: 0.3s;
            };
        `;

        const StyleAccordion = styled(Accordion)`
            ${baseDropdown}
            .itemName {
                margin: 0;
                text-align: center;
            }
            .accordion-card {
                background-color: transparent;
                width: 100%
            }
        `;
        const AccordionTitle = styled.p`
            color: #fff;
            font-size: 1.0rem;
            text-align: left;
            margin-bottom: 4px;
        `;
        const StyleListGroupItem = styled(ListGroupItem)`
            background-color: ${secondaryMain};
        `;

        const AccordionDropdown = () => {
            return (
                <StyleAccordion>
                    <Card className="accordion-card">
                        {/* <Card.Header className="cardHeader"> */}
                            <Accordion.Toggle className="itemName" as={"p"} eventKey="0">
                                Click me!▼ 
                            </Accordion.Toggle>                        
                        {/* </Card.Header> */}
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <AccordionTitle>Dự án</AccordionTitle>
                                <ListGroup className="listGroup" variant="flush">
                                    <StyleListGroupItem>Cras justo odio</StyleListGroupItem>
                                    <StyleListGroupItem>Dapibus ac facilisis in</StyleListGroupItem>
                                    <StyleListGroupItem>Morbi leo risus</StyleListGroupItem>
                                    <StyleListGroupItem>Porta ac consectetur ac</StyleListGroupItem>
                                </ListGroup>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </StyleAccordion>
            );
        }

        const NavDropdown = () => { 
            return (
            <StyleDropdown
                autoOpen
            >
                <DropdownToggle style={{marginBottom: 0}} componentClass={"p"} title="Dự án" />
                <StyleDropdownMenuWrapper>
                    <StyleDropdownMenu key={300}>
                        <StyleMenuItem className="headerItem" header>Dự án</StyleMenuItem>
                        <StyleMenuItem>
                            Menu item one1
                        </StyleMenuItem>
                        <StyleMenuItem>
                            Menu item two1
                        </StyleMenuItem>
                        <StyleMenuItem>
                            Menu item three1
                        </StyleMenuItem>
                    </StyleDropdownMenu>
                    <StyleDropdownMenu className="borderLeft" key={301}>
                        <StyleMenuItem className="headerItem" header>Thư viện</StyleMenuItem>
                        <StyleMenuItem>
                            Menu item one1
                        </StyleMenuItem>
                        <StyleMenuItem>
                            Menu item two1
                        </StyleMenuItem>
                        <StyleMenuItem>
                            Menu item three1
                        </StyleMenuItem>
                    </StyleDropdownMenu>
                    <StyleDropdownMenu className="borderLeft" key={302}>
                        <StyleMenuItem className="headerItem" header>Thư viện*</StyleMenuItem>
                        <StyleMenuItem>
                            Menu item one1
                        </StyleMenuItem>
                        <StyleMenuItem>
                            Menu item two1
                        </StyleMenuItem>
                        <StyleMenuItem>
                            Menu item three1
                        </StyleMenuItem>
                    </StyleDropdownMenu>
                </StyleDropdownMenuWrapper>
            </StyleDropdown>
            );
        }
        
        return this.state.sections.map((item, index) => {
            console.log(width)
            if (item.isDropdown)
                return width <= 500 ? <AccordionDropdown /> : <NavDropdown />;
            return (
                <NavItem key={item.id} onClick={() => this.navigate(item.id)}>
                    {item.display}
                </NavItem>
            )
        })
    }
}

export default sizeMe()(props => (
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
      }`}
      render={({background}) => <Navbar background={background} {...props} />} 
    />
))