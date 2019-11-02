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
import Icon from "react-native-vector-icons/Ionicons";

const CardMens = props => (
  <Container>
    <AvatarC source={props.mensAvatar}></AvatarC>
    <ContText>
      <Name>{props.mensName}</Name>
      <MensCont numberOfLines={2}>{props.mensCont}</MensCont>
    </ContText>
    <MensTime>{props.mensTime}</MensTime>
  </Container>
);

export default CardMens;

const Container = styled.View`
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const AvatarC = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 80;
  left: 20%;
`;

const ContText = styled.View`
  height: 80%;
  flex: 1;
  left: 30%;
`;

const Name = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #353536;
`;

const MensCont = styled.Text`
  color: #9d9d9d;
  position: relative;
  top: 5%;
  width: 70%;
  flex: 1;
`;

const MensTime = styled.Text`
  color: #9d9d9d;
  right: 20%;
`;
