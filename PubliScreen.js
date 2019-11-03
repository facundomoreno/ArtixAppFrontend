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
  Button,
  Image,
  FlatList,
  Dimensions,
  Picker,
  AsyncStorage
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
import * as ImagePicker from "expo-image-picker";

var radio_props = [
  { label: "Nuevo  ", radval: 0 },
  { label: "Usado", radval: 1 }
];

export default class VentaScreen extends React.Component {
  constructor(props) {
    super(props);
    this.Publicar = this.Publicar.bind(this);
    this.state = {
      value:"Elegir Categoría",
      nombreProducto: "",
      precio: "",
      estado: "",
      descProducto: "",
      categoria: "",
      numero: "",
      piso: "",
      provincia: "",
      ciudad: "",
      barrio: "",
      imagen: "",
      value: ""
    };
  }

  static navigationOptions = {
    header: null,
    showIcon: true
  };

  Publicar = () => {
    fetch('http://192.168.0.83:3000/Publicar', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombreProducto: this.state.nombreProducto,
        //precio: this.state.precio,
        estado: this.state.estado,
        descProducto: this.state.descProducto,
        categoria: this.state.categoria
        //numero: this.state.numero,
        // piso: this.state.piso,
        // provincia: this.state.provincia,
        //ciudad: this.state.ciudad,
        // barrio: this.state.barrio,
        //imagen: this.state.imagen
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.success === true) {
          //AsyncStorage.setItem('user', res.nombreProducto);
          alert(res.message);
          this.props.navigation.navigate("Venta");
        } else {
          alert(res.message);
        }
      })
      .done();
  }

  state = {
    image: null
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    let { image } = this.state;
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

          <ScrollView
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{
              alignItems: "center",
              flexGrow: 1,
              paddingBottom:200
            }}
          >
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
              onChangeText={nombreProducto => this.setState({ nombreProducto })}
            ></TextIn>
            <InfoIn>Categoría de tu producto</InfoIn>
            <ContPicker>
<<<<<<< HEAD
              <PickIn
                onValueChange={value => {
                  this.setState({ value: value });
                }}
                selectedValue={this.state.value}
              >
                <Picker.Item value="" label="Elegir Categoría" />
=======
              <PickIn onValueChange={(categoria) => {this.setState({categoria});}} selectedValue={this.state.categoria}>
                <Picker.Item value="" label="Elegir Categoría"/>
>>>>>>> 2068b813b970cefc025b3783347ab28aa788482a
                <PickIn.Item
                  label="Accesorios para Vehículos"
                  value="acc-veh"
                />
                <PickIn.Item
                  label="Antigüedades y Colecciones"
                  value="ant-col"
                />
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
                <PickIn.Item
                  label="Herramientas y Construcción"
                  value="const"
                />
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
            </ContPicker>

            <InfoIn style={{ top: "9%" }}>Condición de tu producto</InfoIn>
            <RadioForm
              radio_props={radio_props}
              formHorizontal={true}
              labelHorizontal={true}
              buttonColor={"#ff4d4d"}
              selectedButtonColor={"#ff4d4d"}
              labelColor={"#353536"}
              animation={true}
<<<<<<< HEAD
              onPress={radval => {
                this.setState({ radval: radval });
=======
              onPress={estado => {
                this.setState({ estado });
>>>>>>> 2068b813b970cefc025b3783347ab28aa788482a
              }}
              initial={-1}
              style={{ top: "17%", position: "relative" }}
            />
            <InfoIn style={{ top: "10%" }}>Imagen de tu Producto</InfoIn>
            <ButtonUp>
              <TouchableOpacity
                onPress={this.pickImage}
                style={{
                  width: "100%",
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <ButtonText>Subir Imagen</ButtonText>
              </TouchableOpacity>
            </ButtonUp>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, top: "12%" }}
              />
            ) : null}

            <InfoIn style={{ top: "12%" }}>Descripcion de tu Producto</InfoIn>
            <TextInDesc
              placeholder="Máximo 200 caracteres"
              placeholderTextColor="grey"
              selectionColor="#ff4d4d"
              keyboardType="default"
              autoCapitalize="none"
              maxLength={200}
              onChangeText={descProducto => this.setState({ descProducto })}
            ></TextInDesc>
            <TextInputTiempo>Tiempo de tu producto en horas</TextInputTiempo>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                left: 345,
                top: 630,
                position: "absolute"
              }}
            >
              <Icon
                name="ios-arrow-dropright-circle"
                size={40}
                style={{ color: "#ff4d4d" }}
              ></Icon>
            </TouchableOpacity>
            <ButtonUp>
            <TouchableOpacity
                onPress={() => this.Publicar()}
                style={{
                  width: "100%",
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <ButtonText>Publicar</ButtonText>
              </TouchableOpacity>
            </ButtonUp>
          </ScrollView>
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
  top: 6.5%;
  flex: 1;
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
  top: 6%;
`;

const TextIn = styled.TextInput`
  top: 4%;
  margin-top: 15px;
  height: 50px;
  flex-direction: column;
  background: white;
  width: 80%;
  border: 1px solid #e5eced;
  box-shadow: 0px 3px 10px #e5eced;
  border-radius: 5;
  color: #353536;
  font-size: 14px;
  padding-left: 10;
`;

const TextInDesc = styled.TextInput`
  position: relative;
  top: 14%;
  height: 80px;
  flex-direction: column;
  background: white;
  width: 80%;
  border: 1px solid #e5eced;
  box-shadow: 0px 3px 10px #e5eced;
  border-radius: 5;
  color: #353536;
  font-size: 14px;
  padding-left: 10;
`;

const TextInputTiempo = styled.TextInput`
  position: relative;
  bottom: 5%;
  height: 50px;
  flex-direction: column;
  background: white;
  width: 80%;
  border: 1px solid #e5eced;
  box-shadow: 0px 3px 10px #e5eced;
  border-radius: 5;
  color: #353536;
  font-size: 14px;
  padding-left: 10;
`;

const PickIn = styled.Picker`
  height: 40px;
  flex-direction: column;
  background: white;
  width: 80%;
  border: 1px solid #e5eced;
  box-shadow: 0px 3px 10px #e5eced;
  border-radius: 5;
  color: #353536;
  font-size: 14px;
  padding-left: 10;
`;

const ContPicker = styled.View`
  top: 7%;
  width: 80%;
  background: white;
  height: 50px;
  border: 1px solid #e5eced;
  box-shadow: 0px 3px 10px #e5eced;
  border-radius: 5;
`;

const ContMaximo = styled.TextInput`
  position: relative;
  width: 22%;
  height: 50px;
  left: 29%;
  border: 1px solid #e5eced;
  box-shadow: 0px 3px 10px #e5eced;
  border-radius: 5;
  top: 5%;
`;

const ContMinimo = styled.TextInput`
  position: relative;
  bottom: 8%;
  right: 18%;
  width: 22%;
  height: 50px;
  border: 1px solid #e5eced;
  box-shadow: 0px 3px 10px #e5eced;
  border-radius: 5;
`;

const ButtonUp = styled.View`
  top: 11%;
  align-items: center;
  justify-content: center;
  background: #ff4d4d;
  width: 80%;
  height: 50px;
  border-radius: 100;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;
