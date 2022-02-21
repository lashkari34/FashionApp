import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Icon, TouchableOpacity, TouchableHighlight } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LoginButton } from '../../Component/LoginButton';
import { Header } from '../../Component/Header';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'

export default function NewFriendScreen({ navigation }) {


    const [newFriendRequest, setNewFriendRequest] = useState([
        {
            people: 'Emercy Botos',
            peopleimg: require('../../Assets/Images/SearchPeople/searchpeople.png'),
            addPostStyleIcon: <Ionicons name="person-outline" size={17} color={Colors.black} />,
            newSugMessage: 'You have a new friend',
            time: '5 minut ago',
            newFriendTxt: 'New Friend',
            status: false,
        },
        {
            people: 'Kianna Calzoni',
            peopleimg: require('../../Assets/Images/SearchPeople/searchpeople.png'),
            addPostStyleIcon: <Ionicons name="person-outline" size={17} color={Colors.black} />,
            newSugMessage: 'You have a new friend',
            time: 'Yesterday',
            newFriendTxt: 'New Friend',
            status: false,
        },
        {
            people: 'Gretchen Saris',
            peopleimg: require('../../Assets/Images/SearchPeople/searchpeople.png'),
            addPostStyleIcon: <Ionicons name="person-outline" size={17} color={Colors.black} />,
            newSugMessage: 'You have a new friend',
            time: '3 hrs ago',
            newFriendTxt: 'New Friend',
            status: false,
        },
    ])

    const setSingleResponse = (ele, i) => {
        let existingData = [...newFriendRequest];
        existingData[i].status = !existingData[i].status;
        setNewFriendRequest(existingData)
    }

    const setFalse = (ele, i) => {
        let existingData = [...newFriendRequest];
        existingData[i].status = false;
        setNewFriendRequest(existingData)
    }

    return (
        <View style={styles.container}>


            <View >
                <Header
                    currentObject = {navigation}
                    BackTextName={
                        <Text style={{
                            fontFamily: FontFamily.medium,
                        }}>Back</Text>
                    }
                    IconComponent={
                        <SimpleLineIcons
                            // style={styles.SearchContainer}
                            name="bell" color={Colors.black} size={18}
                        />
                    }
                />

            </View>
            {/* <View style={styles.ImageContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={styles.Imagestylesecond}
                            source={require('../../Assets/Images/BackImage/BackImage.png')}>
                        </Image>
                    </TouchableOpacity>
                    <Text style={styles.BackTextStyle}>Back</Text>

                </View>
                <View style={{
                    alignContent: 'flex-end', alignSelf: 'center',
                }}>
                    <SimpleLineIcons name="bell" size={17} color="#383838" />
                </View>

            </View> */}
            <Text style={styles.titleNew}>New Friend Request</Text>

            <ScrollView>
                <View style={{ alignSelf: 'flex-start' }}>
                    {
                        newFriendRequest.map((ele, i) => {
                            return (
                                <>

                                    <View>
                                        <View style={{ flexDirection: 'row', marginVertical: SCREEN_HEIGHT * 0.02, marginLeft: 20 }}>
                                            <View style={{ borderWidth: 1, borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderColor: "white", width: SCREEN_WIDTH * 0.14, height: SCREEN_HEIGHT * 0.07 }}>
                                                <Image
                                                    style={{ resizeMode: 'contain', borderRadius: 100, width: SCREEN_WIDTH * 0.14, height: SCREEN_HEIGHT * 0.09 }}
                                                    source={ele.peopleimg}
                                                />

                                            </View>
                                            <View style={{ marginLeft: 20, flexDirection: 'column', marginLeft: 10 }}>
                                                <Text style={styles.TitleStyle}>{ele.people} </Text>
                                                <Text style={styles.newSugMessage}>{ele.newSugMessage} </Text>
                                                <Text style={styles.timeStyle}>{ele.time} </Text>
                                                <View style={{ height: 1.4, backgroundColor: Colors.black, opacity: 0.1, marginTop: SCREEN_HEIGHT * 0.02 }} />



                                                <View>
                                                    {
                                                        ele.status ?
                                                            null
                                                            :
                                                            <TouchableOpacity onPress={() => setSingleResponse(ele, i)}>
                                                                <View style={{ flexDirection: 'row', marginTop: 12 }} >
                                                                    {/* <Image style={{ resizeMode: 'cover', marginTop: 3 }}
                                                    source={ele.addPostStyleIcon} /> */}
                                                                    {ele.addPostStyleIcon}
                                                                    <Text style={styles.newFriendTxt}>{ele.newFriendTxt} </Text>
                                                                </View>
                                                            </TouchableOpacity>



                                                    }
                                                </View>

                                            </View>


                                        </View>

                                        {/* Dialog Box or Layout */}

                                        <View>{

                                            ele.status ?
                                                <>
                                                    <View style={styles.ItemBackgroundStyle}>


                                                        <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-evenly' }}>
                                                            <Text style={styles.BlockDalogText}>Are you sure to Reject</Text>
                                                            <Text style={styles.DialogLigihtNewText}>Tiana Cousee</Text>
                                                        </View>
                                                        <Text style={{ textAlign: 'center' }}>Request?</Text>

                                                        <View style={styles.ButtonContainer}>


                                                            <LoginButton
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
                                                </> : null
                                        }

                                        </View>

                                    </View>
                                </>
                            )

                        })
                    }
                </View>
            </ScrollView>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },
    newFriendTxt: {
        fontSize: 12,
        marginStart: 6,
        fontFamily: FontFamily.bold,
        color: Colors.black,

    },
    timeStyle: {
        fontSize: 12,
        fontFamily: FontFamily.semibold,
        color: Colors.black,
        opacity: 0.2,
        marginTop: 6,
    },
    newSugMessage: {
        fontSize: 12,
        fontFamily: FontFamily.light,
        color: Colors.black,
        opacity: 0.7,
        marginTop: 8,
    },
    DialogLigihtNewText: {
        fontFamily: FontFamily.bold,
        fontSize: 14,
        paddingLeft: SCREEN_WIDTH * 0.02,
        paddingRight: SCREEN_WIDTH * 0.02


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
    ItemBackgroundStyle: {

        paddingVertical: SCREEN_HEIGHT * 0.039,
        backgroundColor: Colors.lightPink,
        left: SCREEN_WIDTH * 0.01,
        borderRadius: 10,
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center'

    },

    Imagestyle: {
        width: SCREEN_WIDTH * 0.07,
        height: SCREEN_HEIGHT * 0.04,



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

    Imagestylesecond: {
        width: SCREEN_WIDTH * 0.05,
        height: SCREEN_HEIGHT * 0.02,



    },

    BackTextStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        color: Colors.black,
        paddingHorizontal: SCREEN_WIDTH * 0.03
    },
    item: {

        borderRadius: 50,


    },

    FlatlistImagecontainer: {
        width: SCREEN_WIDTH * 0.2,
        height: SCREEN_HEIGHT * 0.1,
    },

    TitleStyle: {
        flexDirection: 'row',
        // marginLeft: SCREEN_WIDTH * 0.02,
        width: SCREEN_WIDTH * 0.72,
        alignItems: 'center',
        fontSize: 14,
        color: Colors.black,
        fontFamily: FontFamily.medium,
        alignSelf: 'center',

    },
    Flatlistcontainer: {

        padding: SCREEN_HEIGHT * 0.09,
        padding: SCREEN_WIDTH * 0.02,

    },
    Item_Style: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 25,
        color: Colors.LightGrey,
        borderColor: Colors.LightGrey,
        opacity: 1,
        borderWidth: 1,
        marginVertical: SCREEN_HEIGHT * 0.01,
        elevation: 0.4
    },
    textInputStyle: {
        height: SCREEN_HEIGHT * 0.07,
        width: SCREEN_WIDTH * 0.76,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderRadius: 5,
        borderColor: Colors.Grey,
        backgroundColor: Colors.LightGrey,
    },
    titleNew: {
        fontSize: 24,
        color: Colors.black,
        fontFamily: FontFamily.regular,
        marginLeft: 20,
        marginTop: 18
    }
}

)