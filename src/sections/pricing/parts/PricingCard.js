import React from 'react'
import styled, {keyframes, css} from 'styled-components';
import Tilt from 'react-tilt';
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
    min-height: 700px;
    max-height: 700px;
    @media (max-width:1500px) {
        min-height: 600px;
        max-height: 600px;
    }
    @media (max-width:1024px) {
        min-height: 400px;
        max-height: 400px;
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
const TextContainer = styled.div`
    padding: 0 1rem;
    width: 100%;
    text-align: center;
`;
const Text = styled.p`
    font-size: 14px;
    font-weight: 300;
    color: #4e616c;
    ${props =>
        props.noMargin &&
        css`
          margin: 0;
    `};
`;
const HeadingContainer = styled.div`
    background-color: #e1eae8;
    text-align: center;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
`;
const Heading = styled.h4`
    color: ${primaryMain};
    font-weight: 600;
    font-size: 25px;
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
`;

const NormalPriceContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
    padding-bottom: 1rem; 
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
`;
const MainDescription = styled.div`
    text-align: center;
    transform: translateY(-22px);
`
const Currency = styled.span`
    font-weight: 700;
    font-size: 1.5rem;
`
const PriceText = styled.p`
    font-weight: bold;
`;


const PricingCard = ({index, id, category, mainPrice, mainDesc, restPrices, ...props}) => {
    return (
        <Tilt options={{ scale: 1, max: 10 }}>
            <PricingItem className={`${index % 2 === 0 ? "move-up" : "move-down"} shadow-xl`} id={`pricing-item-${index}`}>
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
                    {/* <NormalPriceContainer>
                        <PriceText>346,000 VND</PriceText>
                        <Text>Công trình dân dụng. Khách sạn, resort
                            Bar, cafe, nhà hàng
                        </Text>
                    </NormalPriceContainer>
                    <NormalPriceContainer>
                        <PriceText>499,000 VND</PriceText>
                        <Text>Phong cách cổ điển</Text>
                    </NormalPriceContainer>
                    <NormalPriceContainer>
                        <PriceText>199,000 VND</PriceText>
                        <Text noMargin>Sân vườn, cảnh quan</Text>
                        <Text>Tư vấn thiết kế nhanh</Text>
                    </NormalPriceContainer> */}
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
            </PricingItem>
        </Tilt>
    )
};

export default PricingCard
