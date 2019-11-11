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
  Image
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Permissions,
  Location
} from "react-native-maps";
import styled from "styled-components";
import Icon from "react-native-vector-icons/Ionicons";
//import AppNavigator from "./nav/appnav";
import CardShops from "./components/CardShops";
import SearchBox from "./components/Search";
import CountDown from "react-native-countdown-component";
import { getDistance, convertDistance } from "geolib";

export default class HomeScreen extends React.Component {
  goToCategoryView = () => {
    //Replace here push with resetTo
    this.props.navigator.resetTo({
      title: "Home",
      component: HomeScreen
    });
  };

  static navigationOptions = {
    header: null,
    showIcon: true
  };

  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null
    };
    lulyna = {
      latitude: -34.5738218,
      longitude: -58.4419544
    };
    eugenia = {
      latitude: -34.5847971,
      longitude: -58.4167837
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

  render() {
    return (
      <Container>
        <ContTop>
          <Image
            source={require("./assets/x2.png")}
            style={{ height: 50, width: 50 }}
          ></Image>
          
        </ContTop>
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
                  latitude: lulyna.latitude,
                  longitude: lulyna.longitude
                }}
                title={"Lulyna Showroom"}
                description={"Casa de ropa de mujer"}
              />
              <MapView.Marker
                coordinate={{
                  latitude: -34.5477715,
                  longitude: -58.4778473
                }}
                title={"Garbarino"}
                description={"Local de tecnología y electrodomésticos"}
              />
              <MapView.Marker
                coordinate={{
                  latitude: eugenia.latitude,
                  longitude: eugenia.longitude
                }}
                title={"Eugenia Eventos"}
                description={"Organizacion de Eventos"}
              />
            </MapView>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Maps")}
            >
              <MapTitle>
                <MapText>Mapa de comercios</MapText>
              </MapTitle>
            </TouchableOpacity>
          </MapaView>
          <HourView>
            <TimerText>¡Aprovecha! Nuevo ciclo de precios en:</TimerText>
            {/*<Timer>12:20:45</Timer>}*/}
            <CountDown
              size={20}
              until={86400}
              onFinish={() => alert("Finished")}
              digitStyle={{ backgroundColor: "transparent" }}
              digitTxtStyle={{ color: "#ff4d4d" }}
              timeLabelStyle={{ color: "red", fontWeight: 600 }}
              separatorStyle={{ color: "#ff4d4d" }}
              timeToShow={["H", "M", "S"]}
              timeLabels={{ m: null, s: null }}
              showSeparator={true}
              style={{ position: "absolute", top: 10 }}
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
                shopDistance={
                  Math.round(
                    convertDistance(
                      getDistance(
                        {
                          latitude: this.state.latitude,
                          longitude: this.state.longitude
                        },
                        {
                          latitude: lulyna.latitude,
                          longitude: lulyna.longitude
                        }
                      ),
                      "km"
                    ) * 10
                  ) /
                    10 +
                  " km"
                }
                //shopScore={require("./assets/score4.png")}
                shopImage={require("./assets/shops/lulyna.jpg")}
              />
              <CardShops
                shopName="Garbarino"
                shopLocation="Av. Cabildo 2027"
                shopDistance={
                  Math.round(
                    convertDistance(
                      getDistance(
                        {
                          latitude: this.state.latitude,
                          longitude: this.state.longitude
                        },
                        {
                          latitude: -34.5477715,
                          longitude: -58.4778473
                        }
                      ),
                      "km"
                    ) * 10
                  ) /
                    10 +
                  " km"
                }
                //shopScore={require("./assets/score4.png")}
                shopImage={require("./assets/shops/garbarino.jpg")}
              />
              <CardShops
                shopName="Eugenia Eventos"
                shopLocation="Av. Santa Fe 3770"
                shopDistance={
                  Math.round(
                    convertDistance(
                      getDistance(
                        {
                          latitude: this.state.latitude,
                          longitude: this.state.longitude
                        },
                        {
                          latitude: eugenia.latitude,
                          longitude: eugenia.longitude
                        }
                      ),
                      "km"
                    ) * 10
                  ) /
                    10 +
                  " km"
                }
                //shopScore={require("./assets/score4.png")}
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
  top: -25%;
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
