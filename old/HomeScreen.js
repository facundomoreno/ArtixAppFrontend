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
import styled from "styled-components";
import { SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

export default class HomeScreen extends React.Component {
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
          <MapView>
            <MapTitle>
              <MapText>Mapa de comercios</MapText>
            </MapTitle>
          </MapView>
        </MenuView>
      </Container>
    );
  }
}

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

const MapView = styled.View`
  width: 90%;
  height: 70%;
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
  height: 10%;
  background: white;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 5;
  border-top-right-radius: 5;
`;

const MapText = styled.Text`
  text-align: center;
  color: #ff4d4d;
  font-weight: bold;
  font-size: 24px;
`;
