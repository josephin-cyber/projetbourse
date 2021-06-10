import React, { useState, useRef } from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, TextInput, Platform, StyleSheet, ScrollView, StatusBar, SafeAreaView, Image } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-datepicker';

import Home from '../home';

const SignUpScreen2 = ({ navigation, changeMoney, submit, goBack }) => {
    console.log(submit);
    const [money, setMoney] = useState("");

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <TouchableOpacity
                onPress={() => goBack()}
                >
                <FontAwesome
                    name="arrow-left"
                    color="#fff"
                    size={25}
                    style={{paddingBottom:30}}
                />
                </TouchableOpacity>
               
                <Text style={styles.text_header}>Modalités</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>

                    <Text style={styles.text_footer, {
                        color: '#05375a',
                        fontSize: 18
                    }}>Mode de paiement</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="money"
                            color="#05375a"
                            size={20}
                        />
                        <Text
                            style={{ marginLeft: 15 }}
                        >
                            <RNPickerSelect
                                placeholder={{ label: "Selectionnes le mode de paiment", value: null }}
                                onValueChange={(money) => changeMoney(money)}
                                style={styles.textInput}
                                items={[
                                    { label: "Mpesa", value: "Mpesa" },
                                    { label: "Airtelmoney", value: "Airtelmoney" },
                                    { label: "Afrimoney", value: "Afrimoney" },
                                    { label: "Orangemoney", value: "Orangemoney" }
                                ]}
                            />
                        </Text>

                    </View>
                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            En souscrivant au service, votre compte sera crédité de
                </Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>1$</Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() =>
                                submit() 
                            }
                            style={[styles.signIn, {
                                borderColor: '#1D2E3F',
                                borderWidth: 1,
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#1D2E3F'
                            }]}>Souscrire
                                </Text>

                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignUpScreen2;

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
        fontSize: 22,
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