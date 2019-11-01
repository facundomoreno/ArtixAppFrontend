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
  Picker
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

var radio_props = [{ label: "Nuevo", value: 0 }, { label: "Usado", value: 1 }];

export default class VentaScreen extends React.Component {
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
            <Intro>Publica un producto</Intro>
          </TitleCont>
          <InfoIn>Título de tu producto</InfoIn>
          <TextIn
            ref={input => {
              this.secTxtInp = input;
            }}
            placeholder="Ej. Celular Samsung Galaxy S9 64 GB"
            placeholderTextColor="grey"
            returnKeyType="next"
            selectionColor="#ff4d4d"
            keyboardType="default"
            autoCapitalize="none"
            onSubmitEditing={() => {
              this.thiTxtInp.focus();
            }}
            blurOnSubmit={false}
          ></TextIn>
          <InfoIn>Categoría de tu producto</InfoIn>
          <PickIn>
            <Picker.Item value="" label="Elegir Categoría" />
            <PickIn.Item label="Accesorios para Vehículos" value="acc-veh" />
            <PickIn.Item label="Antigüedades y Colecciones" value="ant-col" />
            <PickIn.Item
              label="Arte, Librería y Mercería"
              value="art-lib-mer"
            />
            <PickIn.Item label="Bebés" value="bebes" />
            <PickIn.Item label="Belleza y Cuidado Personal" value="bel" />
            <PickIn.Item label="Cámaras y Accesorios" value="cam-acc" />
            <PickIn.Item label="Celulares y Teléfonos" value="cel-tel" />
            <PickIn.Item label="Computación" value="comp" />
            <PickIn.Item label="Consolas y Videojuegos" value="con-vid" />
            <PickIn.Item
              label="Electrodomésticos y Aires Ac."
              value="elec-aires"
            />
            <PickIn.Item label="Electrónica, Audio y Video" value="elec" />
            <PickIn.Item label="Entradas para Eventos" value="event" />
            <PickIn.Item label="Herramientas y Construcción" value="const" />
            <PickIn.Item
              label="Hogar, Muebles y Jardín"
              value="hog-mueb-jard"
            />
            <PickIn.Item label="Idustrias y Oficinas" value="ind-ofi" />
            <PickIn.Item label="Instrumentos Musicales" value="inst-mus" />
            <PickIn.Item label="Joyas y Relojes" value="joy-rel" />
            <PickIn.Item
              label="Libros, Revistas y Comics"
              value="lib-rev-com"
            />
            <PickIn.Item
              label="Música, Películas y Series"
              value="mus-pel-ser"
            />
            <PickIn.Item label="Ropa y Accesorios" value="rop-acc" />
            <PickIn.Item
              label="Salud y Equipamiento Médico"
              value="sal-eq-med"
            />
            <PickIn.Item
              label="Souvenirs, Cotillón y Fiestas"
              value="sou-cot-fie"
            />
            <PickIn.Item label="Otros" value="otros" />
          </PickIn>
          <InfoIn>Condición de tu producto</InfoIn>
          <RadioForm formHorizontal={true} animation={true}>
            {/* To create radio buttons, loop through your array of options */}
            {radio_props.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  borderWidth={1}
                  buttonInnerColor={"#ff4d4d"}
                  buttonOuterColor={"#ff4d4d"}
                  buttonSize={40}
                  buttonOuterSize={80}
                  buttonStyle={{}}
                  buttonWrapStyle={{ marginLeft: 10 }}
                />
              </RadioButton>
            ))}
          </RadioForm>
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
  top: 5%;
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

const Scroll = styled.View`
  flex: 1;
  width: 100%;
`;

const Intro = styled.Text`
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  color: #353536;
`;

const InfoIn = styled.Text`
  width: 80%;
  text-align: left;
  font-size: 14px;
  color: #353536;
  font-weight: 400;
  top: 5%;
`;

const TextIn = styled.TextInput`
  top: 3%;
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

const PickIn = styled.Picker`
  top: 3%;
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
