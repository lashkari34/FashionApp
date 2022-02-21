// Splash
import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView } from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/AntDesign';
import { navigate } from '../../../RootNavigation';
import { Header } from '../../Component/Header';
// import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { ChatFriendList } from './ChatFriendList';
import { ChatList } from './Chatlist';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import { useSelector } from 'react-redux';

export function FriendListScreen({ navigation }) {

    const [ActiveTab, SetActiveTab] = useState('Friendlist');
    const user = useSelector(state => state.fashion.userDetails)

    return (
        <View style={styles.container}>


            <View >
                <Header
                    onIconPress={() => navigate('SearchFeedScreen')}
                    currentObject={navigation}
                    BackTextName={
                        <Text style={{
                            fontFamily: FontFamily.medium,
                        }}>Elle Fanning</Text>
                    }
                    ImageComponent={
                        <Image style={styles.ProfileStyle}
                            source={{uri: user?.profilePicture}}
                            >
                        </Image>
                    }
                    // IconComponent={
                    //     <Icon
                    //         // style={styles.SearchContainer}
                    //         name="search1" color={Colors.black} size={18}
                    //     />
                    // }
                />

            </View>


            {/* <View style={styles.ImageContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.Imagestyle}
                        source={require('../../Assets/Images/BackImage/BackImage.png')}>
                    </Image>
                </TouchableOpacity>
                <Text style={styles.BackTextStyle}>Elle Fanning</Text>
                <View style={styles.ImageViewStyle}>
                    <TouchableOpacity>
                        <Image style={styles.ProfileStyle}
                            source={require('../../Assets/Images/ProfileImage/Profile.png')}>
                        </Image>
                    </TouchableOpacity>
                </View>

                <Icon onPress={() => navigation.navigate('SearchFeedScreen')}
                    style={styles.SearchImageContainer}
                    name="search1" color="#000000" size={22} />

            </View> */}

            <View style={styles.ButtonContainer}>

                <LoginButton onSubmitPress={() => SetActiveTab('Friendlist')}

                    ButtonTextStyle={{ color: Colors.White, fontSize: 16, fontFamily: FontFamily.bold }}
                    ButtonStyle={{
                        backgroundColor: ActiveTab == "Friendlist" ? Colors.Pink : Colors.black,
                        width: SCREEN_WIDTH * 0.48,
                        height: SCREEN_HEIGHT * 0.07,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: SCREEN_HEIGHT * 0.01,
                    }}
                    buttonTitle="Friends" />

                <LoginButton
                    onSubmitPress={() => SetActiveTab('Chatlist')}
                    // onSubmitPress={() => navigation.navigate('ProfileScreen')}
                    ButtonTextStyle={{
                        color: Colors.White, fontSize: 16, fontFamily: FontFamily.bold,
                    }}
                    ButtonStyle={{

                        backgroundColor: ActiveTab == "Chatlist" ?Colors.Pink : Colors.black,
                        width: SCREEN_WIDTH * 0.48,
                        height: SCREEN_HEIGHT * 0.07,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: SCREEN_HEIGHT * 0.01,
                    }}
                    buttonTitle="Chat" />
            </View>
            {
                ActiveTab == "Friendlist" ? <ChatFriendList /> : <ChatList onCardPress={() => navigation.navigate('ChatScreen')} />
            }
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
        padding: 10,
        alignItems: 'center'
    },
    BackTextStyle: {
        fontFamily: FontFamily.medium,
        // marginTop: SCREEN_HEIGHT * 0.007,
        fontSize: 16,
        // fontWeight: '400',
        marginLeft: SCREEN_WIDTH * 0.01

    },
    LikeTextStyle: {
        fontFamily: FontFamily.medium,
        marginTop: SCREEN_HEIGHT * 0.007,
        fontSize: 16,
        // fontWeight: '400',
        marginLeft: SCREEN_WIDTH * 0.65
    },
    Imagestyle: {
        // marginTop: SCREEN_HEIGHT * 0.008,
        width: SCREEN_WIDTH * 0.055,
        height: SCREEN_HEIGHT * 0.022
    },
    ImageViewStyle: {
        left: SCREEN_WIDTH * 0.47
    },
    ProfileStyle: {
        width: SCREEN_WIDTH * 0.09,
        height: SCREEN_HEIGHT * 0.045,
        borderRadius: 6,
        marginLeft: SCREEN_WIDTH * 0.48,
        right: 10,
        backgroundColor: Colors.Grey

    },
    SearchImageContainer: {
        left: SCREEN_WIDTH * 0.5,
        // alignSelf: 'center'
    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    item: {
        marginHorizontal: 5,
        marginVertical: 5,
        // backgroundColor: '#fff',
        // borderRadius: 10
    },
    FlatlistImagecontainer: {
        width: SCREEN_WIDTH * 0.14,
        height: SCREEN_HEIGHT * 0.07,
        borderRadius: 100,
        resizeMode: 'contain',

    },
   
    FlatlistTextStyle: {
        // fontFamily: 'montserrat_medium',
        fontSize: 16,
        marginLeft: SCREEN_WIDTH * 0.03
    },
    Flatlistcontainer: {
        marginTop: SCREEN_HEIGHT * 0.01,
        marginLeft: SCREEN_WIDTH * 0.04,
    },
    FriendsContainer: {
        paddingVertical: 20,
        alignContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        backgroundColor: '#E5E5E5',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    FriendTextStyle: {
        fontSize: 16,
        // fontFamily: 'montserrat_medium',
        marginLeft: SCREEN_WIDTH * 0.03

    },
    FollowButtonStyle: {
        // marginLeft: SCREEN_WIDTH * 0.2,
        // alignContent:'center',
        // fontFamily: 'montserrat_bold',
        borderWidth: 1,
        paddingHorizontal: SCREEN_WIDTH * 0.04,
        paddingVertical: SCREEN_HEIGHT * 0.004,
        // width: SCREEN_WIDTH * 0.25,
        // textAlign: 'center',
        backgroundColor: '#FF2B8A',
        color: '#fff',
        borderColor: '#FF2B8A',
        borderRadius: 5,
        right: SCREEN_WIDTH * 0.03

        // marginTop: SCREEN_HEIGHT * 0.03,
        // shadowColor: '#FF2B8A',

        // alignSelf : 'flex-end'

        // position: 'absolute'

    },
    liststyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        flexDirection: 'row',
        // justifyContent: 'space-evenly',
        // flex : 1,
        // marginLeft: SCREEN_WIDTH * 0.04
        alignSelf: 'center',
        width: SCREEN_WIDTH * 0.95,
        paddingVertical: 10
        // marginVertical: 5,
        // paddingBottom: 20

    },
    Imagescontainer: {
        height: SCREEN_HEIGHT * 0.08,
        // resizeMode: 'contain',
        borderRadius: 50,
        width: SCREEN_WIDTH * 0.15
        // marginVertical: SCREEN_HEIGHT * 0.01,
        // backgroundColor: '#fff'

    },
    TitleSizeContainer: {

        alignSelf: 'center',
        marginLeft: SCREEN_WIDTH * 0.03,
        // width: SCREEN_WIDTH * 0.4,
        // alignItems: 'flex-start',
        // paddingLeft: SCREEN_WIDTH * 0.02
    },
    TitleStyle: {
        // fontFamily: 'montserrat_medium',
        fontSize: 16,
        fontWeight: '500'
    },

    Flatlist: {
        // flexDirection:'row',
        marginTop: SCREEN_HEIGHT * 0.02,
        // marginLeft: SCREEN_WIDTH * 0.04,
    },
});
