import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ToastAndroid } from "react-native"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { LoginButton } from '../../Component/LoginButton';
import { Notification } from '../../Component/NotificationHeader';
import Entypo from 'react-native-vector-icons/Entypo'
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import { FollowAcceptReject } from '../../Helper/Services'



export default function FriendRequestScreen({ navigation }) {
    const [OnPopUphow, SetOnPopUphow] = useState(false);
    const [OnPopUpAccept, SetOnPopUpAccept] = useState(false);

    const [RequestNotification] = useState([
        {
            Requestimg: require('../../Assets/Images/DemoImage/demoiamge.png'),
        },
        {
            Requestimg: require('../../Assets/Images/DemoImage/demoiamge.png'),
        },
        {
            Requestimg: require('../../Assets/Images/DemoImage/demoiamge.png'),
        },
    ])

    const [DataList, setDataList] = useState([

        {
            cover_img: require('../../Assets/Images/DemoImage/demoiamge.png'),
            title: 'Rebecca Harvey',
            tittlerequest: '  Friend Request',
            time: '2m ago',
            status: false,

        },
        {
            cover_img: require('../../Assets/Images/DemoImage/demoiamge.png'),
            title: 'Olivia James',
            tittlerequest: '  Friend Request',
            time: '1h ago',
            status: true,
        },
        {
            cover_img: require('../../Assets/Images/DemoImage/demoiamge.png'),
            title: 'Emily Charlotte',
            tittlerequest: '  Friend Request',
            time: 'Yesterday',
            status: true,
        }

    ])

    async function onSubmit() {
        // alert('hellll0')
        await FollowAcceptReject('60b9f82834e7ec29fa961448', true).then(async (res) => {
            let response = res;
            console.log(response)
            if (response.status) {
                SetOnPopUpAccept(true)
                SetOnPopUpAccept(true)
                ToastAndroid.showWithGravityAndOffset(
                    response.msg,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    response.msg,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );

            }

            // alert('followAcceptReject')


        })
            .catch(err => {
                let error = err
                console.log(error)
            })


    }

    async function onSubmitReject() {

        await FollowAcceptReject('60b9f82834e7ec29fa961448', false).then(async (res) => {
            let response = res;
            console.log(response)
            if (response.status) {
                SetOnPopUpAccept(true)
                ToastAndroid.showWithGravityAndOffset(
                    response.msg,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                SetOnPopUphow(false)
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    response.msg,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );

            }

        })
            .catch(err => {
                let error = err
                console.log(error)
            })

    }


    async function onSubmitRejectNo() {

        SetOnPopUphow(false)

    }
    const setAceptRejectList = (ele, i) => {
        let existingData = [...DataList];
        existingData[i].status = !existingData[i].status;
        setDataList(existingData)
    }
    return (
        <View>

            <View >
                <Notification
                    // onIconPress={() => navigate('SearchFeedScreen')}
                    currentObject={navigation}
                    IconComponent={
                        <Entypo
                            // style={styles.SearchContainer}
                            name="cross" color={Colors.black} size={30}
                        />
                    }

                    TextComponent={
                        <Text style={{
                            fontFamily: FontFamily.medium,
                            right: SCREEN_WIDTH * 0.15
                        }}>Friend Request Notifications</Text>
                    }


                />

            </View>


            <View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row-reverse', alignSelf: 'flex-start', left: SCREEN_WIDTH * 0.09 }}>
                        {
                            RequestNotification.map((el, i) => {
                                return (
                                    <>
                                        <View style={{ marginLeft: -20, }}>
                                            <View style={{ borderWidth: 1, borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderColor: Colors.White, width: SCREEN_WIDTH * 0.14, height: SCREEN_HEIGHT * 0.07 }}>
                                                <Image
                                                    style={{ resizeMode: 'contain', width: SCREEN_WIDTH * 0.14, height: SCREEN_HEIGHT * 0.09 }}
                                                    source={el.Requestimg}
                                                />
                                            </View>
                                        </View>



                                    </>


                                )
                            })

                        }

                    </View>

                    <View >
                        <Text style={{
                            fontFamily: FontFamily.medium,
                            fontSize: 13,
                            paddingHorizontal: SCREEN_WIDTH * 0.1,
                            color: Colors.black,
                            left: SCREEN_WIDTH * 0.02

                        }}>Friend Requests</Text>
                    </View>

                    <View style={{ height: SCREEN_HEIGHT * 0.028, width: SCREEN_WIDTH * 0.06, backgroundColor: '#FF2B8A', borderRadius: 20, position: 'absolute', right: 0, marginRight: SCREEN_WIDTH * 0.02, }}>
                        <Text style={{ color: Colors.White, textAlign: 'center' }}>3</Text>
                    </View>


                </View>

                <SafeAreaView style={styles.Flatlistcontainer}>

                    {
                        DataList.map((el, i) => {
                            return (
                                <>
                                    <View style={styles.Item_Style}>

                                        <View style={{ flexDirection: 'row', alignContent: 'center' }}>

                                            <View style={{ borderWidth: 2, borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderColor: "white", width: SCREEN_WIDTH * 0.12, height: SCREEN_HEIGHT * 0.01, alignSelf: 'center', alignContent: 'center', }}>
                                                <Image
                                                    style={{ resizeMode: 'contain', width: SCREEN_WIDTH * 0.16, height: SCREEN_HEIGHT * 0.09 }}
                                                    source={el.cover_img}
                                                />
                                            </View>

                                            <View style={{
                                                flexDirection: 'column',
                                                // fontFamily: 'montserrat_medium',
                                                alignSelf: 'center', width: SCREEN_WIDTH * 0.4, left: SCREEN_WIDTH * 0.02
                                            }}>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    //  fontFamily: 'montserrat_medium',
                                                    alignItems: 'center',
                                                }}>
                                                    <Text style={styles.TitleStyle}>{el.title}</Text>
                                                    <Text style={styles.TitleRequestStyle}>{el.tittlerequest}</Text>
                                                </View>
                                                <Text style={styles.TitleRequestStyle}>{el.time}</Text>

                                            </View>

                                            {
                                                el.status ?
                                                    null
                                                    :
                                                    <TouchableOpacity >

                                                        <View style={{
                                                            flexDirection: 'row', paddingHorizontal: SCREEN_WIDTH * 0.15

                                                        }}>

                                                            {
                                                                OnPopUpAccept ?
                                                            null
                                                                  :


                                                                    <View style={{ flexDirection: 'row' }}>

                                                                        <TouchableOpacity onPress={onSubmit}>

                                                                            <View style={{ alignItems: 'center', }}>
                                                                                <Image
                                                                                    source={require('../../Assets/Images/CircleConfirm/CircleConfirm.png')}>
                                                                                </Image>
                                                                                <Text style={styles.ConfirmTextStyle}>Accept</Text>

                                                                            </View>

                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity onPress={() => SetOnPopUphow(!OnPopUphow)}>
                                                                            <View style={{ alignItems: 'center', marginLeft: SCREEN_WIDTH * 0.05 }}>
                                                                                <Image
                                                                                    source={require('../../Assets/Images/CrossImage/crossImage.png')}>
                                                                                </Image>
                                                                                <Text style={styles.RejectTextStyle}>Reject</Text>

                                                                            </View>
                                                                        </TouchableOpacity>

                                                                    </View>

                                                            }





                                                        </View>

                                                    </TouchableOpacity>

                                            }

                                        </View>

                                        <View style={{ height: 0.5, backgroundColor: Colors.Grey, marginTop: SCREEN_HEIGHT * 0.02 }} />
                                        {
                                            OnPopUphow ?
                                                <View style={styles.ItemBackgroundStyle}>


                                                    <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-evenly' }}>
                                                        <Text style={styles.BlockDalogText}>Are you sure to Reject</Text>
                                                        <Text style={styles.DialogLigihtNewText}> Tiana Cousee</Text>
                                                    </View>
                                                    <Text style={{ textAlign: 'center' }}>Request?</Text>

                                                    <View style={styles.ButtonContainer}>

                                                        <LoginButton
                                                            onSubmitPress={onSubmitReject}
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
                                                            onSubmitPress={onSubmitRejectNo}
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

                                </>

                            )
                        })

                    }

                </SafeAreaView>

            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },


    Imagestyle: {
        width: SCREEN_WIDTH * 0.07,
        height: SCREEN_HEIGHT * 0.04,



    },

    NotificationlistImagecontainer: {
        width: 70,
        height: 70,
        borderWidth: 2,
        borderRadius: 75


    },

    Imagestylesecond: {
        width: SCREEN_WIDTH * 0.05,
        height: SCREEN_HEIGHT * 0.02,



    },

    BackTextStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        paddingHorizontal: SCREEN_WIDTH * 0.03
    },

    ConfirmTextStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 11,
        // paddingHorizontal: SCREEN_WIDTH * 0.03,
        color: Colors.DarkGrey
    },

    RejectTextStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 11,
        // paddingHorizontal: SCREEN_WIDTH * 0.03,
        color: Colors.Moderatered
    },
    item: {



    },

    FlatlistImagecontainer: {
        width: SCREEN_WIDTH * 0.2,
        height: SCREEN_HEIGHT * 0.1,
    },

    TitleStyle: {
        fontSize: 13,
        color: Colors.black,
        paddingTop: SCREEN_HEIGHT * 0.01
    },

    TitleRequestStyle: {
        fontSize: 12,
        color: Colors.DarkGrey,
        paddingTop: SCREEN_HEIGHT * 0.01
    },
    Flatlistcontainer: {
        padding: SCREEN_HEIGHT * 0.09,
        padding: SCREEN_WIDTH * 0.02,

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
    ItemBackgroundStyle: {
        paddingVertical: SCREEN_HEIGHT * 0.039,
        backgroundColor: Colors.lightPink,
        // left : SCREEN_WIDTH * 0.06,
        borderRadius: 10,
        width: SCREEN_WIDTH * 0.95,
        alignSelf: 'center'

    },
    Item_Style: {
        flexDirection: 'column',
        padding: 5,
        // borderRadius: 25,
        // color: '#FBFBFB',
        // borderColor: '#FBFBFB',
        // opacity: 1,
        // borderWidth: 1,
        // marginVertical: SCREEN_HEIGHT * 0.01,
        // elevation: 0.4
    }
}

)