import React, { Component } from "react";
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
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default class RegScreen extends React.Component {
  constructor(props) {
    super(props);
    this.Registrarse = this.Registrarse.bind(this);
    this.state = {
      username: "",
      password: "",
      mail: ""
    };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem("user");
    if (value !== null) {
      this.props.navigation.navigate("AppTab");
    }
  };

  Registrarse = () => {
    fetch("http://192.168.0.83:3000/Register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        mail: this.state.mail
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.success === true) {
          AsyncStorage.setItem("user", res.mail);
          this.props.navigation.navigate("AppTab");
        } else {
          alert(res.message);
        }
      })
      .done();
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Container>
          <IntroContainer>
            <Intro>Bienvenido{"\n"}a la revolución del</Intro>
            <ECommerce>e-commerce</ECommerce>
            <IntroPic source={require("./assets/intro.png")}></IntroPic>
            <RegContainer>
              <TextIn
                placeholder="Nombre completo"
                placeholderTextColor="grey"
                selectionColor="#ff4d4d"
                returnKeyType="next"
                autoCapitalize="words"
                onSubmitEditing={() => {
                  this.secTxtInp.focus();
                }}
                blurOnSubmit={false}
                onChangeText={username => this.setState({ username })}
              ></TextIn>
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
                  this.thiTxtInp.focus();
                }}
                onChangeText={mail => this.setState({ mail })}
                blurOnSubmit={false}
              ></TextIn>
              <TextIn
                ref={input => {
                  this.thiTxtInp = input;
                }}
                placeholder="Contraseña"
                placeholderTextColor="grey"
                returnKeyType="done"
                selectionColor="#ff4d4d"
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
              ></TextIn>
              <Continue>
                <TouchableOpacity
                  style={{
                    height: 50,
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => this.Registrarse()}
                  //onPress={() => this.props.navigation.navigate("Home")}
                >
                  <ContinueText>Continuar</ContinueText>
                </TouchableOpacity>
              </Continue>
              <LogInView>
                <LogIn1>¿Ya tienes una cuenta?{"  "}</LogIn1>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Login")}
                >
                  <LogIn2>Inicia sesión</LogIn2>
                </TouchableOpacity>
              </LogInView>
            </RegContainer>
          </IntroContainer>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #fafafa;
  height: 100%;
  width: 100%;
  position: absolute;
`;

const IntroContainer = styled.View`
  flex: 1;
  top: 5%;
  width: 100%;
  height: 100%;
  align-items: center;
  position: absolute;
`;

const Intro = styled.Text`
  position: absolute;
  width: 100%;
  text-align: center;
  font-weight: 600;
  height: 100px;
  font-size: 28px;
  color: #353536;
`;
const ECommerce = styled.Text`
  position: absolute;
  width: 100%;
  text-align: center;
  font-weight: 800;
  height: 100px;
  top: 9%;
  font-size: 36px;
  color: #ff4d4d;
`;

const IntroPic = styled.Image`
  position: absolute;
  width: 180px;
  height: 138px;
  top: 20%;
`;

const RegContainer = styled.View`
  flex: 1;
  top: 40%;
  width: 100%;
  height: 100%;
  position: absolute;
  align-items: center;
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

const Continue = styled.View`
  top: 8%;
  align-items: center;
  justify-content: center;
  background: #ff4d4d;
  width: 150px;
  height: 50px;
  border-radius: 50;
`;

const ContinueText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const LogIn1 = styled.Text`
  color: #bebebe;
  font-size: 14px;
`;

const LogIn2 = styled.Text`
  color: #ff4d4d;
  font-size: 14px;
  font-weight: bold;
`;

const LogInView = styled.View`
  flex-direction: row;
  top: 20%;
`;
