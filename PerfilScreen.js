import React, { Component } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  AsyncStorage,
  View,
  FlatList,
  Dimensions,
  Image
} from "react-native";
import CardTienda from "./components/CardTienda";
import { Header } from "react-native-elements";
import styled from "styled-components";
import Geocoder from "react-native-geocoding";
import Icon from "react-native-vector-icons/Ionicons";
import { Buffer } from "buffer";
import { NavigationEvents } from "react-navigation";
import { getDistance, convertDistance } from "geolib";

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
      selectedItem: null,
      isFetching: false,
      entro: 0
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

 

  getSessionValues = async () => {
    try {
      AsyncStorage.getItem("user")
        .then(user => {
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

  userProducts = async () => {
    fetch("http://192.168.0.238:3000/PublicacionesUsuario", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        publicador: this.state.currentUser
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.success === true) {
          console.log(JSON.parse(JSON.stringify(res.productos)));
          this.setState({ data: res.productos});
        } else {
          alert(res.message);
        }
      })
      .done();
  };

  

  componentDidMount() {
    /*navigator.geolocation.getCurrentPosition(
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
    */
    this.getSessionValues();
   
  }

  functionCombined() {}

  /*onRefresh() {
    this.setState({ isFetching: true }, function() {
      this.fetchData();
    });
  }
  */

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

  

  render() {
    console.log("Current user: " + this.state.currentUser);
    if (this.state.currentUser != "" && this.state.entro == 0) {
      this.userProducts();
      this.setState({entro: 1});
    }
   

    return (
      <Container>
        <ContTop>
          <Image
            source={require("./assets/x2.png")}
            style={{ height: 50, width: 50 }}
          ></Image>
        </ContTop>
        <AllCont>
          <TouchableOpacity
            style={{
              height: 35,
              width: 35,
              right: "6%",
              top: "2%",
              position: "absolute"
            }}
          >
            <Icon name="ios-power" size={35} style={{ color: "#ff4d4d" }} />
          </TouchableOpacity>
          <View style={{ marginBottom: "10%" }} />
          <Avatar source={require("./assets/avatar/usu.jpg")} />
          <Nombre>{this.state.currentUser}</Nombre>
          <Jerarquia>Usuario Particular</Jerarquia>
          <BotonClase>
            <BotonText>Compras/Ventas</BotonText>
          </BotonClase>
          <Actividad>Publicaciones</Actividad>
          <ComprasView>
            <FlatList
              data={this.state.data}
              renderItem={this.renderItem}
              numColumns={2}
              contentContainerStyle={{
                alignItems: "center",
                flexGrow: 1
              }}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              /*onPress={() => {
                this.props.navigation.navigate("Art", {
                  ArticleData: item.id_producto
                });
              }}*/
            />
          </ComprasView>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5eced;
`;

const Nombre = styled.Text`
  font-weight: bold;
  font-size: 24px;
  color: #353536;
  margin-bottom: 1%;
`;

const Jerarquia = styled.Text`
  font-style: normal;
  font-size: 12px;
  color: #9d9d9d;
  margin-bottom: 3%;
`;

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  background-color: black;
  border-radius: 40px;
  margin-bottom: 2%;
`;

const BotonClase = styled.TouchableOpacity`
  width: 150px;
  height: 50px;
  border-radius: 5;
  background-color: #ff4d4d;
  margin-bottom: 10%;
  align-items: center;
  justify-content: center;
`;

const BotonText = styled.Text`
  margin-top: 22px;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  font-weight: bold;
`;

const Actividad = styled.Text`
  width: 90%;
  height: 23px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 23px;
  color: #353536;
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
`;

const ContTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  top: 8.2%;
`;
