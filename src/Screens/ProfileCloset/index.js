// Splash
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, FlatList, SafeAreaView, ScrollView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Header } from '../../Component/Header';
import { navigate } from '../../../RootNavigation';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import EventBus from 'react-native-event-bus'
import { FeedListByCategoryTrending } from '../../Helper/Services';
import { AllCategoryListing } from '../../Helper/Services';
import { FeedWithFollowerFeed } from '../../Helper/Services';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import { findUserByIdService } from '../../Helper/Services/index';
import { useSelector } from 'react-redux';

const Profileitem = "page1";
export function ProfileCloset({ route, navigation }) {
    const [UserFullName, SetUserFullName] = useState(null);
    const [UserData, setUserData] = useState(null);
    const [renderImage, SetrenderImage] = useState();
    const [accessToekn, setAccessToken] = useState("")
    const [ListCategory, setListCategory] = useState([]);
    const [AllListCategoryList, setAllListCategoryList] = useState([]);
    const [AllUserFeedList, setAllUserFeedList] = useState([]);
    const [SelectedItem, setSelectedItem] = useState('');
    const [loading, setLoading] = useState(false);
    const [Textcolor, setTextcolor] = useState(false);
    const [HomeTextColor, setHomeTextColor] = useState(false);
    const [loadingToast, setloadingToast] = useState(false);
    const [feedtext, setfeedtext] = useState(true);
    const myList = useRef(null);
    const [NoOfFollowers, setNoOfFollowers] = useState();
    const [NoOfFollowing, setNoOfFollowing] = useState();
    const [NoOfFeeds, setNoOfFeeds] = useState();
    const user = useSelector(state => (state?.fashion?.userDetails))
    const [userId, setuserId] = useState("");
    const [Homedata, SetHomeData] = useState(false);
    const [Datashow, SetDatashow] = useState(true);
    const [Categorymessage , SetCategorymessage ] = useState (false);

    console.log(user?._id, 'User_id----49');


    useEffect(() => {
        navigation.addListener('focus', () => {
            readData();
        });
    }, []);


    const readData = async () => {
        try {
            const jsonValue = (await AsyncStorage.getItem('key'))
            const token = (await AsyncStorage.getItem('token'))
            setAccessToken(token, "=======token========")

            let id = JSON.parse(jsonValue)._id;
            console.log('Saveddata', id);
            setUserData(JSON.parse(jsonValue)._id)
            var FirstName = JSON.parse(jsonValue).firstName;
            var LastName = JSON.parse(jsonValue).lastName;
            var FirstLastName = FirstName.concat(" ", LastName);
            SetUserFullName(FirstLastName)
            // SetUserFullName(JSON.parse(jsonValue).fullName)
            let imageprofile = JSON.parse(jsonValue).profilePicture;
            SetrenderImage(imageprofile)
            await getCatagoryAllList(token);
            userById()
            setuserId(user?._id, 'User_id----49');
            // onHomeClick()
        } catch (e) {
            // error reading value
            // console.log('Done')
        }
    }
    const userById = async () => {
        await findUserByIdService(user?._id).then(async (res) => {
            console.log("Followers----Data", res);
            const noOfFollowing = (res.data[0].noOfFollowing);
            setNoOfFollowing(noOfFollowing)
            const noOfFollowers = res.data[0].noOfFollowers;
            setNoOfFollowers(noOfFollowers)
            const numberOfFeeds = res.data[0].numberOfFeeds;
            setNoOfFeeds(numberOfFeeds)

        })
            .catch(err => {
                let error = err
                console.log(error)
            })

    }

    const getCatagoryAllList = async (accessToekn) => {
        console.log(accessToekn);
        await AllCategoryListing(accessToekn).then(async (res) => {
            let response = res;
            console.log("-----AllListCategory----", response.data);
            await setAllListCategoryList(response.data.data)
        })
            .catch(err => {
                let error = err
                console.log(error)
            })
    }
    const Page = "1";
    const getCatagoryList = async (userId, title, Page, accessToekn) => {
        console.log(userId, title, "1", accessToekn, "=========================")
        setHomeTextColor(false)
        setfeedtext(false)
        SetDatashow(false)
        setTextcolor(title);

        await FeedListByCategoryTrending(userId, title, Page, accessToekn).then(async (res) => {
            let response = res;
            let data = JSON.parse(JSON.stringify(response.data.data));
            console.log('========...........========')
            if (data.length === 0 || data.length === null) {
                // alert("No Data")
                SetCategorymessage(true)
                setListCategory(false)
            } else {
                setloadingToast(false)
                setLoading("")
                setListCategory(data)
                SetDatashow(false)
                SetCategorymessage(false)
                // setfeedtext(true)
                console.log("ListCategory---------------------------", setTextcolor(title));
            }


            // if (data != '') {
            //     setloadingToast(false)
            //     setLoading("")
            //     setListCategory(data)
            //     SetDatashow(false)
            //     // setfeedtext(true)
            //     console.log("ListCategory---------------------------", setTextcolor(title));

            // }
            // else {

            // }

        })
            .catch(err => {
                let error = err
                console.log(error)
            })
    }

    const Items = ({ title }) => (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 15,
            fontFamily: 'montserrat_medium',

        }}>
            <TouchableOpacity
                onPress={() => getCatagoryList(userId, title, "1", accessToekn)}
                style={styles.items}>
                <Text style={{
                    fontFamily: FontFamily.bold, fontSize: 15,
                    color: Textcolor === title ? Colors.black : Colors.TextGrey,
                    textTransform: 'capitalize'
                }}>{title}</Text>
            </TouchableOpacity>
        </View>
    );

    const render = ({ item }) => (
        <Items title={item.name} />
    );

    const renderFeedItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('UserFeedScreen', { item: item })}
            style={styles.item}>
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.ProfileImagescontainer}
                    source={{ uri: item?.followerDetails[0].profilePicture }} />
                <View style={styles.ProfileTextContainer}>
                    <Text style={styles.TitleStyle}>{item?.followerDetails[0].fullName}</Text>
                </View>
            </View>

            {item?.captionOption[0].imageURL[0].media_type == 'video/mp4' ?
                <View style={styles.FlatlistImagecontainer}>
                    <VideoPlayer
                        video={{ uri: item?.captionOption[0].imageURL[0].filePath }}
                    // videoWidth={SCREEN_WIDTH * 0.9}
                    // videoHeight={SCREEN_HEIGHT * 0.68}
                    />
                </View>
                :
                <Image style={styles.FlatlistImagecontainer}
                    source={{ uri: item?.captionOption[0].imageURL[0].filePath }} />
            }

            <View style={styles.TitleSizeContainer}>
                <Text style={styles.TitleStyle}>{item?.captionOption[0].brand}</Text>
            </View>
            <View style={{ paddingLeft: SCREEN_WIDTH * 0.01, paddingBottom: SCREEN_HEIGHT * 0.01 }}>
                <Text style={{ fontFamily: FontFamily.medium, }}>Size : {item?.captionOption[0].size}  </Text>
            </View>
        </TouchableOpacity>
    );
    const renderItem = ({ item }) => (

        <TouchableOpacity

            onPress={() => navigation.navigate('FeedScreen', { item: item })}
            style={styles.itemCard}>
            {item?.captionOption.imageURL[0].filePath.split('.').reverse()[0] == 'mp4' ?

                <View style={styles.FlatlistImagecontainers}>
                    <VideoPlayer
                        video={{ uri: item?.captionOption.imageURL[0].filePath }}
                        videoWidth={SCREEN_WIDTH * 0.9}
                        videoHeight={SCREEN_HEIGHT * 0.52}

                    // paused
                    />
                </View>
                :
                <Image style={styles.FlatlistImagecontainers}
                    source={{ uri: item?.captionOption.imageURL[0].filePath }} />
            }
            {/* <Image style={styles.FlatlistImage}
                source={{ uri: item?.captionOption.imageURL[0] }} /> */}

            <View style={styles.TitleSizeContainer}>
                <Text style={styles.TitleStyle}>{item?.captionOption.brand}</Text>
            </View>
            <View style={{ paddingLeft: SCREEN_WIDTH * 0.01, paddingBottom: SCREEN_HEIGHT * 0.01 }}>
                <Text style={{ fontFamily: FontFamily.medium, }}>Size :{item?.captionOption.size}</Text>
            </View>
        </TouchableOpacity>
    );

    const onHomeClick = async () => {
        SetHomeData(true)
        setListCategory(false)
        setloadingToast(false)
        setHomeTextColor(true)
        setTextcolor(false)
        SetDatashow(true)
        await FeedWithFollowerFeed(user?._id).then(async (res) => {
            let response = res;
            let data = JSON.parse(JSON.stringify(response.data.data));
            if (data != '') {
                setAllUserFeedList(data)
                setLoading(true)
                setloadingToast(false)
                feedtext(false)
                setfeedtext(false)
            }
            else {
                setLoading(false)
                feedtext(false)

            }

        })
            .catch(err => {
                let error = err
                console.log(error)
            })

    }

    return (
        <View style={styles.container}>
            <View style={styles.ProfileContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                    <Image style={styles.ProfileImage}
                        source={renderImage !== "None" && renderImage ? { uri: renderImage } : require('../../Assets/Images/ImageHolder/profileholder.jpg')}
                    >
                    </Image>
                </TouchableOpacity>
                <View style={{ marginRight: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.78 }}>
                    <Text style={styles.ProfileTextConatiner}>{UserFullName}</Text>
                </View>

                <Text style={styles.UserNameContainer}>{NoOfFeeds} Posts</Text>
                <TouchableOpacity style={{ position: 'absolute', marginTop: SCREEN_HEIGHT * 0.048, marginLeft: SCREEN_WIDTH * 0.51, fontFamily: FontFamily.regular }}>
                    <Text onPress={() => navigation.navigate('ProfileDetails', { Profileitem: Profileitem })} style={{ color: Colors.Pink, }}>Style Profile</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={{ color: Colors.black, position: 'absolute', marginTop: SCREEN_HEIGHT * 0.085, marginLeft: SCREEN_WIDTH * 0.23, fontFamily: FontFamily.regular }}
                    onPress={() => navigation.navigate('FriendListScreen')}
                >
                    <Text style={{ fontFamily: FontFamily.regular }} >
                        {NoOfFollowers} Followers
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ color: Colors.black, position: 'absolute', marginTop: SCREEN_HEIGHT * 0.085, marginLeft: SCREEN_WIDTH * 0.5, fontFamily: FontFamily.regular }}
                    onPress={() => navigation.navigate('FollowingList')}
                >
                    <Text style={{ fontFamily: FontFamily.regular }} >
                        {NoOfFollowing} Following
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: SCREEN_WIDTH * 0.85, position: 'absolute', alignItems: 'flex-end' }} onPress={() => navigation.navigate('SearchScreen')}>
                    <EvilIcons name="search" color={Colors.black} size={30}></EvilIcons>
                </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.listcontainer}>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false} >

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity onPress={onHomeClick}>
                            <Text style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                padding: 15,
                                fontFamily: FontFamily.bold,
                                color: Colors.TextGrey,
                                fontSize: 15,
                                color: HomeTextColor ? Colors.black : Colors.TextGrey,

                            }}>
                                Home
                            </Text>

                        </TouchableOpacity>

                        <FlatList
                            ref={myList}
                            horizontal
                            data={AllListCategoryList}
                            renderItem={(item) => render(item)}
                            keyExtractor={item => item._id}
                            showsHorizontalScrollIndicator={false}

                        />
                    </View>

                </ScrollView>


            </SafeAreaView>

            {
                AllUserFeedList.length < 1 || AllUserFeedList == null || !ListCategory || ListCategory.length < 1
                    ?
                    Datashow ?

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
                            <Text style={{
                                color: Colors.Pink, justifyContent: 'center', justifyContent: 'flex-start',
                                alignItems: 'center',
                                flexDirection: 'column', textAlign: 'center',
                                alignItems: 'center', flex: 1, height: SCREEN_HEIGHT * 0.05, marginTop: 220,
                                fontFamily: FontFamily.bold
                            }} >Follow people to start seeing the photos and videos they share. </Text>
                        </View>
                        :
                        null

                    :
                    <SafeAreaView style={styles.Flatlistcontainer}>
                        <FlatList
                            numColumns={1}
                            data={AllUserFeedList}
                            renderItem={(item) => renderFeedItem(item)}
                            keyExtractor={item => item._id}
                        />
                    </SafeAreaView>
            }

            <SafeAreaView style={styles.Flatlistcontainer}>

                {

                    ListCategory ?
                    <View style={{marginBottom:180}}>
                         <FlatList 
                            numColumns={2}
                            data={ListCategory}
                            renderItem={(item) => renderItem(item)}
                            keyExtractor={item => item._id}

                        />
                    </View>
                       
                        :

                        null
                }





                {
                   Categorymessage ? 
                        

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
                        <Text style={{
                            color: Colors.Pink, justifyContent: 'center', justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'column', textAlign: 'center',
                            alignItems: 'center', flex: 1, height: SCREEN_HEIGHT * 0.05, marginTop: 220,
                            fontFamily: FontFamily.bold
                        }} >No Feed Data in this category</Text>
                    </View>
                            :
                           null
                }



            </SafeAreaView>

           


        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightPink,
        marginBottom: 60
    },
    containervideo: {
        flex: 1,
        justifyContent: 'center'
    },
    ImageContainer: {
        backgroundColor: Colors.lightPink,
        flexDirection: 'row',
        padding: 10
    },
    Imagestyle: {
        width: SCREEN_WIDTH * 0.055,
        height: SCREEN_HEIGHT * 0.022
    },

    BackTextStyle: {
        fontFamily: 'montserrat_medium',
        fontSize: 16,
        fontWeight: '400',
        marginLeft: SCREEN_WIDTH * 0.01


    },
    SearchContainer: {
        marginLeft: SCREEN_WIDTH * 0.75
    },
    BackgroundImageContainer: {
        // flex: 1,
        // marginTop: SCREEN_HEIGHT * 0.04,
        height: SCREEN_HEIGHT * 0.47,
        width: SCREEN_WIDTH,
    },
    ContentContainer: {
        position: 'absolute',
        marginTop: SCREEN_HEIGHT * 0.18
    },
    TextStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 21,
        // fontWeight: '400',
        color: Colors.White,
        marginLeft: SCREEN_WIDTH * 0.022
    },
    Texingstyle: {
        fontFamily: FontFamily.bold,
        fontSize: 30,
        // fontWeight: 'bold',
        color: Colors.White,
        marginLeft: SCREEN_WIDTH * 0.022
    },
    itemCard: {
        margin: SCREEN_WIDTH * 0.025,
        backgroundColor: Colors.White,

        borderRadius: 5,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },

    },
    TickStyle: {
        width: SCREEN_WIDTH * 0.05,
        height: SCREEN_HEIGHT * 0.025,
        marginTop: SCREEN_HEIGHT * 0.022,
        marginLeft: SCREEN_WIDTH * 0.015

    },
    TextingContainer: {
        flexDirection: 'row'
    },
    MiracelContainer: {
        fontFamily: FontFamily.light,
        fontSize: 12,
        // fontWeight: '200',
        color: Colors.White,
        marginLeft: SCREEN_WIDTH * 0.022
    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    UpdateContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.black,
        marginTop: SCREEN_HEIGHT * 0.02,
        padding: 12,
        width: SCREEN_WIDTH,
        justifyContent: 'space-between'
    },
    LetterContainer: {
        fontFamily: FontFamily.medium,

        color: Colors.Pink,
    },
    NumberContainer: {
        fontFamily: FontFamily.medium,
        color: Colors.White,
        // fontWeight: 'bold'
    },
    FollowerContainer: {
        fontFamily: FontFamily.medium,
        color: Colors.White,
        // fontWeight: 'bold',
        marginLeft: SCREEN_WIDTH * 0.04
    },
    FollowerletterContainer: {
        fontFamily: FontFamily.medium,

        color: Colors.Pink,
    },
    FollowingContainer: {
        fontFamily: FontFamily.medium,

        color: Colors.White,
        // fontWeight: 'bold',
        marginLeft: SCREEN_WIDTH * 0.04

    },
    FollowingletterContainer: {
        fontFamily: FontFamily.medium,

        color: Colors.Pink,
    },
    SelectText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Colors.White,
        padding: 15
    },
    Outfitstyle: {
        fontFamily: FontFamily.medium,
        fontSize: 17,
        color: Colors.TextGrey
    },
    Tops: {
        fontFamily: FontFamily.medium,
        fontSize: 17,
        color: Colors.black

    },
    Bottoms: {
        fontSize: 17,
        fontFamily: FontFamily.medium,

        color: Colors.TextGrey

    },
    Accessory: {
        fontFamily: FontFamily.medium,

        fontSize: 17,
        color: Colors.TextGrey

    },
    Shoes: {
        fontFamily: FontFamily.medium,

        fontSize: 17,
        color: Colors.TextGrey
    },
    FlatlistImagecontainer: {
        width: SCREEN_HEIGHT * 0.425,
        height: SCREEN_HEIGHT * 0.24,
        // borderTopLeftRadius: 5,
        // borderTopRightRadius: 5

    },
    FlatlistImagecontainers:
    {
        width: SCREEN_HEIGHT * 0.2,
        height: SCREEN_HEIGHT * 0.24,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
        // width: SCREEN_HEIGHT * 0.425,
        // height: SCREEN_HEIGHT * 0.24,
    },
    FlatlistImage: {
        width: SCREEN_HEIGHT * 0.2,
        height: SCREEN_HEIGHT * 0.24,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    ProfileImagescontainer: {
        height: SCREEN_HEIGHT * 0.04,
        margin: SCREEN_HEIGHT * 0.01,
        borderRadius: 50,
        width: SCREEN_WIDTH * 0.10,
        backgroundColor: Colors.Grey,
        aspectRatio: 1
    },
    ProfileTextContainer: {
        alignItems: 'flex-start',
        paddingLeft: SCREEN_WIDTH * 0.01,
        paddingBottom: SCREEN_HEIGHT * 0.01,
        fontFamily: FontFamily.medium,
        marginTop: SCREEN_HEIGHT * 0.01
    },
    TitleSizeContainer: {
        alignItems: 'flex-start',
        paddingLeft: SCREEN_WIDTH * 0.01,
        paddingBottom: SCREEN_HEIGHT * 0.01,
        fontFamily: FontFamily.medium
    },

    TitleStyle: {
        fontFamily: FontFamily.bold,
        margin: 2,
        fontSize: 15,
        // fontWeight: 'bold'
    },
    SizeStyle: {
        fontFamily: FontFamily.medium,

    },
    item: {
        margin: SCREEN_WIDTH * 0.024,
        backgroundColor: Colors.White,
        borderRadius: 5,
        flexDirection: 'column',
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
    },


    Flatlistcontainer: {
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center',
        marginTop: SCREEN_HEIGHT * 0.0,
        // marginBottom:180
        // marginLeft: SCREEN_WIDTH * 0.04,
    },
    Imagescontainer: {
        width: SCREEN_WIDTH * 0.14,
        height: SCREEN_HEIGHT * 0.07,
        borderRadius: 100,
        resizeMode: 'contain',

    },
    items: {
        // margin
        // Horizontal: 3,
        // width: SCREEN_WIDTH * 0.2
        // marginVertical: 5,
        // backgroundColor: '#fff',
        // borderRadius: 10
    },
    TitleStyles: {
        fontFamily: FontFamily.bold,
        fontSize: 15,
        color: Colors.TextGrey
    },
    listcontainer: {
        backgroundColor: Colors.White,
        marginTop: SCREEN_HEIGHT * 0.03,
        flexDirection: 'row'
        // marginLeft: SCREEN_WIDTH * 0.04,
    },
    ProfileContainer: {
        marginTop: SCREEN_HEIGHT * 0.05,
        flexDirection: 'row',
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center'
    },
    ProfileImage: {
        borderRadius: 4,
        width: SCREEN_WIDTH * 0.21,
        height: SCREEN_HEIGHT * 0.11,
        // marginLeft: SCREEN_WIDTH * 0.025,
    },
    ProfileTextConatiner: {
        // fontFamily: FontFamily.regular,
        // marginLeft: SCREEN_WIDTH * 0.03,
        // marginRight: SCREEN_WIDTH * 0.01,

        // fontSize: 20,
        // fontWeight: '600',
        // marginTop: SCREEN_HEIGHT * 0.015,

        fontFamily: FontFamily.medium,
        marginLeft: SCREEN_WIDTH * 0.025,
        marginRight: SCREEN_WIDTH * 0.01,
        fontSize: 18,
        // fontWeight: '600',

    },
    EditButtonContainer: {
        marginLeft: SCREEN_WIDTH * 0.38,
        marginTop: SCREEN_HEIGHT * 0.022,
    },
    UserNameContainer: {
        fontFamily: FontFamily.regular,
        marginLeft: SCREEN_WIDTH * 0.23,
        marginTop: SCREEN_HEIGHT * 0.05,
        position: 'absolute',
        color: Colors.black
    },
    EditButtonContainer: {
        marginLeft: SCREEN_WIDTH * 0.38,
        marginTop: SCREEN_HEIGHT * 0.022,
    },
});