import React , {useState} from 'react';
import { View, Text,  Button, TouchableOpacity, Dimensions,TextInput, Platform,StyleSheet, ScrollView, StatusBar, SafeAreaView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-datepicker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const SignInScreen = ({ navigation }) => {

    const [date, setDate] = useState('09-10-2020');
const [data, setData] = React.useState({
        nom: '',
        pwd: '',
        check_textInputChange: false,
        secureTextEntry: true,
    });

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                nom: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                nom: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            pwd: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Connectes-toi</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Nom</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Ton nom"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
             
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Mot de passe</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Ton postnom"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    Mot de passe oubli???
                </Text>
                <TouchableOpacity>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold', paddingTop: 20}]}>
                    {" "}Cliquez pour r??initialiser votre mot de passe
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>

                <TouchableOpacity
                     onPress={() => navigation.navigate('Home')}
                    style={[styles.signIn, {
                        borderColor: '#1D2E3F',
                        borderWidth: 1,
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#1D2E3F'
                    }]}>Connexion</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    Vous ne disposez pas de compte?
                </Text>
                <TouchableOpacity
                 onPress={() => navigation.navigate('Inscription1')}
                >
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold', paddingTop: 20}]}>
                    {" "}Cliquez pour vous inscrire
                    </Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

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










  