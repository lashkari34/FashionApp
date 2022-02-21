import React, { useEffect, useRef, useState } from 'react';
import { ToastAndroid, View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView } from "react-native";
// import { Icon } from 'react-native-vector-icons/icon';
import { CustomTextInputChangepassword } from '../../Component/CutomTextInputChnagepassword';
import { Header } from '../../Component/Header';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import { ResetPassword } from '../../Helper/Services';
import { navigate } from '../../../RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventBus from 'react-native-event-bus'
import Toast from 'react-native-toast-message';

export function ChangePasswordScreen({ navigation }) {

    const [oldPassword, SetoldPassword] = useState("");
    const [newPassword, SetnewPassword] = useState("");
    const [NewPasswordAgain, SetNewPasswordAgain] = useState("");
    const [UserData, SetUserData] = useState(null);
    const [accessToekn, setAccessToken] = useState("")
    const oldPasswords = useRef(null);
    const inputPassword = useRef(null);
    const inputPasswordagain = useRef(null);
    const [isIconFocused, setisIconFocused] = useState(false)

    useEffect(() => {
        readData()
    }, [])

    const readData = async () => {
        try {
            const jsonValue = (await AsyncStorage.getItem('key'))
            setAccessToken(await AsyncStorage.getItem('token'))

            console.log('Saveddata', 'Successful');
            SetUserData(JSON.parse(jsonValue)._id)
        } catch {

        }
    }

    const onSubmit = () => {

        if (!oldPassword) {
            Toast.show({
                type: 'error',
                text1: 'Please Enter Your Old Password'
            })
        }
        else if (!newPassword) {
            Toast.show({
                type: 'error',
                text1: 'Please Enter Your New Password'
            })

        }
        else if (NewPasswordAgain !== newPassword) {
            Toast.show({
                type: 'error',
                text1: 'Password not matched'
            })
        }

        else {
            ResetPassword(UserData, oldPassword, newPassword, accessToekn).then(async (res) => {
                let response = res;

                if (response.data.status === 200) {
                    EventBus.getInstance().fireEvent("updateData")
                    navigate("User")
                    Toast.show({
                        text1: 'Password updated Successfully!'
                    })

                }
                else {
                    Toast.show({
                        type: 'error',
                        text1: response?.data?.msg
                    })
                }
            })
                .catch(err => {
                    let error = err
                    console.log(error)
                })
        }

    }

    return (
        <View style={styles.container}>

            <View >
                <Header
                    currentObject={navigation}
                    BackTextName={
                        <Text style={{
                            // fontFamily: "montserrat_medium",
                        }}>Change Password</Text>
                    }

                />

            </View>
            <View >

                <View style={styles.EmailContainer}>
                    <Text style={styles.EmailTextContainer}>Old Password</Text>
                </View>
                <View style={styles.TextinputContainer}>
                    <CustomTextInputChangepassword
                        onSubmitEditing={() => oldPasswords.current.focus()}
                        TextInputProps={{
                            placeholder: "Password",
                            secureTextEntry: true,
                            onChangeText: (text) => SetoldPassword(text),
                            value: oldPassword,
                            returnKeyType: "next",
                        }}
                        IconName="lock"
                        IconColor={Colors.DarkGrey}
                        IconSize={20}
                    />
                </View>

                <View style={styles.EmailContainer}>
                    <Text style={styles.EmailTextContainer}>New Password</Text>
                </View>
                <View style={styles.TextinputContainer}>
                    <CustomTextInputChangepassword
                        onSubmitEditing={() => inputPassword.current.focus()}
                        Input={oldPasswords}
                        TextInputProps={{
                            placeholder: "New Password",
                            secureTextEntry: true,
                            onChangeText: (text) => SetnewPassword(text),
                            value: newPassword,
                            returnKeyType: "next",
                        }}

                        IconColor={Colors.DarkGrey}
                        IconSize={20}
                    />
                </View>

                <View style={styles.EmailContainer}>
                    <Text style={styles.EmailTextContainer}>New Password Again</Text>
                </View>
                <View style={styles.TextinputContainer}>
                    <CustomTextInputChangepassword
                        Input={inputPassword}
                        TextInputProps={{
                            placeholder: "New Password Again",
                            secureTextEntry: true,
                            onChangeText: (text) => SetNewPasswordAgain(text),
                            value: NewPasswordAgain,
                            returnKeyType: "done",
                        }}

                        IconColor={Colors.DarkGrey}
                        IconSize={20}
                    />


                </View>

            </View>
            <View style={{marginTop:200,}}>

                <LoginButton
                    onSubmitPress={onSubmit}
                    ButtonTextStyle={{
                        color: Colors.White, fontSize: 16, fontFamily: FontFamily.bold,
                    }}
                    ButtonStyle={{
                        backgroundColor: Colors.Pink,
                        width: SCREEN_WIDTH * 0.9,
                        height: SCREEN_HEIGHT * 0.07,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        elevation: 10,
                    }}
                    buttonTitle="Save" />

            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White

    },
    ImageContainer: {
        // backgroundColor: '#FBF0EF',
        flexDirection: 'row',
        // marginTop: SCREEN_HEIGHT * 0.02,
        // marginLeft: SCREEN_WIDTH * 0.025,
        padding: 10
    },
    Imagestyle: {
        // width: SCREEN_WIDTH * 0.15,
        // height: SCREEN_HEIGHT * 0.022
        // marginTop: SCREEN_HEIGHT * 0.008,
        width: SCREEN_WIDTH * 0.053,
        height: SCREEN_HEIGHT * 0.022,
        // marginLeft: SCREEN_WIDTH * 0.01

    },

    BackTextStyle: {
        fontFamily: FontFamily.medium,
        // marginTop: SCREEN_HEIGHT * 0.007,
        fontSize: 16,
        // fontWeight: '400',
        marginLeft: SCREEN_WIDTH * 0.01


    },
    EmailContainer: {
        marginTop: SCREEN_WIDTH * 0.08,
        marginLeft: SCREEN_WIDTH * 0.05,

    },
    EmailTextContainer: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        // fontWeight: 'bold',
    },
    TextinputContainer: {
        marginTop: SCREEN_WIDTH * 0.03,

    }
});