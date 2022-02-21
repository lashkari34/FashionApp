import { Row } from 'native-base';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Icon } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Header } from '../../Component/Header';
import { navigate } from '../../../RootNavigation';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'


export default function CommonNotificationScreen({ navigation }) {
    const [CommentNotification] = useState([
        {
            people: 'Mira Saris',
            peopleimg: require('../../Assets/Images/SearchPeople/searchpeople.png'),
            addPostStyleIcon: <Ionicons name="chatbubble-ellipses-outline" size={17} color={Colors.black} />,
            addPhoto: 'added a new post',
            time: '5 hrs ago',
            postType: 'Add Post'
        },
        {
            people: 'Kianna Calzoni',
            peopleimg: require('../../Assets/Images/SearchPeople/searchpeople.png'),
            addPostStyleIcon: <FontAwesome name="picture-o" size={17} color={Colors.black} />,
            addPhoto: 'added a new photo',
            time: '1 day ago',
            postType: 'Add New Photo'
        },
        {
            people: 'Gretchen Saris',
            peopleimg: require('../../Assets/Images/SearchPeople/searchpeople.png'),
            addPostStyleIcon: <Feather name="video" size={17} color={Colors.black} />,
            addPhoto: 'posted a new video',
            time: 'Yesterday',
            postType: 'Add Video'
        },
    ])

    return (
        <View>

            <View >
                <Header
                    onIconPress={() => navigate('NewFriendScreen')}
                    currentObject={navigation}
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
                     <TouchableOpacity onPress={()=>navigation.navigate("NewFriendScreen")}>
                   <SimpleLineIcons name="bell" size={17} color="#383838"/>
                   </TouchableOpacity>
                </View>

            </View> */}

            <Text style={styles.titleNotification}>Notifications</Text>
            <Text style={styles.titleNew}>New</Text>


            <ScrollView>
                <View style={{ alignSelf: 'flex-start' }}>
                    {
                        CommentNotification.map((ele, i) => {
                            return (
                                <>
                                    <View style={{ marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between', marginVertical: SCREEN_HEIGHT * 0.02, width: SCREEN_WIDTH * 0.58, alignSelf: 'center' }}>
                                        <View style={{ borderWidth: 1, borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderColor: Colors.White, width: SCREEN_WIDTH * 0.14, height: SCREEN_HEIGHT * 0.07 }}>
                                            <Image
                                                style={{ resizeMode: 'contain', borderRadius: 100, width: SCREEN_WIDTH * 0.14, height: SCREEN_HEIGHT * 0.09 }}
                                                source={ele.peopleimg}
                                            />

                                        </View>
                                        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                            <Text style={styles.TitleStyle}>{ele.people} </Text>
                                            <Text style={styles.addPhotoStyle}>{ele.addPhoto} </Text>
                                            <Text style={styles.timeStyle}>{ele.time} </Text>
                                            <View style={{ height: 1., backgroundColor: Colors.black, opacity: 0.1, marginTop: SCREEN_HEIGHT * 0.02 }} />

                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                {/* <Image style={{ resizeMode: 'cover', marginTop: 3 }}
                                                    source={ele.addPostStyleIcon} /> */}
                                                {ele.addPostStyleIcon}
                                                <Text style={styles.postTypeStyle}>{ele.postType} </Text>
                                            </View>


                                        </View>
                                    </View>
                                </>
                            )

                        })
                    }
                </View>
            </ScrollView>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },
    postTypeStyle: {
        fontSize: 12,
        marginStart: 6,
        fontFamily: FontFamily.light,
        color: Colors.black,

    },
    timeStyle: {
        fontSize: 12,
        fontFamily: FontFamily.semibold,
        color: Colors.black,
        opacity: 0.2,
        marginTop: 6,
    },
    addPhotoStyle: {
        fontSize: 12,
        fontFamily: FontFamily.light,
        color: Colors.black,
        opacity: 0.7,
        marginTop: 8,
    },
    ImageContainer: {
        backgroundColor: '#FCEAE8',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: SCREEN_WIDTH,
        justifyContent: 'space-between',
        paddingVertical: SCREEN_HEIGHT * 0.03,
        paddingHorizontal: SCREEN_WIDTH * 0.04,

    },

    Imagestyle: {
        width: SCREEN_WIDTH * 0.07,
        height: SCREEN_HEIGHT * 0.04,



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
        color:Colors.LightGrey ,
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
        backgroundColor: '#FCFCFE',
    },
    titleNotification: {
        fontSize: 32,
        color: Colors.black,
        fontFamily: FontFamily.light,
        marginLeft: 20,
        marginTop: 18
    },
    titleNew: {
        fontSize: 24,
        color: Colors.black,
        fontFamily: FontFamily.medium,
        marginLeft: 20,
        marginTop: 18,
    }
}

)