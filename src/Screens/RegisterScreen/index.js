// Splash
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, ActivityIndicator, BackHandler } from "react-native"
import { ScrollView } from 'react-native-gesture-handler';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { CustomEmailTextInput } from '../../Component/CustomEmailTextInput'
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { ValidateEmail } from '../../Helper/Validations/index';
import { CreateUser } from '../../Helper/Services/index'
import { navigate } from '../../../RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import { enableScreens } from 'react-native-screens';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message'

export function RegisterScreen({ navigation }) {
    const [UserName, SetUserName] = useState("");
    const [FirstName, SetFirstName] = useState("");
    const [LastName, SetLastName] = useState("");
    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");
    const [ConfirmPassword, SetConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const inputFirst = useRef(null);
    const inputLast = useRef(null);
    const inputEamilId = useRef (null);
    const inputPassword = useRef(null);
    const inputPasswordagain = useRef(null);

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
        if (!UserName) {
            Toast.show({
                type: 'info',
                text1: 'Please enter User Name'
              })
        }
        else if (!FirstName) {
            
            Toast.show({
                type: 'info',
                text1: 'Please enter First Name'
              })
        }
        else if (!LastName) {
            
            Toast.show({
                type: 'info',
                text1: 'Please enter Last Name'
              })
        }
        else if (!Email) {
            Toast.show({
                type: 'info',
                text1: 'Please enter Email Id'
              })
        }
        else if (!ValidateEmail(Email)) {
            Toast.show({
                type: 'info',
                text1: 'Please enter valid Email Id'
              })
        }
        else if (!Password) {
            Toast.show({
                type: 'info',
                text1: 'Please enter Password'
              })
        }
        else if (ConfirmPassword !== Password) {
            Toast.show({
                type: 'error',
                text1: 'Password not matched'
              })
        }
        else {
            setLoading(true);
            CreateUser(UserName, FirstName,LastName, Email, Password).then(async (res) => {
                let response = res;
                if (response.data.status === 200) {
                    const jsonValue = JSON.stringify(response.data)
                    const temp = JSON.parse.jsonValue;

                    try {
                        const jsonValue = JSON.stringify(response.data)
                        console.log(jsonValue);
                        navigate("AccountVerification")
                        setLoading(false);
                        Toast.show({
                            text1: "Resgistered successfully",
                            text2: response?.data?.msg
                          })
                    } catch (e) {
                    }
                }

                else if (response.data.status === 404) {
                    let msg = response.msg;
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
        <ScrollView style={{ backgroundColor: Colors.White }} >
            {
                loading ?
                    <Spinner
                        visible
                        animation="fade"
                        color={Colors.Pink}
                    />
                    : null
            }

            <View style={styles.container}>
                <Image style={styles.Imagestyle}
                    source={require('../../Assets/Images/HangerLogo/Vector.png')} />
                <Text style={styles.TextStyle}>Welcome to Icon App</Text>
                <Text style={styles.TextContainer}>Create a new account</Text>

                <View style={styles.TextUserNameInputContainer}>
                    <CustomTextInput
                        IconName="user"
                        autoCapitalize='characters'
                        onSubmitEditing={()=>inputFirst.current.focus()}                   
                        TextInputProps={{
                            placeholder: "User Name",
                            onChangeText: (text) => SetUserName(text),
                            value: UserName,
                            returnKeyType: "next",
                        }}
                    />
                </View>
                <View style={styles.TextUserNameInputContainer}>

                    <CustomTextInput

                        IconName="user"
                        autoCapitalize='characters'
                        onSubmitEditing={()=>inputLast.current.focus()}    
                        Input={inputFirst}
                        TextInputProps={{
                            placeholder: "First Name",
                            onChangeText: (text) => SetFirstName(text),
                            returnKeyType: "next",
                            value:FirstName

                        }}
                    />
                </View>


                <View style={styles.TextInputContainer}>
                    <CustomTextInput
                        IconName="user"
                        autoCapitalize='characters'
                        onSubmitEditing={()=>inputEamilId.current.focus()}  
                        Input={inputLast}
                        TextInputProps={{
                            placeholder: "Last Name",
                            onChangeText: (text) => SetLastName(text),
                            value : LastName,
                            returnKeyType: "next",

                        }}
                    />
                </View>





                <View style={styles.TextInputEmailContainer}>
                    <CustomEmailTextInput
                        autoCapitalize='none'
                        keyboardType='email-address'
                        MaterialCommunityIcons="email"
                        onSubmitEditing={()=>inputPassword.current.focus()} 
                        Input={inputEamilId}
                        TextInputProps={{
                            placeholder: "Your Email",
                            onChangeText: (text) => SetEmail(text),
                            value: Email,
                            returnKeyType: "next",
                        }}
                    />
                </View>
                <View style={styles.TextInputPasswordContainer}>
                    <CustomTextInput
                        IconName="lock"
                        onSubmitEditing={()=>inputPasswordagain.current.focus()}
                        Input={inputPassword}
                        TextInputProps={{
                            placeholder: "Password",
                            secureTextEntry: true,
                            onChangeText: (text) => SetPassword(text),
                            value: Password,
                            returnKeyType: "next",
                        }}
                    />
                </View>
                <View style={styles.TextInputConfermPasswordContainer}>
                    <CustomTextInput
                        IconName="lock"
                        Input={inputPasswordagain}
                        TextInputProps={{
                            placeholder: "Password Again",
                            secureTextEntry: true,
                            onChangeText: (text) => SetConfirmPassword(text),
                            value: ConfirmPassword,
                            returnKeyType: "Done",
                        }}
                    />
                </View>

                <LoginButton
                    onSubmitPress={onSubmit}
                    ButtonTextStyle={{ color: Colors.White, fontSize: 16, fontFamily: FontFamily.bold, }}
                    ButtonStyle={{
                        backgroundColor: Colors.Pink,
                        width: SCREEN_WIDTH * 0.9,
                        height: SCREEN_HEIGHT * 0.07,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: SCREEN_HEIGHT * 0.01,
                        borderRadius: 5,
                        elevation: 10,
                    }}

                    buttonTitle="Sign Up" />

                <View style={styles.AccountRegisterContainer}>
                    <Text style={styles.AccountContainer}>Have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}  >
                        <Text style={styles.RegisterContainer}>  Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },
    Imagestyle: {
        alignSelf: 'center',
        marginTop: SCREEN_HEIGHT * 0.06

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
        fontSize: 22,
        alignSelf: 'center',
        // fontWeight: 'bold',
        marginTop: SCREEN_HEIGHT * 0.02
    },
    TextUserNameInputContainer: {
        marginTop: SCREEN_HEIGHT * 0.01,
    },
    TextInputContainer: {
        marginTop: SCREEN_HEIGHT * 0.01,
        width: SCREEN_WIDTH * 0.49
    },
    TextInputEmailContainer: {
        marginTop: SCREEN_HEIGHT * 0.01,

    },
    TextInputPasswordContainer: {
        marginTop: SCREEN_HEIGHT * 0.01,

    },
    TextInputConfermPasswordContainer: {
        marginTop: SCREEN_HEIGHT * 0.01,

    },
    AccountRegisterContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: SCREEN_HEIGHT * 0.03
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