// Splash
import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView, TouchableHighlight, } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ButtonWithTextInput } from '../../Component/ButtonWithTextInput';
import { ButtonWithIcon } from '../../Component/ButtonWithIcon';
import { Header } from '../../Component/Header';
import { navigate } from '../../../RootNavigation';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'


const ENTRIES1 = [
    {
        illustration: require('../../Assets/Images/BackgroundImage/background.png'),

    },

    {
        illustration: require('../../Assets/Images/ProfileImage/Profile.png'),

    },
    {
        illustration: require('../../Assets/Images/BackgroundImage/background.png'),

    },


];


//   const { width: screenWidth } = Dimensions.get('window');



const render = ({ item, navigation }, parallaxProps) => {

    return (


        <View style={styles.item}>

            <Image
                source={item.illustration}

                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}

            />



        </View>
    );
};




const DATA = [
    {
        cover_img: require('../../Assets/Images/ClothsImage/Cloths.png'),
        title: 'Blouse',

    },
    {
        cover_img: require('../../Assets/Images/CropTopImage/CropTop.png'),
        title: 'Crop Top',

    },
    {
        cover_img: require('../../Assets/Images/TankTop/TankTop.png'),
        title: 'Tank Top',

    },
    {
        cover_img: require('../../Assets/Images/CamiTop/CamiTop.png'),
        title: 'Cami Top',
    },
    {
        cover_img: require('../../Assets/Images/TubeTop/TubeTop.png'),
        title: 'Tube Top',
    },
    {
        cover_img: require('../../Assets/Images/TunicTop/TunicTop.png'),
        title: 'Tunic Top',
    },
    {
        cover_img: require('../../Assets/Images/LongLineTop/LongLineTop.png'),
        title: 'Maxi/Longline Top',
    },
    {
        cover_img: require('../../Assets/Images/Pemplum/Pemplum.png'),
        title: 'Pemplum',
    },
];

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

