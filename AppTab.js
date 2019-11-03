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
import AppNavigator from "./nav/nav2";
import HomeScreen from "./HomeScreen";

console.disableYellowBox = true;

class AppTab extends React.Component {
  render() {
    return <AppNavigator />;
  }
}

export default AppTab;
