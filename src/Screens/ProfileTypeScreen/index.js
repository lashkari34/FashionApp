// Splash
import React, { useEffect, useState } from 'react';
import { ToastAndroid, View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView } from "react-native";
// import { Icon } from 'react-native-vector-icons/icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Radio } from 'native-base';
import { Header } from '../../Component/Header';
// import { useState } from 'react/cjs/react.development';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
// import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { UpdateProfileType } from '../../Helper/Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventBus from 'react-native-event-bus'
import { navigate } from '../../../RootNavigation';
import Toast from 'react-native-toast-message';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

export function ProfileTypeScreen({ navigation }) {

    // const [ProfileType, SetProfileType] = useState();
    const [UserData, SetUserData] = useState(null);
    const [CostumeType, setCostumeType] = useState()
    const [accessToekn, setAccessToken] = useState("")


    var radio_props = [
        { label: 'Private', value: 0 },
        { label: 'Public', value: 1 }
    ];

    useEffect(() => {
        readData()
    }, [])

    const readData = async () => {
        try {
            const jsonValue = (await AsyncStorage.getItem('key'))
            setAccessToken( await AsyncStorage.getItem('token'))

            let parsed = JSON.parse(jsonValue);  
            let profileType = parsed.profileType;
            setCostumeType(profileType)
            console.log('Saveddata', profileType);
            console.log('Saveddata', 'Successful');
            SetUserData(JSON.parse(jsonValue)._id)
        } catch {

        }
    }
    const onSubmit = () => {
        console.log(CostumeType);
        {
            UpdateProfileType(UserData, CostumeType,accessToekn).then(async (res) => {
                let response = res;
                console.log(response.data.data)
                if (response.data.status === 200) {
                    AsyncStorage.setItem('key' , JSON.stringify(response.data.data))
                    console.log('Saved', 'Successful');
                    EventBus.getInstance().fireEvent("updateData")
                    navigate("User")
                    Toast.show({
                        text1: 'ProfileType updated successfully'
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
                        }}>Profile Type</Text>
                    }

                />

            </View>



            <View style={styles.RadioContainer}>
                    <Radio selected={CostumeType == 'Private' ? true : false} color={Colors.White} selectedColor={Colors.Pink} color={Colors.Pink} onPress={() => setCostumeType('Private')}/>
                    <Text style={styles.PrivateTextContainer}>Private</Text>
                
                    <Radio selected={CostumeType == 'Public' ? true : false} color={Colors.White} selectedColor={Colors.Pink} color={Colors.Pink} onPress={() => setCostumeType('Public')} style={{marginLeft:ScreenWidth*0.08}}/>
                    <Text style={styles.PublicTextContainer}>Public</Text>
                
            </View>

            
            {/* <View style={styles.RadioContainer}>

                <RadioForm
                    formHorizontal={true}
                    animation={true}
                >
                    {
                        radio_props.map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i} style={{ marginRight: '10%' }} >
                                <RadioButtonInput
                                    obj={obj}
                                    index={i}
                                    isSelected={ProfileType === i}
                                    onPress={(w) => SetProfileType(w)}
                                    borderWidth={1}
                                    buttonInnerColor={Colors.Pink}
                                    buttonOuterColor={ProfileType === i ? Colors.Pink : Colors.black}
                                    buttonSize={16}
                                    buttonOuterSize={24}
                                    buttonStyle={{}}
                                    buttonWrapStyle={{ marginLeft: 10 }}
                                />
                                <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    // isSelected={ProfileType === i}
                                    labelHorizontal={true}
                                    onPress={(w) => SetProfileType(w)}
                                    labelStyle={{ fontSize: 20, color: Colors.black }}
                                    labelWrapStyle={{}}
                                />
                            </RadioButton>
                        ))
                    }
                </RadioForm>

            </View> */}
            {/* </View> */}
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
        width: SCREEN_WIDTH * 0.055,
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
    RadioContainer: {
        flexDirection: 'row',
        marginTop: SCREEN_HEIGHT * 0.06,
        marginLeft:SCREEN_WIDTH *  0.04    
          // justifyContent: 'space-evenly',
        // marginHorizontal: SCREEN_WIDTH * 0.09,
        // right: SCREEN_WIDTH * 0.1,
        // marginLeft: '10%'
    },
    PrivateContainer: {
        // marginHorizontal:SCREEN_WIDTH*0.05,
        justifyContent: 'space-around',
        // marginLeft: SCREEN_WIDTH * 0.1,
        flexDirection: 'row',

    },
    PublicContainer: {
        // marginLeft: SCREEN_WIDTH * 0.2,
        flexDirection: 'row',
        marginLeft:SCREEN_WIDTH*0.2
    },
    PrivateTextContainer: {
        fontFamily: FontFamily.bold,
        fontSize: 16,
        left: SCREEN_WIDTH * 0.03
        // fontWeight: 'bold'
    },
    PublicTextContainer: {
        fontFamily: FontFamily.bold,
        fontSize: 16,
        left: SCREEN_WIDTH * 0.03

        // fontWeight: 'bold'
    }
});
