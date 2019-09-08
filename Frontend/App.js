import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import ImageOverlay from "react-native-image-overlay";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
      <ScrollView>

      <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('./logo3.png')
                : require('./assets/images/robot-prod.png')
            }
            style={{width: 260, height: 260}}
          />
        </View>



          

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          <Text style={styles.textContainer}>Welcome to DatsMaSeat. Click on a following library to continue</Text>
      <View style={styles.pictureContainer}>
          <Image
            source={
              __DEV__
                ? require('./lindy.jpg')
                : require('./assets/images/robot-prod.png')
            }
            style={{width: 400, height: 180}}
          />
        </View>
          
        
        <View style={styles.buttonContainer}>
            <Button

              title="Linderman"

              onPress={() => this.props.navigation.navigate('Fml')}
            />
        </View>

         <View style={styles.pictureContainer}>
          <Image
            source={
              __DEV__
                ? require('./fml.jpg')
                : require('./assets/images/robot-prod.png')
            }
            style={{width: 400, height: 180}}
          />
        </View>
          
        <View style={styles.buttonContainer}>
        <Button
          title="FML"
          onPress={() => this.props.navigation.navigate('Fml')}
        />
        </View>


      
      
      </View>


      </ScrollView>

      </View>


    );

  }
}

class FmlScreen extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>

      <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
          <Text style={styles.textContainer}>Pick a floor to continue</Text>
        <View style={styles.pictureContainer}>
          <Image
            source={
              __DEV__
                ? require('./fmlcafe.png')
                : require('./assets/images/robot-prod.png')
            }
            style={{width: 400, height: 180}}
          />
        </View>
          
         <View style={styles.buttonContainer}>
        <Button
          title="Cafe"
          onPress={() => this.props.navigation.navigate('Floor')}
        />
        </View>


         <View style={styles.pictureContainer}>
          <Image
            source={
              __DEV__
                ? require('./fmlfloor1.jpg')
                : require('./assets/images/robot-prod.png')
            }
            style={{width: 400, height: 180}}
          />
        </View>
          
        <View style={styles.buttonContainer}>
        <Button
          title="First Floor"
          onPress={() => this.props.navigation.navigate('Fml')}
        />
        </View>

         <View style={styles.pictureContainer}>
          <Image
            source={
              __DEV__
                ? require('./fmlfloor2.jpg')
                : require('./assets/images/robot-prod.png')
            }
            style={{width: 400, height: 180}}
          />
        </View>
          
        <View style={styles.buttonContainer}>
        <Button
          title="Second Floor"
          onPress={() => this.props.navigation.navigate('Fml')}
        />
        </View>

      </View>


      </ScrollView>
      </View>
    );
  }
}

function takesJson(json) {
  //console.log("hello");
  console.log(json);
  if (json.state <= 1)
  {
    return true;
  }
  else return false;
}

class FloorScreen extends React.Component {


  render() {

    //arrayOfJson = getSeats2FromApi();
    //console.log(arrayOfJson)
    //seat1Open = takesJson(arrayOfJson[0])
    return (
      <View style={styles.mainContainer}>

      <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


        <ImageOverlay
          source={ __DEV__
                ? require('./fmlcafe.png')
                : require('./assets/images/robot-prod.png')}
           
          contentPosition="bottom">

            <View>
                
                <Text style={styles.textContainer}>Welcome to the Cafe</Text>
                
            </View>

        </ImageOverlay>
        
          <Text style={styles.textContainer}>Pick a seat to continue</Text>
        <View style={styles.floorPictureContainer}>
          <Image
            source={
              __DEV__
                ? require('./desks2.png')
                : require('./assets/images/robot-prod.png')
            }
            style={{width: 400, height: 800}}
          />
        </View>
          
         <View style={styles.buttonContainer}>
        <Button
          title="Seat1"
          onPress={() => this.props.navigation.navigate('Seat')}
        />
        </View>

        <View style={styles.buttonContainer}>
        <Button
          title="Seat2"
          onPress={() => this.props.navigation.navigate('Seat')}
        />
        </View>

        <View style={styles.buttonContainer}>
        <Button
          title="Seat3"
          onPress={() => this.props.navigation.navigate('Seat')}
        />
        </View>


      </View>


      </ScrollView>
      </View>
    );
  }
}


   function getSeatsFromApi() {
     return fetch('http://pennapps19-myseat.herokuapp.com/sensor')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
    }

  async function getSeats2FromApi() {
  try {
    let response = await fetch(
      'https://pennapps10-myseat.herokuapp.com/sensor',
    );
    let responseJson = await response.json();
    return responseJson.state;
  } catch (error) {
    console.error(error);
  }
}

var allData = {
  1: true,
  2: false,
  3: false
}

class StateColor extends Component {
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          ...styles.square,
          backgroundColor: this.props.isRed ? 'red' : 'green'
        }}
      />
    );
  }
}

class SeatScreen extends React.Component {

  getData = (id) => allData[id]

  render() {
    var chairIds = [
      1, 2, 3, 4
    ]


    return (
      <View>
      <View>
        <Text style={styles.welcome}>das my seat</Text>
        </View>
        <View style ={{flex: 1, flexDirection: 'row', textAlign: 'center', justifyContent: 'center', marginTop: 100}}>
        <StateColor key={chairIds[0]} isRed={this.getData(chairIds[0])}>
          </StateColor>
        <StateColor key={chairIds[1]} isRed={this.getData(chairIds[1])}>
          </StateColor>
      </View>
      </View>
    );
  }
}



const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Fml: FmlScreen,
    Floor: FloorScreen,
    Seat: SeatScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // Set content's vertical alignment.
    justifyContent: 'center',
    // Set content's horizontal alignment.
    //alignItems: 'center',
    // Set hex color code here.
    backgroundColor: '#808080',
  },
  floorContainer:{
       flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  blue: {
    color: 'steelblue',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  floorPictureContainer:{
     backgroundColor: 'steelblue',
    borderColor: 'white',
    borderWidth: 0,
    borderRadius: 5,
    color: 'skyblue',
    fontSize: 18,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',

  },
  pictureContainer:{
     backgroundColor: 'steelblue',
    borderColor: 'white',
    borderWidth: 0,
    borderRadius: 5,
    color: 'skyblue',
    fontSize: 18,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',

  },
  textContainer:{
    
    color: 'skyblue',
    fontSize: 18,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',

  },
  buttonContainer: {
     backgroundColor: 'skyblue',
    borderColor: 'white',
    borderWidth: 0,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },



});
