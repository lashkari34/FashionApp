// Splash
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, ActivityIndicator ,BackHandler} from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { ValidateEmail } from '../../Helper/Validations';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import { AccountVerificationApi } from '../../Helper/Services'
import { navigate } from '../../../RootNavigation';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { saveUserDetail } from '../../redux/actions/action';
import Toast from 'react-native-toast-message'


export function AccountVerification({ navigation }) {
    const [EmailToken, SetEmailToken] = useState();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

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
        if (!EmailToken) {
            Toast.show({
                type: 'error',
                text1: 'Please enter verification key'
            })
        }

        else {
            setLoading(true);
            AccountVerificationApi(EmailToken).then(async (res) => {
                let response = res;
                console.log(response.data)
                if (response.data.status === 200) {
                    // let msg = response.msg;
                    // navigate("LoginScreen")
                    const value = JSON.stringify(response.data.data.userdetailsdata)
                    console.log(value);
                    AsyncStorage.setItem('key', value)
                    const value1 = JSON.stringify(response.data.data)
                    let parsed = JSON.parse(value1);
                    console.log(parsed.token);
                    await AsyncStorage.setItem('token', parsed.token)
                    dispatch(saveUserDetail(JSON.parse(value)));
                    navigation.replace("TabNavigationScreen")
                    setLoading(false);
                    ToastAndroid.showWithGravityAndOffset(
                        response.data.msg,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                      );
                  }
               
                else if(response.data.status === 500){
                 let msg = response.msg;
                 setLoading(false);
                 ToastAndroid.showWithGravityAndOffset(
                    response.data.msg,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  );
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
            <Text style={styles.TextContainer}>A verification email is sent to your registered email address. Please verify to continue.</Text>

            <View style={styles.TextInputContainer}>
                <CustomTextInput
                    autoCapitalize='none'
                    TextInputProps={{
                        placeholder: "Your Token",
                        onChangeText: (text) => SetEmailToken(text),
                        value: EmailToken
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
                    elevation: 10,
                    borderRadius: 5,
                
                }}
                buttonTitle="Continue" />

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
        fontSize: 15,
        alignSelf: 'center',
        // fontWeight: 'bold',
        marginLeft:ScreenWidth * 0.05,
        marginRight : SCREEN_WIDTH*0.05,
        marginTop: SCREEN_HEIGHT * 0.09
    },
    TextInputContainer: {
        marginTop: SCREEN_HEIGHT * 0.04,

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
        alignSelf: 'center'
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