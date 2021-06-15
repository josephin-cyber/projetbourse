import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, TextInput, Platform, StyleSheet, ScrollView, StatusBar, SafeAreaView, Image } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import instance from '../api/axios';
import requests from '../api/request';



export default function SignUpScreen3 ({ navigation }) {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [listecategorie, setListecategorie] = useState([]);
    const [listeniveau, setListeniveau] = useState([]);
    const [listeprovince, setListeprovince] = useState([]);
    const [listeoption, setListeoption] = useState([]);
    const [listecommune, setListecommune] = useState([]);

    const [data, setData] = React.useState({
        lieuDeNaissance: '',
        dateDeNaissance: '',
        ecole: '',
        categorie: '',
        niveau: '',
        province: '',
        option: '',
        commune: '',
        email:'',
        check_textInputChange: false,
    });

    const [erreur, setErreur] = React.useState({
        Erreurlieudenaissance:'',
        ErreurdateDeNaissance:'',
        Erreurecole:'',
        Erreuremail:'',
        Erreurcategorie: '',
        Erreurniveau: '',
        Erreurprovince: '',
        Erreuroption: '',
        Erreurcommune: '',
    });

    useEffect(() => {
        Axios.get(instance.baseURL + requests.fetchCategorie)
            .then(res => {
                console.log("categorie recuperé");
                console.log(res.data);

                setListecategorie(res.data.map(occurence => {
                    return {
                        label: occurence.libelle,
                        value: occurence.id
                    }
                }));
            })

            .catch(err => {
                console.log("Echec de récupération de categorie")
            })



            Axios.get(instance.baseURL + requests.fetchProvince)
            .then(res => {
                console.log("province recuperée");
                console.log(res.data);

                setListeprovince(res.data.map(occurence => {
                    return {
                        label: occurence.libelle,
                        value: occurence.id
                    }
                }));
            })

            .catch(err => {
                console.log("Echec de récupération de province")
            })

    }, []
    )


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        date = date.toString().substr(4, 12)
        console.log(date);
        setData({...data, dateDeNaissance: date})
        hideDatePicker();
    };

    const enrLieuDeNaissance = (Lieu) => {
        console.log(Lieu);

    }

    const getNiveau = (idNiveau) => {
        console.log(idNiveau);

        Axios.get("https://api-jeu-bourse.herokuapp.com/api/niveau/categorie/" + idNiveau)
            .then(res => {
                console.log(res.data);
                setListeniveau(res.data.map(occurence => {
                    return {
                        label: occurence.libelle,
                        value: occurence.id
                    }
                }));
            })
            .catch(err => {
                console.log("Echec de récupération de niveau");
            })
    }

    const getOption = (idOption) => {
        console.log(idOption);

        Axios.get(instance.baseURL + requests.fetchOptionByCategory + idOption)
            .then(res => {
                console.log(res.data);
                setListeoption(res.data.map(occurence => {
                    return {
                        label: occurence.libelle,
                        value: occurence.id
                    }
                }));
            })
            .catch(err => {
                console.log("Echec de récupération d'option");
            })
    }

    const getCommune = (idProvince) => {
        console.log(idProvince);

        Axios.get(instance.baseURL + requests.fetchCommuneByProvince + idProvince)
            .then(res => {
                console.log(res.data);
                setListecommune(res.data.map(occurence => {
                    return {
                        label: occurence.libelle,
                        value: occurence.id
                    }
                }));
            })
            .catch(err => {
                console.log("Echec de récupération de commune");
            })
    }
    console.log();
    (listecategorie);
    (listeprovince);


    const enregistrer = ()=>{        
        const player ={
            lieunaissance:data.lieuDeNaissance,
            datenaissance:data.dateDeNaissance,
            categorie_id:data.categorie,
            niveau_id:data.niveau,
            option_id:data.option,
            etablissement:data.ecole,
            province_id:data.province,
            commune_id:data.commune,
            adresse:data.adresse,
            email:data.email,
        }
        console.log(player);

        Axios.put(instance.baseURL+requests.fetchJoueur+"/1", player)
    .then(res=>{
        console.log("Joueur Enregistré");
        navigation.navigate('Homepost')

    })
    .catch(err=>{
        console.log("Echec de l'enregistrement");
        
    })

    
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
                <KeyboardAwareScrollView
                enableAutomaticScroll
                enableOnAndroid={true}
                extraScrollHeight={300}
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
                            onChangeText={(val) => setData({ ...data, lieuDeNaissance: val })}
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
                            style={{ flexDirection:'row'}}
                        >
                            <FontAwesome
                                name="calendar"
                                color="#05375a"
                                size={20}
                            />

                        <Text style={{marginLeft:10}}>{data.dateDeNaissance}</Text>
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
                                onValueChange={(val) => {
                                    getNiveau(val)
                                    getOption(val)
                                    setData({ ...data, categorie: val })
                                }}
                                style={styles.textInput}
                                items={listecategorie}
                            />
                        </Text>

                    </View>
                    {listeniveau.length > 0 ?

                        <View>
                            <Text style={styles.text_footer, {
                                marginTop: 35, color: '#05375a',
                                fontSize: 18
                            }}>niveau</Text>
                            <View
                                style={styles.action}>
                                <FontAwesome
                                    name="user-o"
                                    color="#05375a"
                                    size={20}
                                />
                                <Text
                                    style={styles.textInput,{ marginLeft: 15 }}
                                >
                                    <RNPickerSelect
                                        placeholder={{ label: "Selectionnes ton niveau", value: null }}
                                        onValueChange={(val) => setData({ ...data, niveau: val })}
                                        style={styles.textInput}
                                        items={listeniveau}
                                    />
                                </Text>

                            </View>
                        </View>
                        :
                        null
                    }

                    {listeoption.length > 0 ?
                        <View>
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
                                        placeholder={{ label: "Selectionnes ton option", value: null }}
                                        onValueChange={(val) => {
                                            setData({ ...data, option: val })
                                        }
                                        }
                                        style={styles.textInput}
                                        items={listeoption}
                                    />
                                </Text>

                            </View>
                        </View>
                        :
                        null
                    }

                    <Text style={styles.text_footer, {
                        marginTop: 35, color: '#05375a',
                        fontSize: 18
                    }}>Ecole/Université</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="map"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Ton ecole ou ton université"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setData({ ...data, ecole: val })}
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
                                onValueChange={(val) => {
                                    getCommune(val)
                                    setData({ ...data, province: val })
                                }
                                }

                                style={styles.textInput}
                                items={listeprovince}
                            />
                        </Text>

                    </View>

                    {listecommune.length > 0 ?

                        <View>
                            <Text style={styles.text_footer, {
                                marginTop: 35, color: '#05375a',
                                fontSize: 18
                            }}>Commune</Text>
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
                                        placeholder={{ label: "Selectionnes ta commune", value: null }}
                                        onValueChange={(val) => {
                                            setData({ ...data, commune: val })
                                        }
                                        }
                                        style={styles.textInput}
                                        items={listecommune}
                                    />
                                </Text>

                            </View>
                        </View>
                        : null

                    }



                    <Text style={styles.text_footer, {
                        marginTop: 35, color: '#05375a',
                        fontSize: 18
                    }}>Adresse</Text>
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
                            onChangeText={(val) => setData({
                                ...data, adresse:val
                            })}
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
                    }}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="map"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Ton ecole ou ton université"
                            style={styles.textInput}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={(val) => setData({ ...data, email: val })}
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
                </KeyboardAwareScrollView>
               
            </Animatable.View>
        </View>
    );
};

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
})