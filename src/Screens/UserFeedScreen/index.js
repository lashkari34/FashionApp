import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView, } from "react-native"
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Header } from '../../Component/Header';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import { navigate } from '../../../RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';

const render = ({ item, navigation }, parallaxProps) => {
    return (
        <View style={styles.item}>

            {item.a.filePath.split('.').reverse()[0] == 'mp4' ?
            
                <VideoPlayer
                video={{ uri: item.a.filePath }}
                videoWidth={SCREEN_WIDTH * 0.9}
                videoHeight={SCREEN_HEIGHT * 0.48}
            // paused
            />
                :
                <Image
                source={{ uri: item.a.filePath }}
                // source={item.illustration}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}

            />
            }





         
        </View>
    );
};

const Item = ({ title, img }) => (
    <TouchableOpacity
        //  onPress={() => navigation.navigate('')}
        style={styles.item}>
        <Image style={styles.FlatlistImagecontainer}
            source={img} />
        <View style={styles.TitleSizeContainer}>
            <Text style={styles.TitleStyle}>{title}</Text>
        </View>
    </TouchableOpacity>
);

const renderItem = ({ item }) => (
    <Item title={item.title} img={item.cover_img} />
);

export function UserFeedScreen({ route, navigation }) {

    const [activeSlide, setActiveSlide] = useState([]);
    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);
    const goForward = () => {
        carouselRef.current.snapToNext();
    };
    const goBackward = () => {
        carouselRef.current.snapToPrev();
    };
    const [FeedDataCategoryName, SetFeedDataCategoryName] = useState();
    const [FeedDataCategoryBrand, SetFeedDataCategoryBrand] = useState();
    const [FeedDataCategorySize, SetFeedDataCategorySize] = useState();
    const [FeedDataCategorycaption, SetFeedDataCategorycaption] = useState();
    const [FeedDataCategoryImage, SetFeedDataCategoryImage] = useState([]);
    const [UserFullName, SetUserFullName] = useState();

    useEffect(() => {
        handleClose();
    }, []);


    const handleClose = async () => {
        console.log('Saveddata', route.params.item);
        const FeedData = route.params.item;

        try {
            const jsonValue = (await AsyncStorage.getItem('key'))

            let parsed = JSON.parse(jsonValue);
            let fullName = parsed.fullName;
            console.log(fullName)
            SetUserFullName(fullName)
        } catch (e) {

        }

        await SetFeedDataCategoryName(FeedData.captionOption[0].category);
        await SetFeedDataCategoryBrand(FeedData.captionOption[0].brand);
        await SetFeedDataCategorySize(FeedData.captionOption[0].size);
        await SetFeedDataCategorycaption(FeedData.captionOption[0].caption);


        const ImageFeed = FeedData.captionOption[0].imageURL;
        const dataSourceImage = ImageFeed.map((a) => { return { a } })
        console.log('----Category---------------Image------------', dataSourceImage)
        await SetFeedDataCategoryImage(dataSourceImage)

    };

    return (
        <View style={styles.container}>
            <View >
                <Header
                    onIconPress={() => navigate('SearchFeedScreen')}
                    currentObject={navigation}
                    BackTextName={
                        <Text style={{
                            fontFamily: FontFamily.medium,
                        }}>Back</Text>
                    }
                    IconComponent={

                        <EvilIcons name="search" color={Colors.black} size={30}></EvilIcons>

                    }
                />

            </View>

            <ScrollView showsVerticalScrollIndicator={false} >

                <View >
                    <TouchableOpacity onPress={goForward}></TouchableOpacity>
                    <Carousel
                        ref={carouselRef} 
                        sliderWidth={SCREEN_WIDTH * 0.99}
                        sliderHeight={SCREEN_HEIGHT}
                        itemWidth={SCREEN_WIDTH}
                        data={FeedDataCategoryImage}
                        renderItem={render}
                        // hasParallaxImages={true}
                        onSnapToItem={(index) => setActiveSlide(index)}

                    />
                    {

                        FeedDataCategoryImage.length > 1 ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: SCREEN_WIDTH * 0.02, marginLeft: SCREEN_WIDTH * 0.03, bottom: SCREEN_WIDTH * 0.5 }}>

                                {
                                    FeedDataCategoryImage.length !== 0 ?
                                        <SimpleLineIcons onPress={goBackward}
                                            style={{
                                                backgroundColor: '#FFFFFF',
                                                borderRadius: 20,
                                                padding: 5

                                            }}
                                            name="arrow-left" color="#000000" size={18} />
                                        :
                                        null
                                }



                                <SimpleLineIcons onPress={goForward}
                                    style={{
                                        backgroundColor: '#000000',
                                        borderRadius: 20,
                                        padding: 5

                                    }}
                                    name="arrow-right" color="#fff" size={18} />
                            </View>
                            :

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: SCREEN_WIDTH * 0.02, marginLeft: SCREEN_WIDTH * 0.03, bottom: SCREEN_WIDTH * 0.5 }}>

                            </View>

                    }

                    <View style={{ position: 'absolute', alignSelf: 'center', marginTop: SCREEN_HEIGHT * 0.43 }}>
                        <Pagination
                            dotsLength={FeedDataCategoryImage.length}
                            activeDotIndex={activeSlide}
                            containerStyle={{ width: SCREEN_WIDTH * 0.3 }}
                            dotStyle={{
                                width: 50,
                                height: 5,
                                borderRadius: 5,
                                marginHorizontal: 4,
                                backgroundColor: Colors.Pink
                            }}
                            inactiveDotStyle={{
                                width: 15,
                                height: 5,
                                borderRadius: 5,
                                marginHorizontal: 4,
                                backgroundColor: Colors.Grey
                                // Define styles for inactive dots here
                            }}                                             
                            inactiveDotOpacity={1}
                            inactiveDotScale={0.6}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: SCREEN_WIDTH * 0.01 }}>
                    <Text style={styles.BlouseStyle}> {FeedDataCategoryName !== null ? FeedDataCategoryName : ""}   </Text>
                    <View style={{ flexDirection: 'row', marginLeft: SCREEN_WIDTH * 0.73, position: 'absolute', alignItems: 'flex-end' }}>
                        <TouchableOpacity style={styles.ContentUserImage} onPress={() => navigate('FriendRequestScreen')}>
                            <AntDesign name="user" color={Colors.Pink} size={22}></AntDesign>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ContentLikeImage} onPress={() => navigate('LikeScreen')} >
                            <AntDesign name="hearto" color={Colors.Pink} size={22}></AntDesign>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ContentShareImage}>
                            <SimpleLineIcons name="share" color={Colors.Pink} size={22}></SimpleLineIcons>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={styles.BrandContainer}>Brand : {FeedDataCategoryBrand !== null ? FeedDataCategoryBrand : ""}</Text>
                </View>
                <Text
                    style={styles.ClothInfromationContainer}>
                    {FeedDataCategorycaption !== null ? FeedDataCategorycaption : ""}
                </Text>
                <View style={styles.ColorTextImageContainer}>
                    <Text style={styles.ColorContainer}>Color</Text>
                    <Image style={styles.ColorImageContainer}
                        source={require('../../Assets/Images/ColorImage/Color.png')}>
                    </Image>
                    <Text style={styles.SizeContainer}>Size</Text>
                    <View style={{
                        height: SCREEN_HEIGHT * 0.8,
                        borderRadius: 50,
                        width: SCREEN_WIDTH * 0.1000,
                        backgroundColor: Colors.size,
                        aspectRatio: 1,
                        marginLeft:5
                       
                    }}>
                     <Text style={{ color: Colors.White,textAlign:'center',marginTop:5}}>
                     {FeedDataCategorySize}
                     </Text>
                     </View>
                </View>
                <Text style={styles.WearContainer}>{UserFullName !== null ? UserFullName : ""} is Wearing</Text>
                <Text style={styles.CaptionContainer}>Caption Optional</Text>
                <ScrollView>
                    <SafeAreaView style={styles.Flatlistcontainer}>
                        {/* <FlatList
                            horizontal={true}
                            data={}
                            renderItem={renderItem}
                            keyExtractor={item => item}
                            showsHorizontalScrollIndicator={false}

                        /> */}
                    </SafeAreaView>
                </ScrollView>
            </ScrollView>
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
        padding: 10
    },
    Imagestyle: {
        // width: SCREEN_WIDTH * 0.15,
        // height: SCREEN_HEIGHT * 0.022
        // marginTop: SCREEN_HEIGHT * 0.008,
        width: SCREEN_WIDTH * 0.053,
        height: SCREEN_HEIGHT * 0.022
    },
    BackTextStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        // fontWeight: '400',
        marginLeft: SCREEN_WIDTH * 0.015
    },
    SearchContainer: {
        marginLeft: SCREEN_WIDTH * 0.75
    },
    item: {
        // width: SCREEN_WIDTH,
        // height: SCREEN_HEIGHT,
        // alignSelf:'center'
    },


    image: {
        resizeMode: 'cover',
        height: SCREEN_HEIGHT * 0.5,
        width: SCREEN_WIDTH,
    },

    Browsecontainer: {
        fontSize: 15,
        marginVertical: SCREEN_HEIGHT * 0.03,
        fontWeight: 'bold'
    },

    BackgroundImageContainer: {
        // flex: 1,
        // marginTop: SCREEN_HEIGHT * 0.04,
        height: SCREEN_HEIGHT * 0.5,
        width: SCREEN_WIDTH,
    },
    BlouseStyle: {
        fontFamily: FontFamily.regular,
        fontSize: 20,
        color: Colors.black
        // fontWeight: '600',
    },
    ContentContainer: {
        marginVertical: SCREEN_HEIGHT * 0.01,
        flexDirection: 'row',
        paddingLeft: 3,
        justifyContent: 'flex-start',
    },
    ContentImages: {
        marginLeft: SCREEN_WIDTH * 0.47,
        flexDirection: 'row',
    },
    ContentUserImage: {
        // marginLeft:SCREEN_WIDTH*0.04,
        // width: SCREEN_WIDTH * 0.072,
        // height: SCREEN_HEIGHT * 0.033
    },
    ContentLikeImage: {
        marginLeft: SCREEN_WIDTH * 0.03,
        // width: SCREEN_WIDTH * 0.072,
        // height: SCREEN_HEIGHT * 0.035
    },
    ContentShareImage: {
        marginLeft: SCREEN_WIDTH * 0.03,
        // width: SCREEN_WIDTH * 0.074,
        // height: SCREEN_HEIGHT * 0.038
    },
    BrandContainer: {
        fontFamily: FontFamily.medium,
        fontSize: 18,
        color: Colors.DarkGrey,
        marginLeft: SCREEN_WIDTH * 0.02,
        marginVertical: SCREEN_HEIGHT * 0.005,

    },
    ClothInfromationContainer: {
        fontFamily: FontFamily.medium,
        fontSize: 13,
        color: Colors.DarkGrey,
        marginLeft: SCREEN_WIDTH * 0.02
    },
    ColorTextImageContainer: {
        flexDirection: 'row',
        marginLeft: SCREEN_WIDTH * 0.02,
        marginVertical: SCREEN_HEIGHT * 0.01,

    },
    ColorContainer: {
        fontFamily: FontFamily.medium,
        fontSize: 20,
        marginTop: SCREEN_HEIGHT * 0.005
    },
    ColorImageContainer: {
        marginLeft: SCREEN_WIDTH * 0.01,
        width: SCREEN_WIDTH * 0.1,
        height: SCREEN_HEIGHT * 0.06
    },
    SizeContainer: {
        fontFamily: FontFamily.medium,
        fontSize: 20,
        marginTop: SCREEN_HEIGHT * 0.005,
        marginLeft: SCREEN_WIDTH * 0.1
    },
    SizeImageContainer: {
        marginLeft: SCREEN_WIDTH * 0.01,
        width: SCREEN_WIDTH * 0.1,
        height: SCREEN_HEIGHT * 0.06
    },
    WearContainer: {
        fontFamily: FontFamily.medium,
        fontSize: 20,
        // fontWeight: '600',
        marginLeft: SCREEN_WIDTH * 0.02
    },
    CaptionContainer: {
        fontFamily: FontFamily.medium,
        fontSize: 14,
        color: Colors.DarkGrey,
        marginTop: SCREEN_HEIGHT * 0.02,
        marginLeft: SCREEN_WIDTH * 0.02
    },
    Flatlistcontainer: {
        marginTop: SCREEN_HEIGHT * 0.02,
        marginLeft: SCREEN_WIDTH * 0.04,
    },
    TitleStyle: {
        fontFamily: FontFamily.bold,
        fontSize: 15,
        // fontWeight: 'bold'
    },
    item: {
        marginHorizontal: 8,
        marginVertical: 5,
        backgroundColor: Colors.White,
        borderRadius: 10
    },
    FlatlistImagecontainer: {
        // marginVertical: SCREEN_HEIGHT * 0.01,
    },
    TitleSizeContainer: {
        alignItems: 'flex-start',
        paddingLeft: SCREEN_WIDTH * 0.02
    },
});
