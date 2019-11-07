import React, { Component } from "react";
import { ScrollView, SafeAreaView, Text, TouchableOpacity, AsyncStorage } from "react-native";
import { Header } from "react-native-elements";
import styled from "styled-components";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default class PerfilScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: ""
    }
  }
  static navigationOptions = {
    header: null,
    showIcon: true
  };

  componentDidMount(){
    this.getSessionValues();
    
  }

  getSessionValues = async () =>{
    try{
      AsyncStorage.getItem('user').then((user)=>{
        //console.log(user)
        this.setState({currentUser: user});
        
      }).done();
    }
    catch(error){
      console.log(error);
    }
  };

   
  render() {

   
    
    console.log("Current user: " + this.state.currentUser);
    
    return (
      
      
      <Container>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <Container></Container>
          <ContainerPerfil>
            <Menu />
            <Avatar />
            <Nombre>{this.state.currentUser}</Nombre>
            <Jerarquia>Alumno</Jerarquia>
            <BotonClase>
              <BotonText>Pedir Clase</BotonText>
            </BotonClase>
            <BotonMensaje>
              <BotonTextMensaje>Mensaje</BotonTextMensaje>
            </BotonMensaje>
          </ContainerPerfil>

          <ContainerPerfil2>
            <Actividad>Sobre mí</Actividad>
            <Descripcion>
              Tengo 16, voy al colegio ORT, me gustan mucho los deportes en
              donde compito en Futbol, Tenis, Natacion y Badminton. Ademas en mi
              tiempo libre me gusta ir a la casa de mis amigos y divertirme con
              ellos.
            </Descripcion>
          </ContainerPerfil2>

          <ContainerPerfil3>
            <Actividad>Rendimiento</Actividad>
            <BotonRojo1>
              <BotonText>Lengua</BotonText>
            </BotonRojo1>
            <BotonVerde1>
              <BotonText>Matemática</BotonText>
            </BotonVerde1>
          </ContainerPerfil3>
        </ScrollView>
      </Container>
    );
  }
}

const Nombre = styled.Text`
  left: 22%;
  width: 250px;
  height: 51px;
  top: 48%;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 51px;
  color: black;
`;

const Jerarquia = styled.Text`
  left: 44%;
  width: 250px;
  height: 51px;
  top: 35%;
  font-style: normal;
  font-size: 12px;
  line-height: 51px;
  color: #5f5f5f;
`;

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  background-color: black;
  border-radius: 40px;
  position: absolute;
  left: 38.93%;
  right: 34.13%;
  top: 10.04%;
  bottom: 73.52%;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 17px;
  margin-left: 20px;
  margin-bottom: 0px;
  text-transform: uppercase;
`;

const Container = styled.View`
  flex: 1;
  background-color: whitesmoke;
`;

const Name = styled.Text`
  font-size: 24px;
  color: #3c4560;
  font-weight: bold;
  margin-left: 30px;
`;
const Bar = styled.Text`
  font-size: 25px;
  color: #fff;
  font-weight: 600;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 13px;
  margin-bottom: 30px;
  padding-left: 80px;
`;

const Menu = styled.Image`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 90.27%;
  right: 7.47%;
  top: 13.55%;
  bottom: 84.48%;
`;

const ContainerPerfil = styled.View`
  width: 340px;
  height: 220px;
  position: relative;

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  elevation: 2;
  margin-top: 20px;
  background: #ffffff;
  border-radius: 5px;
`;

const ContainerPerfil2 = styled.View`
  width: 340px;
  height: 180px;
  position: relative;
  elevation: 2;

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  margin-top: 20px;
  background: #ffffff;
  border-radius: 5px;
`;

const ContainerPerfil3 = styled.View`
  width: 340px;
  height: 80px;
  position: relative;
  elevation: 2;

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  margin-top: 20px;
  margin-bottom: 2px;
  background: #ffffff;
  border-radius: 5px;
`;

const BotonClase = styled.TouchableOpacity`
  position: absolute;
  width: 112px;
  height: 31px;
  left: 15%;
  top: 80%;
  border-radius: 5px;
  background-color: #7444e8;
`;

const BotonMensaje = styled.TouchableOpacity`
  position: absolute;
  width: 112px;
  height: 31px;
  left: 53%;
  top: 80%;
  border-radius: 5px;
  background-color: whitesmoke;
`;

const BotonText = styled.Text`
  font-size: 15px;
  color: #ffffff;
  text-align: center;
  margin-top: 5px;
`;

const BotonTextMensaje = styled.Text`
  font-size: 15px;
  color: #353536; /* chocho's */
  text-align: center;
  margin-top: 5px;
`;

const BotonRojo1 = styled.View`
  position: absolute;
  left: 5%;
  top: 50%;
  width: 92px;
  height: 29px;
  background-color: #ff5252;
  border-radius: 5px;
`;
const BotonVerde1 = styled.View`
  position: absolute;
  left: 34%;
  top: 50%;
  width: 92px;
  height: 29px;
  background-color: #4ed613;
  border-radius: 5px;
  margin-left: 10px;
`;

const Actividad = styled.Text`
  position: absolute;
  width: 100%;
  height: 23px;
  left: 5%;
  top: 5%;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 23px;
  color: black;
`;

const Descripcion = styled.Text`
  position: absolute;
  left: 5%;
  top: 20%;
  bottom: 32.39%;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  width: 300px;
  height: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  line-height: 22px;
  color: #353536;
`;
