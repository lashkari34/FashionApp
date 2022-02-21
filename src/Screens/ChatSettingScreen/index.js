import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView, Switch } from "react-native"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { LoginButton } from '../../Component/LoginButton';
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/AntDesign';
import { ChatHeader } from '../../Component/ChatHeader';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import { blockUnblockService, findUserByIdService } from '../../Helper/Services';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';



export default function ChatSettingScreen({ navigation, route }) {

    const userToken = useSelector(state => state?.fashion?.userToken)

    const [Flag, SetFlag] = useState(false);
    const [isMuted, setisMuted] = useState()
    const [chatHistory, setchatHistory] = useState()
    const [isBlocked, setisBlocked] = useState()
    const [blockPopUp, setblockPopUp] = useState(false)

    useEffect(() => {
        // getUserDetails()
        // console.log(route?.params?.secondUser)

    }, [])

    const blockUnblock = () => {
        blockUnblockService(route?.params?.secondUser?.userDetails[0]?._id, userToken)
          .then(res => {
            res.status == 200 
                ? 
            (
                // setisBlocked(!isBlocked), 
                Toast.show({
                    text1: res?.msg
                })
            )
                :
            alert('something went wrong! :(')} )
        setblockPopUp(false)
    }

    return (
        <View style={{ color: '#E5E5E5' }}>
            <View >
                <ChatHeader
                    // onIconPress={() => navigate()}
                    currentObject={navigation}
                    BackTextName={
                        <Text style={{
                            // fontFamily: "montserrat_medium",

                        }}>Details</Text>
                    }

                    IconComponent={
                        <Ionicons onPress={() => SetFlag(!Flag)}
                            style={styles.FlagIconStyle}
                            name={Flag ? "flag" : "flag-outline"} color={Colors.black} size={25} />
                    }

                    SecondIcon={
                        <Icon
                            style={styles.SearchImageContainer}
                            name="infocirlceo" color={Colors.black} size={25} />
                    }
                />

            </View>
            <View >
                <TouchableOpacity >
                    <View style={styles.DetailsContainer}>
                        <Text style={styles.DetailsText}>Mute Messages</Text>
                        <View style={styles.Switchcontainer}>
                            <Switch
                                trackColor={isMuted ? { true: Colors.Grey, false: Colors.Grey } : { true: '#', false: Colors.Grey }}
                                thumbColor={isMuted ? "#1F1F1F" : Colors.Pink}
                                // onValueChange={(value) => setblockPopUp(true)}
                                value={isMuted}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity >
                    <View style={styles.DetailsContainer}>
                        <Text style={styles.DetailsText}>Chat History</Text>
                        <View style={styles.Switchcontainer}>
                            <Switch
                                trackColor={chatHistory ? { true: Colors.Grey, false: Colors.Grey } : { true: '#', false: Colors.Grey }}
                                thumbColor={chatHistory ? "#1F1F1F" : Colors.Pink}
                                // onValueChange={(value) => onselectionchange(el, i)}
                                value={chatHistory}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity >
                    <View style={styles.DetailsContainer}>
                        <Text style={styles.DetailsText}>Block</Text>
                        <View style={styles.Switchcontainer}>
                            <Switch
                                trackColor={isBlocked ? { true: Colors.Grey, false: Colors.Grey } : { true: '#', false: Colors.Grey }}
                                thumbColor={isBlocked ? "#1F1F1F" : Colors.Pink}
                                // onValueChange={(value) => (setblockPopUp(true), setisBlocked(!isBlocked))}
                                value={isBlocked}

                            />
                        </View>
                    </View>
                </TouchableOpacity>

                {
                blockPopUp
                    ?    
                <View style={styles.ItemBackgroundStyle}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-evenly' }}>
                        <Text style={styles.BlockDalogText}>Are you sure to {isBlocked ? 'Unblock' : 'Block'}
                            <Text style={{ fontFamily: FontFamily.bold }}> {route?.params?.secondUser?.userDetails[0]?.fullName} </Text>
                            Request?</Text>
                    </View>
                    {/* <Text style={{ textAlign: 'center' }}>Request?</Text> */}

                    <View style={styles.ButtonContainer}>

                        <LoginButton onSubmitPress={() => blockUnblock()}
                            ButtonTextStyle={{ color: Colors.White, fontSize: 16, fontFamily: FontFamily.bold }}
                            ButtonStyle={{
                                backgroundColor: Colors.Pink,
                                width: SCREEN_WIDTH * 0.22,
                                height: SCREEN_HEIGHT * 0.05,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: SCREEN_HEIGHT * 0.01,
                                borderRadius: 8,
                            }}
                            buttonTitle="Yes" />

                        <LoginButton
                            onSubmitPress={() => (setblockPopUp(false), setisBlocked(!isBlocked))}
                            ButtonTextStyle={{
                                color: Colors.White, fontSize: 16, fontFamily: FontFamily.bold,
                            }}
                            ButtonStyle={{
                                backgroundColor: Colors.black,
                                width: SCREEN_WIDTH * 0.22,
                                height: SCREEN_HEIGHT * 0.05,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: SCREEN_HEIGHT * 0.01,
                                borderRadius: 8,

                            }}
                            buttonTitle="No" />
                    </View>
                </View>
                    :
                null
                }

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
        alignItems: 'center',
        alignSelf: 'center',
        width: SCREEN_WIDTH,
        justifyContent: 'space-between',
        paddingVertical: SCREEN_HEIGHT * 0.04,
        paddingHorizontal: SCREEN_WIDTH * 0.04,

    },
    SearchImageContainer: {
        left: SCREEN_WIDTH * 0.025
    },
    ItemBackgroundStyle: {
        paddingVertical: SCREEN_HEIGHT * 0.039,
        backgroundColor: Colors.lightPink,
        // left : SCREEN_WIDTH * 0.06,
        borderRadius: 10,
        width: SCREEN_WIDTH * 0.95,
        alignSelf: 'center'

    },
    Switchcontainer: {
        // flex: 1,
        tintColor: '#1F1F1F'
    },
    GroupImageView: {
        width: SCREEN_WIDTH * 0.12,
        height: SCREEN_HEIGHT * 0.04,
        flexDirection: 'row'
    },

    FlagImagestyle: {
        width: SCREEN_WIDTH * 0.061,
        height: SCREEN_HEIGHT * 0.032,
        right: SCREEN_HEIGHT * 0.02,

    },
    InfoImagestyle: {
        width: SCREEN_WIDTH * 0.061,
        height: SCREEN_HEIGHT * 0.03,
    },
    Imagestylesecond: {
        width: SCREEN_WIDTH * 0.05,
        height: SCREEN_HEIGHT * 0.02,
    },

    BackTextStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 17,
        paddingHorizontal: SCREEN_WIDTH * 0.02
    },
    DetailsText: {
        fontFamily: FontFamily.medium,
        fontSize: 17,

    },

    BlockDialogText: {
        fontFamily: FontFamily.medium,
        fontSize: 14,

    },
    DialogLigihtText: {
        fontFamily: FontFamily.bold
        ,
        fontSize: 14,
        paddingLeft: SCREEN_WIDTH * 0.02,
        paddingRight: SCREEN_WIDTH * 0.02


    },

    DetailsContainer: {
        fontSize: 15,
        color: Colors.black,
        fontFamily: FontFamily.medium,
        // padding: SCREEN_HEIGHT * 0.9,
        paddingVertical: 28,
        padding: SCREEN_WIDTH * 0.04,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: Colors.Grey,
        justifyContent: 'space-between',

    },

    Item_Style: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: Colors.lightPink,

        // left : SCREEN_WIDTH * 0.06,

    },
    ButtonContainer: {
        width: SCREEN_WIDTH * 0.6,
        alignSelf: 'center',
        flexDirection: 'row',
        // alignItems: 'center',
        // alignSelf: 'center',
        // paddingHorizontal :SCREEN_HEIGHT * 0.1,
        justifyContent: 'space-evenly'
    },

}
)

