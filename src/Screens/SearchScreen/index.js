import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, SafeAreaView } from "react-native"
// import { Icon } from 'react-native-vector-icons/FontAwesome';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { Header } from '../../Component/Header';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import { searchUserService } from '../../Helper/Services';
import { FeedListByCategorySearch } from '../../Helper/Services';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Radio } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-elements/dist/helpers';
import VideoPlayer from 'react-native-video-player';
const CategoryItem="category";

export function SearchScreen({ navigation }) {
    // console.log('searchScreen')
    const [searchedUserList, setsearchedUserList] = React.useState([])
    const [searchedFeedList, setsearchedFeedList] = React.useState([])
    const [accessToekn, setAccessToken] = useState("")

    const user = useSelector(state => state?.fashion?.userDetails)
    useEffect(() => {
        readData()
    }, []);

    // const usertoken = useSelector(state => state?.fashion?.saveUserToken)
    const readData = async () => {
        const token = (await AsyncStorage.getItem('token'))
        await setAccessToken(token)

    }



    const [CostumeType, setCostumeType] = useState()

    const render = ({ item, index }) => (

        <TouchableOpacity style={styles.liststyle} onPress={() => navigation.navigate('ProfileClosetScreen', { data: item, id: item?._id ,CategoryItem:CategoryItem})} >
            <Image style={styles.Imagescontainer}
                source={item?.profilePicture !== "None" && item?.profilePicture ? { uri: item?.profilePicture } : require('../../Assets/Images/ImageHolder/profileholder.jpg')}
               />
         
             <View style={styles.TitleSizeContainer}>
                <Text style={styles.TitleStyle}>{item.fullName}</Text>
            </View>
        </TouchableOpacity>

    );

    const renderUser = ({ item, index }) => (

        <TouchableOpacity
            onPress={() => navigation.navigate('FeedScreen', { item: item })}
            style={styles.itemCard}>
            {item?.captionOption.imageURL[0].filePath.split('.').reverse()[0] == 'mp4' ?
                <View style={styles.FlatlistImage}>
                    <VideoPlayer
                        video={{ uri: item?.captionOption.imageURL[0].filePath }}
                        videoWidth={SCREEN_WIDTH * 0.9}
                        videoHeight={SCREEN_HEIGHT * 0.52}
                    />
                </View>
                :
                <Image style={styles.FlatlistImage}
                    source={{ uri: item?.captionOption.imageURL[0].filePath }} />
            }
            {/* <Image style={styles.FlatlistImage}
                source={{ uri: item?.captionOption.imageURL[0].filePath }} /> */}

            <View style={styles.TitleSizeContainerfeed}>
                <Text style={styles.TitleStyle}>{item?.captionOption.brand}</Text>
            </View>
            <View style={{ paddingLeft: SCREEN_WIDTH * 0.01, paddingBottom: SCREEN_HEIGHT * 0.01 }}>
                <Text style={{ fontFamily: FontFamily.medium, }}>Size :{item?.captionOption.size}</Text>
            </View>
        </TouchableOpacity>

    );

    const Itemscard = ({ title, item }) => (
        <TouchableOpacity style={styles.liststyle} >
            <View style={styles.TitleSizeContainer}>
                <Text style={styles.TitleStyle}>{title}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View >
                <Header
                    currentObject={navigation}
                    BackTextName={
                        <Text style={{
                            fontFamily: FontFamily.medium,
                        }}>Back</Text>
                    }
                />

            </View>
            <Text style={{
                marginLeft: SCREEN_WIDTH * 0.04, fontFamily: FontFamily.bold,
                fontSize: 16, marginTop: SCREEN_HEIGHT * 0.02
            }}>Search By - </Text>
            <View style={styles.RadioContainer}>
               
                    <Radio selected={CostumeType == 'User' ? true : false} color={Colors.White} selectedColor={Colors.Pink} color={Colors.Pink} onPress={() => setCostumeType('User')}/>
                    <Text style={styles.PrivateTextContainer}>User</Text>
               
                
                    <Radio selected={CostumeType == 'Feed' ? true : false} color={Colors.White} selectedColor={Colors.Pink} color={Colors.Pink} onPress={() => setCostumeType('Feed')} style={{marginLeft:SCREEN_WIDTH*0.08}}/>
                    <Text style={styles.PublicTextContainer}>Feed</Text>
              

            </View>
            <View style={styles.TextInputContainer}>
                {
                    CostumeType == 'User' ?
                        <CustomTextInput
                            showReverse
                            TextInputProps={{
                                placeholder: "Search"
                            }}
                            onChangeText={text => searchUserService(text).then(res => setsearchedUserList(res?.data))}
                            IconName="search"
                            IconColor={Colors.black}
                        />

                        : null
                }

                {
                    CostumeType == 'Feed' ?
                        <CustomTextInput
                            showReverse
                            TextInputProps={{
                                placeholder: "Search"
                            }}
                            onChangeText={text => FeedListByCategorySearch(user?._id, text, accessToekn).then(res => setsearchedFeedList(res?.data))}
                            IconName="search"
                            IconColor={Colors.black}
                        />
                        :
                        null
                }

            </View>
            {
                CostumeType == 'User' ?
                    <FlatList
                        data={searchedUserList}
                        renderItem={render}
                    />
                    :
                    null
            }

            {
                CostumeType == 'Feed' ?
                    <SafeAreaView style={styles.Flatlistcontainer}>
                        <FlatList
                            numColumns={2}
                            data={searchedFeedList.data}
                            renderItem={(item) => renderUser(item)}
                            keyExtractor={item => item._id}
                        />

                    </SafeAreaView>

                    :
                    null
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
        // alignSelf : 'center'
    },
    Flatlistcontainer: {
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center',
        marginTop: SCREEN_HEIGHT * 0.0,

        flexDirection: 'row'
        // marginLeft: SCREEN_WIDTH * 0.04,
    },
    RadioContainer: {
        flexDirection: 'row',
        marginTop: SCREEN_HEIGHT * 0.02,
        // justifyContent: 'space-evenly',
        marginHorizontal: SCREEN_WIDTH * 0.09,
        marginLeft: SCREEN_WIDTH * 0.14,
        right: SCREEN_WIDTH * 0.1,
        // marginLeft: '10%'
    },
    FlatlistImage: {
        width: SCREEN_HEIGHT * 0.2,
        height: SCREEN_HEIGHT * 0.24,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    itemCard: {
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        margin: SCREEN_WIDTH * 0.025,
        backgroundColor: Colors.White,

        borderRadius: 5
    },
    PrivateContainer: {
        // marginHorizontal:SCREEN_WIDTH*0.05,
        justifyContent: 'space-around',
        // marginLeft: SCREEN_WIDTH * 0.1,
        flexDirection: 'row',

    },
    PublicContainer: {
        marginLeft: SCREEN_WIDTH * 0.08,
        flexDirection: 'row'
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
        width: SCREEN_WIDTH * 0.053,
        height: SCREEN_HEIGHT * 0.022,
        // marginLeft: SCREEN_WIDTH * 0.01

    },

    BackTextStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        // fontWeight: '400',
        marginLeft: SCREEN_WIDTH * 0.01


    },
    TextInputContainer: {
        marginTop: SCREEN_HEIGHT * 0.03,
        marginLeft: SCREEN_WIDTH * 0.05,
    },
    PublicTextContainer: {
        fontFamily: FontFamily.bold,
        fontSize: 16,
        left: SCREEN_WIDTH * 0.02

        // fontWeight: 'bold'
    },
    PrivateTextContainer: {
        fontFamily: FontFamily.bold,
        fontSize: 16,
        left: SCREEN_WIDTH * 0.02
        // fontWeight: 'bold'
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
        // height: SCREEN_HEIGHT * 0.08,
        // // resizeMode: 'contain',
        // aspectRatio: 1,
        // borderRadius: 50,
        // width: SCREEN_WIDTH * 0.15,
        // // marginVertical: SCREEN_HEIGHT * 0.01,
        // backgroundColor: 'grey'


        height: SCREEN_HEIGHT * 0.08,
        margin: SCREEN_HEIGHT * 0.01,
        borderRadius: 50,
        width: SCREEN_WIDTH * 0.15,
        backgroundColor: Colors.Grey,
        aspectRatio: 1
    },
    TitleSizeContainer: {

        alignSelf: 'center',
        marginLeft: SCREEN_WIDTH * 0.03,
        // width: SCREEN_WIDTH * 0.4,
        // alignItems: 'flex-start',
        // paddingLeft: SCREEN_WIDTH * 0.02
    },
    TitleSizeContainerfeed: {
        alignItems: 'flex-start',
        paddingLeft: SCREEN_WIDTH * 0.01,
        paddingBottom: SCREEN_HEIGHT * 0.01,
        fontFamily: FontFamily.medium
    },
    TitleStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        fontWeight: '500'
    },
});









































