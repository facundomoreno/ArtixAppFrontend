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
  Dimensions
} from "react-native";
import styled from "styled-components";
import Search80 from "./components/Search80";
import CountDown from "react-native-countdown-component";
import { getDistance, convertDistance } from "geolib";
import CardTienda from "./components/CardTienda";
import Icon from "react-native-vector-icons/Ionicons";
import { createAppContainer } from "react-navigation";
import { NavigationEvents } from "react-navigation";

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
          image: require("./assets/shops/boca.jpeg"),
          nombreprod: "Camiseta de Boca Año 2000",
          calle: "Brandsen",
          numero: "175",
          latit: -34.6331619,
          longit: -58.3563399,
          precio: 850,
          count: 86400
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
    console.log("Está funcionando data");
    const response = await fetch("http://35.237.172.249:3000/Productos");
    const productos = await response.json();
    this.setState({ data: productos });
    console.log(JSON.stringify(this.state.data));
    console.log(productos);
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

  functionCombined() {

      };

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View />;
    }
    const isSelected = (this.state.selectedItem === item.id_producto);
    return (
      
      <View>
        <NavigationEvents onDidFocus={() => this.fetchData()} />
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Art", {itemx: item})}>
          <CardTienda
            key={item.id_producto}
            itemImage={(source = { uri: item.imagen })}
            itemName={item.nombreprod}
            //itemLocation={item.calle + " " + item.numero}
            itemDistance={
              Math.round(
                convertDistance(
                  getDistance(
                    {
                      latitude: this.state.latitude,
                      longitude: this.state.longitude
                    },
                    {
                      latitude: -34.6331619,
                      longitude: -58.3563399
                    }
                  ),
                  "km"
                ) * 10
              ) /
                10 +
              " km"
            }
            locLon={this.state.latitude}
            locLat={this.state.longitude}
            itemPrice={item.precio}
            itemStock={item.stock}
            itemCount={item.count}
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
          <Search80 searchPlaceholder="Buscar en la Tienda"></Search80>
          <TouchableOpacity
            style={{ height: 40, width: 40, top: 30, left: -30 }}
            onPress={() => this.props.navigation.navigate("Publi")}
          >
            <Icon name="ios-add" size={40} style={{ color: "#ff4d4d" }} />
          </TouchableOpacity>
        </ContTop>
        <ItemsContainer>
          <ComprasView>
            <ComprasTitle>
              <ComprasText>Más cerca tuyo</ComprasText>
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
`;

const ComprasText = styled.Text`
  text-align: center;
  color: #ff4d4d;
  font-weight: bold;
  font-size: 20px;
`;
