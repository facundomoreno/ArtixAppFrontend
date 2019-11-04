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
  Button,
  Image,
  FlatList,
  Dimensions,
  Picker,
  AsyncStorage
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import styled from "styled-components";
import CountDown from "react-native-countdown-component";
import { getDistance, convertDistance } from "geolib";
import Icon from "react-native-vector-icons/Ionicons";

export default class UbScreen extends React.Component {
  static navigationOptions = {
    header: null,
    showIcon: true
  };
  render() {
    return (
      <Container>
        <AllCont>
          <TitleCont>
            <TouchableOpacity
              style={{ height: 40, width: 40, left: 20, position: "absolute" }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon
                name="ios-arrow-back"
                size={40}
                style={{ color: "#ff4d4d" }}
              ></Icon>
            </TouchableOpacity>
            <Intro>Inserta tu ubicación</Intro>
          </TitleCont>
          <InfoIn>Calle</InfoIn>
          <TextIn></TextIn>
          <NumDeptText>
            <InfoIn style={{ width: "25%" }}>Número</InfoIn>
            <InfoIn style={{ width: "50%" }}>Piso/Depto</InfoIn>
          </NumDeptText>
          <NumDept>
            <TextInNum></TextInNum>
            <TextInNum style={{ width: "50%" }}></TextInNum>
          </NumDept>
        </AllCont>
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
  top: 6.5%;
  flex: 1;
  align-items: center;
`;

const TitleCont = styled.View`
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 100%;
  border-radius: 5;
  height: 50px;
  flex-direction: row;
`;

const Intro = styled.Text`
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  color: #353536;
`;

const InfoIn = styled.Text`
  top: 1%;
  width: 80%;
  text-align: left;
  font-size: 16px;
  color: #353536;
  font-weight: bold;
`;

const TextIn = styled.TextInput`
  top: 2%;
  height: 50px;
  background: white;
  width: 80%;
  border: 1px solid #e5eced;
  border-radius: 5;
  color: #353536;
  font-size: 16px;
  padding-left: 10;
`;

const TextInNum = styled.TextInput`
  height: 50px;
  background: white;
  width: 32%;
  border: 1px solid #e5eced;
  border-radius: 5;
  color: #353536;
  font-size: 16px;
  padding-left: 10;
`;

const NumDept = styled.View`
  top: 1%;
  justify-content: space-between;
  width: 80%;
  height: 50px;
  flex-direction: row;
`;

const NumDeptText = styled.View`
  top: 1%;
  justify-content: space-between;
  width: 80%;
  flex-direction: row;
`;
