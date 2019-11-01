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
import Icon from "react-native-vector-icons/Ionicons";

const Search80 = props => (
  <SearchCont>
    <Search
      placeholder={props.searchPlaceholder}
      placeholderTextColor="grey"
      selectionColor="#ff4d4d"
      returnKeyType="go"
      autoCapitalize="none"
    ></Search>
    <Icon
      name="ios-search"
      size={20}
      style={{ color: "grey", top: -35, left: 19.5 }}
    />
  </SearchCont>
);
export default Search80;

const Search = styled.TextInput`
  height: 50px;
  flex-direction: column;
  background: white;
  width: 70%;
  border: 1px solid #e5eced;
  box-shadow: 0px 3px 10px #e5eced;
  border-radius: 5;
  color: #353536;
  font-size: 16px;
  padding-left: 50;
`;

const SearchCont = styled.View`
  width: 100%;
  height: 50px;
  top: 8.2%;
  left: 96%;
`;
