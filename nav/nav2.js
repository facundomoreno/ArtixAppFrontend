import React, { Component } from "react";
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
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../HomeScreen";
import LogScreen from "../LogScreen";
import RegScreen from "../RegScreen";
import MapScreen from "../MapScreen";
import Start from "../Start";
import VentaScreen from "../VentaScreen";
import TabNavigator from "./tab";
import UbScreen from "../UbScreen";

const AppNavigator = createStackNavigator(
  {
    Start: Start,
    Home: HomeScreen,
    Register: RegScreen,
    Login: LogScreen,
    Maps: MapScreen,
    Venta: VentaScreen,
    Publi: PabloScreen,
    Ub: UbScreen
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  },
  {
    initialRouteName: "Start"
  }
);

export default createAppContainer(TabNavigator);
