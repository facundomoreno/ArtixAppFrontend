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
  Easing,
  AsyncStorage,
  Modal,
  Alert
} from "react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/Ionicons";
import { createAppContainer } from "react-navigation";
import { NavigationEvents } from "react-navigation";

export default class Payment extends React.Component {
  static navigationOptions = {
    header: null,
    showIcon: true
  };

  constructor(props) {
    super(props);
    this.state = {
      nombreP: [this.props.navigation.getParam("nombreProducto")],
      stockP: [this.props.navigation.getParam("stock")]
    };
  }

  render() {
    console.log(this.state.stockP + this.state.nombreP);
    return (
      <Container>
        <AllCont>
          <Head>
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
            <Intro>Elige tu método de pago</Intro>
          </Head>
          <BigCont>
            <ButtonCont>
              <ButtonTitles>Paga con tarjeta de crédito</ButtonTitles>
              <ButtonTitles>Háblalo con el vendedor</ButtonTitles>
            </ButtonCont>
            <ButtonCont style={{ top: "1%" }}>
              <ButtonPay>
                <TouchableOpacity
                  style={{
                    height: 100,
                    width: 120,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  disabled={true}
                >
                  <Icon
                    name="ios-card"
                    size={80}
                    style={{ color: "#ff9e9e" }}
                  ></Icon>
                </TouchableOpacity>
              </ButtonPay>
              <ButtonPay>
                <TouchableOpacity
                  style={{
                    height: 100,
                    width: 120,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  onPress={() =>
                    this.props.navigation.navigate("Buy", {
                      nombreProd: this.state.nombreP[0],
                      stockProd: this.state.stockP[0]
                    })
                  }
                >
                  <Icon
                    name="ios-chatbubbles"
                    size={80}
                    style={{ color: "#ff4d4d" }}
                  ></Icon>
                </TouchableOpacity>
              </ButtonPay>
            </ButtonCont>
            <SubCont>
              <ButtonSubtitle>¡PRÓXIMAMENTE!</ButtonSubtitle>
            </SubCont>
          </BigCont>
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
  flex: 1;
  align-items: center;
  top: 6.5%;
  border-top-left-radius: 5;
  border-top-right-radius: 5;
  border: 1px solid #e5eced;
`;

const Head = styled.View`
  height: 50px;
  background: white;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 5;
  border-top-right-radius: 5;
`;
const Intro = styled.Text`
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  color: #353536;
`;

const ButtonPay = styled.View`
  height: 100px;
  width: 120px;
  border-radius: 5;
  background-color: whitesmoke;
  border: 1px solid #e5eced;
  align-items: center;
  justify-content: center;
`;

const BigCont = styled.View`
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
  flex-direction: column;
`;

const ButtonCont = styled.View`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: row;
`;

const ButtonTitles = styled.Text`
  width: 120px;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #353536;
`;

const ButtonSubtitle = styled.Text`
  width: 120px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  color: white;
  background-color: #ff4d4d;
  border-radius: 5;
`;

const SubCont = styled.View`
  width: 100%;
  top: 2%;
`;
