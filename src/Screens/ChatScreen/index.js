// Splash
import * as React from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
// import { GiftedChat } from 'react-native-gifted-chat'
import { Avatar, Bubble, Composer, GiftedAvatar, GiftedChat, InputToolbar, Send, Message } from 'react-native-gifted-chat';
import { ChatHeader } from '../../Component/ChatHeader';
import { navigate } from '../../../RootNavigation';
import { Colors } from '../../Helper/Colors.js/index'
import {FontFamily} from '../../Helper/FontFamily/index'
import { useSelector } from 'react-redux';
import { ChatBaseURL } from '../../Helper/BaseURL';
import io from "socket.io-client";
import { Platform } from 'react-native';
import { chatHistoryOfUser, getUserViaIdNameService } from '../../Helper/Services';
import { useRoute } from '@react-navigation/native';
import Loader from '../../Component/Loader';


export function ChatScreen({ navigation }) {
    const route = useRoute()
    const [secondUser, setSecondUser] = useState(route?.params?.secondUser)
    const [Flag, SetFlag] = useState(false);
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state?.fashion?.userDetails)
    const userToken = useSelector(state => state?.fashion?.userToken)
    const [socketConnetion, setSocketConnetion] = useState(Boolean)
    const [fetchingChat, setfetchingChat] = useState(true)
    const [pageNumber, setpageNumber] = useState(1)
    const [loadMoreMsg, setloadMoreMsg] = useState(false)

    const socketREF = React.useRef()

    const [toggle, settoggle] = useState(true)

    useEffect(() => {
        // console.log(route?.params?.secondUser,"mjh")
        chatHistoryOfUser(user?._id, secondUser._id, userToken, pageNumber).then(res => sortChat(res?.data))
       
        socketREF.current = io(ChatBaseURL, {
            reconnectionDelayMax: 10000,
            auth: {
                token: userToken
            }
        })
        socketREF.current.emit('connetUser',{
            "userId": user?._id
          })
        setSocketConnetion(socketREF.current.connected)
        socketREF.current.on('connectionSuccess', data => {console.log(data,'fds')})
        socketREF.current.on('RECEIVE_MESSAGE', data => setReceivedMsd(data))
    }, [])
    
    
    // useEffect(() => {
    // })
 
    const sortChat = chatList => {
        if(chatList?.length >= 50) setloadMoreMsg(true)
        setpageNumber(preV => preV + 1)
        // console.log(chatList,'sfs')
        let sortedChatList = []
        chatList?.map(msg => {
            msg?.from == user?._id
                ?
            sortedChatList.push({
                _id: Math.random().toString(12).substring(7),
                text: msg.message,
                // avatar: require('../../Assets/Images/FriendsImage/Friend3.png'),
                createdAt: msg?.createdAt,
                // avatar: require('../../Assets/Images/FriendsImage/Friend12.png'),
                user: {
                    _id: 1,
                    name: '',
                    avatar: user?.profilePicture == 'None' ? 'https://picsum.photos/200/300' : user?.profilePicture,
                }
            })
                :
            sortedChatList.push({
                _id: Math.random().toString(12).substring(7),
                text: msg.message,
                // avatar: require('../../Assets/Images/FriendsImage/Friend3.png'),
                createdAt: msg?.createdAt,
                // avatar: require('../../Assets/Images/FriendsImage/Friend3.png'),
                user: {
                    _id: 2,
                    name: '',
                    avatar: secondUser?.profilePicture == 'None' ? 'https://picsum.photos/200/300' : secondUser?.profilePicture,
                }
            })
        })

        // console.log(JSON.stringify(sortedChatList))
        setMessages((preV) => preV.concat(sortedChatList))
        setfetchingChat(false)
    } 

    const setReceivedMsd = (data) => {
        // console.log('from - '+data.from+' || to - '+data.to)
        // console.log(data?.data?.from)
        console.log(data?.data?.from == user?._id)
       
        if(typeof data != 'function' )
        {
            if(data?.data?.to == user?._id)
            {
                let from = []
                from.push({
                    "text":data?.data?.message,
                    "user":{"_id":2, 
                    "avatar": secondUser?.profilePicture == 'None' ? 'https://picsum.photos/200/300' : secondUser?.profilePicture
                    },
                    "createdAt":data?.data?.createdAt,
                    "_id":data?.data?._id
                })
                setMessages(previousMessages => GiftedChat.append(previousMessages, from))
                console.log(messages.length)
            }
        }
 
    }

    const onSend = (messages = []) => {

        console.log(messages)

        socketREF.current.emit('SEND_MESSAGE', {
            "from": user?._id,
            "to": secondUser._id,
            "message": messages[0].text
            }
        )
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }

    const loadMoreChat = () => {
        chatHistoryOfUser(user?._id, secondUser._id, userToken, pageNumber).then(res => sortChat(res?.data))
    }

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: Colors.White,
                    },
                }}
                wrapperStyle={{
                    left: {
                        backgroundColor: Colors.LightGrey,
                    },
                    right: {
                        backgroundColor: Colors.Pink,
                    },
                }}
            />
        );
    }


    const renderSend = (props) => {
        return < Send {...props} disabled={secondUser?.isBlocked}
        >
            <View style={{}}>
                <Image
                    style={{ width: SCREEN_WIDTH * 0.11, height: SCREEN_HEIGHT * 0.055, resizeMode: 'contain'}}
                    source={require('../../Assets/Images/Sendbutton/Sendbutton.png')} resizeMode={'contain'} />
            </View>
        </Send >
    }



    return (
        <View style={styles.container}>


            <View >
                <ChatHeader
                    onIconPress={() => navigate('ChatSettingScreen', {secondUser})}
                    currentObject={navigation}
                    ImageComponent={
                        <Image style={styles.ProfileStyle}
                            source={require('../../Assets/Images/ProfileImage/Profile.png')}>
                        </Image>
                    }
                    BackTextName={
                        <Text style={{
                            // fontFamily: "montserrat_medium",
                        
                        }}>Tiana Gouse</Text>
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

                {/* <TouchableOpacity onPress={() => fun()} >
                    <Text>sdfsdf sdfs</Text>
                </TouchableOpacity> */}

            </View>
            {/* <View style={styles.ImageContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.Imagestyle}
                        source={require('../../Assets/Images/BackImage/BackImage.png')}>
                    </Image>
                </TouchableOpacity>

                <View style={styles.ImageViewStyle}>
                    <TouchableOpacity>
                        <Image style={styles.ProfileStyle}
                            source={require('../../Assets/Images/FriendsImage/Friend3.png')}>
                        </Image>
                    </TouchableOpacity>
                </View>
                <Text style={styles.BackTextStyle}>Tiana Gouse</Text>
                <View style={styles.IconsContainer}>

                    <Ionicons onPress={() => SetFlag(!Flag)}
                        style={styles.FlagIconStyle}
                        name={Flag ? "flag" : "flag-outline"} color="#000000" size={25} />
                    <TouchableOpacity onPress={() => navigation.navigate('ChatSettingScreen')}>
                        <Icon 
                            style={styles.SearchImageContainer}
                            name="infocirlceo" color="#000000" size={25} />
                    </TouchableOpacity>
                </View>



            </View> */}

            {
                fetchingChat
                    ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                    <Loader/>
                </View>
                    :
                <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1
                }}
                placeholder='Type your message....'
                alwaysShowSend={true}
                renderBubble={renderBubble}
                showUserAvatar={true}
                showAvatarForEveryMessage={false}
                // maxInputLength ={SCREEN_WIDTH*0.9}
                // renderAvatar={renderAvatar}
                // renderMessage = {(props)=><CustomMessage {...props} />}
                // renderAvatar={()=>{<Image source={require('../../Assets/Images/FriendsImage/Friend3.png')} style={{height : 40, width : 40}} />}}
                // renderComposer={renderComposer}
                // maxComposerHeight = {SCREEN_HEIGHT*0.15}
                scrollToBottom={true}
                loadEarlier={loadMoreMsg}
                // textInputStyle={{height:90}}
                // textInputProps={textInputProps}
                // multiline ={false}
                // isKeyboardInternallyHandled={false}
                onLoadEarlier={loadMoreChat}
                infiniteScroll={true}
                // inverted ={false}
                // isLoadingEarlier ={loadMoreChat}
                // backgroundImage = {ImagesPathVariable.DrawerScreenBackGround}
                renderSend={renderSend}
                />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
        // backgroundColor : "#f5f5f5"
        // height: SCREEN_HEIGHT,
        // width: SCREEN_WIDTH,
        // paddingBottom: SCREEN_HEIGHT * 0.01
    },
    ImageContainer: {
        // backgroundColor: '#FBF0EF',
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
        marginLeft: SCREEN_WIDTH * 0.03

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
        left: SCREEN_WIDTH * 0.02
    },
    ProfileStyle: {
        width: SCREEN_WIDTH * 0.09,
        height: SCREEN_HEIGHT * 0.045,
        left: SCREEN_WIDTH * 0.01,
        borderRadius: 6

    },
    IconsContainer: {
        left: SCREEN_WIDTH * 0.37,
        flexDirection: 'row'
    },
    FlagIconStyle: {
        // left: SCREEN_WIDTH * 0.08,

    },
    SearchImageContainer: {
        left: SCREEN_WIDTH * 0.025,
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
        fontFamily: FontFamily.medium,
        fontSize: 16,
        marginLeft: SCREEN_WIDTH * 0.03
    },
    Flatlistcontainer: {
        marginTop: SCREEN_HEIGHT * 0.01,
        marginLeft: SCREEN_WIDTH * 0.04,
    },
   

    FriendTextStyle: {
        fontSize: 16,
        fontFamily: FontFamily.medium,
        marginLeft: SCREEN_WIDTH * 0.03

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
        fontFamily: FontFamily.medium,
        fontSize: 16,
        fontWeight: '500'
    },

    Flatlist: {
        // flexDirection:'row',
        marginTop: SCREEN_HEIGHT * 0.02,
        // marginLeft: SCREEN_WIDTH * 0.04,
    },
});