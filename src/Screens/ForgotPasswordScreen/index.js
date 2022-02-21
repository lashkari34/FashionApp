// Splash
import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid ,ActivityIndicator} from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { useState } from 'react';
import { ValidateEmail } from '../../Helper/Validations';
import { Colors } from '../../Helper/Colors.js/index'
import {FontFamily} from '../../Helper/FontFamily/index'
import {ForgotPassword} from '../../Helper/Services'
import { navigate } from '../../../RootNavigation';
import Toast from 'react-native-toast-message'

// constructor(props) {
//     super(props);
//     const =  [email: "tibtib@gmail.com", Password : ""];
//   }

export function ForgotPasswordScreen({ navigation }) {

    const [Email, SetEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {

        if (!Email) {
           Toast.show({
               type: 'error',
               text1: 'Please enter Email Id'
           })
        }
        
        else {
            ForgotPassword(Email).then(async (res) => {
                setLoading(true);
                let response = res;
                console.log(response.data)
                // if (response.status === 200) {
                //     navigate("LoginScreen")
                //     setLoading(false);
                // }
                // else {
                //     ToastAndroid.showWithGravity(
                //         response.data.msg,
                //         ToastAndroid.SHORT,
                //         ToastAndroid.BOTTOM
                //     );
                // }
            })
                .catch(err => {
                    let error = err
                    console.log(error)
                })

        }

    }


    return (
        <View style={styles.container}>
            <Image style={styles.Imagestyle}
                //   source={require('./Assets/Images/HangerLogo/Vector.png')}
                source={require('../../Assets/Images/HangerLogo/Vector.png')} />

            <Text style={styles.TextStyle}>Welcome to Icon App</Text>
            <Text style={styles.TextContainer}>Forgot your password ? </Text>

            <View style={styles.TextInputContainer}>
                <CustomTextInput
                    autoCapitalize='none'
                    TextInputProps={{
                        placeholder: "Your Email",
                        onChangeText: (text) => SetEmail(text),
                        value: Email
                    }}
                />
            </View>
            {loading ? (

<View>

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
                buttonTitle="Countinue" />

    <ActivityIndicator
        //visibility of Overlay Loading Spinner
        size="large"
        color={Colors.Pink}
    />
</View>


) : (
<>
    {
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
      buttonTitle="Countinue" />

    /* <Button title="Start Loading" onPress={startLoading}></Button>     */}
</>
)}
        
            {/* <LoginButton
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
                buttonTitle="Countinue" /> */}

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
