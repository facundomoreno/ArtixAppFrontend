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
  FlatList,
  Dimensions
} from "react-native";
import styled from "styled-components";
import CountDown from "react-native-countdown-component";
import { getDistance, convertDistance } from "geolib";

export default class VentaScreen extends React.Component {

  render() {
    return (
      <Container>
        <AllCont>
        <Intro>Publica un producto</Intro>
        <InfoIn>Título de tu producto</InfoIn>
          <TextIn
                ref={input => {
                  this.secTxtInp = input;
                }}
                placeholder="Correo electrónico"
                placeholderTextColor="grey"
                returnKeyType="next"
                selectionColor="#ff4d4d"
                keyboardType="email-address"
                autoCapitalize="none"
                onSubmitEditing={() => {
                  this.thiTxtInp.focus();}}
                blurOnSubmit={false}
              ></TextIn></AllCont>
      </Container>
    );
}
}

const Container = styled.View`
  flex: 1;
  background-color: #fafafa;
  width: 100%;
  align-items: center;
`;

const AllCont = styled.View`
border-radius: 5;
background-color: white;
width: 90%;
flex: 1;
top: 10%;
align-items: center;
`;

const Intro = styled.Text`
  top: 10%;
  width: 100%;
  text-align: center;
  font-weight: 600;
  height: 100px;
  font-size: 20px;
  color: #353536;
`;

const InfoIn = styled.Text`
  width: 80%;
  text-align: left;
  height: 100px;
  font-size: 14px;
  color: #353536;
`;

const TextIn = styled.TextInput`
  top: 5%;
  margin-top: 15px;
  height: 50px;
  flex-direction: column;
  background: white;
  width: 80%;
  border: 1px solid #e5eced;
  box-shadow: 0px 3px 10px #e5eced;
  border-radius: 5;
  color: #353536;
  font-size: 16px;
  padding-left: 10;
`;