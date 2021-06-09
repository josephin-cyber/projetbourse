import React, { useState, useRef } from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, TextInput, Platform, StyleSheet, ScrollView, StatusBar, SafeAreaView, Image } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const SignUpScreen3 = ({ navigation }) => {


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [categorie, setCategorie] = useState("");
    const [niveau, setNiveau] = useState("");
    const [option, setOption] = useState("");
    const [province, setProvince] = useState("");

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn(date);
        hideDatePicker();
    };

    const enrLieuDeNaissance = (Lieu) =>{
        console.log(Lieu);

    }
    const [data, setData] = React.useState({
        lieu_de_naissance: '',
        categorie: '',
        niveau: '',
        option: '',
        adresse: '',
        province: '',
        ville: '',
        check_textInputChange: false,
    });


    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                lieu_de_naissance: val,
                categorie: val,
                niveau: val,
                option: val,
                adresse: val,
                province: val,
                ville: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                lieu_de_naissance: val,
                categorie: val,
                niveau: val,
                option: val,
                adresse: val,
                province: val,
                ville: val,
                check_textInputChange: false
            });
        }
    }

    const enregistrer = ()=>{
        console.log(data);
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Informations suplémentaires</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <Text style={styles.text_footer}>Lieu de naissance</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="map"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Ton lieu de naissance"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setData({...data, lieu_de_naissance: val})}
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
                    <Text style={styles.text_footer, {
                        marginTop: 35, color: '#05375a',
                        fontSize: 18
                    }}>Date de naissance</Text>
                    <View style={styles.action}>
                        <TouchableOpacity
                        onPress={showDatePicker}
                        >
                        <FontAwesome
                            name="calendar"
                            color="#05375a"
                            size={20}
                        />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        
                    </View>

                    <Text style={styles.text_footer, {
                        marginTop: 35, color: '#05375a',
                        fontSize: 18
                    }}>Catégorie</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <Text
                            style={{ marginLeft: 15 }}
                        >
                            <RNPickerSelect
                                placeholder={{ label: "Selectionnes ta catégorie", value: null }}
                                onValueChange={(categorie) => setCategorie(categorie)}
                                style={styles.textInput}
                                items={[
                                    { label: "Elève", value: "Elève" },
                                    { label: "Etudiant", value: "Etudiant" },
                                    { label: "Chercheur", value: "Chercheur" }
                                ]}
                            />
                        </Text>

                    </View>
                    <Text style={styles.text_footer, {
                        marginTop: 35, color: '#05375a',
                        fontSize: 18
                    }}>niveau</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <Text
                            style={{ marginLeft: 15 }}
                        >
                            <RNPickerSelect
                                placeholder={{ label: "Selectionnes ton niveau", value: null }}
                                onValueChange={(niveau) => setNiveau(niveau)}
                                style={styles.textInput}
                                items={[
                                    { label: "Graduat", value: "Graduat" },
                                    { label: "D6", value: "D6" },
                                    { label: "Master", value: "Master" }
                                ]}
                            />
                        </Text>

                    </View>
                    <Text style={styles.text_footer, {
                        marginTop: 35, color: '#05375a',
                        fontSize: 18
                    }}>Option</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <Text
                            style={{ marginLeft: 15 }}
                        >
                            <RNPickerSelect
                                placeholder={{ label: "Selectionnes ton niveau", value: null }}
                                onValueChange={(option) => setOption(option)}
                                style={styles.textInput}
                                items={[
                                    { label: "Littéraire", value: "Littéraire" },
                                    { label: "Commercial", value: "Commercial" },
                                    { label: "Pédagogie", value: "Pédagogie" }
                                ]}
                            />
                        </Text>

                    </View>
                    
                    <Text style={styles.text_footer, {
                        marginTop: 35, color: '#05375a',
                        fontSize: 18
                    }}>Province</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <Text
                            style={{ marginLeft: 15 }}
                        >
                            <RNPickerSelect
                                placeholder={{ label: "Selectionnes ta province", value: null }}
                                onValueChange={(province) => setOption(province)}
                                style={styles.textInput}
                                items={[
                                    { label: "Maniema", value: "Maniema" },
                                    { label: "Kinshasa", value: "Kinshasa" },
                                    { label: "Nord-Kivu", value: "Nord-Kivu" }
                                ]}
                            />
                        </Text>

                    </View>

                    <Text style={styles.text_footer}>Adresse</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="map"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Ton adresse"
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


                    <View style={styles.button}>
                        <TouchableOpacity
                            // onPress={() => navigation.navigate('Home')}
                            onPress={() => enregistrer()}
                            style={[styles.signIn, {
                                borderColor: '#1D2E3F',
                                borderWidth: 1,
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#1D2E3F'
                            }]}>Enregistrer</Text>

                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignUpScreen3;

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