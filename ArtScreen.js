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

export default class ArtScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      dataart: [
        {
          id_producto: 0,
          image: require("./assets/shops/boca.jpeg"),
          nombreprod: "Camiseta de Boca Año 2000",
          calle: "Brandsen",
          numero: "175",
          latit: -34.6331619,
          longit: -58.3563399,
          precio: "850",
          count: "1000"
        }
      ]
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
          <ScrollView
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{
              alignItems: "center",
              flexGrow: 1,
              paddingBottom: 95
            }}
          >
            <ZoomImage
              source={require("./assets/shops/boca.jpeg")}
              Button
              imgStyle={{
                width: 200,
                height: 200,
                width: 200,
                height: 200,
                borderRadius: 8,
                top: 2
              }}
              style={styles.img}
              duration={200}
              enableScaling={false}
              easingFunc={Easing.ease}
            />
            <ItTitle>Camiseta de Boca Año 2000</ItTitle>
            <ItPriceCont>
              <ItPrice>$420</ItPrice>
            </ItPriceCont>
            <ItPubCont>
              <ItPubAv source={require("./assets/avatar/jotto.jpg")}></ItPubAv>
              <ItPubName>José Dolina</ItPubName>
            </ItPubCont>
            <ItLocCont>
              <ItLocMap>
                <TouchableOpacity
                  style={{
                    height: 50,
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <ItButtonText>Ver en Mapa</ItButtonText>
                </TouchableOpacity>
              </ItLocMap>
              <ItLocTextCont>
                <ItLocText>Brandsen 175</ItLocText>
                <ItLocText>
                  {Math.round(
                    convertDistance(
                      getDistance(
                        {
                          latitude: this.state.latitude,
                          longitude: this.state.longitude
                        },
                        {
                          latitude: -34.5959411,
                          longitude: -58.4322264
                        }
                      ),
                      "km"
                    ) * 10
                  ) /
                    10 +
                    " km"}
                </ItLocText>
              </ItLocTextCont>
            </ItLocCont>
            <ItTimeLeft>Tiempo restante:</ItTimeLeft>
            <CountDown
              size={20}
              until={1000}
              digitStyle={{ backgroundColor: "transparent" }}
              digitTxtStyle={{ color: "#353536" }}
              timeLabelStyle={{ color: "red", fontWeight: 600 }}
              separatorStyle={{ color: "#353536" }}
              timeToShow={["H", "M", "S"]}
              timeLabels={{ m: null, s: null }}
              showSeparator={true}
              style={{ top: 20 }}
            />
            <ItBuy>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 200,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <ItButtonText>Comprar</ItButtonText>
              </TouchableOpacity>
            </ItBuy>
            <ContNumIn>
              <NumericInput
                totalWidth={100}
                totalHeight={50}
                iconSize={25}
                step={1}
                valueType="real"
                rounded
                textColor="#353536"
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor="#009EF6"
                leftButtonBackgroundColor="#ff4d4d"
                minValue={0}
                initValue={1}
              />
            </ContNumIn>
            <ItDesc>
              Vendo camiseta del Club Atlético Boca Juniors del año 2000, usada
              y firmada por el jugador Juan Román Riquelme tras la victoria por
              dos goles a uno de la Copa Intercontiental ante el Real Madrid.
            </ItDesc>
          </ScrollView>
        </AllCont>
      </Container>
    );
  }
}

const styles = {
  img: {
    width: 200,
    height: 200,
    borderRadius: 8,
    top: 2
  }
};

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

const ItTitle = styled.Text`
  text-align: center;
  color: #353536;
  font-weight: bold;
  font-size: 22px;
  top: 3%;
  position: relative;
  width: 280px;
`;

const ItPriceCont = styled.View`
  width: 200px;
  top: 3%;
  position: relative;
  align-items: center;
`;

const ItPrice = styled.Text`
  font-size: 28px;
  color: #353536;
  font-weight: 100;
`;

const ItPubCont = styled.View`
  width: 200px;
  top: 4%;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItPubAv = styled.Image`
  width: 25px;
  height: 25px;
  border-radius: 13;
`;

const ItPubName = styled.Text`
  font-size: 12px;
  color: #9d9d9d;
  top: 1%;
`;

const ItLocCont = styled.View`
  width: 200px;
  top: 9%;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ItLocMap = styled.View`
  width: 100px;
  height: 50px;
  background-color: #ff4d4d;
  align-items: center;
  justify-content: center;
  border-radius: 8;
`;

const ItButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const ItLocTextCont = styled.View`
  width: 100px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItLocText = styled.Text`
  font-size: 14px;
  color: #9d9d9d;
`;

const ItBuy = styled.View`
  top: 3%;
  width: 280px;
  height: 50px;
  border-radius: 8;
  background-color: #ff4d4d;
  align-items: center;
  justify-content: center;
`;

const ContNumIn = styled.View`
  width: 200px;
  top: 5%;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

const ItTimeLeft = styled.Text`
  font-size: 18px;
  color: #353536;
  text-align: center;
  width: 200px;
  top: 6%;
`;

const ItDesc = styled.Text`
  font-size: 14px;
  color: #353536;
  text-align: left;
  width: 280px;
  top: 7%;
`;
