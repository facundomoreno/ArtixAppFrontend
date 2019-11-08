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
import styled from "styled-components";
import CountDown from "react-native-countdown-component";
import { getDistance, convertDistance } from "geolib";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { RadioButton } from "react-native-paper";
import Geocoder from "react-native-geocoding";

Geocoder.init("AIzaSyCm62Zh7VrzfYqUhKhBdZjpEWkF8Ddl2hc");

export default class PabloScreen extends React.Component {
  constructor(props) {
    super(props);
    this.Publicar = this.Publicar.bind(this);
    this.state = {
      currentUser:"",
      categoria: "",
      nombreProducto: "",
      precio: "",
      estado: "",
      descProducto: "",
      categoria: "",
      calle: "",
      numero: "",
      cp: "",
      provincia: "",
      ciudad: "",
      barrio: "",
      imagen: "",
      stock: "",
      count: 86400,
      publicador:"",
      // value: "",
      checked: "",
      lat: "",
      lng: ""
    };
  }

  static navigationOptions = {
    header: null,
    showIcon: true
  };

  componentDidMount(){
    this.getSessionValues();
    console.log("valor: " + this.state.publicador)
    
    
  }

  getSessionValues = async () =>{
    try{
      AsyncStorage.getItem('user').then((user)=>{
        console.log(user)
        this.setState({publicador: user});
        
      }).done();
    }
    catch(error){
      console.log(error);
    }
  };

  Publicar = () => {
   Geocoder.from(
      this.state.calle +
        " " +
        this.state.numero +
        " " +
        this.state.cp +
        ", " +
        this.state.barrio +
        ", " +
        this.state.ciudad +
        ", " +
        this.state.provincia +
        "Argentina"
    ).then(json => {
      var location = json.results[0].geometry.location;
      this.state.lat = location.lat;
      this.state.lng = location.lng;
      console.log(this.state.lat);
    });
    
    fetch("http://35.237.172.249:3000/Publicar", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombreProducto: this.state.nombreProducto,
        precio: this.state.precio,
        estado: this.state.estado,
        descProducto: this.state.descProducto,
        categoria: this.state.categoria,
        numero: this.state.numero,
        cp: this.state.cp,
        provincia: this.state.provincia,
        ciudad: this.state.ciudad,
        barrio: this.state.barrio,
        imagen: this.state.imagen,
        stock: this.state.stock,
        count: this.state.count,
        publicador: this.state.publicador,
        calle: this.state.calle,
        lat: this.state.lat,
        lng: this.state.lng
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
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true
    });

    //console.log(result);

