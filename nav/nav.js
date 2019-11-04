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
<<<<<<< HEAD
=======
import PabloScreen from "../PabloScreen";
>>>>>>> 8be2af7d2fdb11be902256d4cb8405d73ae4da85
import AppTab from "../AppTab";

const AppNavigator = createStackNavigator(
  {
    Start: Start,
    Home: HomeScreen,
    Register: RegScreen,
    Login: LogScreen,
    Maps: MapScreen,
    Venta: VentaScreen,
    Publi: PabloScreen,
    AppTab: AppTab
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

export default createAppContainer(AppNavigator);
