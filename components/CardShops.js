import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";

const CardShops = props => (
  <Container>
    <ShopName>{props.shopName}</ShopName>
    <ShopLocation>{props.shopLocation}</ShopLocation>
    <ShopDistance>{props.shopDistance}</ShopDistance>
    <ShopScore source={props.shopScore} />
    <ShopImage source={props.shopImage} />
  </Container>
);

export default CardShops;

const Container = styled.View`
  width: 90%;
  height: 25%;
  position: relative;
  margin: 4px;
  left: 4%;
  top: 1%;
  background-color: white;
  border-radius: 5;
  border: 1px solid #e5eced;
`;

const ShopName = styled.Text`
  left: 35%;
  top: 12%;
  position: relative;
  font-size: 18px;
  font-weight: normal;
  color: #000000;
`;

const ShopLocation = styled.Text`
  left: 35%;
  position: relative;
  top: 15%;
  font-size: 9px;
  font-weight: normal;
  color: #9d9d9d;
`;

const ShopDistance = styled.Text`
  left: 35%;
  top: 18%;
  position: relative;
  font-size: 9px;
  font-weight: normal;
  color: #9d9d9d;
`;

const ShopImage = styled.Image`
  width: 87px;
  position: relative;
  height: 81px;
  bottom: 38%;
  left: 2%;
  border-radius: 5;
`;

const ShopScore = styled.Image`
  width: 32px;
  height: 8px;
  left: 85%;
  position: relative;
  bottom: 23%;
`;
