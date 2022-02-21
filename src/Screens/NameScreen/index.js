import React, { useEffect,useRef,useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { Header } from '../../Component/Header';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import { UpdateFirstLastName } from '../../Helper/Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventBus from 'react-native-event-bus'
import { navigate } from '../../../RootNavigation';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { saveUserDetail, saveUserToken } from '../../redux/actions/action';

export function NameScreen({ navigation }) {

    const [FirstName, SetFirstName] = useState("");
    const [LastName, SetLastName] = useState("");
    const [UserData, SetUserData] = useState(null);
    const [accessToekn, setAccessToken] = useState("")
    const inputFirst = useRef(null);
    const inputLast = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        readData()
      }, [])
      
    const readData = async () => {
        try{
            const jsonValue = (await AsyncStorage.getItem('key'))
            setAccessToken( await AsyncStorage.getItem('token'))

            let id = JSON.parse(jsonValue)._id ;
            console.log('Saveddata', id);
            SetUserData(JSON.parse(jsonValue)._id)

            var FirstName = JSON.parse(jsonValue).firstName ;
            var LastName = JSON.parse(jsonValue).lastName;

            SetFirstName(FirstName);
            SetLastName(LastName);

           }catch{
    
           }
      }


    async function  onSubmit () {
          if (!FirstName) {
            Toast.show({
                type: 'error',
                text1: 'Please enter First Name'
              })
             
              
          } 
          else if (!LastName) {
            Toast.show({
                type: 'error',
                text1: 'Please enter Last Name'
              })
            
        }
          {
            UpdateFirstLastName(UserData,FirstName,LastName,accessToekn).then( async (res) => {
                let response = res;
                console.log(response.data)
                if (response.data.status === 200) {
                   
                    // AsyncStorage.setItem('key' , JSON.stringify(response.data.data))
                        console.log('Saved', 'Successful');
                        const value = JSON.stringify(response.data.data)
                        dispatch(saveUserDetail(JSON.parse(value))); 
                        console.log("=====",saveUserDetail(JSON.parse(value)))
                        // EventBus.getInstance().fireEvent("updateData")
                        navigate("User")
                        Toast.show({
                            text1: 'Name updated successfully'
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
                        }}>Name</Text>
                    }

                />

            </View>
            <View style={styles.EmailContainer}>
                <Text style={styles.EmailTextContainer}>First Name</Text>
            </View>
            <View style={styles.TextinputContainer}>
                <CustomTextInput
                    HideIcon
                    onSubmitEditing={()=>inputFirst.current.focus()} 
                    TextInputProps={{
                        placeholder: "First Name",
                        onChangeText: (text) => SetFirstName(text),
                        value: FirstName,
                        returnKeyType: "next",
                    }}
                    
                />
            </View>

            <View style={styles.EmailContainer}>
                <Text style={styles.EmailTextContainer}>Last Name</Text>
            </View>
            <View style={styles.TextinputContainer}>
                <CustomTextInput
                    HideIcon
                    Input={inputFirst}
                    TextInputProps={{
                        placeholder: "Last Name",
                        onChangeText: (text) => SetLastName(text),
                        value: LastName,
                        returnKeyType: "Done",
                    }}

                />
            </View>


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
        backgroundColor: Colors.LightGrey,
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
        marginLeft: SCREEN_WIDTH * 0.01

    },

    BackTextStyle: {
        // marginTop: SCREEN_HEIGHT * 0.007,
        fontSize: 16,
        fontWeight: '400',
        marginLeft: SCREEN_WIDTH * 0.01


    },
    EmailContainer: {
        marginTop: SCREEN_WIDTH * 0.08,
        marginLeft: SCREEN_WIDTH * 0.05,

    },
    EmailTextContainer: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    TextinputContainer: {
        marginTop: SCREEN_WIDTH * 0.05,

    }
});