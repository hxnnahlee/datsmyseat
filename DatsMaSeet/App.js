import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
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
                ? require('./logo2.png')
                : require('./assets/images/robot-prod.png')
            }
            style={{width: 300, height: 200}}
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

      <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Fml Screen</Text>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('./fmlcafe.png')
                : require('./assets/images/robot-prod.png')
            }
            style={{width: 400, height: 180}}
          />
        </View>
          
        
        <Button
          title="Cafe"
          onPress={() => this.props.navigation.navigate('Fml')}
        />
         <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('./fmlfloor1.jpg')
                : require('./assets/images/robot-prod.png')
            }
            style={{width: 400, height: 180}}
          />
        </View>
          
        
        <Button
          title="First Floor"
          onPress={() => this.props.navigation.navigate('Fml')}
        />

         <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('./fmlfloor2.jpg')
                : require('./assets/images/robot-prod.png')
            }
            style={{width: 400, height: 180}}
          />
        </View>
          

        <Button
          title="Second Floor"
          onPress={() => this.props.navigation.navigate('Fml')}
        />

      </View>


      </ScrollView>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Fml: FmlScreen,
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
