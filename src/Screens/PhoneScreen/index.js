// Splash
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ToastAndroid, View, Text, StyleSheet, Image, TextInput, ImageBackground, FlatList, SafeAreaView, ScrollView } from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { Header } from '../../Component/Header';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import { UpdatePhoneNumber } from '../../Helper/Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../../../RootNavigation';
import EventBus from 'react-native-event-bus'
import { CustomTextInputPhone } from '../../Component/CutomTextInputPhone';
import { Row } from 'native-base';
import PhoneInput from "react-native-phone-number-input";
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { saveUserDetail, saveUserToken } from '../../redux/actions/action';
import { useDispatch } from 'react-redux';

export function PhoneScreen({ navigation }) {
    const user = useSelector(state => (state?.fashion?.userDetails))
    const [phone, setphone] = useState(
        user?.phoneNumber ? user?.phoneNumber.toString() : null
    );
    const [phoneflag, setphoneflag] = useState(
        user?.countryCode ? user?.countryCode : null
    );
    const [UserData, SetUserData] = useState(null);
    const [accessToekn, setAccessToken] = useState("")
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false)
    const [countryCode, setcountryCode] = useState();
    const [countryCodeShow, setcountryCodeShow] = useState("");
    const dispatch = useDispatch();

    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = React.useRef(null);
    useEffect(() => {
        readData()
    }, [])
 
    
    const readData = async () => {
        try {
            setAccessToken(await AsyncStorage.getItem('token'))
         
         alert(chartOptions)

        } catch {

        }
    }
   
    async function onSubmit() {
        if (!phone) {
            Toast.show({
                type: 'error',
                text1: 'Please Enter Phone Number'
              })
        }
        else {
            
            UpdatePhoneNumber(user?._id, countryCode,phone, accessToekn).then(async (res) => {
                let response = res;
                console.log(response.data)
                if (response.data.status === 200) {
                    const value = JSON.stringify(response.data.data)
                    dispatch(saveUserDetail(JSON.parse(value))); 
                    AsyncStorage.setItem('key', JSON.stringify(response.data.data))
                    console.log('Saved', 'Successful');
                    EventBus.getInstance().fireEvent("updateData")
                    navigate("User")
                    Toast.show({
                        text1: 'Phone Number updated Successfully!'
                    })
                }
                else {
                      Toast.show({
                        type: 'error',
                        text1: response?.data?.msg
                      })
                }

            }).catch(err => {
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
                        }}>Phone Number</Text>
                    }
                />
            </View>
            <View style={styles.EmailContainer}>
                <Text style={styles.EmailTextContainer}>Phone Number</Text>
            </View>
            <View style={styles.TextinputContainer}>
                <View style={{marginTop:10}}>
                    <PhoneInput  
                        
                        // defaultValue={phoneflag}
                        defaultCode={phoneflag}
                        layout="first"
                        onChangeText={(text) => {
                            setphone(text)
                        }}
                        onChangeCountry={(text) => {
                            setcountryCode(text.cca2) 
                        }}
                        value={phone}
                        textInputProps={{maxLength:10,}}
                        withShadow
                        autoFocus
                      
                    />
                </View>

            </View>

            <View style={{ position: "absolute", alignSelf: 'center', bottom: 100 }}>
                <LoginButton
                    onSubmitPress={onSubmit}
                    ButtonTextStyle={{
                        color: Colors.White, fontSize: 16,
                        fontFamily: FontFamily.bold,
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
        
        marginLeft: 30,
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        position: 'absolute',
        marginTop: 120

    }
});