export function UserWallCommentsScreen({ navigation }) {


    const [activeSlide, setActiveSlide] = useState(0);


    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    const goBackward = () => {
        carouselRef.current.snapToPrev();
    };

    useEffect(() => {
        setEntries(ENTRIES1);
    }, []);

    const [RequestNotification] = useState([
        {
            Requestimg: require('../../Assets/Images/DemoImage/demoiamge.png'),
        },
        {
            Requestimg: require('../../Assets/Images/DemoImage/demoiamge.png'),
        },
        {
            Requestimg: require('../../Assets/Images/DemoImage/demoiamge.png'),
        },
    ])


    return (
        <View style={styles.container}>

            <View >
                <Header
                    // onIconPress={() => navigate('SearchFeedScreen')}
                    currentObject={navigation}
                    BackTextName={
                        <Text style={{
                            fontFamily: FontFamily.medium,
                        }}>Back</Text>
                    }
                    TextComponent={
                        <Text style={{
                            fontFamily: FontFamily.medium,
                            marginTop: SCREEN_HEIGHT * 0.03,
                            left: SCREEN_WIDTH * 0.02
                        }}>Elle Fanning</Text>
                    }
                    ImageComponent={
                        <Image style={styles.ProfileStyle}
                            source={require('../../Assets/Images/ProfileImage/Profile.png')}>
                        </Image>
                    }

                />

            </View>

            <ScrollView>

                <View style={styles.carausalStyle}>
                    <TouchableOpacity onPress={goForward}>
                    </TouchableOpacity>
                    <Carousel
                        ref={carouselRef}
                        sliderWidth={SCREEN_WIDTH}
                        sliderHeight={SCREEN_HEIGHT}
                        itemWidth={SCREEN_WIDTH}
                        data={entries}
                        renderItem={render}
                        // hasParallaxImages={true}
                        onSnapToItem={(index) => setActiveSlide(index)}

                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: SCREEN_WIDTH * 0.04, bottom: SCREEN_WIDTH * 0.5 }}>
                        <SimpleLineIcons onpress={goBackward}
                            style={{
                                backgroundColor: Colors.black,
                                borderRadius: 20,
                                padding: 5

                            }}
                            name="arrow-left" color={Colors.White} size={18} />

                        <SimpleLineIcons onPress={goForward}
                            style={{
                                backgroundColor: Colors.black,
                                borderRadius: 20,
                                padding: 5


                            }}
                            name="arrow-right" color={Colors.White} size={18} />
                    </View>

                    <View style={{ position: 'absolute', alignSelf: 'center', marginTop: SCREEN_HEIGHT * 0.43 }}>
                        <Pagination
                            dotsLength={3}
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

                <View style={styles.ContentContainer}>
                    <Text style={styles.BlouseStyle}>Blouse</Text>
                    <View style={styles.ContentImages}>
                        <TouchableOpacity style={styles.ContentUserImage}>
                            <Icon name="user" color={Colors.Pink} size={28}></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ContentLikeImage}>
                            <Icon name="hearto" color={Colors.Pink} size={28}></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ContentShareImage}>
                            <SimpleLineIcons name="share" color={Colors.Pink} size={28}></SimpleLineIcons>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.BrandContainer}>Brand: Gucci</Text>
                <Text
                    style={styles.ClothInfromationContainer}>
                    This one cute garment has long sleeves and elasticated detail below
                    the bust with short gathers. When you want to hide your belly
                    fat and still look stylish.
                    </Text>
                <View style={styles.ColorTextImageContainer}>
                    <Text style={styles.ColorContainer}>Color</Text>
                    <Image style={styles.ColorImageContainer}
                        source={require('../../Assets/Images/ColorImage/Color.png')}>
                    </Image>
                    <Text style={styles.SizeContainer}>Size</Text>
                    <Image style={styles.SizeImageContainer}
                        source={require('../../Assets/Images/SizeImage/Size.png')}>
                    </Image>
                </View>
                <Text style={styles.WearContainer}>Elle Fanning is Wearing</Text>
                <Text style={styles.CaptionContainer}>Caption Optional</Text>
                <ScrollView>
                    <SafeAreaView style={styles.Flatlistcontainer}>
                        <FlatList
                            horizontal={true}
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={item => item}
                            showsHorizontalScrollIndicator={false}

                        />
                    </SafeAreaView>
                </ScrollView>
            </ScrollView>

            <View style={{ alignContent: 'center', width: SCREEN_WIDTH * 0.9999, height: SCREEN_HEIGHT * 0.1, backgroundColor: "rgba(255,255,255, 0.7)", height: 95, flexDirection: 'row', justifyContent: 'space-between' }}>

                <View style={{ flexDirection: 'row-reverse', left: SCREEN_WIDTH * 0.08 }}>
                    {
                        RequestNotification.map((el, i) => {
                            return (
                                <>
                                    <View style={{ marginLeft: -20, }}>
                                        <View style={{ borderWidth: 1, borderRadius: 100, borderColor: "white", width: SCREEN_WIDTH * 0.14, height: SCREEN_HEIGHT * 0.07 }}>
                                            <Image
                                                style={{ resizeMode: 'contain', width: SCREEN_WIDTH * 0.14, height: SCREEN_HEIGHT * 0.09 }}
                                                source={el.Requestimg}
                                            />
                                        </View>
                                    </View>

                                </>


                            )
                        })

                    }

                </View>

                <View style={{ right: SCREEN_WIDTH * 0.03 }}>
                    <ButtonWithIcon onSubmitPress={() => navigation.navigate('UsersCommentScreen')}

                        ButtonTextStyle={{ color: Colors.White, fontSize: 13, fontFamily: FontFamily.medium, }}
                        ButtonStyle={{
                            backgroundColor: Colors.black,
                            width: SCREEN_WIDTH * 0.36,
                            height: SCREEN_HEIGHT * 0.059,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 50,
                            flexDirection: 'row'

                        }}
                        // onSubmitPress={() => setTypeCommentOptions(!ShowTypeCommentOptions)}
                        buttonTitle="Comment"
                        bottonIcon={<Icon name="edit" color={Colors.White} size={17} left={10} style={{ marginLeft: 11 }} />}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
        // backgroundColor: '#FBF0EF'
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
    // imageContainer: {
    //     width: SCREEN_WIDTH,
    //     height: SCREEN_HEIGHT,

    // },
    carausalStyle: {

    },


    image: {
        resizeMode: 'cover',
        height: SCREEN_HEIGHT * 0.5,
        width: SCREEN_WIDTH,
    },
    // Viewcontainer: {

    // },

    // TextStyle: {
    //     fontSize: 40,
    //     marginTop: SCREEN_HEIGHT * 0.04,

    // },
    // TextStyleContainer: {
    //     fontSize: 15,
    //     marginVertical: SCREEN_HEIGHT * 0.03,
    //     fontWeight: 'bold'
    // },
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
        fontFamily: FontFamily.bold,
        fontSize: 20,
        // fontWeight: '600',
    },
    ContentContainer: {
        marginVertical: SCREEN_HEIGHT * 0.01,
        flexDirection: 'row',
        paddingLeft: 9,
        justifyContent: 'flex-start'
    },
    ContentImages: {
        marginLeft: SCREEN_WIDTH * 0.44,
        flexDirection: 'row',
    },
    ContentUserImage: {
        // marginLeft:SCREEN_WIDTH*0.04,
        // width: SCREEN_WIDTH * 0.072,
        // height: SCREEN_HEIGHT * 0.033
    },
    ProfileStyle: {
        width: SCREEN_WIDTH * 0.09,
        height: SCREEN_HEIGHT * 0.045,
        borderRadius: 6,
        left: SCREEN_WIDTH * 0.13

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
        fontSize: 20,
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
        fontSize: 24,
        marginTop: SCREEN_HEIGHT * 0.01
    },
    ColorImageContainer: {
        marginLeft: SCREEN_WIDTH * 0.02,
        width: SCREEN_WIDTH * 0.1,
        height: SCREEN_HEIGHT * 0.08
    },
    SizeContainer: {
        fontFamily: FontFamily.medium,

        fontSize: 24,
        marginTop: SCREEN_HEIGHT * 0.01,
        marginLeft: SCREEN_WIDTH * 0.1
    },
    SizeImageContainer: {
        marginLeft: SCREEN_WIDTH * 0.02,
        width: SCREEN_WIDTH * 0.1,
        height: SCREEN_HEIGHT * 0.08
    },
    WearContainer: {
        fontFamily: FontFamily.medium,
        fontSize: 22,
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
