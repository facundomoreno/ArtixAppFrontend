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
  FlatList,
  Dimensions
} from "react-native";
import styled from "styled-components";
import SearchBox from "./components/Search";
import Icon from "react-native-vector-icons/Ionicons";
import { createAppContainer } from "react-navigation";
import CardMens from "./components/CardMens";

datamens = [
    {
        key: 0,
        image: require("./assets/shops/boca.jpeg"),
        name: "Agustina Cabo",
        mens: "¿Sabías que le re doy a Mastro?",
        time: "8 hs."
    },
    {
        key: 1,
        image:require("./assets/sxhb.png"),
        name: "Agustina Cabo",
        mens: "¿Sabías que le re doy a Mastro?",
        time: "8 hs."
    },
    {
        key: 2,
        image:require("./assets/sxhb.png"),
        name: "Agustina Cabo",
        mens: "¿Sabías que le re doy a Mastro?",
        time: "8 hs."
    }
];

export default class MensScreen extends React.Component {

    static navigationOptions = {
        header: null,
        showIcon: true
      };

      renderItem = ({ item, index }) => {
        if (item.empty === true) {
          return <View />;
        }
        return (
          <View>
            <TouchableOpacity>
                <CardMens
                    key={index}
                    mensAvatar={item.avatar}
                    mensName={item.name}
                    mensCont={item.mens}
                    mensTime={item.time}
                >
                </CardMens>
            </TouchableOpacity>
          </View>
        );
      };


    render() {
        return(
            <Container>
                <SearchBox
                searchPlaceholder="Buscar en Mensajes"
                ></SearchBox>
                <AllCont>
                    <MensTitle>
                        <MensText>Mensajes</MensText>
                    </MensTitle>
                    <FlatList
                    data={datamens}
                    style={styles.container}
                    renderItem={this.renderItem}
                    >
                    </FlatList>
                </AllCont>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    separator: {
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });

const Container = styled.View`
  flex: 1;
  background-color: #fafafa;
  width: 100%;
  align-items: center;
`;

const AllCont = styled.View`
  border-radius: 5;
  background-color: white;
  width: 90%;
  flex: 1;
  align-items: center;
  top: 6.5%;
  border-top-left-radius: 5;
  border-top-right-radius: 5;
  border: 1px solid #e5eced;
`;

const MensTitle = styled.View`
  height: 50px;
  background: white;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 5;
  border-top-right-radius: 5;
`;

const MensText = styled.Text`
  text-align: center;
  color: #ff4d4d;
  font-weight: bold;
  font-size: 20px;
`;