import React from "react";
import styled from "styled-components";
import CountDown from "react-native-countdown-component";
import { getDistance, convertDistance } from "geolib";

const CardTienda = props => (
  <Container>
    <ItemImage source={props.itemImage} />
    <ItemName>{props.itemName}</ItemName>
    <ItemLocation>{props.itemLocation}</ItemLocation>
    <ItemDistance>
      {/*Math.round(
        convertDistance(
          getDistance(
            {
              latitude: this.state.latitude,
              longitude: this.state.longitude
            },
            {
              latitude: props.itemLatitude,
              longitude: props.itemLongitude
            }
          ),
          "km"
        ) * 10
      ) /
        10 +
          " km"*/}
    </ItemDistance>
    <LowerCont>
      <ItemPrice>${props.itemPrice}</ItemPrice>
      <CountDown
        size={10}
        until={props.itemCount}
        digitStyle={{ backgroundColor: "transpaent" }}
        digitTxtStyle={{ color: "white" }}
        timeLabelStyle={{ color: "red", fontWeight: 600 }}
        separatorStyle={{ color: "white" }}
        timeToShow={["H", "M", "S"]}
        timeLabels={{ m: null, s: null }}
        showSeparator={true}
        style={{ right: -4 }}
      />
    </LowerCont>
  </Container>
);

export default CardTienda;

const Container = styled.View`
  position: relative;
  width: 45%;
  height: 200px;
  background-color: white;
  border-radius: 8;
  border: 1px solid #e5eced;
  justify-content: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ItemImage = styled.Image`
  width: 75%;
  height: 45%;
  border-radius: 8;
  top: 5%;
`;

const ItemName = styled.Text`
  font-size: 16px;
  color: #353536;
  text-align: center;
  font-weight: bold;
  top: 5%;
`;

const ItemLocation = styled.Text`
  font-size: 12px;
  font-weight: normal;
  color: #9d9d9d;
  top: 2%;
`;

const ItemDistance = styled.Text`
  font-size: 12px;
  font-weight: normal;
  color: #9d9d9d;
  top: -1%;
`;

const LowerCont = styled.View`
  background-color: #ff4d4d;
  border-bottom-left-radius: 8;
  border-bottom-right-radius: 8;
  width: 100%;
  height: 20%;
  bottom: 0;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

const ItemPrice = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
  left: 6%;
`;
