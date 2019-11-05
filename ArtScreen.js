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
  Easing
} from "react-native";
import styled from "styled-components";
import SearchBox from "./components/Search";
import Icon from "react-native-vector-icons/Ionicons";
import { createAppContainer } from "react-navigation";
import { getDistance, convertDistance } from "geolib";
import ZoomImage from "react-native-zoom-image";
import NumericInput from "react-native-numeric-input";
import CountDown from "react-native-countdown-component";
import CardItem from "./components/CardItem";

export default class ArtScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      dataart: [
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
          precio: 850,
          count: 86400,
          desc:
            "Vendo camiseta del Club Atlético Boca Juniors del año 2000, usada y firmada por el jugador Juan Román Riquelme tras la victoria por dos goles a uno de la Copa Intercontiental ante el Real Madrid."
        },
        {
          id_producto: 1,
          stock: "30",
          cond: "Nuevo",
          image: require("./assets/shops/web.jpg"),
          nombreprod: "Webcam",
          pubavatar: require("./assets/avatar/jajas.jpg"),
          pubname: "Máximo Sánchez",
          calle: "Av. Cabildo",
          numero: "2040",
          latit: -34.5627294,
          longit: -58.4563794,
          precio: 2460,
          count: 86400,
          desc: "Webcam"
        }*/
      ],
      ArticData: 1
    };
  }

  static navigationOptions = {
    header: null,
    showIcon: true
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
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View />;
    }
    return (
      <View style={{ width: "100%" }}>
        <CardItem
          key={1}
          itemCond={item.cond}
          itemImage={item.image}
          itemTitle={item.nombreprod}
          itemPrice={item.precio}
          itemPubAv={item.pubavatar}
          itemPubName={item.pubname}
          itemLocation={item.calle + " " + item.numero}
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
          itemCount={item.count}
          itemDesc={item.desc}
          itemStock={item.stock}
        ></CardItem>
      </View>
    );
  };

  render() {
    return (
      <Container>
        <AllCont>
          <Head>
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
          </Head>
          <FlatList
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              paddingBottom: 95
            }}
            data={this.state.dataart.slice(0, 1)}
            renderItem={this.renderItem}
          ></FlatList>
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
  align-items: center;
  top: 6.5%;
  border-top-left-radius: 5;
  border-top-right-radius: 5;
  border: 1px solid #e5eced;
`;

const Head = styled.View`
  height: 50px;
  background: white;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 5;
  border-top-right-radius: 5;
`;
