
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../Helper/DeviceDimensions';
import Icon from 'react-native-vector-icons/AntDesign/';
import { Icon as Ionicons } from 'react-native-vector-icons/Ionicons';
import React, { useRef, useState, useEffect } from 'react';
// import Carousel from 'react-native-snap-carousel';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Right } from 'native-base';
import { Colors } from '../../Helper/Colors.js/index'
import {FontFamily} from '../../Helper/FontFamily/index'

const ENTRIES1 = [
    {
        illustration: require('../../Assets/Images/IntroScreen/IntroScreen.png'),
        title: "Only Five Centuries",
        Info: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",

    },
    {
        illustration: require('../../Assets/Images/IntroScreen2/Intro.png'),
        title: "Remaining Essentially",
        Info: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",


    },
    {
        illustration: require('../../Assets/Images/IntroScreen3/Intr.png'),
        title: "Contrary to Popular",
        Info: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",

    },

];


const { width: screenWidth } = Dimensions.get('window');

const IntroScreen = ({ navigation }) => {



    const [entries, setEntries] = useState([]);
    const [activeSlide, setActiveSlide] = useState(0);
    const carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    useEffect(() => {
        setEntries(ENTRIES1);
    }, []);



    const renderItem = ({ item, }, parallaxProps) => {

        return (
            <View style={styles.item}>
                <View style={{ alignSelf: 'center', padding: SCREEN_WIDTH * 0.02 }}>
                    <Image
                        source={item.illustration}
                        // containerStyle={styles.imageContainer}
                        style={styles.image}
                        parallaxFactor={0.4}
                    />
                </View>
                <Text style={styles.title}>
                    {item.title}
                </Text>
                <Text style={styles.Info}>
                    {item.Info}
                </Text>

            </View>
        );
    };


    // const Item = ({ item, index }) => {
    //     return (<MySlideComponent data={item} />
    //     );
    // }

    return (
        <View style={styles.container}>

            <Carousel
                ref={carouselRef}
                sliderWidth={SCREEN_WIDTH}
                sliderHeight={SCREEN_HEIGHT * 0.5}
                itemWidth={SCREEN_WIDTH}
                data={entries}
                renderItem={renderItem}
                hasParallaxImages={true}
                // data={Entries}
                // Item={Item}
                onSnapToItem={(index) => setActiveSlide(index)}

            />




            <View style={styles.ForwardStyle}>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.Forward}>
                        Skip
                        </Text>
                </TouchableOpacity>
                <View style={{ height: SCREEN_HEIGHT * 0.08, alignItems: 'center' }}>
                    {
                        activeSlide == 2 ?

                            <TouchableOpacity style={{ alignItems: 'flex-end', marginTop: SCREEN_HEIGHT * 0.03 }} onPress={() => navigation.navigate('LoginScreen')}>
                                <Text style={styles.EndIntro}>
                                    Finish
                        </Text>
                            </TouchableOpacity>

                            :

                            <Pagination
                                dotsLength={3}
                                activeDotIndex={activeSlide}
                                containerStyle={{ width: SCREEN_WIDTH * 0.3 }}
                                dotStyle={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginHorizontal: 4,
                                    backgroundColor: Colors.yellow
                                }}
                                inactiveDotStyle={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 5,
                                    marginHorizontal: 4,
                                    backgroundColor: Colors.Grey
                                    // Define styles for inactive dots here
                                }}
                                inactiveDotOpacity={1}
                                inactiveDotScale={0.6}
                            />}
                </View>

            </View>

            {/* <View style={styles.EndStyle}>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text 
                    style={styles.EndIntro}>
                        Finish
                        </Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
};




export default IntroScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White

    },
    item: {
        // width: SCREEN_WIDTH,
        // height: SCREEN_HEIGHT,

    },
    imageContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,

    },
    image: {
        resizeMode: 'contain',
        // width: SCREEN_WIDTH * 0.56,
        height: SCREEN_HEIGHT * 0.35,
        alignSelf: 'center',
        marginTop: SCREEN_HEIGHT * 0.1
    },
    title: {
        fontFamily: FontFamily.bold,
        fontSize: 28,
        // fontWeight: 'bold',
        textAlign: 'center',
        marginTop: SCREEN_HEIGHT * 0.1
    },
    Info: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        color: Colors.TextGrey,
        marginTop: SCREEN_HEIGHT * 0.03,
        textAlign: 'center',
    },
    ForwardStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: SCREEN_HEIGHT * 0.02,
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center'
        // marginTop: SCREEN_HEIGHT * 0.,
        // left: SCREEN_WIDTH * 0.03
    },
    Forward: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        color: Colors.TextGrey,
    },
    // EndStyle: {
    //     // marginTop: SCREEN_HEIGHT * 0.23,
    //     marginLeft: SCREEN_WIDTH * 0.85,
    // },
    EndIntro: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        color: Colors.TextGrey,
    },
    Viewcontainer: {

    },
    TextStyle: {
        fontSize: 40,
        marginTop: SCREEN_HEIGHT * 0.04,

    },
    TextStyleContainer: {
        fontSize: 15,
        marginVertical: SCREEN_HEIGHT * 0.03,
        fontWeight: 'bold'
    },
    Browsecontainer: {
        fontSize: 15,
        marginVertical: SCREEN_HEIGHT * 0.03,
        fontWeight: 'bold'
    },


});


















