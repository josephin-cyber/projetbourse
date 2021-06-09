import React from 'react';
import { View, Text, Buttom, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import MaterialIcons from 'react-native-vector-icons/ MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { createAnimatableComponent } from 'react-native-animatable';
import * as Animatable from 'react-native-animatable';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const landingpage = ({ navigation }) => {

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Animatable.Image
        animation="slideInDown"
        iterationCount={2}
        source={require('../../assets/zandomobile.png')}
          style={style.logo}
          resizeMode="stretch"
        />
        {/* <Image
          source={require('./assets/zandomobile.png')}
          style={style.logo}
          resizeMode="stretch"
        /> */}
      </View>
      <View style={style.footer}>
        <View style={{alignItems:'center'}}>
        <Text style={style.title}>Bienvenue</Text>
        </View>
          <TouchableOpacity
                     onPress={() => navigation.navigate('Connexion')}
                    style={{
                        alignItems: 'center',
                        marginTop: 25,
                        
                    }}
                >
          <View style={style.buttom}>

         
                    <Text style={[style.textSign, {
                        color: '#1D2E3F'
                    }]}>Se connecter</Text>
                
            {/* <TouchableOpacity onPress={() => alert('Click')}>
              <Text style={{fontWeight: 'bold'}}> Connexion </Text>
            </TouchableOpacity> */}
          </View>
          </TouchableOpacity>
          <TouchableOpacity
                   onPress={() => navigation.navigate('Inscription1')}
                    style={{
                        // borderColor: '#1D2E3F',
                        // borderWidth: 1,
                        marginTop: 75,
                        alignItems: 'center',
                        
                    }}
                >
          <View style={style.buttom}>

         
                    <Text style={[style.textSign, {
                        color: '#1D2E3F'
                    }]}>S'inscrire</Text>
                
            {/* <TouchableOpacity onPress={() => alert('Click')}>
              <Text style={{fontWeight: 'bold'}}> Connexion </Text>
            </TouchableOpacity> */}
          </View>
          </TouchableOpacity>
          
      </View>

    </View>

  );
}

export default landingpage;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    backgroundColor: '#1D2E3F',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    alignItems: 'center',
  }, 
  text: {
    color: 'grey',
    marginTop: 5
  },
  buttom: {
    // alignItems: 'flex-end',
    // marginTop: 50,
    position: 'absolute',
    backgroundColor: '#c6c6c6',
    borderRadius: 10,
    width: 190,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    // marginLeft:50,
  },
  signIn: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row'
},
textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },

})




