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

const data = [
  {
    key: 0,
    image: require("./assets/shops/boca.jpeg"),
    name: "Camiseta de Boca Año 2000",
    location: "Brandsen 175",
    price: "850",
    count: "1000"
  },
  {
    key: 1,
    image: require("./assets/shops/sias.jpg"),
    name: "Vinilo Arctic Monkeys Suck It and See",
    location: "Av. Cabildo 2040",
    price: "2.760",
    count: "9300"
  },
  {
    key: 2,
    image: require("./assets/shops/web.jpg"),
    name: "Webcam",
    location: "Jufré 301",
    price: "150",
    count: "540"
  }
];

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
        <CardTienda
          key={index}
          itemImage={item.image}
          itemName={item.name}
          itemLocation={item.location}
          itemPrice={item.price}
          itemCount={item.count}
        />
      </View>
    );
  };

  render() {
    return (
      <Container>
        <SearchBox searchPlaceholder="Buscar en la Tienda"></SearchBox>
        <ItemsContainer>
          <FlatList
            data={data}
            style={styles.container}
            renderItem={this.renderItem}
            numColumns={2}
          />
        </ItemsContainer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 90
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
