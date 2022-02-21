import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Notification } from '../../Component/NotificationHeader';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'

const DATA = [
    {
        cover_img: require('../../Assets/Images/ImageLike/like.png'),
        title: '@elle123 Requested to follow you',

    },
    {
        cover_img: require('../../Assets/Images/Comment/comment.png'),
        title: '@elle123 commented on your photo',

    },
    {
        cover_img: require('../../Assets/Images/Request/Request.png'),
        title: '@elle123 follows you',

    },

];

export default function NotificationScreen({ navigation }) {

    const Item = ({ img, title }) => (
        <TouchableOpacity onPress={() => navigation.navigate('FriendRequestScreen')}    >
            <View style={styles.Item_Style}>
                <Image style={styles.NotificationlistImagecontainer}
                    source={img} />
                <Text style={styles.TitleStyle}>{title}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <Item title={item.title} img={item.cover_img} />
    );

    return (
        <View>


            <View >
                <Notification
                    // onIconPress={() => navigate('SearchFeedScreen')}
                    currentObject={navigation}
                    IconComponent={
                        <Entypo
                            // style={styles.SearchContainer}
                            name="cross" color={Colors.black} size={30}
                        />
                    }
                    Texting={
                        <View style={{
                            height: SCREEN_HEIGHT * 0.023,
                            width: SCREEN_WIDTH * 0.04,
                            backgroundColor: Colors.Softred,
                            borderRadius: 20,
                            position: 'absolute',
                            left:SCREEN_WIDTH*0.37,
                            top:SCREEN_WIDTH*0.04
                    
                        }}>
                            <Text style={{ color: Colors.White, textAlign: 'center' }}>3</Text>
                        </View>
                    }
                    TextComponent={
                        <Text style={{
                            fontFamily: FontFamily.medium,
                        }}>Notifications</Text>
                    }
                    ImageComponent={
                        <Image style={styles.ProfileStyle}
                            source={require('../../Assets/Images/ProfileImage/Profile.png')}>
                        </Image>
                    }

                />

            </View>
            {/* <View style={styles.ImageContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={styles.Imagestylesecond}
                            source={require('../../Assets/Images/Cross/Cross.png')}>
                        </Image>
                    </TouchableOpacity>
                    <Text style={styles.BackTextStyle}>Notifications</Text>

                    <View style={{ height: SCREEN_HEIGHT * 0.028, width: SCREEN_WIDTH * 0.06, backgroundColor: '#EF6A78', borderRadius: 20, position: 'absolute', right: 0, marginRight: -10, bottom: 12 }}>
                        <Text style={{ color: "#ffffff", textAlign: 'center' }}>3</Text>
                    </View>
                </View>


                <View style={styles.ImageView}>
                    <TouchableOpacity>
                        <Image style={styles.Imagestyle}
                            source={require('../../Assets/Images/NotificationSetting/NotificationSetting.png')}>
                        </Image>
                    </TouchableOpacity>
                </View>

            </View> */}

            <View>

                <SafeAreaView style={styles.Flatlistcontainer}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item}
                    />
                </SafeAreaView>

            </View>
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
        alignItems: 'center',
        alignSelf: 'center',
        width: SCREEN_WIDTH,
        justifyContent: 'space-between',
        paddingVertical: SCREEN_HEIGHT * 0.04,
        paddingHorizontal: SCREEN_WIDTH * 0.04,

    },

    Imagestyle: {
        width: SCREEN_WIDTH * 0.07,
        height: SCREEN_HEIGHT * 0.04,



    },

    Imagestylesecond: {
        width: SCREEN_WIDTH * 0.05,
        height: SCREEN_HEIGHT * 0.02,



    },

    BackTextStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        paddingHorizontal: SCREEN_WIDTH * 0.03
    },
    item: {

        borderRadius: 50,


    },
    ProfileStyle: {
        width: SCREEN_WIDTH * 0.09,
        height: SCREEN_HEIGHT * 0.045,
        borderRadius: 6,
        marginLeft: SCREEN_WIDTH * 0.48,
        right: 10

    },
    FlatlistImagecontainer: {
        width: SCREEN_WIDTH * 0.2,
        height: SCREEN_HEIGHT * 0.1,
    },

    TitleStyle: {
        marginLeft: SCREEN_WIDTH * 0.02,
        fontSize: 15,
        color: Colors.TextGrey
    },
    Flatlistcontainer: {

        padding: SCREEN_HEIGHT * 0.09,
        padding: SCREEN_WIDTH * 0.02,

    },
    Item_Style: {
        flexDirection: 'row',
        padding: 20,
        // borderRadius: 1,
        color: Colors.LightGrey,
        borderColor: Colors.LightGrey,
        // opacity: 1,
        borderWidth: 1,
        marginVertical: SCREEN_HEIGHT * 0.01,
        elevation: 0.4
    }
}

)