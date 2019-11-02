import React, { Component } from "react";
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
  Dimensions
} from "react-native";
import styled from "styled-components";
/*
export default function FetchCoord() {
  
    state =
    {
      data1:[]
    }
    
    fetchData = async() =>
    {
      console.log("Está funcionando data");
      const response = await fetch('http://192.168.0.83:3000/Map');
      const locales = await response.json();
      this.setState({data1: locales});
      console.log(JSON.stringify(data1));
      console.log(locales);
    }
    
    componentDidMount()
    {
      this.fetchData();
    }

  }*/