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
import SearchBox from "./components/Search";
import Icon from "react-native-vector-icons/Ionicons";

export default class MapScreen extends React.Component {
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
              latitude: eugenia.latitude,
              longitude: eugenia.longitude
            }}
            title={"Eugenia Eventos"}
            description={"Organizacion de Eventos"}
          />
        </MapView>
        <Back>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              left: "15%",
              top: "10%"
            }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon
              name="ios-arrow-back"
              size={40}
              style={{ color: "#ff4d4d" }}
            ></Icon>
          </TouchableOpacity>
        </Back>
        <ContTop>
          <Image
            source={require("./assets/x2.png")}
            style={{ height: 50, width: 50 }}
          ></Image>
        </ContTop>
      </Container>
    );
  }
}

const ContTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  top: 8.2%;
`;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute"
  }
});
const Container = styled.View`
  flex: 1;
  background-color: #fafafa;
  width: 100%;
  align-items: center;
`;

const Back = styled.View`
  width: 60px;
  height: 90px;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-bottom-right-radius: 15;
  position: absolute;
  left: 0%;
`;
