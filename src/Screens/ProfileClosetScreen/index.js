// Splash
import React, { useState, useRef, useEffect } from 'react';
import { Items, View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView } from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Header } from '../../Component/Header';
import { navigate } from '../../../RootNavigation';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import { OutfitScreen } from './Outfits';
import { TopsScreen } from './Tops';
import { BottomScreen } from './Bottoms';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { AccessoryScreen } from './Accessory';
import { ShoesScreen } from './Shoes';
import { useRoute } from '@react-navigation/native';
import { addFollowService, searchUserByIdService, unFollowService } from '../../Helper/Services';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import Loader from '../../Component/Loader';
import Toast from 'react-native-toast-message'
import { AllCategoryListing } from '../../Helper/Services';
import { FeedListByCategory } from '../../Helper/Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findUserByIdService } from '../../Helper/Services/index';
import VideoPlayer from 'react-native-video-player';
const filter = "date_filter";

const data = [
    {
        Tabs: 'Outfits',

    },
    {
        Tabs: 'Tops',

    },
    {
        Tabs: 'Bottoms',

    },
    {
        Tabs: 'Accessory',
    },
    {
        Tabs: 'Shoes',
    },


];


const ENTRIES1 = [
    {
        // illustration: require('../../Assets/Images/BackgroundImage/background.png'),
        // Component: 
        component: < OutfitScreen onCardPress={() => navigate('FeedScreen')} />,
    },
    {
        // illustration: require('../../Assets/Images/BackgroundImage/background.png'),
        // Component: < OutfitScreen />,
        component: <TopsScreen onCardPress={() => navigate('FeedScreen')}/>
    },
    {
        // illustration: require('../../Assets/Images/BackgroundImage/background.png'),
        // Component: < OutfitScreen />,
        component: <BottomScreen onCardPress={() => navigate('FeedScreen')}/>
    },
    {
        // illustration: require('../../Assets/Images/BackgroundImage/background.png'),
        // Component: < OutfitScreen />,
        component: <AccessoryScreen onCardPress={() => navigate('FeedScreen')}/>
    },
    {
        // illustration: require('../../Assets/Images/BackgroundImage/background.png'),
        // Component: < OutfitScreen />,
        component: <ShoesScreen onCardPress={() => navigate('FeedScreen')}/>
    },

];



const render = ({ item,onCardPress }, parallaxProps,) => {


    return (
        <View style={{flex: 1}} >{item.component}</View>
    );
};



