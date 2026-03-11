import React from "react";
import styled from "styled-components";


const Card = styled.div`
flex: 1;
min-width: 200px;
padding: 24px;
border: 1px solid ${({theme}) => theme.text_primary + 20};
border-radius: 14px;
box-shadow: 0px 6px 20px 0px ${({theme}) => theme.text_primary + 10};
display: flex;
gap: 6px;
`;

const Left = styled.div`
flex-direction: column;
gap:12px;
@media (max-width: 600px) {
  gap: 6px;
}
`;
const Title = styled.div`
font-weight: 600;
font-size: 16px;
color: ${({theme}) => theme.primary};
@media (max-width: 600px) {
  font-size: 14px;
}
`;
const Value = styled.div`
font-size: 32px;
display: flex;
align-items: end;
gap: 8px;
color: ${({theme}) => theme.text_primary};
@media (max-width: 600px) {
  font-size: 24px;
}
`;
const Unit = styled.span`
font-size: 16px;
margin-bottom: 8px;
`;
const Span = styled.span`
color: ${({$positive, theme}) => 
$positive ? theme.green : theme.red};
`;
const Icon = styled.div`
  display: flex;
  height: fit-content;
  padding: 8px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  ${({ color, $bg }) => `
    background: ${$bg};
    color: ${color};
  `}
`;
const Desc = styled.div`
font-size: 14px;
color: ${({theme}) => theme.text_secondary};    
margin-top: 6px;
@media (max-width: 600px) {
  font-size: 12px;
}
`;

const CountCard = ({ item, data }) => {
    return (
        <Card>
            <Left>
                <Title>{item.name}</Title>
                <Value>
                    {Number(data[item.key]).toFixed(2)}
                        <Unit>{item.unit}</Unit>
                    <Span $positive>(+10%)</Span>
                </Value>
                <Desc>{item.desc}</Desc>
            </Left>
            <Icon color={item.color} $bg={item.lightColor}>
  {item.icon}
</Icon>
        </Card>
    )
}

export default CountCard;