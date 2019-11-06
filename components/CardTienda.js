import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import styled from "styled-components";
import CountDown from "react-native-countdown-component";
import { getDistance, convertDistance } from "geolib";

const CardTienda = props => (
  <Container>
    <ItemImage source={props.itemImage} />
    <ItemName numberOfLines={2}>{props.itemName}</ItemName>
    <ItemLocation>{props.itemLocation}</ItemLocation>
    <ItemDistance>{props.itemDistance}</ItemDistance>
    <LowerCont>
      <ItemPrice>${props.itemPrice}</ItemPrice>
      <CountDown
        size={10}
        until={props.itemCount}
        digitStyle={{ backgroundColor: "transparent" }}
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
  width: 150px;
  height: 250px;
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
  height: 40%;
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
