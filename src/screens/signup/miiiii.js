import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, TextInput, Platform, StyleSheet, ScrollView, StatusBar, SafeAreaView, Image } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-datepicker';
import Axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';

import SignUpScreen2 from './step2';
import Home from '../home';
import instance from '../api/axios';
import requests from '../api/request';
import { color } from 'react-native-reanimated';

export default function SignUpScreen1({ navigation }) {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const [step, setStep] = useState(1);
    const recaptchaVerifier = React.useRef(null);
    const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const [message, showMessage] = React.useState();
  const attemptInvisibleVerification = false;
    const [listesexe, setListsexe] = useState([]);
    const [data, setData] = React.useState({
        nom: '',
        postnom: '',
        prenom: '',
        sex: '',
        pwd: '',
        confirm_pwd: '',
        telephone: '',
        money: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const [erreur, setErreur] = React.useState({
        Erreurnom: '',
        Erreurpostnom: '',
        Erreurprenom: '',
        Erreursex: '',
        Erreurpwd: '',
        Erreurconfirm_pwd: '',
        Erreurtelephone: '',
        Erreurmoney: '',
        ErreurStep: '',
    });


    useEffect(() => {
        Axios.get(instance.baseURL + requests.fetchSexe)
            .then(res => {
                console.log("sex recuperé");
                console.log(res.data);

                setListsexe(res.data.map(occurence => {
                    return {
                        label: occurence.libelle,
                        value: occurence.id
                    }
                }));
            })

            .catch(err => {
                console.log("Echec de récupération de sex")
            })
    }, [])


    const handlePasswordChange = (val) => {
        setData({
            ...data,
            pwd: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_pwd: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const enregistrer =  () => {
        // The FirebaseRecaptchaVerifierModal ref implements the
        // FirebaseAuthApplicationVerifier interface and can be
        // passed directly to `verifyPhoneNumber`.
        // try {

            const player = {
                nom: data.nom,
                postnom: data.postnom,
                prenom: data.prenom,
                telephone: "+243" + data.telephone,
                password: data.pwd,
                sexe_id: data.sex,
            }
            console.log(player);

            // const phoneProvider = new firebase.auth.PhoneAuthProvider();
            // const verificationId = await phoneProvider.verifyPhoneNumber(
            //     player.telephone,
            //     recaptchaVerifier.current
            //   );
            //   setVerificationId(verificationId);
            //   showMessage({
            //     text: 'Un code de vérification vous a été envoyé.',
            //   });
            // } catch (err) {
            //   showMessage({ text: `Error: ${err.message}`, color: 'red' });
            // }
          }

            Axios.post(instance.baseURL + requests.fetchJoueur, player)
                .then(res => {
                    console.log("Joueur Enregistré");
                    navigation.navigate('Home')
    
                })
                .catch(err => {
                    console.log("Echec de l'enregistrement");
    
                })

    const nextstep = () => {
        console.log("click");
        console.log(erreur);
        if (data.nom.length < 3) {
            setErreur({ ...erreur, Erreurnom: "Ce format n'est pas valide", ErreurStep: "Veuillez remplir correctement vos champs" })



        }
        else if (data.postnom.length < 3) {
            setErreur({ ...erreur, Erreurpostnom: "Ce format n'est pas valide", ErreurStep: "Veuillez remplir correctement vos champs" })
        }

        else if (data.prenom.length < 3) {
            setErreur({ ...erreur, Erreurprenom: "Ce format n'est pas valide", ErreurStep: "Veuillez remplir correctement vos champs" })
        }

        else if (data.telephone.length < 3) {
            setErreur({ ...erreur, Erreurtelephone: "Ce format n'est pas valide", ErreurStep: "Veuillez remplir correctement vos champs" })
        }

        else if (data.pwd != data.confirm_pwd) {
            setErreur({ ...erreur, Erreurconfirm_pwd: "Les mots de passe ne correpondent pas", ErreurStep: "Veuillez remplir correctement vos champs" })
        }

        else {

            setStep(step + 1);
        }
    }

    const goBack = () => {
        console.log("click");
        setStep(step - 1);
    }

    const changeMoney = (mymoney) => {
        setData({ ...data, money: mymoney });
    }


    switch (step) {
        case 1:
            return <View style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Crée ton compte</Text>
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
                                    onChangeText={(val) => {
                                        setData({ ...data, nom: val })
                                        setErreur({
                                            ...erreur, Erreurnom: '', ErreurStep: '',
                                        })
                                    }}
                                    autoComplete="given-name"
                                    type="text"
                                    maxlength="15"

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
                            <Text style={{ color: "red" }}>{erreur.Erreurnom}</Text>

                            <Text style={styles.text_footer, {
                                marginTop: 35, color: '#05375a',
                                fontSize: 18
                            }}>Postnom</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="user-o"
                                    color="#05375a"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Ton postnom"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    onChangeText={(val) => {
                                        setData({ ...data, postnom: val })
                                        setErreur({
                                            ...erreur, Erreurpostnom: '', ErreurStep: '',
                                        })
                                    }}
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
                            <Text style={{ color: "red" }}>{erreur.Erreurpostnom}</Text>
                            <Text style={styles.text_footer, {
                                marginTop: 35, color: '#05375a',
                                fontSize: 18
                            }}>Prenom</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="user-o"
                                    color="#05375a"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Ton prenom"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    onChangeText={(val) => {
                                        setData({ ...data, prenom: val })
                                        setErreur({
                                            ...erreur, Erreurprenom: '', ErreurStep: '',
                                        })
                                    }}
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
                            <Text style={{ color: "red" }}>{erreur.Erreurprenom}</Text>
                            <Text style={styles.text_footer, {
                                marginTop: 35, color: '#05375a',
                                fontSize: 18
                            }}>Numero de téléphone</Text>
                            <View style={styles.action}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row' }}
                                // onPress={() => console.log('Doris')}
                                >

                                    <View >
                                        <Image
                                            source={require('../../../assets/rdcongo.png')}
                                            style={{
                                                width: 35,
                                                height: 30,
                                                borderRadius: 6,
                                            }}
                                            resizeMode="stretch"
                                        />

                                    </View>
                                    <View style={{ paddingTop: 6 }}>
                                        <Text style={styles.textInput}>
                                            +243
                                        </Text>
                                    </View>

                                </TouchableOpacity>

                                <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />

                                <TextInput
                                    placeholder="893338262"
                                    autoFocus
                                    autoCompleteType="tel"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    keyboardType="numeric"
                                    textContentType="telephoneNumber"
                                    maxLength={9}
                                    onChangeText={(val) => {
                                        setData({ ...data, telephone: val })
                                        setErreur({
                                            ...erreur, Erreurtelephone: '', ErreurStep: '',
                                        })
                                    }}
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
                            <Text style={{ color: "red" }}>{erreur.Erreurtelephone}</Text>
                            <Text style={styles.text_footer, {
                                marginTop: 35, color: '#05375a',
                                fontSize: 18
                            }}>Sexe</Text>
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
                                        placeholder={{ label: "Selectionnes ton sexe", value: null }}
                                        onValueChange={(val) => {
                                            setData({ ...data, sex: val })
                                            setErreur({
                                                ...erreur, Erreursex: '', ErreurStep: '',
                                            })
                                        }}
                                        style={styles.textInput}
                                        items={listesexe}
                                    />
                                </Text>

                            </View>
                            <Text style={{ color: "red" }}>{erreur.Erreursex}</Text>
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
                                    placeholder="Ton mot de passe"
                                    secureTextEntry={data.secureTextEntry ? true : false}
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    onChangeText={(val) => {
                                        setData({
                                            ...data, pwd: val
                                        })
                                        setErreur({
                                            ...erreur, Erreurpwd: '', ErreurStep: '',
                                        })
                                    }}
                                />
                                <Text style={{ color: "red" }}>{erreur.Erreurpwd}</Text>
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

                            <Text style={[styles.text_footer, {
                                marginTop: 35
                            }]}>Confirme ton mot de passe</Text>
                            <View style={styles.action}>
                                <Feather
                                    name="lock"
                                    color="#05375a"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Confirme ton mot de passe"
                                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    onChangeText={(val) => {
                                        setData({
                                            ...data, confirm_pwd: val
                                        })
                                        setErreur({
                                            ...erreur, Erreurconfirm_pwd: '', ErreurStep: '',
                                        })

                                    }}
                                />

                                <TouchableOpacity
                                    onPress={updateConfirmSecureTextEntry}
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
                            <Text style={{ color: "red" }}>{erreur.Erreurconfirm_pwd}</Text>
                            <View style={styles.button}>
                                <TouchableOpacity
                                    onPress={() => nextstep()

                                    }
                                    style={[styles.signIn, {
                                        borderColor: '#1D2E3F',
                                        borderWidth: 1,
                                    }]}
                                >
                                    <Text style={[styles.textSign, {
                                        color: '#1D2E3F'
                                    }]}>Suivant{"    "}
                                        <FontAwesome
                                            name="arrow-right"
                                            color="#05375a"
                                            size={20}
                                        /></Text>

                                </TouchableOpacity>
                            </View>

                            <View style={styles.textPrivate}

                            >
                                <Text style={{ color: "red" }}>
                                    {erreur.ErreurStep}
                                </Text>

                            </View>
                        </ScrollView>
                    </KeyboardAwareScrollView>

                </Animatable.View>
            </View>
            break;

        case 2:
            return <SignUpScreen2 navigation={navigation} changeMoney={changeMoney} goBack={goBack} submit={enregistrer} />
    }
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