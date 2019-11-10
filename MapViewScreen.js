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
import SearchBox from "./components/Search";

export default class MapViewScreen extends React.Component {
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
              latitude: Object.values(this.state.artdata.lat),
              longitude: Object.values(this.state.artdata.lng)
            }}
            title={Object.values(this.state.artdata.nombreprod)}
          />
        </MapView>
      </Container>
    );
  }
}

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
