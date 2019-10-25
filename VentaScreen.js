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
import SearchBox from "./components/Search";
import CountDown from "react-native-countdown-component";
import { getDistance, convertDistance } from "geolib";
import CardTienda from "./components/CardTienda";


const numColumns = 2;

export default class VentaScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null
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
    data = [
      {
        key: 0,
        image: require("./assets/shops/boca.jpeg"),
        name: "Camiseta de Boca Año 2000",
        location: "Brandsen 175",
        latit: boca.latitude,
        longit: boca.longitude,
        price: "850",
        count: "1000"
      },
      {
        key: 1,
        image: require("./assets/shops/web.jpg"),
        name: "Webcam",
        location: "Jufré 301",
        latit: web.latitude,
        longit: web.longitude,
        price: "150",
        count: "540"
      },
      {
        key: 2,
        image: require("./assets/shops/boca.jpeg"),
        name: "Camiseta de Boca Año 2000",
        location: "Brandsen 175",
        latit: boca.latitude,
        longit: boca.longitude,
        price: "850",
        count: "1000"
      },
      {
        key: 3,
        image: require("./assets/shops/boca.jpeg"),
        name: "Camiseta de Boca Año 2000",
        location: "Brandsen 175",
        latit: boca.latitude,
        longit: boca.longitude,
        price: "850",
        count: "1000"
      },
      {
        key: 4,
        image: require("./assets/shops/boca.jpeg"),
        name: "Camiseta de Boca Año 2000",
        location: "Brandsen 175",
        latit: boca.latitude,
        longit: boca.longitude,
        price: "850",
        count: "1000"
      },
    ];
  }

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
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View />;
    }
    return (
      <View>
        <TouchableOpacity><CardTienda
          key={index}
          itemImage={item.image}
          itemName={item.name}
          itemLocation={item.location}
          itemLatitude={item.latit}
          itemLongitude={item.longit}
          locLon={this.state.latitude}
          locLat={this.state.longitude}
          itemPrice={item.price}
          itemCount={item.count}
        /></TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <Container>
        <SearchBox searchPlaceholder="Buscar en la Tienda"></SearchBox>
        <ItemsContainer>
          <ComprasView><ComprasTitle><ComprasText>Más cerca tuyo</ComprasText></ComprasTitle><FlatList
            data={data}
            style={styles.container}
            renderItem={this.renderItem}
            numColumns={2}
            contentContainerStyle={{
              alignItems: "center"}}
          /></ComprasView>
        </ItemsContainer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});

const Container = styled.View`
  flex: 1;
  background-color: #fafafa;
  width: 100%;
  align-items: center;
`;

const ItemsContainer = styled.View`
  flex: 1;
  width: 90%;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
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