export function ProfileClosetScreen({ navigation, onCardPress }) {

    const route = useRoute()
    const user = useSelector(state => (state?.fashion?.userDetails))
    const [activeSlide, setActiveSlide] = useState(0);
    const [userData, setuserData] = useState('')
    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);
    const [isFollowing, setisFollowing] = useState()
    const [id, setid] = useState(route?.params?.id)
    const [loader, setloader] = useState(true)
    const [isAccepted, setisAccepted] = useState(false)
    const [accessToekn, setAccessToken] = useState("")
    const [NoOfFollowers, setNoOfFollowers] = useState();
    const [NoOfFollowing, setNoOfFollowing] = useState();
    const [NoOfFeeds, setNoOfFeeds] = useState();
    const myList = useRef(null);
    const [AllListCategoryList, setAllListCategoryList] = useState([]);
    const [loadingToast, setloadingToast] = useState(false);
    const [ListCategory, setListCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [Textcolor, setTextcolor] = useState(false);

    useEffect(() => {
        setid(route?.params?.id)
        setEntries(ENTRIES1);
        setTimeout(() => {
            setloader(false)
        }, 3000);
        console.log(route?.params?.data)
        setuserData(route?.params?.data)
        console.log(route?.params?.data,"Miiiiiiii")
        readData();
        userById()
        userByIdDeatils()
       
    }, []);

    const readData = async () => {
        const token = (await AsyncStorage.getItem('token'))
        setAccessToken(token)
        await getCatagoryAllList(token);
       
        // await  getCatagoryList(id, 'top', token)

    }
    const userByIdDeatils = async () => {
        await findUserByIdService(id).then(async (res) => {
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
    const userById = () => {
        let followingList = []
        // console.log( typeof user,"lllllll")
        findUserByIdService(user?._id).then(res => checkFollowingStatus(res?.data[0].followDetails))
    }

    const checkFollowingStatus = list => {
        // console.log(list)
        if(list.length == 0) 
        {
            setisFollowing(false)
        }else{
            let a = list.find(element => element?.followerId == route?.params?.id)
            if( a != undefined) 
            {
                setisFollowing(true)
            }else {
                setisFollowing(false)
            }
            setisAccepted(a?.isAccepted)
        }
        setloader(false)
    }


    const [ActiveTab, SetActiveTab] = useState(0);  

    const renderItem = ({ item, index ,onCardPress}) => (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: Colors.White,
            padding: 15,

        }}>
            <TouchableOpacity onPress={()=>{carouselRef.current.snapToItem(index);setActiveSlide(index)}}  >
                <Text 
                 style={{
                    fontFamily: FontFamily.bold,
                    fontSize: 14,
                    color: activeSlide == index ? Colors.black : Colors.DarkGrey,

                }}>{item.Tabs}</Text>
            </TouchableOpacity>
        </View>
        // <Items Tabs={item.Tabs} />
    );

    const getCatagoryAllList = async (accessToekn) => {
        console.log(accessToekn);
        await AllCategoryListing(accessToekn).then(async (res) => {
            let response = res;
            console.log("-----AllListCategory----", response.data);
            await setAllListCategoryList(response.data.data)
            const jsonValue = (await AsyncStorage.getItem('key'))
            let id = JSON.parse(jsonValue)._id;
         
            if (route.params) {
                const Categoryvalue = route.params.SelectedItem;
                let i = response.data.data.findIndex((a) => a.name.toLowerCase() === route.params.SelectedItem.toLowerCase())
                myList.current.scrollToIndex({ animated: true, index: i, viewPosition: 0 });
                setTextcolor(route.params.SelectedItem)
                await FeedListByCategory(id, Categoryvalue, "date_filter",accessToekn).then(async (res) => {
                    let response = res;
                    let data = JSON.parse(JSON.stringify(response.data.data));
                    if (data != '') {
                        setListCategory(data)
                        setLoading(false)
                    }
                    else {

                    }

                })
                    .catch(err => {
                        let error = err
                        console.log(error)
                    })
            }

        })
            .catch(err => {
                let error = err
                console.log(error)
            })
    }
    const getCatagoryList = async (id, title, accessToekn) => {
        console.log('--------------------', id, accessToekn);
        await FeedListByCategory(id, title,"date_filter", accessToekn).then(async (res) => {
            let response = res;
            let data = JSON.parse(JSON.stringify(response.data.data));
            if (data != '') {
                setListCategory(data)
                setTextcolor(title);
                console.log("ListCategory---------------------------", setTextcolor(title));
                setloadingToast(false)
                setLoading(false)
            }
            else {
                setTextcolor(title);
                setloadingToast(true)
                setLoading(false)

            }

        })
            .catch(err => {
                let error = err
                console.log(error)
            })
    }
    const render = ({ item }) => (
        <Items title={item.name} />
    );
    const Items = ({ title }) => (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 15,
            fontFamily: 'montserrat_medium',

        }}>
            <TouchableOpacity
                onPress={() => getCatagoryList(id, title, accessToekn)}
                style={styles.items}>
                <Text style={{
                    fontFamily: FontFamily.bold, fontSize: 15,
                    color: Textcolor === title ? Colors.black : Colors.TextGrey,
                    textTransform: 'capitalize'
                }}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
    const renderItemData = ({ item }) => (

        <TouchableOpacity

            onPress={setLoading(false), () => navigation.navigate('FeedScreen', { item: item  })}
            style={styles.item}>

            {item?.captionOption.imageURL[0].filePath.media_type == 'video/mp4' ?

                <View style={styles.FlatlistImagecontainer}>
                    <VideoPlayer
                        video={{ uri: item?.captionOption.imageURL[0].filePath }}
                        videoWidth={SCREEN_WIDTH * 0.9}
                        videoHeight={SCREEN_HEIGHT * 0.52}

                    // paused
                    />
                </View>
                :
                <Image style={styles.FlatlistImagecontainer}
                    source={{ uri: item?.captionOption.imageURL[0].filePath }} />
            }
           
            <View style={styles.TitleSizeContainer}>
                <Text style={styles.TitleStyle}>{item?.captionOption.brand}</Text>
            </View>
            <View style={{ paddingLeft: SCREEN_WIDTH * 0.01, paddingBottom: SCREEN_HEIGHT * 0.01 }}>
                <Text style={{ fontFamily: FontFamily.medium, }}>Size : {item?.captionOption.size} </Text>
            </View>
        </TouchableOpacity>
    );
    const navigateToChatScreen = () => {
        !isFollowing 
            ? 
        (Toast.show({
            type: 'info',
            text1: 'Oops!',
            text2: 'Please follow the user first for sending messages!'
        })) 
            : 
        ( 
            !isAccepted 
                ? 
            (Toast.show({
                type: 'info',
                text1: 'Oops!',
                text2: 'Please wait till your request get accepted for sending messages!'
            })) 
                :
            navigation.navigate('ChatScreen', {secondUser: { "_id": id, "isBlocked": false}})
        )
    }

    return (
        <View style={styles.container}>

            <View >
                <Header
                    onIconPress={() => navigate('SearchScreen')}
                    currentObject={navigation}
                    BackTextName={
                        <Text style={{
                            fontFamily: FontFamily.medium,
                        }}>Back</Text>
                    }
                    // IconComponent={
                    //     <Icon
                    //         // style={styles.SearchContainer}
                    //         name="search" color={Colors.black} size={18}
                    //     />
                    // }
                />

            </View>

            {
                loader
                ?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                    <Loader/>
                </View>
                :
                <ScrollView nestedScrollEnabled={true} onResponderMove={() => console.log('Outer Scrollview')} >
                <ImageBackground
                    style={styles.BackgroundImageContainer}
                    source={userData?.profilePicture !== "None" && userData?.profilePicture ? { uri: userData?.profilePicture } :  require('../../Assets/Images/ImageHolder/profileholder.jpg')}
                    >

                </ImageBackground>

                <View style={styles.ContentContainer}>
                    <Text style={styles.TextStyle}>Style Profile</Text>

                    <View style={styles.TextingContainer}>
                        <Text style={styles.Texingstyle}>{userData?.fullName}</Text>
                                                <Image style={styles.TickStyle}

                            source={require('../../Assets/Images/Tickmark/Group.png')}
                            >
                        </Image>
                    </View>
                    {/* <Text style={styles.MiracelContainer}>Followed by Miracle Geidt, Tatiana Korsgaard and 800 Others</Text> */}
                    <View style={styles.ButtonContainer}>

                        <LoginButton
                            onSubmitPress={() => {
                                !isFollowing
                                    ?
                                addFollowService(user?._id, id).then(res => {
                                    Toast.show({
                                        text1: res?.msg
                                    })
                                    userById()
                                    }
                                )
                                    :
                                unFollowService(user?._id, id).then(res => {
                                    Toast.show({
                                        text1: res?.msg
                                    })
                                    setisFollowing(preV => !preV)
                                    }
                                )
                            }}
                            ButtonTextStyle={{ color: Colors.White, fontSize: 16, fontFamily: FontFamily.bold }}
                            ButtonStyle={{
                                backgroundColor: Colors.Pink,
                                width: SCREEN_WIDTH * 0.38,
                                height: SCREEN_HEIGHT * 0.05,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 5,
                            }}
                            buttonTitle={isFollowing ? (isAccepted ? 'Unfollow' : 'Requested') : 'Follow'} />

                        <LoginButton
                            ButtonTextStyle={{
                                color: Colors.Pink, fontSize: 16, fontFamily: FontFamily.bold,
                            }}
                            onSubmitPress={navigateToChatScreen}
                            ButtonStyle={{
                                backgroundColor: Colors.White,
                                width: SCREEN_WIDTH * 0.38,
                                height: SCREEN_HEIGHT * 0.05,
                                justifyContent: "center",
                                alignItems: "center",
                                // marginTop: SCREEN_HEIGHT * 0.01,
                                borderRadius: 5,

                            }}
                            buttonTitle="Message" />
                    </View>

                    <View style={styles.UpdateContainer}>
                        <TouchableOpacity>
                            <View>
                                <Text style={styles.NumberContainer}>{NoOfFeeds}</Text>
                                <Text style={styles.LetterContainer}>Posts</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View>
                                <Text style={styles.FollowerContainer}> {NoOfFollowers}</Text>
                                <Text style={styles.FollowerletterContainer}>Followers</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View>
                                <Text style={styles.FollowingContainer}> {NoOfFollowing}</Text>
                                <Text style={styles.FollowingletterContainer}>Following</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            
                <SafeAreaView  style={{ backgroundColor: Colors.White, flexDirection: 'row' }}>
                    <FlatList
                        ref={myList}
                        horizontal
                        data={AllListCategoryList}
                        renderItem={(item) => render(item)}
                        keyExtractor={item => item._id}
                        showsHorizontalScrollIndicator={false}
                        onScrollToIndexFailed={info => {
                            const wait = new Promise(resolve => setTimeout(resolve, 500));
                            wait.then(() => {
                                myList.current?.scrollToIndex({ index: info.index, animated: true });
                            });
                        }}
                    />


                </SafeAreaView>
                <SafeAreaView style={styles.Flatlistcontainer}>
                    {loadingToast ? (
                        <SafeAreaView style={styles.Flatlistcontainer}>
                            <Text style={{
                                color: Colors.Pink, justifyContent: 'center', justifyContent: 'flex-start',
                                alignItems: 'center',
                                flexDirection: 'column', textAlign: 'center',
                                alignItems: 'center', flex: 1, height: SCREEN_HEIGHT * 0.05, marginTop: 110,
                                fontFamily: FontFamily.bold
                            }}>No Feed Available</Text>
                        </SafeAreaView>

                    ) :
                        <FlatList
                            numColumns={2}
                            data={ListCategory}
                            renderItem={(item) => renderItemData(item)}
                            keyExtractor={item => item._id}

                        />
                    }

                </SafeAreaView>
            </ScrollView>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightPink
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
        height: SCREEN_HEIGHT * 0.42,
        width: SCREEN_WIDTH,
    },
    ContentContainer: {
        position: 'absolute',
        marginTop: SCREEN_HEIGHT * 0.16,
        position:'absolute'
    },
    TextStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 21,
        // fontWeight: '400',
        color: Colors.White,
        marginLeft: SCREEN_WIDTH * 0.07,
    },
    Texingstyle: {
        fontFamily: FontFamily.bold,
        fontSize: 30,
        // fontWeight: 'bold',
        color: Colors.White,
        marginLeft: SCREEN_WIDTH * 0.07
    },
    TickStyle: {
        // width: SCREEN_WIDTH * 0.05,
        // height: SCREEN_HEIGHT * 0.025,
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
        justifyContent: 'space-evenly',
        width: SCREEN_WIDTH
    },
    UpdateContainer: {
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: Colors.black,
        height: 50,
        width: SCREEN_WIDTH,
        justifyContent: 'space-around',
        top: SCREEN_HEIGHT * 0.19,
        alignItems: 'center'
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
        width: SCREEN_HEIGHT * 0.2,
        height: SCREEN_HEIGHT * 0.24,
        borderTopLeftRadius:5,
        borderTopRightRadius:5
        // marginVertical: SCREEN_HEIGHT * 0.01,
    },
    TitleSizeContainer: {
        alignItems: 'flex-start',
        paddingLeft: SCREEN_WIDTH * 0.01
    },
    TitleStyle: {
        fontFamily: FontFamily.bold,

        fontSize: 15,
        // fontWeight: 'bold'
    },
    SizeStyle: {
        fontFamily: FontFamily.medium,

    },
    item: {
        margin: SCREEN_WIDTH * 0.025,
        backgroundColor: Colors.White,
        
        borderRadius:5,
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
        marginTop: SCREEN_HEIGHT * 0.02,
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

        // marginTop: SCREEN_HEIGHT * 0.01,
        // marginLeft: SCREEN_WIDTH * 0.04,
    },
});