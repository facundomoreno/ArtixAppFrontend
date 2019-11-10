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
  Modal,
  Animated
} from "react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/Ionicons";
import { createAppContainer } from "react-navigation";
import LottieView from "lottie-react-native";

export default class BuyConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  static navigationOptions = {
    header: null,
    showIcon: true
  };
  componentDidMount() {
    this.animation.play();
  }

  ToggleFunction = () => {
    this.setState(state => ({
      isVisible: !state.isVisible
    }));
  };

  render() {
    return (
      <Container>
        <TitleCont>¡Felicitaciones!</TitleCont>
        <Item>Has comprado una unidad de{"\n"}Camiseta de Boca Año 2000</Item>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          source={require("./assets/tick.json")}
          style={{ width: 180, height: 180, top: "20%" }}
          loop={false}
          onAnimationFinish={this.ToggleFunction}
        />
        {this.state.isVisible ? (
          <Continue>
            <TouchableOpacity
              style={{
                height: 50,
                width: 150,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ContinueText>Continuar</ContinueText>
            </TouchableOpacity>
          </Continue>
        ) : null}
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #38c172;
  width: 100%;
  align-items: center;
`;

const TitleCont = styled.Text`
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  color: white;
  top: 10%;
`;

const Item = styled.Text`
  font-size: 22px;
  text-align: center;
  color: white;
  top: 15%;
  width: 90%;
`;

const Continue = styled.View`
  top: 40%;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  width: 150px;
  height: 50px;
  border-radius: 50;
`;

const ContinueText = styled.Text`
  color: #38c172;
  font-weight: 600;
  font-size: 16px;
`;
