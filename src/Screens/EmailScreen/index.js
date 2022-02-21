// Splash
import * as React from 'react';
import{ useEffect, useState } from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ToastAndroid } from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { Header } from '../../Component/Header';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateEmail } from '../../Helper/Services';
import { navigate } from '../../../RootNavigation';
import { ValidateEmail } from '../../Helper/Validations';
import EventBus from 'react-native-event-bus'
import Toast from 'react-native-toast-message';


export function EmailScreen({ navigation }) {
    // const _id="6083ade11fb64843a70c476b";
    const [UserData, SetUserData] = useState(null);
    const [Email, SetEmail] = useState();
    const [accessToekn, setAccessToken] = useState("")

    useEffect(() => {
        readData()
      }, [])
      
    const readData = async () => {
        try{
            const jsonValue = (await AsyncStorage.getItem('key'))
            setAccessToken( await AsyncStorage.getItem('token'))
            let parsed = JSON.parse(jsonValue);  
            let email = parsed.email;
            SetEmail(email)
            console.log('Saveddata', Email);
            SetUserData(JSON.parse(jsonValue)._id )
           }catch{

           }
      }

      async function  onSubmit () {
        if (!Email) {
            Toast.show({
                type: 'error',
                text1: 'Please enter Email Id'
              })
        }
        else if (!ValidateEmail(Email)) {
            Toast.show({
                type: 'error',
                text1: 'Please Enter Valid Email ID'
              })
           
        } 
        else{
          await UpdateEmail(UserData,Email,accessToekn).then( async (res) => {
                let response = res;
                console.log(response.data)

                if (response.data.status === 200) {
                    AsyncStorage.setItem('key' , JSON.stringify(response.data.data))
                    EventBus.getInstance().fireEvent("updateData")
                    navigate("User")
                    Toast.show({
                        text1: 'Email updated Successfully!'
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
                        }}>Email</Text>
                    }

                />

            </View>

            <View style={styles.EmailContainer}>
                <Text style={styles.EmailTextContainer}>Change Email</Text>
            </View>
         
            <View style={{   marginTop: SCREEN_WIDTH * 0.03,}}>
                <CustomTextInput
                    autoCapitalize='none'
                    keyboardType="email-address"  
                    TextInputProps={{
                        placeholder: "Your Email",
                        onChangeText: (text) => SetEmail(text),
                        value: Email,
                      
                       
                    }}
                />
            </View>
            <View style={{ position: "absolute", alignSelf: 'center', bottom: 20 ,
  }}>
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
                        borderRadius:5,
                        elevation: 10,
                    }}
                    buttonTitle="Change Email" />
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
        backgroundColor: Colors.lightPink,
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
        fontFamily: FontFamily.bold,
        fontSize: 16,
        // fontWeight: 'bold',
    },
    TextinputContainer: {
        marginTop: SCREEN_WIDTH * 0.03,
        marginLeft: SCREEN_WIDTH * 0.05,

    }
});
