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
import PubliScreen from "../PubliScreen";

const activeColor = "#ff4d4d";
const inactiveColor = "#b8bece";

const Tienda = createStackNavigator({
  Venta: VentaScreen,
  Publi: PubliScreen
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
  /*} const Mens = createStackNavigator({
    
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
}*/
}

{
  /*const Perfil = createStackNavigator({
    
  });

  Perfil.navigationOptions = {
    tabBarLabel: "Perfil",
    showLabel: false,
    tabBarIcon: ({ focused }) => (
      <Ionicons
       name="ios-person"
       size={26} account-multiple

       color={focused ? activeColor : inactiveColor} 
       
      />
    )
}*/
}

const TabNavigator = createBottomTabNavigator(
  {
    Tienda,
    HomeStack
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
