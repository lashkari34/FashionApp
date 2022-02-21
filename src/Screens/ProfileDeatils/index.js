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
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { AllCategoryListing } from '../../Helper/Services';
import { FeedListByCategory } from '../../Helper/Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findUserByIdService } from '../../Helper/Services/index';
import { useSelector } from 'react-redux';
import VideoPlayer from 'react-native-video-player';
const filter = "date_filter";

export function ProfileDetails({ route, navigation, onCardPress }) {
    useEffect(() => {
        readData();
        navigation.addListener('focus', () => {
            readData();
        });
    }, []);
    const [activeSlide, setActiveSlide] = useState(0);
    const [AllListCategoryList, setAllListCategoryList] = useState([]);
    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);
    const myList = useRef(null);
    const [renderImage, SetrenderImage] = useState();
    const [UserData, setUserData] = useState(null);
    const [accessToekn, setAccessToken] = useState("")
    const [Textcolor, setTextcolor] = useState(false);
    const [UserFullName, SetUserFullName] = useState(null);
    const [loadingToast, setloadingToast] = useState(false);
    const [ListCategory, setListCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [SelectedItem, setSelectedItem] = useState();
    const [NoOfFollowers, setNoOfFollowers] = useState();
    const [NoOfFollowing, setNoOfFollowing] = useState();
    const [NoOfFeeds, setNoOfFeeds] = useState();
    const user = useSelector(state => (state?.fashion?.userDetails))


    const readData = async () => {
        try {
            const jsonValue = (await AsyncStorage.getItem('key'))
            const token = (await AsyncStorage.getItem('token'))
            setAccessToken(token)
            let id = JSON.parse(jsonValue)._id;
            console.log('Saveddata', id);
            setUserData(JSON.parse(jsonValue)._id)
             var FirstName = JSON.parse(jsonValue).firstName ;
            var LastName = JSON.parse(jsonValue).lastName;
            var FirstLastName = FirstName.concat(" " , LastName);
            SetUserFullName(FirstLastName)
            // SetUserFullName(JSON.parse(jsonValue).fullName)
            let imageprofile = JSON.parse(jsonValue).profilePicture;
            console.log(imageprofile, 'surbhiprofile');
            SetrenderImage(imageprofile)
            await getCatagoryAllList(token);
            userById()
            // if(route.params.Profileitem){
            //     await getCatagoryList(id, "top", token);
    
            //    }

        } catch (e) {

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

    const getCatagoryList = async (UserData, title, accessToekn) => {
        console.log('--------------------', UserData, accessToekn);
        await FeedListByCategory(UserData, title,"date_filter", accessToekn).then(async (res) => {
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
    const renderItem = ({ item }) => (

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
                onPress={() => getCatagoryList(UserData, title, accessToekn)}
                style={styles.items}>
                <Text style={{
                    fontFamily: FontFamily.bold, fontSize: 15,
                    color: Textcolor === title ? Colors.black : Colors.TextGrey,
                    textTransform: 'capitalize'
                }}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
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
                    IconComponent={
                        <Icon
                            // style={styles.SearchContainer}
                            name="search" color={Colors.black} size={18}
                        />
                    }
                />

            </View>

            <ScrollView nestedScrollEnabled={true} onResponderMove={() => console.log('Outer Scrollview')} >
                <ImageBackground
                    style={styles.BackgroundImageContainer}

                    source={renderImage !== "None" && renderImage ? { uri: renderImage } :  require('../../Assets/Images/ImageHolder/profileholder.jpg')}
                >
                </ImageBackground>

                <View style={styles.ContentContainer}>
                    <View style={{ marginLeft: SCREEN_WIDTH * 0.06 }} >
                        <Text style={styles.TextStyle}>Style Profile</Text>

                        <View style={styles.TextingContainer}>
                            <Text style={styles.Texingstyle}>{UserFullName}</Text>

                        </View>
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
                {/* <ScrollView> */}
                <SafeAreaView style={{ backgroundColor: Colors.White, flexDirection: 'row' }}>
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
                            renderItem={(item) => renderItem(item)}
                            keyExtractor={item => item._id}

                        />
                    }

                </SafeAreaView>
            </ScrollView>
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
        height: SCREEN_HEIGHT * 0.38,
        width: SCREEN_WIDTH,
    },
    ContentContainer: {
        position: 'absolute',
        marginTop: SCREEN_HEIGHT * 0.20,

    },
    TextStyle: {
        fontFamily: FontFamily.regular,
        fontSize: 18,
        // fontWeight: '400',
        color: Colors.White,

    },
    Texingstyle: {
        fontFamily: FontFamily.bold,
        fontSize: 30,
        // fontWeight: 'bold',
        color: Colors.White,
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
        color: Colors.White,
        marginLeft: SCREEN_WIDTH * 0.022,

    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignContent:'center'
        left: SCREEN_WIDTH * 0.05

    },
    UpdateContainer: {
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: Colors.black,
        height: 50,
        width: SCREEN_WIDTH,
        justifyContent: 'space-around',
        top: SCREEN_HEIGHT * 0.112,
        alignItems: 'center'
    },
    LetterContainer: {
        fontFamily: FontFamily.medium,

        color: Colors.Pink,
    },
    NumberContainer: {
        fontFamily: FontFamily.medium,
        color: Colors.White,
        marginLeft: SCREEN_WIDTH * 0.05
        // fontWeight: 'bold'
    },
    FollowerContainer: {
        fontFamily: FontFamily.medium,
        color: Colors.White,
        // fontWeight: 'bold',
        marginLeft: SCREEN_WIDTH * 0.08
    },
    FollowerletterContainer: {
        fontFamily: FontFamily.medium,

        color: Colors.Pink,
    },
    FollowingContainer: {
        fontFamily: FontFamily.medium,

        color: Colors.White,
        // fontWeight: 'bold',
        marginLeft: SCREEN_WIDTH * 0.08

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
        
    },
    TitleSizeContainer: {
        alignItems: 'flex-start',
        paddingLeft: SCREEN_WIDTH * 0.01,
        paddingBottom: SCREEN_HEIGHT * 0.01
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

    },
    TitleStyles: {
        fontFamily: FontFamily.bold,
        fontSize: 15,
        color: Colors.TextGrey
    },

});
