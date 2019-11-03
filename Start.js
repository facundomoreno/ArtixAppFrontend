import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import styled from "styled-components";

export default class Start extends React.Component {
  render() {
    return (
      <Container>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("AppTab")}
        >
          <Logo source={require("./assets/sxhb.png")}></Logo>
        </TouchableOpacity>
        <Buttons>
          <Register>
            <TouchableOpacity
              style={{
                height: 50,
                width: 250,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => this.props.navigation.navigate("Register")}
            >
              <RegisterText>Registrarse</RegisterText>
            </TouchableOpacity>
          </Register>
          <Login>
            <TouchableOpacity
              style={{
                height: 50,
                width: 250,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <LoginText>Iniciar sesión</LoginText>
            </TouchableOpacity>
          </Login>
        </Buttons>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #fafafa;
  height: 100%;
  width: 100%;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const Buttons = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  top: 20%;
`;

const Register = styled.View`
  align-items: center;
  justify-content: center;
  background: #ff4d4d;
  width: 250px;
  height: 50px;
  border-radius: 50;
`;

const RegisterText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const Login = styled.View`
  top: 1%;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  width: 250px;
  height: 50px;
  border-radius: 50;
  border-style: inset;
  border: 3px;
  border-color: #ff4d4d;
`;

const LoginText = styled.Text`
  color: #ff4d4d;
  font-weight: 600;
  font-size: 16px;
`;

const Logo = styled.Image`
  width: 150px;
  height: 150px;
  top: 20%;
`;
