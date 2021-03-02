import React, {useEffect, useState, useContext} from 'react'
import styled, { css } from 'styled-components'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { primaryMain, primaryLight, secondaryLight, secondaryMain } from '../../constants/color'
// import { i18n } from '@lingui/core'
import '@trendmicro/react-dropdown/dist/react-dropdown.css';
import { Link } from 'gatsby'
import { useLocation } from '@reach/router';
import sizeMe from 'react-sizeme';
import Dropdown, {
    DropdownToggle,
    DropdownMenu,
    DropdownMenuWrapper,
    MenuItem,
} from '@trendmicro/react-dropdown';
import { Accordion, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import {LayoutContext} from '../../context/LayoutContext';
var scrollToElement = require('scroll-to-element')


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



const Navbar = (props) => {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //       collapse: false,
    //       sticky: false,
    //       sections: this.props.sections
    //     }
    // }
    const contextLayout = useContext(LayoutContext);
    const [collapse, setCollapse] = useState(false)
    const [sticky, setSticky] = useState(false)


    const handleScroll = event => {
        if (window.pageYOffset >= 50) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    }
    // componentDidMount and unMount
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        //componentWillUnmount 
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    // componentDidMount() {
    //     window.addEventListener('scroll', this.handleScroll, { passive: true })
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll)
    // }

    // should update
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (window.pageYOffset >= 50 && this.state.sticky) {
    //         if (this.state.collapse !== nextState.collapse) {
    //             return true
    //         }
    //         return false
    //     } else {
    //         return true
    //     }
    // }

    

    const collapseNav = () => {
        setCollapse(!collapse);
    }
    
    const location = useLocation();
    // Scroll helper
    const scrollTo = (elementId) => {
        const el = document.getElementById(elementId)
        scrollToElement(el, {
            offset: 0,
            ease: 'in-out-expo',
            duration: 2000
        })
    }
    // const navigate_action = useNavigate();
    const navigate = (id) => () => {
        if (location.pathname === "/") {
            scrollTo(id); 
        } else {
            // Count the slash character
            const count = location.pathname.split('/').length - 1;
            // Dựa theo số lượng slash, sẽ biết đường dẫn đang ở mấy cấp, dựa vào đó để trở về lại trang chủ, bằng cách nối (n-1() lần "../"  
            let href = "";
            for (let index = 1; index < count; index++) {
               href += "../"
            }
            window.location.href = `${href}#${id}`;
            // navigate_action(`${href}#${id}`);
        }
    }

    useEffect(() => {
        if (location && location.pathname === "/" && location.hash !== "") {
            scrollTo(location.hash.replace('#', ""));
        }
    }, [location])

        
    const navItems = () => {
        // Static items first
        const listItemRendered = props.sections.map((item, index) => 
            <NavItem key={item.id} onClick={navigate(item.id)}>
                {item.display}
            </NavItem>
        );
        // Navigation item from Contentful
        // const listItemFromServer = props.dynamicSections.map(edge => {
        //     if(props.size.width <= 500)
        //         return <AccordionDropdown key={edge.node.id} data={edge.node} />
        //     else
        //         return <NavDropdown key={`${edge.node.id}nav-dropdown`} data={edge.node} />
        // })
        const listItemFromServer = contextLayout.dynamicSections.map(edge => {
            if(props.size.width <= 500)
                return <AccordionDropdown key={edge.node.id} data={edge.node} />
            else
                return <NavDropdown key={`${edge.node.id}nav-dropdown`} data={edge.node} />
        })
        return listItemFromServer.concat(listItemRendered);
    }

    /**
     * Query static data
     */
    // const staticData = useStaticQuery(graphql`
    //     query {
    //         background: file(relativePath: {eq: "background-poly.jpg"}) {
    //             childImageSharp {
    //                 fluid(maxWidth: 2000, quality: 100) {
    //                 src
    //             }
    //         }
    //     }
    // }`)
    
    return (
        <NavbarWrapper className={`header${sticky === true ? ' sticky' : ''}`}>
            <NavbarContainer>
                <LogoWrapper className="logo">
                    <Link to="/">
                        <Logo src="/img/logo.png" alt="logo" />
                    </Link>
                </LogoWrapper>
                <Toggler
                    onClick={() => collapseNav()}
                    className="navbar-toggler navbar-toggler-right"
                >
                    <FontAwesomeIcon icon={faBars} className="bars" />
                </Toggler>
                <Nav className={`navbar navbar-expand-sm ${collapse === true ? 'expand' : 'hidden_mobile'}`}>
                    <NavInner className={`navbar-collapse collapse ${collapse === true ? 'show' : ''}`}>
                        <div className="navbar-nav">{navItems()}</div>
                    </NavInner>
                </Nav>
            </NavbarContainer>
        </NavbarWrapper>
    )

        
    // return this.state.sections.map((item, index) => {
    //     if (item.isDropdown)
    //     {
    //         return width <= 500 ?  : <NavDropdown />;
    //     }
    //     else 
    //     {
    //         return (
    //             <NavItem key={item.id} onClick={() => this.navigate(item.id)}>
    //                 {item.display}
    //             </NavItem>
    //         )
    //     }
            
    // })

    
};

export default sizeMe()(Navbar);

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
    padding: 24px 16px;
    opacity: 0.9;
    .borderLeft {
        border-left: 1px solid #fff !important;
    } 
    background-color: ${primaryLight};
    @media (min-width: 500px) and (max-width: 1280px) {
        padding: 12px 8px;
    } 
`;

const StyleDropdownMenu = styled(DropdownMenu)`
    background-color: ${primaryLight};
    .headerItem {
        color: #fff;
        font-weight: bold;
        font-size: 1.1rem;
        transform: translateY(6px);
        @media (min-width: 500px) and (max-width: 1280px) {
            font-size: 0.7rem;
        } 
    }
    @media (min-width: 500px) and (max-width: 1280px) {
        padding: 0;
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
    @media (min-width: 500px) and (max-width: 1280px) {
        font-size: 0.7rem;
        & > div {
            line-height: 8px !important;
        }
    } 
`;

const StyleLink = styled(Link)`
    &:hover {
        text-decoration: none;
        color: transparent;
    }
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

const AccordionDropdown = ({data, ...props}) => {
    return (
        <StyleAccordion {...props}>
            <Card className="accordion-card">
                {/* <Card.Header className="cardHeader"> */}
                    <Accordion.Toggle className="itemName" as={"p"} eventKey="0">
                        {data.navigationTitle} ▼ 
                    </Accordion.Toggle>                        
                {/* </Card.Header> */}
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {/* 
                        <ListGroup className="listGroup" variant="flush">
                            <StyleListGroupItem>Cras justo odio</StyleListGroupItem>
                            <StyleListGroupItem>Dapibus ac facilisis in</StyleListGroupItem>
                            <StyleListGroupItem>Morbi leo risus</StyleListGroupItem>
                            <StyleListGroupItem>Porta ac consectetur ac</StyleListGroupItem>
                        </ListGroup> */}
                        {data.categoryNestedList.map(category => {
                            return (
                                <>
                                    <AccordionTitle>{category.name}</AccordionTitle>
                                    {/* All children of this category */}
                                    {category.category.length > 0 && 
                                        category.category.map(childCategory => 
                                           <StyleListGroupItem action href={`/blog/${childCategory.slug}`} key={childCategory.id}>{childCategory.name}</StyleListGroupItem>
                                        )
                                    }
                                </>
                            )
                        })}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </StyleAccordion>
    );
}

const NavDropdown = ({data, ...props}) => { 
    return (
    <StyleDropdown
        {...props}
        autoOpen
    >
        <DropdownToggle style={{marginBottom: 0}} componentClass={"p"} title={data.navigationTitle} />
        <StyleDropdownMenuWrapper>
            {data.categoryNestedList.map(category => {
                return (
                    <StyleDropdownMenu key={category.id}>
                        <StyleMenuItem className="headerItem" header>{category.name}</StyleMenuItem>
                        {category.category.length > 0 && category.category.map(childCategory =>
                            <StyleLink key={childCategory.id} to={`/blog/${childCategory.slug}`}>
                                <StyleMenuItem href={`/blog/${childCategory.slug}`} id={childCategory.id}>
                                    {childCategory.name}
                                </StyleMenuItem>
                            </StyleLink>
                        )}
                    </StyleDropdownMenu>
                )
            })}
            
            {/* <StyleDropdownMenu className="borderLeft" key={301}>
                <StyleMenuItem className="headerItem" header>Thư viện</StyleMenuItem>
                <StyleMenuItem>
                    Phòng khách
                </StyleMenuItem>
                <StyleMenuItem>
                    Bếp, phòng ăn
                </StyleMenuItem>
                <StyleMenuItem>
                    Phòng ngủ
                </StyleMenuItem>
            </StyleDropdownMenu>
            <StyleDropdownMenu className="borderLeft" key={302}>
                <StyleMenuItem className="headerItem" header>Thư viện*</StyleMenuItem>
                <StyleMenuItem>
                    Mẫu tham khảo
                </StyleMenuItem>
            </StyleDropdownMenu> */}
        </StyleDropdownMenuWrapper>
    </StyleDropdown>
    );
}

