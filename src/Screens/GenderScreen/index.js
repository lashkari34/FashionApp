// Splash
import React, { useEffect, useState } from 'react';

import { ToastAndroid, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView, View } from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { Header } from '../../Component/Header';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateGender } from '../../Helper/Services';
import { navigate } from '../../../RootNavigation';
import EventBus from 'react-native-event-bus'
import Toast from 'react-native-toast-message';

export function GenderScreen({ navigation }) {
    const [ShowGenderOptions, setShowGenderOptions] = useState(false);
    const [SelectedGender, setSelectedGender] = useState('Male')
    const [gender, Setgender] = useState("");
    const [UserData, SetUserData] = useState(null);
    const [accessToekn, setAccessToken] = useState("")
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        try{
            readData()
        }
        catch{
        
        }
    }, [])

    const readData = async () => {
        try {
            const jsonValue = (await AsyncStorage.getItem('key'))
            setAccessToken( await AsyncStorage.getItem('token'))
            console.log(jsonValue);
            let parsed = JSON.parse(jsonValue);  
            let gender = parsed.gender;
            setSelectedGender(gender)
            console.log('Saveddata', 'Successful');
            SetUserData(JSON.parse(jsonValue)._id)
        } catch {

        }
    }

    async function onSubmit() {
        if (!SelectedGender) {
            Toast.show({
                type: 'error',
                text1: 'Please Select Gender'
              })
        }
        
        else {
            UpdateGender(UserData, SelectedGender,accessToekn).then(async (res) => {
                let response = res;
                console.log(response.data)
                if (response.data.status === 200) {
                    AsyncStorage.setItem('key' , JSON.stringify(response.data.data))
                    console.log('Saved', 'Successful');
                    EventBus.getInstance().fireEvent("updateData")
                    navigate("User")
                    Toast.show({
                        text1: 'Gender updated successfully'
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
                            fontFamily: FontFamily.medium,
                        }}>Gender</Text>
                    }

                />

            </View>

            <View style={styles.EmailContainer}>
                <Text style={styles.EmailTextContainer}>Choose Gender</Text>
            </View>

            <TouchableOpacity onPress={() => setShowGenderOptions(!ShowGenderOptions,setIsFocused(true))}>
                <View   style={{
                            borderColor: isFocused ? '#FF2B8A' : '#EBEBEB',
                             height: 50,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderWidth: 1,
                            width: SCREEN_WIDTH * 0.9,
                            alignSelf: 'center',
                            padding: 13,
                            marginTop: SCREEN_HEIGHT * 0.01,
                            borderRadius: 5,
                            borderWidth: 2,
                            marginTop:15
                }}
                            >
                    <Text style={styles.GenderTextContainer}>{SelectedGender}</Text>
                    <Icon name={ShowGenderOptions ? "chevron-up" : "chevron-down"} color={Colors.DarkGrey} />

                </View>
            </TouchableOpacity >
            {ShowGenderOptions ?
                <View style={styles.GenderOptionContainer}>
                    <TouchableOpacity style={styles.GenderOption} onPress={() => { setSelectedGender('Male'); setShowGenderOptions(!ShowGenderOptions) }}>
                        <Text style={SelectedGender == "Male" ? styles.SelectedGenderText : styles.OptionText}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.GenderOption} onPress={() => { setSelectedGender('Female'); setShowGenderOptions(!ShowGenderOptions) }}>
                        <Text style={SelectedGender == "Female" ? styles.SelectedGenderText : styles.OptionText}>Female</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.GenderOption} onPress={() => { setSelectedGender('Others'); setShowGenderOptions(!ShowGenderOptions) }}>
                        <Text style={SelectedGender == "Others" ? styles.SelectedGenderText : styles.OptionText}>Others</Text>
                    </TouchableOpacity>
                </View>
                :
                null 
            }
            <View style={{ position: "absolute", alignSelf: 'center', bottom: 20 }}>
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
        marginTop: SCREEN_WIDTH * 0.04,
    },
    GenderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center',
        padding: 15,
        marginTop: SCREEN_HEIGHT * 0.01,
        borderColor: Colors.LightGrey,
        borderRadius: 5,
      

    },
    GenderTextContainer: {
        color: Colors.DarkGrey
    },
    GenderOptionContainer: {
        borderWidth: 1,
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center',
        // padding: 10,
        marginTop: SCREEN_HEIGHT * 0.015,
        borderColor: Colors.LightGrey,
        borderRadius: 5

    },
    GenderOption: {
        padding: SCREEN_WIDTH * 0.02
    },
    OptionText: {
        fontFamily: FontFamily.medium,
        color: Colors.DarkGrey
    },
    SelectedGenderText: {
        color: Colors.Pink
    }

});



