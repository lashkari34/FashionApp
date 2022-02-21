// Splash
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, ActivityIndicator, BackHandler, ScrollView } from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomEmailTextInput } from '../../Component/CustomEmailTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { ValidateEmail } from '../../Helper/Validations';
import { LoginUser } from '../../Helper/Services';
import { navigate } from '../../../RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import EventBus from 'react-native-event-bus'
import { saveUserDetail, saveUserToken } from '../../redux/actions/action';
import { useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import LoaderOnButtonPress from '../../Component/LoaderOnButtonPress';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

export function LoginScreen({ navigation }) {

    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const PasswordRef = useRef(null);
    const fcmToken = useSelector(state => state?.fashion?.fcmToken)
    const _storeData = async (value) => {
        try {
            //we have to wait until AsyncStorage.setItem() returns a promise
            var item = await AsyncStorage.setItem('key', JSON.stringify(value));
            return item;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp()
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);



    const onSubmit = () => {

        if (!Email) {
            Toast.show({
                type: 'error',
                text1: 'Please enter Email Id'
              })
        }
        else if (!ValidateEmail(Email)) {
            Toast.show({
                type: 'error',
                text1: 'Please enter a Valid Email ID'
              })
        }
        else if (!Password) {
            Toast.show({
                type: 'error',
                text1: 'Please enter Password'
              })
        }
        else {
            setLoading(true);
            LoginUser(Email, Password,fcmToken).then(async (res) => {
                let response = res;
                if (response.data.status == 200) {
                    const value = JSON.stringify(response.data.data.userdetailsdata)
                    console.log(value);
                    AsyncStorage.setItem('key', value)
                    const value1 = JSON.stringify(response.data.data)
                    let parsed = JSON.parse(value1);
                    console.log(parsed.token);
                    await AsyncStorage.setItem('token', parsed.token)
                    await AsyncStorage.setItem('token', parsed.token)
                    dispatch(saveUserDetail(JSON.parse(value))); 
                    dispatch(saveUserToken(parsed?.token)); 
                    navigation.replace("TabNavigationScreen") 
                    setLoading(false);
                    Toast.show({
                        text1: 'Logged in Successfully!'
                      })
                }
                else if (response.data.status == 404) {
                    setLoading(false);
                    Toast.show({
                        type: 'error',
                        text1: response?.data?.msg
                      })
                }
            })
                .catch(err => {
                    setLoading(false);
                    let error = err
                    console.log(error)

                })

        }

    }


    return (
        <View style={styles.container}>

            {
                loading ?
                    <Spinner
                        visible
                        animation="fade"
                        color={Colors.Pink}
                    />
                    : null
            }

            <Image style={styles.Imagestyle}
                //   source={require('./Assets/Images/HangerLogo/Vector.png')}
                source={require('../../Assets/Images/HangerLogo/Vector.png')} />

            <Text style={styles.TextStyle}>Welcome to Icon App</Text>
            <Text style={styles.TextContainer}>Sign in to continue</Text>

            <View style={styles.TextInputContainer}>
                <CustomEmailTextInput
                    keyboardType='email-address'
                    MaterialCommunityIcons="email"
                    onSubmitEditing={()=>PasswordRef.current.focus()} 
                    TextInputProps={{
                        placeholder: "Your Email",
                        onChangeText: (text) => SetEmail(text),
                        value: Email,
                        returnKeyType:"next",
                        
                       
                    }}
                />
            </View>

            <View style={styles.TextInputPasswordContainer}>
                <CustomEmailTextInput
                    autoCapitalize='none'
                    keyboardType='password'
                    IconName="lock"  
                    Input={PasswordRef}  
                    TextInputProps={{
                        placeholder: "Password",
                        secureTextEntry: true,
                        onChangeText: (text) => SetPassword(text),
                        value: Password
                    }}
                />
            </View>


            <LoginButton
                // onSubmitPress={()=>navigate("TabNavigationScreen")}
                onSubmitPress={onSubmit}
                ButtonTextStyle={{ color: Colors.White, fontSize: 16, fontFamily: FontFamily.bold, }}
                ButtonStyle={{
                    backgroundColor: Colors.Pink,
                    width: SCREEN_WIDTH * 0.9,
                    height: SCREEN_HEIGHT * 0.07,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: SCREEN_HEIGHT * 0.01,
                    elevation: 10,
                    borderRadius: 5,

                }}
                buttonTitle="Sign In" />


            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: SCREEN_HEIGHT * 0.02 }}>
                <View style={{ width: SCREEN_WIDTH * 0.39, marginLeft: SCREEN_WIDTH * 0.055, height: 1, backgroundColor: Colors.Grey }} />
                <View>
                    <Text style={{ width: 50, textAlign: 'center', fontFamily: FontFamily.bold }}>OR</Text>
                </View>
                <View style={{ width: SCREEN_WIDTH * 0.39, marginRight: SCREEN_WIDTH * 0.05, height: 1, backgroundColor: Colors.Grey }} />
            </View>


            <TouchableOpacity>
                <View style={styles.GoogleContainer}>
                    <Image style={styles.GoogleImageStyle}
                        source={require('../../Assets/Images/GoogleImage/GoogleImage.png')} />
                    <Text style={styles.GoogleTextingContainer}>Login With Google</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity>
                <View style={styles.FacebookContainer}>
                    <Icon name="facebook" color={Colors.bule} size={18} />
                    <Text style={styles.FacebookTextingContainer}>Login With Facebook</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPasswordScreen')}
            >
                <Text style={styles.PasswordContainer}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.AccountRegisterContainer}>
                <Text style={styles.AccountContainer}>Don't have a account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                    <Text style={styles.RegisterContainer}>  Register</Text>
                </TouchableOpacity>
            </View>


        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },
    Imagestyle: {
        // width: SCREEN_WIDTH * 0.375,
        // height: SCREEN_HEIGHT * 0.14,
        alignSelf: 'center',
        marginTop: SCREEN_HEIGHT * 0.04

    },
    TextStyle: {
        fontFamily: FontFamily.bold,
        fontSize: 22,
        // fontWeight: 'bold',
        textAlign: 'center',
        marginTop: SCREEN_HEIGHT * 0.01
    },
    TextContainer: {
        fontFamily: FontFamily.medium,
        fontSize: 18,
        alignSelf: 'center',
        // fontWeight: 'bold',
        marginTop: SCREEN_HEIGHT * 0.02
    },
    TextInputContainer: {
        marginTop: SCREEN_HEIGHT * 0.03,

    },
    TextInputPasswordContainer: {
        marginTop: SCREEN_HEIGHT * 0.01,

    },
    ORContainer: {
        fontSize: 15,
        marginVertical: SCREEN_HEIGHT * 0.02,
        textAlign: 'center',

    },
    GoogleContainer: {
        borderColor: Colors.Grey,
        flexDirection: 'row',
        borderWidth: 2,
        padding: 15,
        justifyContent: 'flex-start',
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center',
        borderRadius: 5

    },
    GoogleTextingContainer: {
        fontFamily: FontFamily.bold,
        fontSize: 15,
        // fontWeight: 'bold',
        marginLeft: SCREEN_WIDTH * 0.15,
        color: Colors.TextGrey
    },
    FacebookContainer: {
        borderRadius: 5,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: Colors.Grey,
        padding: 15,
        justifyContent: 'flex-start',
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center',
        marginTop: SCREEN_HEIGHT * 0.01,
    },
    FacebookTextingContainer: {
        fontSize: 15,
        fontFamily: FontFamily.bold,

        // fontWeight: 'bold',
        marginLeft: SCREEN_WIDTH * 0.15,
        color: Colors.TextGrey
    },
    PasswordContainer: {
        fontFamily: FontFamily.medium,
        textAlign: 'center',
        marginVertical: SCREEN_HEIGHT * 0.02,
        color: Colors.Pink
    },
    AccountRegisterContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop:SCREEN_HEIGHT * 0.04
    },
    AccountContainer: {
        fontFamily: FontFamily.light,

        color: Colors.TextGrey
    },
    RegisterContainer: {
        fontFamily: FontFamily.bold,
        color: Colors.Pink,
        // fontWeight: 'bold'
    }
});