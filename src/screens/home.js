import React , {useState} from 'react';
import { View, Text,  Button, TouchableOpacity, Dimensions,TextInput, Platform,StyleSheet, ScrollView, StatusBar, SafeAreaView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-datepicker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Home = ({ navigation }) => {

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>c'est parti!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    Félicitation, votre enregistrement a été un succès
                </Text>

                <TouchableOpacity
                 onPress={() => navigation.navigate('Inscription3')}
                >
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold', paddingTop: 20}]}>
                    {" "}Enregistrer les informations supplémentaires
                    </Text>
                </TouchableOpacity>
                
            </View>
        </Animatable.View>
      </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#1D2E3F'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 30
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        justifyContent: 'center',
    },
    color_textPrivate: {
        color: 'grey'
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
  });










  