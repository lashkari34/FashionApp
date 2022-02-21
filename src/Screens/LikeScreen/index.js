// Splash
import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView } from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { Header } from '../../Component/Header';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'


const DATA = [
    {
        cover_img: require('../../Assets/Images/LikeImage/LikeImage.png'),
        title: 'Desirae Bergson',
        size: 'Stanton',
        Button: 'Follow'
    },
    {
        cover_img: require('../../Assets/Images/LikeImages2/LikeImages.png'),
        title: 'Lydia Torff',
        size: 'Press',
        Button: 'Follow'

    },
    {
        cover_img: require('../../Assets/Images/LikeImages3/LikeImages.png'),
        title: 'Jordyn Vetrovs',
        size: 'Schleifer',
        Button: 'Follow'

    },
    {
        cover_img: require('../../Assets/Images/LikeImages4/LikeImages.png'),
        title: 'Haylie Korsgaard',
        size: 'Geidt',
        Button: 'Follow'

    },
    {
        cover_img: require('../../Assets/Images/LikeImages5/LikeImage.png'),
        title: 'Kianna Ekstrom',
        size: 'Franci',
        Button: 'Follow'

    },
    {
        cover_img: require('../../Assets/Images/LikeImages6/LikeImages.png'),
        title: 'Giana Herwitz',
        size: 'Levin',
        Button: 'Follow'

    },
    {
        cover_img: require('../../Assets/Images/LikeImage/LikeImage.png'),
        title: 'Giana Herwitz',
        size: 'Levin',
        Button: 'Follow'

    },

];

export function LikeScreen({ navigation }) {
    const Item = ({ title, size, img, Button }) => (
        <TouchableOpacity onPress={()=>navigation.navigate("ProfileClosetScreen")}>
        <View style={styles.Flatliststyle}>
            <Image style={styles.FlatlistImagecontainer}
                source={img} />
            <View style={styles.TitleSizeContainer}>
                <Text style={styles.TitleStyle}>{title.split(" ")[0]}</Text>
                <Text style={styles.SizeStyle}>{size}</Text>
            </View>
            <TouchableOpacity style={{ right: 10 }}>
                <View >
                    <Text style={styles.FollowButtonStyle}>{Button}</Text>
                </View>
            </TouchableOpacity>
        </View>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <Item title={item.title} size={item.size} img={item.cover_img} Button={item.Button} />
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
                    TextComponent={
                        <Text style={{ fontFamily: FontFamily.medium,left:SCREEN_WIDTH*0.4 }}>Likes</Text>
                    }
                />

            </View>

            {/* <View style={styles.ImageContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.Imagestyle}
                        source={require('../../Assets/Images/BackImage/BackImage.png')}>
                    </Image>
                </TouchableOpacity>
                <Text style={styles.BackTextStyle}>Back</Text>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.LikeTextStyle}>Likes</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
            <ScrollView>
                <SafeAreaView style={styles.Flatlistcontainer}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item}
                    />
                </SafeAreaView>
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
    BackTextStyle: {
        fontFamily: FontFamily.medium,
        marginTop: SCREEN_HEIGHT * 0.007,
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
        marginTop: SCREEN_HEIGHT * 0.008,
        width: SCREEN_WIDTH * 0.055,
        height: SCREEN_HEIGHT * 0.022
    },

    Flatliststyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // flex : 1,
        // marginLeft: SCREEN_WIDTH * 0.04
        alignSelf: 'center',
        width: SCREEN_WIDTH * 0.95,
        marginVertical: 10,
        paddingBottom: 20

    },
    FlatlistImagecontainer: {
        height: SCREEN_HEIGHT * 0.1,
        resizeMode: 'contain',
        borderRadius: 2
        // width:SCREEN_WIDTH*0.3
        // marginVertical: SCREEN_HEIGHT * 0.01,
        // backgroundColor: '#fff'

    },
    TitleSizeContainer: {
        alignSelf: 'center',
        // marginLeft: SCREEN_WIDTH * 0.03
        width: SCREEN_WIDTH * 0.4,
        // alignItems: 'flex-start',
        // paddingLeft: SCREEN_WIDTH * 0.02
    },
    SizeStyle: {
        fontFamily: FontFamily.medium,
        color: Colors.DarkGrey
    },
    TitleStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 19,
        fontWeight: '500'
    },
    FollowButtonStyle: {
        // marginLeft: SCREEN_WIDTH * 0.2,
        // alignContent:'center',
        fontFamily: FontFamily.bold,
        borderWidth: 1,
        paddingHorizontal: SCREEN_WIDTH * 0.05,
        paddingVertical: SCREEN_HEIGHT * 0.005,
        // width: SCREEN_WIDTH * 0.25,
        textAlign: 'center',
        backgroundColor: Colors.Pink,
        color: Colors.White,
        borderColor: Colors.Pink,
        borderRadius: 5,
        marginTop: SCREEN_HEIGHT * 0.03,
        shadowColor: Colors.Pink,
        elevation: 10,
        // alignSelf : 'flex-end'

        // position: 'absolute'

    },
    item: {
        // marginHorizontal: 8,
        // backgroundColor: '#fff'

    },
    Flatlistcontainer: {
        // flexDirection:'row',
        marginTop: SCREEN_HEIGHT * 0.02,
        // marginLeft: SCREEN_WIDTH * 0.04,
    },
});
