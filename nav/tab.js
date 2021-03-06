import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../HomeScreen";
import LogScreen from "../LogScreen";
import RegScreen from "../RegScreen";
import MapScreen from "../MapScreen";
import Start from "../Start";
import VentaScreen from "../VentaScreen";
import PabloScreen from "../PabloScreen";
import MensScreen from "../MensajesScreen";
import ArtScreen from "../ArtScreen";
import UbScreen from "../UbScreen";
import PerfilScreen from "../PerfilScreen";
import BuyConfirm from "../BuyConfirm";
import Payment from "../Payment";

const activeColor = "#ff4d4d";
const inactiveColor = "#b8bece";

const Tienda = createStackNavigator({
  Venta: VentaScreen,
  Publi: PabloScreen,
  Art: ArtScreen,
  Pay: Payment,
  Buy: BuyConfirm
});

Tienda.navigationOptions = {
  tabBarLabel: "Tienda",
  showLabel: false,
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-cart"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Maps: MapScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Inicio",
  showLabel: false,
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-home"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};

{
  /*const Mens = createStackNavigator({
  Mens: MensScreen
});

Mens.navigationOptions = {
  tabBarLabel: "Mensajes",
  showLabel: false,
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-mail"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};*/
}

const Perfil = createStackNavigator({
  Perf: PerfilScreen,
  ArtPerf: ArtScreen,
});

Perfil.navigationOptions = {
  tabBarLabel: "Perfil",
  showLabel: false,
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-person"
      size={26}
      account-multiple
      color={focused ? activeColor : inactiveColor}
    />
  )
};

const TabNavigator = createBottomTabNavigator(
  {
    Tienda,
    HomeStack,
    Perfil
  },
  {
    initialRouteName: "HomeStack",
    header: null,
    headerMode: "none"
  },
  {
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);

export default TabNavigator;
