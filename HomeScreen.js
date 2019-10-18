import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Permissions,
  Location
} from "react-native-maps";
import styled from "styled-components";
import { SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
//import AppNavigator from "./nav/appnav";
import CardShops from "./components/CardShops";
import { Countdown } from "react-native-countdown-text";
import { getDistance, convertDistance } from 'geolib';

export default class HomeScreen extends React.Component {

constructor(props){
  super(props);
  this.state = {
    latitude: 0,
    longitude: 0,
    error: null
  }
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
    )
  }

  render() {
    return (
      <Container>
        <SearchCont>
          <Search
            placeholder="Buscar en Solo por Hoy"
            placeholderTextColor="grey"
            selectionColor="#ff4d4d"
            returnKeyType="go"
            autoCapitalize="none"
          ></Search>
          <Icon
            name="ios-search"
            size={20}
            style={{ color: "grey", top: -35, right: 135 }}
          />
        </SearchCont>
        <MenuView>
          <MapaView>
            <MapView
              style={styles.container}
              region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
              }}
              showsUserLocation={true}
              showsCompass={false}
              rotateEnabled={false}
              pitchEnabled={false}
              provider={PROVIDER_GOOGLE}
            >
              <MapView.Marker
                coordinate={{
                  latitude: -34.5738218,
                  longitude: -58.4419544
                }}
                title={"Lulyna Showroom"}
                description={"Casa de ropa de mujer"}
              />
              <MapView.Marker
                coordinate={{
                  latitude: -34.5847971,
                  longitude: -58.4167837
                }}
                title={"Eugenia Eventos"}
                description={"Organizacion de Eventos"}
              />
            </MapView>
            <MapTitle>
              <MapText>Mapa de comercios</MapText>
            </MapTitle>
          </MapaView>
          <HourView>
            <TimerText>¡Aprovecha! Nuevo ciclo de precios en:</TimerText>
            {/*<Timer>12:20:45</Timer>}*/}
            <Countdown
              finishTime={25}
              format="{h}:{m}:{s}"
              textStyle={{
                color: "#ff4d4d",
                fontSize: 24,
                fontWeight: "600"
              }}
            />
          </HourView>
          <ShopsView>
            <ShopsTitle>
              <ShopsText>Lo último en donde estuviste</ShopsText>
            </ShopsTitle>
            <ScrollView
              style={{ marginEnd: 1 }}
              showsVerticalScrollIndicator={true}
            >
              <CardShops
                shopName="Lulyna Showroom"
                shopLocation="Ciudad de la Paz 353"
                shopDistance= {convertDistance(getDistance(
                  { latitude: -34.5847971, longitude: -58.4167837 },
                  { latitude: -34.5738218, longitude: -58.4419544 }
              ), 'km')}
                shopScore={require("./assets/score4.png")}
                shopImage={require("./assets/shops/lulyna.jpg")}
              />
              <CardShops
                shopName="Eugenia Eventos"
                shopLocation="Av. Santa Fe 3770"
                shopDistance="2 km"
                shopScore={require("./assets/score4.png")}
                shopImage={require("./assets/shops/eugeniaeventos.jpg")}
              />
              <CardShops
                shopName="Lulyna Showroom"
                shopLocation="Ciudad de la Paz 353"
                shopDistance="250 metros"
                shopScore={require("./assets/score4.png")}
                shopImage={require("./assets/shops/lulyna.jpg")}
              />
            </ScrollView>
          </ShopsView>
        </MenuView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1
  }
});

const Search = styled.TextInput`
  height: 50px;
  flex-direction: column;
  background: white;
  width: 90%;
  border: 1px solid #e5eced;
  box-shadow: 0px 3px 10px #e5eced;
  border-radius: 5;
  color: #353536;
  font-size: 16px;
  padding-left: 50;
`;

const Container = styled.View`
  flex: 1;
  background-color: #fafafa;
  width: 100%;
  align-items: center;
`;

const SearchCont = styled.View`
  width: 100%;
  height: 50px;
  align-items: center;
  top: 5%;
`;

const MapaView = styled.View`
  width: 90%;
  height: 40%;
  background-color: white;
  align-items: center;
  border-bottom-left-radius: 5;
  border-bottom-right-radius: 5;
  border: 1px solid #e5eced;
`;

const HourView = styled.View`
  top: 2%;
  width: 90%;
  height: 10%;
  background-color: white;
  border-radius: 5;
  border: 1px solid #e5eced;
  align-items: center;
  justify-content: center;
`;

const ShopsView = styled.View`
  top: 4%;
  flex: 1;
  width: 90%;
  height: 27%;
  background-color: white;
  border-radius: 5;
  border: 1px solid #e5eced;
`;

const MenuView = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  top: 6.5%;
`;

const MapTitle = styled.View`
  height: 50px;
  background: white;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 5;
  border-bottom-right-radius: 5;
`;

const MapText = styled.Text`
  text-align: center;
  color: #ff4d4d;
  font-weight: bold;
  font-size: 20px;
`;

const TimerText = styled.Text`
  text-align: center;
  color: #000000;
  font-weight: bold;
  font-size: 15px;
`;

const Timer = styled.Text`
  text-align: center;
  color: #ff4d4d;
  font-weight: bold;
  font-size: 24px;
`;

const ShopsText = styled.Text`
  text-align: center;
  color: #ff4d4d;
  font-weight: bold;
  font-size: 20px;
`;

const ShopsTitle = styled.View`
  height: 50px;
  background: white;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 5;
  border-top-right-radius: 5;
`;
