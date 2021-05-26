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
import { Accordion, Card, ListGroupItem } from 'react-bootstrap';
import {LayoutContext} from '../../context/LayoutContext';
import { getDynamicCategory } from '../../utils/localStorage'
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

const TextLogo = styled.h2`
    font-size: 1.8rem;
    color: #fff;
    font-weight: 700;
    margin-bottom: 0;
    text-transform: uppercase;
    background: -webkit-linear-gradient(180deg, rgba(168,149,89,1) 0%, rgba(255,247,195,1) 64%);
    background: -o-linear-gradient(180deg, rgba(168,149,89,1) 0%, rgba(255,247,195,1) 64%);
    background: -moz-linear-gradient(180deg, rgba(168,149,89,1) 0%, rgba(255,247,195,1) 64%);
    background: linear-gradient(180deg, rgba(168,149,89,1) 0%, rgba(255,247,195,1) 64%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    @media (max-width:767px) {
        font-size: 1.0rem;
    }
    @media (min-width:768px) and (max-width:1500px) {
        font-size: 1.3rem;
    }
    @media (max-width:400px) {
        font-size: 1.6rem;
        line-height: 35px;
    }
`

// const Logo = styled.img`
//     height: 40px;
//     @media (max-width: 1023px) {
//         height: 30px;
//     }
// `

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

        //componentWillUnmount 1
        return () => {
            window.removeEventListener('scroll', handleScroll, {passive: true})
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
        const listDynamicSections = !getDynamicCategory() ? contextLayout.dynamicSections : JSON.parse(getDynamicCategory());
        const listItemFromServer = listDynamicSections.map(edge => {
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
                    <TextLogo>DO DESIGN</TextLogo>
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
    @media (min-width: 501px) and (max-width: 770px) {
        font-size: 7px;
        margin: -0.5px;
    }
    @media (min-width: 771px) and (max-width: 1023px) {
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
    
    @media (min-width: 501px) and (max-width: 770px) {
        font-size: 7px;
        margin: -0.5px;
    }
    @media (min-width: 771px) and (max-width: 1023px) {
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
    .borderRight {
        border-right: 1px solid #fff !important;
        margin-right: 0.6rem;
        padding-right: 0.6rem;
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
        transform: translate(6px, 6px);
        padding-left: 0;
        @media (min-width: 500px) and (max-width: 1280px) {
            font-size: 0.7rem;
        } 
    }
    .headerSubItem {
        color: ${secondaryLight};
        font-weight: bold;
        font-size: 1rem;
        transform: translateY(4px);
        padding-left: 0;
        @media (min-width: 500px) and (max-width: 1280px) {
            font-size: 0.6rem;
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
        text-decoration: none;
        color: #ffffff;
    }
    .accordion-card {
        background-color: transparent;
        width: 100%;
        max-height: 700px;
        overflow: auto;
    }
    .headerItem {
        color: #ffffff;
        text-align: center;
        text-decoration: underline;
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
                    <Accordion.Toggle className="itemName" as={"a"} href={data.navigationTitle === 'Dự án' ? "/blog/all-projects" : ""} eventKey="0">
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
                        {data.categoryNestedList && data.categoryNestedList.map(category => {
                            return (
                                <React.Fragment key={category.id}>
                                    <AccordionTitle>{category.name}</AccordionTitle>
                                    {/* All children of this category */}
                                    {category.category.length > 0 && 
                                        category.category.map(childCategory => 
                                            <React.Fragment key={childCategory.id}>
                                                <StyleListGroupItem className={childCategory.category ? 'headerItem' : ''} action href={`/blog/${childCategory.slug}`} key={childCategory.id}>{childCategory.name}</StyleListGroupItem>
                                                {(childCategory.category && childCategory.category.length > 0) && childCategory.category.map(grandChildCategory => 
                                                    <StyleListGroupItem
                                                        action href={`/blog/${grandChildCategory.slug}`} 
                                                        key={grandChildCategory.id}
                                                    >
                                                            {grandChildCategory.name}
                                                    </StyleListGroupItem>
                                                )}
                                            </React.Fragment>
                                        )
                                    }
                                </React.Fragment>
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
        <DropdownToggle style={{marginBottom: 0, textDecoration: 'none', color: '#ffffff'}} href={data.navigationTitle === 'Dự án' ? "/blog/all-projects" : ""} componentClass={"a"} title={data.navigationTitle} />
        {data.categoryNestedList && 
            <StyleDropdownMenuWrapper>
                {data.categoryNestedList.map((category, index) => {
                    return (
                        <StyleDropdownMenu className={index !== data.categoryNestedList.length - 1 ? 'borderRight' : ""} key={category.id}>
                            {/* Support max 2 level nested */}
                            <StyleMenuItem className="headerItem" header>{category.name}</StyleMenuItem>
                            {category.category.length > 0 && category.category.map(childCategory =>
                                <React.Fragment key={childCategory.id}>
                                    <StyleLink to={`/blog/${childCategory.slug}`}>
                                        <StyleMenuItem className={childCategory.category ? 'headerSubItem' : ''} header={childCategory.category ? true : false} href={`/blog/${childCategory.slug}`} id={childCategory.id}>
                                            {childCategory.name}
                                        </StyleMenuItem>
                                    </StyleLink>
                                    {(childCategory.category && childCategory.category.length > 0) && childCategory.category.map(grandChildCategory =>
                                        <StyleLink key={grandChildCategory.id} to={`/blog/${grandChildCategory.slug}`}>
                                            <StyleMenuItem href={`/blog/${grandChildCategory.slug}`} id={grandChildCategory.id}>
                                                {grandChildCategory.name}
                                            </StyleMenuItem> 
                                        </StyleLink>
                                    )}
                                </React.Fragment>
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
        }
    </StyleDropdown>
    );
}

