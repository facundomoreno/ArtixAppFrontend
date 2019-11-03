import React, { Component, useDebugValue } from "react";
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

export default class LogScreen extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      password: "",
      mail: ""
    };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {

    var value = await AsyncStorage.getItem('user')
    if (value !== null) {
      this.props.navigation.navigate('Home');
    }
  }

  login = () => {

    fetch('http://192.168.0.238:3000/Login',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: this.state.password,
        mail: this.state.mail
      })
    })
    
    .then((response) => response.json())
    .then ((res) => {
  
        if (res.success === true){
          AsyncStorage.setItem('user', res.mail);
          this.props.navigation.navigate('AppTab');
        }
  
        else{
            alert(res.message);
        }
    })
    .done();
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Container>
          <IntroContainer>
            <Intro>Inicia sesión</Intro>
            <RegContainer>
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
                  onPress={() => this.login()}
                  //onPress={() => this.props.navigation.navigate("Home")}
                >
                  <ContinueText>Iniciar sesión</ContinueText>
                </TouchableOpacity>
              </Continue>
              <SignUpView>
                <SignUp1>¿No tienes una cuenta?{"  "}</SignUp1>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Register")}
                >
                  <SignUp2>Regístrate</SignUp2>
                </TouchableOpacity>
              </SignUpView>
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
  top: 20%;
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
const RegContainer = styled.View`
  flex: 1;
  top: 15%;
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

const SignUp1 = styled.Text`
  color: #bebebe;
  font-size: 14px;
`;

const SignUp2 = styled.Text`
  color: #ff4d4d;
  font-size: 14px;
  font-weight: bold;
`;

const SignUpView = styled.View`
  flex-direction: row;
  top: 20%;
`;


