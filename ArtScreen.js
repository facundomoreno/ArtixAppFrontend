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
  Dimensions,
  Easing,
  AsyncStorage
} from "react-native";
import styled from "styled-components";
import SearchBox from "./components/Search";
import Icon from "react-native-vector-icons/Ionicons";
import { createAppContainer } from "react-navigation";
import { getDistance, convertDistance } from "geolib";
import ZoomImage from "react-native-zoom-image";
import NumericInput from "react-native-numeric-input";
import CountDown from "react-native-countdown-component";
import CardItem from "./components/CardItem";
import { Buffer } from "buffer";

export default class ArtScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      id_producto: "",
      id_usuario: "",
      dataart: [
        /*{
          id_producto: 0,
          stock: "2",
          cond: "Usado",
          image: require("./assets/shops/boca.jpeg"),
          nombreprod: "Camiseta de Boca Año 2000",
          pubavatar: require("./assets/avatar/jotto.jpg"),
          pubname: "José Dolina",
          calle: "Brandsen",
          numero: "175",
          latit: -34.6331619,
          longit: -58.3563399,
          precio: "850",
          count: 86400,
          desc:
            "Vendo camiseta del Club Atlético Boca Juniors del año 2000, usada y firmada por el jugador Juan Román Riquelme tras la victoria por dos goles a uno de la Copa Intercontiental ante el Real Madrid."
        },
        {
          id_producto: 1,
          stock: "45",
          cond: "Nuevo",
          image: require("./assets/shops/web.jpg"),
          nombreprod: "Webcam Entrepeneur",
          pubavatar: require("./assets/avatar/roca.jpg"),
          pubname: "Zongalo Maiswan",
          calle: "Echeverría",
          numero: "1964",
          latit: -34.6331619,
          longit: -58.3563399,
          precio: "360",
          count: 86400,
          desc:
            "Una webcam para emprendedores tecnológicos ambiciosos."
        }*/
      ],
      artdata: [this.props.navigation.getParam("itemx")]
      
    };
  }

  static navigationOptions = {
    header: null,
    showIcon: true
  };

  componentDidMount() {
    this.getSessionValues();
    /*navigator.geolocation.getCurrentPosition(
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
    */
    //this.setState({id_producto: this.state.artdata.id_producto})
    

  }
  getSessionValues = () =>{
    try{
      AsyncStorage.getItem('idusuario').then((idusuario)=>{
        console.log("current user id " + idusuario);
        this.setState({id_usuario: idusuario});
        
      }).done();
    }
    catch(error){
      console.log(error);
    }
  };

  Comprar = () => {
     
       
    fetch("http://192.168.0.238:3000/Comprar", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_usuario: this.state.id_usuario,
        id_producto: this.state.id_producto
        
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.success === true) {
          
          alert(res.message);
          
        } else {
          alert(res.message);
        }
      })
      .done();
  };

 

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View />;
    }

    

    

    return (
      <View style={{ width: "100%" }}>
        <CardItem
          key={1}
          itemCond={item.estado}
          itemImage={
            (source = { uri: Buffer.from(item.imagen, "binary").toString() })
          }
          itemTitle={item.nombreprod}
          itemPrice={item.precio}
          itemPubAv={require("./assets/avatar/roca.jpg")}
          itemPubName={item.publicador}
          itemLocation={item.calle + " " + item.numero}
          itemCount={item.count}
          itemCP={item.cp}
          itemBarrio={item.barrio}
          itemCity={item.ciudad}
          itemProvince={item.provincia}
          /*itemDistance={
            Math.round(
              convertDistance(
                getDistance(
                  {
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                  },
                  {
                    latitude: item.lati,
                    longitude: item.long
                  }
                ),
                "km"
              ) * 10
            ) /
              10 +
            " km"
          }*/
          itemPrice={item.precio}
          itemStock={item.stock}
          itemCount={item.count}
          itemDesc={item.ds_producto}
        ></CardItem>
      </View>
    );
  };

  render() {

    console.log(this.state.id_usuario);
    
    return (
      <Container>
        <AllCont>
          <Head>
            <TouchableOpacity
              style={{ height: 40, width: 40, left: 20, position: "absolute" }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon
                name="ios-arrow-back"
                size={40}
                style={{ color: "#ff4d4d" }}
              ></Icon>
            </TouchableOpacity>
          </Head>
          <FlatList
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              paddingBottom: 300
            }}
            data={Object.values(this.state.artdata)}
            renderItem={this.renderItem}
          ></FlatList>
        </AllCont>
      </Container>
    );
  }
}

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

const Head = styled.View`
  height: 50px;
  background: white;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 5;
  border-top-right-radius: 5;
`;