    if (!result.cancelled) {
      this.setState({ imagen: "data:image/jpeg;base64," + result.base64 });
      console.log("Esto es lo que quiero ver" + JSON.stringify(result));
    }
  };

  render() {
    let { imagen } = this.state;
    /*Geocoder.from(
      this.state.calle +
        " " +
        this.state.numero +
        " " +
        this.state.cp +
        ", " +
        this.state.barrio +
        ", " +
        this.state.ciudad +
        ", " +
        this.state.provincia +
        "Argentina"
    )
      .then(json => {
        var location = json.results[0].geometry.location;
        console.log(location);
      })*/
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
              paddingBottom: 280
            }}
          >
            <InfoIn style={{ top: "0%" }}>Título de tu producto</InfoIn>
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
              <PickIn
                onValueChange={categoria => {
                  this.setState({ categoria });
                }}
                selectedValue={this.state.categoria}
              >
                <Picker.Item value="" label="Elegir Categoría" />
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
                <PickIn.Item label="Industrias y Oficinas" value="ind-ofi" />
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
            <InfoIn>Condición de tu producto</InfoIn>
            <RadioButtonCont>
              <RadioButtonCont2>
                <RadioButton
                  value="Nuevo"
                  uncheckedColor={"#9d9d9d"}
                  color={"#ff4d4d"}
                  status={
                    this.state.estado === "Nuevo" ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    this.setState({ estado: "Nuevo" });
                  }}
                />
                <Text>Nuevo</Text>
              </RadioButtonCont2>
              <RadioButtonCont2>
                <RadioButton
                  value="Usado"
                  uncheckedColor={"#9d9d9d"}
                  color={"#ff4d4d"}
                  status={
                    this.state.estado === "Usado" ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    this.setState({ estado: "Usado" });
                  }}
                />
                <Text>Usado</Text>
              </RadioButtonCont2>
            </RadioButtonCont>
            {/*<RadioForm
              radio_props={[{ label: "Nuevo  ", value: 0 }, { label: "Usado", value: 1 }]
            }
              formHorizontal={true}
              labelHorizontal={true}
              buttonColor={"#ff4d4d"}
              selectedButtonColor={"#ff4d4d"}
              labelColor={"#353536"}
              animation={true}
              onPress={estado => {
                this.setState({ estado });
              }}
              initial={-1}
              style={{top: "1%", position: "relative", marginBottom: "8%", width: 200, alignItems: "center" }}
            />*/}
            <InfoIn>Imagen de tu Producto</InfoIn>
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
            {imagen ? (
              <Image
                source={{ uri: imagen }}
                style={{ width: 100, height: 100, top: "2%" }}
              />
            ) : null}
            <VoidContSep></VoidContSep>
            <InfoIn>Descripción de tu Producto</InfoIn>
            <TextInDesc
              placeholder="Máximo 200 caracteres"
              placeholderTextColor="grey"
              selectionColor="#ff4d4d"
              keyboardType="default"
              autoCapitalize="none"
              maxLength={200}
              onChangeText={descProducto => this.setState({ descProducto })}
              multiline={true}
              style={{ textAlignVertical: "top" }} 
            ></TextInDesc>
            <InfoIn>Precio de tu producto</InfoIn>
            <TextInTMCont>
              <DolTM>$</DolTM>
              <TextInTM
                selectionColor="#ff4d4d"
                placeholderTextColor="grey"
                keyboardType="decimal-pad"
                ref={input => {
                  this.secTxtInp = input;
                }}
                onSubmitEditing={() => {
                  this.thiTxtInp.focus();
                }}
                blurOnSubmit={false}
                returnKeyType="next"
                onChangeText={precio => this.setState({ precio })}
              ></TextInTM>
            </TextInTMCont>
            <InfoIn style={{ top: "3%" }}>Stock de tu producto</InfoIn>
            <TextInTMCont style={{ top: "8%" }}>
              <TextInTM
                keyboardType="decimal-pad"
                ref={input => {
                  this.thiTxtInp = input;
                }}
                blurOnSubmit={false}
                returnKeyType="next"
                onChangeText={stock => this.setState({ stock })}
              ></TextInTM>
            </TextInTMCont>
            <View
              style={{
                top: "5%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <InfoInUb>Calle</InfoInUb>
              <TextInUb
                ref={input => {
                  this.calTxtInp = input;
                }}
                onSubmitEditing={() => {
                  this.numTxtInp.focus();
                }}
                blurOnSubmit={false}
                returnKeyType="next"
                onChangeText={calle => this.setState({ calle })}
              ></TextInUb>
              <NumDeptTextUb>
                <InfoInNumDeptUb style={{ width: "25%" }}>
                  Número
                </InfoInNumDeptUb>
                <InfoInNumDeptUb style={{ width: "50%" }}>
                  Código Postal
                </InfoInNumDeptUb>
              </NumDeptTextUb>
              <NumDeptUb>
                <TextInNumUb
                  keyboardType="decimal-pad"
                  ref={input => {
                    this.numTxtInp = input;
                  }}
                  onSubmitEditing={() => {
                    this.codTxtInp.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  onChangeText={numero => this.setState({ numero })}
                ></TextInNumUb>
                <TextInNumUb
                  style={{ width: "50%" }}
                  ref={input => {
                    this.codTxtInp = input;
                  }}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  onChangeText={cp => this.setState({ cp })}
                ></TextInNumUb>
              </NumDeptUb>
              <InfoInUb>Provincia</InfoInUb>
              <ContPicker style={{ marginBottom: "9%" }}>
                <PickIn
                  onValueChange={provincia => {
                    this.setState({ provincia });
                  }}
                  selectedValue={this.state.provincia}
                >
                  <Picker.Item value="" label="Elegir Provincia" />
                  <PickIn.Item label="Buenos Aires" value="Buenos Aires" />
                  <PickIn.Item label="Catamarca" value="Catamarca" />
                  <PickIn.Item
                    label="Ciudad Autónoma de Buenos Aires"
                    value="Ciudad Autónoma de Buenos Aires"
                  />
                  <PickIn.Item label="Chaco" value="Chaco" />
                  <PickIn.Item label="Chubut" value="Chubut" />
                  <PickIn.Item label="Córdoba" value="Córdoba" />
                  <PickIn.Item label="Corrientes" value="Corrientes" />
                  <PickIn.Item label="Entre Ríos" value="Entre Ríos" />
                  <PickIn.Item label="Formosa" value="Formosa" />
                  <PickIn.Item label="Jujuy" value="Jujuy" />
                  <PickIn.Item label="La Pampa" value="La Pampa" />
                  <PickIn.Item label="La Rioja" value="La Rioja" />
                  <PickIn.Item label="Mendoza" value="Mendoza" />
                  <PickIn.Item label="Misiones" value="Misiones" />
                  <PickIn.Item label="Neuquén" value="Neuquén" />
                  <PickIn.Item label="Río Negro" value="Río Negro" />
                  <PickIn.Item label="Salta" value="Salta" />
                  <PickIn.Item label="San Juan" value="San Juan" />
                  <PickIn.Item label="San Luis" value="San Luis" />
                  <PickIn.Item label="Santa Cruz" value="Santa Cruz" />
                  <PickIn.Item label="Santa Fe" value="Santa Fe" />
                  <PickIn.Item
                    label="Santiago del Estero"
                    value="Santiago del Estero"
                  />
                  <PickIn.Item
                    label="Tierra del Fuego, Antártida e Isla del Atlántico Sur"
                    value="Tierra del Fuego"
                  />
                  <PickIn.Item label="Tucumán" value="Tucumán" />
                </PickIn>
              </ContPicker>
              <InfoInUb>Ciudad</InfoInUb>
              <TextInUb
                ref={input => {
                  this.citTxtInp = input;
                }}
                onSubmitEditing={() => {
                  this.barTxtInp.focus();
                }}
                blurOnSubmit={false}
                returnKeyType="next"
                onChangeText={ciudad => this.setState({ ciudad })}
              ></TextInUb>
              <InfoInUb>Barrio</InfoInUb>
              <TextInUb
                ref={input => {
                  this.barTxtInp = input;
                }}
                blurOnSubmit={false}
                returnKeyType="next"
                onChangeText={barrio => this.setState({ barrio })}
              ></TextInUb>
            </View>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                left: 345,
                top: 630,
                position: "absolute"
              }}
            ></TouchableOpacity>
            <ButtonUp style={{ top: "7%" }}>
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
  font-weight: bold;
`;

const TextIn = styled.TextInput`
  top: 1%;
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
  margin-bottom: 10%;
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
  top: 1%;
  width: 80%;
  background: white;
  height: 50px;
  border: 1px solid #e5eced;
  box-shadow: 0px 3px 10px #e5eced;
  border-radius: 5;
  margin-bottom: 10%;
`;

const ButtonUp = styled.View`
  top: 1%;
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

const TextInDesc = styled.TextInput`
  top: 1%;
  position: relative;
  padding-top: 10;
  height: 100px;
  flex-direction: column;
  background: white;
  width: 80%;
  border: 1px solid #e5eced;
  box-shadow: 0px 3px 10px #e5eced;
  border-radius: 5;
  color: #353536;
  font-size: 14px;
  padding-left: 10;
  margin-bottom: 10%;
`;

const TextInTMCont = styled.View`
  width: 80%;
  height: 50px;
  align-items: center;
  flex-direction: row;
`;

const DolTM = styled.Text`
  font-size: 24px;
  text-align: center;
  justify-content: center;
  top: 2%;
  color: #353536;
`;

const TextInTM = styled.TextInput`
  width: 50%;
  height: 50px;
  margin-top: 15px;
  flex-direction: column;
  background: white;
  border: 1px solid #e5eced;
  box-shadow: 0px 3px 10px #e5eced;
  border-radius: 5;
  color: #353536;
  font-size: 18px;
  padding-left: 10;
  left: 1%;
`;

const VoidContSep = styled.View`
  width: 80%;
  height: 7%;
`;

const InfoInUb = styled.Text`
  width: 80%;
  text-align: left;
  font-size: 14px;
  color: #353536;
  font-weight: bold;
`;

const TextInUb = styled.TextInput`
  height: 50px;
  background: white;
  width: 80%;
  border: 1px solid #e5eced;
  border-radius: 5;
  color: #353536;
  font-size: 16px;
  padding-left: 10;
  margin-bottom: 8%;
`;

const TextInNumUb = styled.TextInput`
  height: 50px;
  background: white;
  width: 32%;
  border: 1px solid #e5eced;
  border-radius: 5;
  color: #353536;
  font-size: 16px;
  padding-left: 10;
`;

const NumDeptUb = styled.View`
  justify-content: space-between;
  width: 80%;
  height: 50px;
  flex-direction: row;
  margin-bottom: 8%;
`;

const NumDeptTextUb = styled.View`
  justify-content: space-between;
  width: 80%;
  flex-direction: row;
`;

const InfoInNumDeptUb = styled.Text`
  width: 80%;
  text-align: left;
  font-size: 14px;
  color: #353536;
  font-weight: bold;
`;

const RadioButtonCont = styled.View`
  width: 80%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const RadioButtonCont2 = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
