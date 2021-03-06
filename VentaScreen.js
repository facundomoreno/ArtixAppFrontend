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
  Image
} from "react-native";
import styled from "styled-components";
import Search80 from "./components/Search80";
import CountDown from "react-native-countdown-component";
import { getDistance, convertDistance } from "geolib";
import CardTienda from "./components/CardTienda";
import Icon from "react-native-vector-icons/Ionicons";
import { createAppContainer } from "react-navigation";
import { NavigationEvents } from "react-navigation";
import { Buffer } from "buffer";
import Geocoder from "react-native-geocoding";

Geocoder.init("AIzaSyCm62Zh7VrzfYqUhKhBdZjpEWkF8Ddl2hc");
/*var location;
Geocoder.from("Av Cabildo 3500, CABA").then(json => {
  location = json.results[0].geometry.location;
  this.state.long = location.lng;
  this.state.lati = location.lat;
});*/

const numColumns = 2;

export default class VentaScreen extends React.Component {
  static navigationOptions = {
    header: null,
    showIcon: true
  };

  constructor(props) {
    super(props);
    this.state = {
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
      isFetching: false
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

  onRefresh() {
    this.setState({ isFetching: true }, function() {
      this.fetchData();
    });
  }

  fetchData = async () => {
    //console.log("Está funcionando data");
    const response = await fetch("http://35.237.172.249:3000/Productos");
    const productos = await response.json();
    this.setState({ data: productos });
    //console.log(JSON.stringify(this.state.data));
    //console.log(productos);
    this.setState({ isFetching: false });
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
            itemLocation={item.provincia}
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

  _choosen(selectedItem) {
    this.setState({ selectedItem });
  }

  render() {
    return (
      <Container>
        <ContTop>
          <Image
            source={require("./assets/x2.png")}
            style={{ height: 50, width: 50 }}
          ></Image>
        </ContTop>
        <ItemsContainer>
          <ComprasView>
            <ComprasTitle>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 40,
                  right: "3%",
                  position: "absolute"
                }}
                onPress={() => this.props.navigation.navigate("Publi")}
              >
                <Icon name="ios-add" size={40} style={{ color: "#ff4d4d" }} />
              </TouchableOpacity>
              <ComprasText>Tienda</ComprasText>
            </ComprasTitle>
            <FlatList
              data={this.state.data}
              style={styles.container}
              renderItem={this.renderItem}
              numColumns={2}
              contentContainerStyle={{
                alignItems: "center",
                flexGrow: 1,
                paddingBottom: 45
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
        </ItemsContainer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});

const Container = styled.View`
  flex: 1;
  background-color: #fafafa;
  width: 100%;
  align-items: center;
`;

const ContTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  top: 8.2%;
`;

const ItemsContainer = styled.View`
  flex: 1;
  width: 90%;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  top: -1%;
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

const ComprasTitle = styled.View`
  height: 50px;
  background: white;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 5;
  border-top-right-radius: 5;
  flex-direction: row;
`;

const ComprasText = styled.Text`
  text-align: center;
  color: #ff4d4d;
  font-weight: bold;
  font-size: 20px;
`;
