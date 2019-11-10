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
    <Cond style={{ marginBottom: "1%" }}>{props.itemStock} disponible(s)</Cond>
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
      enableScaling={true}
      easingFunc={Easing.ease}
    />
    <ItTitle>{props.itemTitle}</ItTitle>
    <ItPriceCont>
      <ItPrice>${props.itemPrice}</ItPrice>
    </ItPriceCont>
    <ItPubCont>
      <ItPubAv source={props.itemPubAv}></ItPubAv>
      <ItPubName> {props.itemPubName}</ItPubName>
    </ItPubCont>
    <View
      style={{
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10%"
      }}
    >
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
      />
    </View>
    <ContNumIn>
      <NumericInput
        totalWidth={280}
        value={props.stockCount}
        onChange={props.onChangeStockCount}
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
        maxValue={props.itemStock}
      />
    </ContNumIn>
    <ItBuy>
      <TouchableOpacity
        style={{
          width: 280,
          height: 50,
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={props.buyButton}
      >
        <ItButtonText style={{ top: 15 }}>Comprar</ItButtonText>
      </TouchableOpacity>
    </ItBuy>
    <ItHead>Descripción</ItHead>
    <ItDesc>{props.itemDesc}</ItDesc>
    <ItHead>Ubicación</ItHead>

    <ItLocMap>
      <TouchableOpacity onPress={props.mapItView}>
        <ItButtonText>
          Ver en Mapa{"\n"}
          {props.itemDistance}
        </ItButtonText>
      </TouchableOpacity>
    </ItLocMap>

    <ItDesc>
      {props.itemLocation} - {props.itemCP}
      {"\n"}
      {props.itemBarrio}
      {"\n"}
      {props.itemCity}
      {"\n"}
      {props.itemProvince}
      {"\n"}
      Argentina
    </ItDesc>
  </View>
);

export default CardItem;

const styles = {
  img: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: "3%"
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
  margin-bottom: 2%;
  width: 280px;
`;

const ItPriceCont = styled.View`
  width: 200px;
  align-items: center;
  margin-bottom: 10%;
`;

const ItPrice = styled.Text`
  font-size: 28px;
  color: #353536;
  font-weight: 100;
`;

const ItPubCont = styled.View`
  width: 200px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 5%;
`;

const ItPubAv = styled.Image`
  width: 25px;
  height: 25px;
  border-radius: 13;
  margin-bottom: 1%;
`;

const ItPubName = styled.Text`
  font-size: 12px;
  color: #9d9d9d;
`;

const ItLocCont = styled.View`
  width: 280px;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ItLocMap = styled.View`
  width: 140px;
  height: 50px;
  background-color: #ff4d4d;
  align-items: center;
  justify-content: center;
  border-radius: 8;
  margin-bottom: 2%;
`;

const ItButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
`;

const ItLocTextCont = styled.View`
  width: 140px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItLocText = styled.Text`
  font-size: 14px;
  color: #9d9d9d;
  text-align: center;
`;

const ItBuy = styled.View`
  margin-bottom: 5%;
  width: 280px;
  height: 50px;
  border-radius: 8;
  background-color: #ff4d4d;
  align-items: center;
  justify-content: center;
`;

const ContNumIn = styled.View`
  width: 200px;
  margin-bottom: 3%;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

const ItTimeLeft = styled.Text`
  font-size: 18px;
  color: #353536;
  text-align: center;
  width: 200px;
  margin-bottom: 3%;
`;

const ItDesc = styled.Text`
  font-size: 14px;
  color: #353536;
  text-align: left;
  width: 280px;
  margin-bottom: 5%;
`;

const ItHead = styled.Text`
  font-weight: bold;
  font-size: 18px;
  width: 280px;
  color: #353536;
  margin-bottom: 2%;
`;
