// ChatContainer

import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView } from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/AntDesign';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import { getLatestChatService } from '../../Helper/Services';
import { useSelector } from 'react-redux';
import { navigationRef } from '../../../RootNavigation';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Loader from '../../Component/Loader';


export const ChatList = ({ onCardPress }) => {

    const user = useSelector(state => state?.fashion?.userDetails)
    const userToken = useSelector(state => state?.fashion?.userToken)
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const [recentChatUsers, setrecentChatUsers] = useState([])
    const [isFetching, setisFetching] = useState(true)

    React.useEffect(() => {
        fetchRecentChatUsers()
        setTimeout(() => {
            setisFetching(false)
        }, 5000);
    }, [isFocused])

    const fetchRecentChatUsers = async () => {
        getLatestChatService(user?._id, userToken).then(res => arrangeUsers(res?.data))
      }

    const arrangeUsers = (data) => {

        let recentUser = []

        data?.map(item => {
            let obj = {}
            item?.latestChat[0]?.from?._id == user?._id
                ?
            (
                obj = item?.latestChat[0]?.to,
                obj.isBlocked = item?.isBlocked,
                recentUser?.push(obj)
            )
                :
            (
                obj = item?.latestChat[0]?.from,
                obj.isBlocked = item?.isBlocked,
                recentUser?.push(obj)
            )
        })

        setrecentChatUsers(recentUser)
        setisFetching(false)
    }

      const sortFollowersOnly = usersList => {
        let finalList = []
        usersList?.map(user => {
            user.isAccepted
                ?
            finalList.push(user)
                :
            null
        })

        setrecentChatUsers(finalList)
    }

      const Items = ({ title, img, item }) => (
        <TouchableOpacity style={styles.liststyle} onPress={() => navigation.navigate('ChatScreen', {secondUser: item})} >
            <Image style={styles.Imagescontainer}
                source={{uri: img}} />
            <View style={{
                height: SCREEN_HEIGHT * 0.015, width: SCREEN_WIDTH * 0.03, borderRadius: 20, backgroundColor: item?.online ? Colors.Green : Colors.DarkGrey,
                position: 'absolute', left: SCREEN_WIDTH * 0.12, marginTop: SCREEN_WIDTH * 0.03,borderWidth:2,borderColor:Colors.White
            }}></View>
            <View style={styles.TitleSizeContainer}>
                <Text style={styles.TitleStyle}>{title}</Text>
            </View>
        </TouchableOpacity>
    );

    const render = ({ item, index }) => (
        <Items key={index} title={item?.firstName+' '+item?.lastName} img={item?.profilePicture} item={item} />
    );

    return (
        <View style={styles.container}>
        {
            isFetching
                ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Loader/>
            </View>
                :
            <View style={{ flex: 1 }} >
                {
                    recentChatUsers?.length == 0 || recentChatUsers == null 
                        ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 16, fontFamily: FontFamily.medium }} >You have no recent chat</Text>
                    </View> 
                        :
                    <FlatList
                        data={recentChatUsers}
                        style={{marginTop: 6}}
                        renderItem={render}
                        keyExtractor={item => item._id}
                        showsVerticalScrollIndicator={false}
                    />
                }
            </View>
        }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        borderRadius: 6

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
    Styling: {
        marginTop: SCREEN_HEIGHT * 0.02,
        borderWidth: 1,
        borderColor: Colors.Grey,
        paddingVertical: 7
    },
    FlatlistTextStyle: {
        fontFamily: FontFamily.medium,
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
        borderColor: Colors.Grey,
        backgroundColor: Colors.Grey,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    FriendTextStyle: {
        fontSize: 16,
        fontFamily: FontFamily.medium,
        marginLeft: SCREEN_WIDTH * 0.03

    },
    FollowButtonStyle: {
        // marginLeft: SCREEN_WIDTH * 0.2,
        // alignContent:'center',
        fontFamily: FontFamily.bold,
        borderWidth: 1,
        paddingHorizontal: SCREEN_WIDTH * 0.04,
        paddingVertical: SCREEN_HEIGHT * 0.004,
        // width: SCREEN_WIDTH * 0.25,
        // textAlign: 'center',
        backgroundColor: Colors.Pink,
        color: Colors.White,
        borderColor:  Colors.Pink,
        borderRadius: 5,
        right: SCREEN_WIDTH * 0.03

        // marginTop: SCREEN_HEIGHT * 0.03,
        // shadowColor: '#FF2B8A',

        // alignSelf : 'flex-end'

        // position: 'absolute'

    },
    liststyle: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.Grey,
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
        width: SCREEN_WIDTH * 0.15,
        backgroundColor: Colors.Grey,
        aspectRatio: 1
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
        fontFamily: FontFamily.medium,
        fontSize: 16,
        // fontWeight: '500'
    },
    SubtitleStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 12,
        color: Colors.TextGrey
    },
    TimeStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 10,
        color: Colors.TextGrey,
        alignSelf: 'center',
        marginLeft: SCREEN_WIDTH * 0.14
    },

    Flatlist: {
        // flexDirection:'row',
        marginTop: SCREEN_HEIGHT * 0.02,
        // marginLeft: SCREEN_WIDTH * 0.04,
    },
});