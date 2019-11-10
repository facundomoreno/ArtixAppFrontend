import React, { Component } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  AsyncStorage,
  View,
  FlatList,
  Dimensions
} from "react-native";
import CardTienda from "./components/CardTienda";
import { Header } from "react-native-elements";
import styled from "styled-components";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Geocoder from "react-native-geocoding";

Geocoder.init("AIzaSyCm62Zh7VrzfYqUhKhBdZjpEWkF8Ddl2hc");
/*var location;
Geocoder.from("Av Cabildo 3500, CABA").then(json => {
  location = json.results[0].geometry.location;
  this.state.long = location.lng;
  this.state.lati = location.lat;
});*/

const numColumns = 2;

export default class PerfilScreen extends React.Component {
  static navigationOptions = {
    header: null,
    showIcon: true
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      latitude: 0,
      longitude: 0,
      error: null,
      data: [
        /*{
          id_producto: 0,
          stock: "2",
          cond: "Usado",
          image: require("./assets/shops/boca.jpeg"),
          nombreprod: "Camiseta de Boca Año 2000",
          pubavatar: require("./assets/avatar/jotto.jpg"),
          pubname: "José Dolina",
          calle: "Brandsen",
          numero: "175",
          latit: -34.6331619,
          longit: -58.3563399,
          precio: "850",
          count: 86400,
          desc:
            "Vendo camiseta del Club Atlético Boca Juniors del año 2000, usada y firmada por el jugador Juan Román Riquelme tras la victoria por dos goles a uno de la Copa Intercontiental ante el Real Madrid."
        },
        {
          id_producto: 1,
          stock: "45",
          cond: "Nuevo",
          image: require("./assets/shops/web.jpg"),
          nombreprod: "Webcam Entrepeneur",
          pubavatar: require("./assets/avatar/roca.jpg"),
          pubname: "Zongalo Maiswan",
          calle: "Echeverría",
          numero: "1964",
          latit: -34.6331619,
          longit: -58.3563399,
          precio: "360",
          count: 86400,
          desc: "Una webcam para emprendedores tecnológicos ambiciosos."
        }*/
      ],
      selectedItem: null
    };
    boca = {
      latitude: -34.6331619,
      longitude: -58.3563399
    };
    am = {
      latitude: -34.5627294,
      longitude: -58.4563794
    };
    web = {
      latitude: -34.5959411,
      longitude: -58.4322264
    };
  }

  fetchData = async () => {
    //console.log("Está funcionando data");
    const response = await fetch("http://192.168.0.238:3000/Productos");
    const productos = await response.json();
    this.setState({ data: productos });
    //console.log(JSON.stringify(this.state.data));
    //console.log(productos);
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 20000 }
    );
    this.fetchData();
  }

  functionCombined() {}

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View />;
    }
    const isSelected = this.state.selectedItem === item.id_producto;
    return (
      <View>
        <NavigationEvents onDidFocus={() => this.fetchData()} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Art", { itemx: item })}
        >
          <CardTienda
            key={item.id_producto}
            itemCond={item.estado}
            itemImage={
              (source = { uri: Buffer.from(item.imagen, "binary").toString() })
            }
            itemAvImage={require("./assets/avatar/roca.jpg")}
            itemName={item.nombreprod}
            itemLocation={item.ciudad + "\n" + item.provincia}
            itemDistance={
              Math.round(
                convertDistance(
                  getDistance(
                    {
                      latitude: this.state.latitude,
                      longitude: this.state.longitude
                    },
                    {
                      latitude: item.lat,
                      longitude: item.lng
                    }
                  ),
                  "km"
                ) * 10
              ) /
                10 +
              " km"
            }
            itemPrice={item.precio}
            itemStock={item.stock}
            itemCount={item.count}
            itemCP={item.cp}
            itemBarrio={item.barrio}
            itemCity={item.ciudad}
            itemProvince={item.provincia}
          />
        </TouchableOpacity>
      </View>
    );
  };

  componentDidMount() {
    this.getSessionValues();
  }

  getSessionValues = async () => {
    try {
      AsyncStorage.getItem("user")
        .then(user => {
          //console.log(user)
          this.setState({ currentUser: user });
        })
        .done();
    } catch (error) {
      console.log(error);
    }
  };

  _choosen(selectedItem) {
    this.setState({ selectedItem });
  }

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
            <Jerarquia>Usuario Particular</Jerarquia>
            <BotonClase>
              <BotonText>Compras/Ventas</BotonText>
            </BotonClase>
          </ContainerPerfil>

          <ContainerPerfil2>
            <Actividad>Publicaciones</Actividad>
            <ComprasView>
              <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                numColumns={2}
                contentContainerStyle={{
                  alignItems: "center",
                  flexGrow: 1,
                  paddingBottom: 45
                }}
                /*onPress={() => {
                this.props.navigation.navigate("Art", {
                  ArticleData: item.id_producto
                });
              }}*/
              />
            </ComprasView>
          </ContainerPerfil2>
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
  left: 36%;
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
  top: 10%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  elevation: 2;
  background: #ffffff;
  border-radius: 5px;
`;

const ContainerPerfil2 = styled.View`
  width: 340px;
  height: 350px;
  position: relative;
  elevation: 2;
  top: 15%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  border-radius: 5px;
`;

const BotonClase = styled.TouchableOpacity`
  position: absolute;
  width: 150px;
  height: 31px;
  left: 28%;
  top: 80%;
  border-radius: 5px;
  background-color: #7444e8;
`;

const BotonText = styled.Text`
  font-size: 15px;
  color: #ffffff;
  text-align: center;
  margin-top: 5px;
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

const ComprasView = styled.View`
  flex: 1;
  width: 90%;
  height: 100%;
  background-color: white;
  align-items: center;
  border-top-left-radius: 5;
  border-top-right-radius: 5;
  border: 1px solid #e5eced;
  top: 13%;
`;
