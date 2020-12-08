import React from 'react'
import styled, {keyframes, css} from 'styled-components';
import Tilt from 'react-tilt';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { primaryContrast, primaryMain, secondaryMain } from '../../../constants/color';

const MoveUp = keyframes`
    0% { transform: translateY(0); }
    100% { transform: translateY(-20px); }
        `;

const MoveDown = keyframes`
    0% { transform: translateY(0); }
    100% { transform: translateY(20px); }
    `;

const PricingItem = styled.div`
    background-color: #ffffff;
    min-height: 850px;
    max-height: 850px;
    @media (max-width:1500px) {
        min-height: 650px;
        max-height: 650px;
    }
    @media (max-width:1500px) {
        min-height: 550px;
        max-height: 550px;
    }
    overflow: hidden;
    max-width: 95%;
    margin: 40px auto;
    border-radius: 16px;
    &.move-up {
        animation: ${MoveUp} 5s infinite alternate;
    }
    &.move-down {
        animation: ${MoveDown} 5s infinite alternate;
    }
`;
const Container = styled.div`
    min-height: 640px;
    max-height: 640px;
    @media (max-width:1500px) {
        min-height: 460px;
        max-height: 460px;
    }
    @media (max-width:1024px) {
        min-height: 400px;
        max-height: 400px;
    }
`;
const TextContainer = styled.div`
    padding: 0 1rem;
    @media (max-width:1500px) {
        padding: 0 .5rem;
    }
    @media (max-width:1024px) {
        padding: 0 .3rem;
    }
    width: 100%;
    text-align: center;
`;
const Text = styled.p`
    font-size: 14px;
    font-weight: 300;
    @media (max-width:1500px) {
        font-size: 12px;
        margin-bottom: .2rem;
    }
    @media (max-width:1024px) {
        font-size: 12px;
        margin-bottom: .2rem;
    }
    
    ${props => {
        if(props.noMargin)
            return css`margin: 0;`;
        else if(props.marginLeft)
            return css`margin-left: 8px;`;

        if(props.light)
            return css`color: #fff;`;
        else
            return css`color: #4e616c;`
    }}
`;
const HeadingContainer = styled.div`
    background-color: #e1eae8;
    text-align: center;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    @media (max-width:1500px) {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    @media (max-width:1024px) {
        padding-top: .6rem;
        padding-bottom: .6rem;
    }
`;
const Heading = styled.h4`
    color: ${primaryMain};
    font-weight: 600;
    font-size: 25px;
    @media (max-width:1500px) {
        font-size: 20px;
    }
    @media (max-width:1024px) {
        font-size: 18px;
    }
    text-transform: uppercase;
    margin-bottom: 0px;
    font-family: sans-serif;
`;
const PriceContainer = styled.div`
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    @media (max-width:1024px) {
        padding-top: .6rem;
        padding-bottom: .6rem;
    }
`;

const NormalPriceContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    @media (max-width:1500px) {
        padding-top: .5rem;
        padding-bottom: .5rem;
    }
    @media (max-width:1024px) {
        padding-top: .3rem;
        padding-bottom: .3rem;
    } 
`
const MainPriceText = styled.h2`
    color: #fff;
    background: rgb(255,254,195);
    background: linear-gradient(10deg, rgba(255,254,195,1) 0%, rgba(168,149,89,1) 50%, rgba(255,254,195,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.5; 
    font-size: 3.8rem;
    letter-spacing: 2px;
    font-weight: 700;
    margin-right: 1rem;
    margin-bottom: 0;
    @media (max-width:1500px) {
        font-size: 2.5rem;
        margin-right: .6rem;
    }
    @media (max-width:1024px) {
        font-size: 2rem;
        margin-right: .4rem;
    } 
`;
const MainDescription = styled.div`
    text-align: center;
    transform: translateY(-22px);
`
const Currency = styled.span`
    font-weight: 700;
    font-size: 1.5rem;
    @media (max-width:1500px) {
        font-size: 1rem;
    }
    @media (max-width:1024px) {
        font-size: .6rem;
    } 
`
const PriceText = styled.p`
    font-weight: bold;
    @media (max-width:1500px) {
        margin-bottom: .5rem;
    }
    @media (max-width:1024px) {
        margin-bottom: .2rem;
    } 
`;
// Provided services section
const ProvideServicesContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 16px;
        background: #1f4037;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #99f2c8, #1f4037);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #99f2c8, #1f4037); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        color: #fff;
        min-height: 250px;
        max-height: 250px;
        @media (max-width:1500px) {
            flex-direction: row;
            flex-wrap: wrap;
            min-height: 96px;
            max-height: 96px;
            padding: 8px;
            font-size: 12px;
            justify-content: space-evenly;
        }
        @media (max-width:1024px) {
            min-height: 150px;
            max-height: 150px;
            flex-direction: column;
        }
`
const IconContainer = styled.div`
        display: flex;
        margin-bottom: 8px;
        .icon: {
            height: 24px;
            width: 24px;
            @media (max-width:1500px) {
                height: 14px;
                width: 14px;
            }
            @media (max-width:1024px) {
                height: 12px;
                width: 12px;
            }
        }
`


const PricingCard = ({index, id, category, mainPrice, mainDesc, restPrices, services, ...props}) => {
    return (
        <Tilt options={{ scale: 1, max: 10 }}>
            <PricingItem className={`${index % 2 === 0 ? "move-up" : "move-down"} shadow-xl`} id={`pricing-item-${index}`}>
                <Container>
                    <HeadingContainer>
                        <Heading>{category}</Heading>
                    </HeadingContainer>
                    <PriceContainer>
                        <MainPriceText>{mainPrice}</MainPriceText>
                        <Currency>VND</Currency>
                    </PriceContainer>
                    <MainDescription>
                        <Text>{mainDesc}</Text>
                    </MainDescription>
                    <TextContainer>
                        {restPrices.map(priceEle => {
                        return (
                            <NormalPriceContainer>
                                <PriceText>{priceEle.price ? `${priceEle.price} VND` : ""}</PriceText>
                                {/* Display desc to nearly last element */}
                                {priceEle.desc.slice(0, priceEle.desc.length).map(description => <Text noMargin>{description}</Text>)}
                                {/* Last element with margin */}
                                <Text>{priceEle.desc[priceEle.length - 1]}</Text>
                            </NormalPriceContainer>
                        )
                        })}
                    </TextContainer>
                </Container>
                <ProvideServicesContainer>
                    {services.map(service => <IconContainer>
                        <FontAwesomeIcon icon={faCheckCircle} className="icon" />
                        <Text light marginLeft>{service}</Text>
                    </IconContainer>)}
                </ProvideServicesContainer>
            </PricingItem>
        </Tilt>
    )
};

export default PricingCard
