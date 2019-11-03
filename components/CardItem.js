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
  Dimensions,
  Easing
} from "react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/Ionicons";
import { createAppContainer } from "react-navigation";
import { getDistance, convertDistance } from "geolib";
import ZoomImage from "react-native-zoom-image";
import NumericInput from "react-native-numeric-input";
import CountDown from "react-native-countdown-component";

const CardItem = props => (
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <Cond>{props.itemCond}</Cond>
    <ZoomImage
      source={props.itemImage}
      Button
      imgStyle={{
        width: 200,
        height: 200,
        width: 200,
        height: 200,
        borderRadius: 8,
        top: 2
      }}
      style={styles.img}
      duration={200}
      enableScaling={false}
      easingFunc={Easing.ease}
    />
    <ItTitle>{props.itemTitle}</ItTitle>
    <ItPriceCont>
      <ItPrice>${props.itemPrice}</ItPrice>
    </ItPriceCont>
    <ItPubCont>
      <ItPubAv source={props.itemPubAv}></ItPubAv>
      <ItPubName>{props.itemPubName}</ItPubName>
    </ItPubCont>
    <ItLocCont>
      <ItLocMap>
        <TouchableOpacity
          style={{
            height: 50,
            width: 100,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ItButtonText>Ver en Mapa</ItButtonText>
        </TouchableOpacity>
      </ItLocMap>
      <ItLocTextCont>
        <ItLocText>{props.itemLocation}</ItLocText>
        <ItLocText>{props.itemDistance}</ItLocText>
      </ItLocTextCont>
    </ItLocCont>
    <ItTimeLeft>Tiempo restante:</ItTimeLeft>
    <CountDown
      size={20}
      until={props.itemCount}
      digitStyle={{ backgroundColor: "transparent" }}
      digitTxtStyle={{ color: "#353536" }}
      timeLabelStyle={{ color: "red", fontWeight: 600 }}
      separatorStyle={{ color: "#353536" }}
      timeToShow={["H", "M", "S"]}
      timeLabels={{ m: null, s: null }}
      showSeparator={true}
      style={{ top: 23 }}
    />
    <ItBuy>
      <TouchableOpacity
        style={{
          height: 50,
          width: 200,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ItButtonText>Comprar</ItButtonText>
      </TouchableOpacity>
    </ItBuy>
    <ContNumIn>
      <NumericInput
        totalWidth={100}
        totalHeight={50}
        iconSize={25}
        step={1}
        valueType="real"
        rounded
        textColor="#353536"
        iconStyle={{ color: "white" }}
        rightButtonBackgroundColor="#009EF6"
        leftButtonBackgroundColor="#ff4d4d"
        minValue={1}
        initValue={1}
      />
    </ContNumIn>
    <ItDesc>{props.itemDesc}</ItDesc>
  </View>
);

export default CardItem;

const styles = {
  img: {
    width: 200,
    height: 200,
    borderRadius: 8,
    top: 2
  }
};

const Cond = styled.Text`
  font-size: 14px;
  color: #9d9d9d;
`;

const ItTitle = styled.Text`
  text-align: center;
  color: #353536;
  font-weight: bold;
  font-size: 22px;
  top: 3%;
  position: relative;
  width: 280px;
`;

const ItPriceCont = styled.View`
  width: 200px;
  top: 3%;
  position: relative;
  align-items: center;
`;

const ItPrice = styled.Text`
  font-size: 28px;
  color: #353536;
  font-weight: 100;
`;

const ItPubCont = styled.View`
  width: 200px;
  top: 4%;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItPubAv = styled.Image`
  width: 25px;
  height: 25px;
  border-radius: 13;
`;

const ItPubName = styled.Text`
  font-size: 12px;
  color: #9d9d9d;
  top: 1%;
`;

const ItLocCont = styled.View`
  width: 200px;
  top: 13%;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ItLocMap = styled.View`
  width: 100px;
  height: 50px;
  background-color: #ff4d4d;
  align-items: center;
  justify-content: center;
  border-radius: 8;
`;

const ItButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const ItLocTextCont = styled.View`
  width: 100px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItLocText = styled.Text`
  font-size: 14px;
  color: #9d9d9d;
`;

const ItBuy = styled.View`
  top: 3%;
  width: 280px;
  height: 50px;
  border-radius: 8;
  background-color: #ff4d4d;
  align-items: center;
  justify-content: center;
`;

const ContNumIn = styled.View`
  width: 200px;
  top: 5%;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

const ItTimeLeft = styled.Text`
  font-size: 18px;
  color: #353536;
  text-align: center;
  width: 200px;
  top: 6%;
`;

const ItDesc = styled.Text`
  font-size: 14px;
  color: #353536;
  text-align: left;
  width: 280px;
  top: 7%;
`;
