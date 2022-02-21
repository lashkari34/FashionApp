import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView, TextInput } from "react-native"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import Feather from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoginButton } from '../../Component/LoginButton';
import { ButtonWithTextInput } from '../../Component/ButtonWithTextInput';
import { ButtonWithIcon } from '../../Component/ButtonWithIcon';
import { Header } from '../../Component/Header';
import { navigate } from '../../../RootNavigation';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'

export default function UsersCommentScreen({ navigation }) {
    const [ShowTypeCommentOptions, setTypeCommentOptions] = useState(false);

    const [UserComment] = useState([

        {
            Searchpeopleimg: require('../../Assets/Images/SearchPeoplefirst/searchpeoplefirst.png'),
            Searchpeopletittle: 'Kaiya Baptista',
            Commentpeopletime: '3 hrs ago',
            CommentpeopleDescription: 'Lorem Ipsum has been the industrys standard dum text ever since the 1500s',

        },
        {

            Searchpeopleimg: require('../../Assets/Images/Searchpeoplesecond/searchsecond.png'),
            Searchpeopletittle: 'Kaiya Gouse',
            Commentpeopletime: '3 hrs ago',
            CommentpeopleDescription: 'Lorem Ipsum has been the industrys standard dum text ever since the 1500s'
        },

        {

            Searchpeopleimg: require('../../Assets/Images/SearchPeoplefirst/searchpeoplefirst.png'),
            Searchpeopletittle: 'Kaiya Baptista',
            Commentpeopletime: '3 hrs ago',
            CommentpeopleDescription: 'Lorem Ipsum has been the industrys standard dum text ever since the 1500s'
        },
        {

            Searchpeopleimg: require('../../Assets/Images/Searchpeoplesecond/searchsecond.png'),
            Searchpeopletittle: 'Kaiya Gouse',
            Commentpeopletime: '3 hrs ago',
            CommentpeopleDescription: 'Lorem Ipsum has been the industrys standard dum text ever since the 1500s'
        },


    ])
    return (
        <View>


            
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

{/* 
            <View style={styles.ImageContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../Assets/Images/BackImage/BackImage.png')}>
                        </Image>
                        <Text style={{ marginLeft: SCREEN_WIDTH * 0.02, fontFamily: 'montserrat_medium', }}>Back</Text>
                    </TouchableOpacity>


                </View>

                <View style={{
                    marginTop: SCREEN_HEIGHT * 0.05
                }}>
                    <Text style={{
                        fontFamily: 'montserrat_medium',
                        fontSize: 16,
                        marginBottom: -SCREEN_HEIGHT * 0.05

                    }}>Elle Fanning</Text>

                </View>



                <View style={{
                    alignContent: 'flex-end', alignSelf: 'center',
                    borderWid0th: 1, borderRadius: 10, justifyContent: 'center', alialignItems: 'center', borderColor: "white", width: SCREEN_WIDTH * 0.15, height: SCREEN_HEIGHT * 0.07
                }}>
                    <Image
                        style={{ resizeMode: 'contain', borderRadius: 20, width: SCREEN_WIDTH * 0.15, height: SCREEN_HEIGHT * 0.09 }}
                        source={require('../../Assets/Images/ProfileImage/Profile.png')}
                    />
                </View>

            </View> */}


            <ScrollView style={{ paddingBottom: SCREEN_HEIGHT * 0.1 }}>
                {/* <View style={{backgroundColor:"#fffff"}}> */}

                <View >


                    <View style={{ paddingLeft: SCREEN_WIDTH * 0.05, paddingTop: SCREEN_WIDTH * 0.05, paddingRight: SCREEN_WIDTH * 0.05 }} >



                        <View style={{ flexDirection: 'row', }}>


                            <View style={{}} >

                                <Text style={{ color: '#FF2B8A', fontSize: 16, 
                                // fontFamily: 'montserrat_medium',
                                 }} >Letraset sheetscontaining</Text>

                                <Text style={{ opacity: 0.2, fontSize: 10, 
                                    // fontFamily: 'montserrat_medium',
                                     }}>@ellefanning</Text>




                            </View>
                            <Image
                                style={{ resizeMode: 'contain', width: SCREEN_WIDTH * 0.39, height: SCREEN_HEIGHT * 0.1 }}
                                source={require('../../Assets/Images/VideoImage/videoimage.png')}
                            />

                        </View>


                        <Text style={{ color: '#383838', fontSize: 20, 
                        // fontFamily: 'montserrat_regular',
                         marginTop: SCREEN_HEIGHT * 0.02 }} >Comments (125)</Text>


                        <View style={{ flexDirection: 'row', }}>


                            <ScrollView>




                                <View style={{ alignSelf: 'flex-start' }}>
                                    {
                                        UserComment.map((el, i) => {
                                            return (
                                                <>
                                                    <View style={{ width: SCREEN_WIDTH * 0.98, }}>


                                                        <View style={{ flexDirection: 'row', marginTop: SCREEN_HEIGHT * 0.03 }}>


                                                            <View style={{ borderWidth: 1, borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderColor: "white", width: SCREEN_WIDTH * 0.14, height: SCREEN_HEIGHT * 0.07 }}>
                                                                <Image
                                                                    style={{ resizeMode: 'contain', borderRadius: 100, width: SCREEN_WIDTH * 0.14, height: SCREEN_HEIGHT * 0.09 }}
                                                                    source={el.Searchpeopleimg}
                                                                />
                                                            </View>
                                                            <View style={{ left: SCREEN_WIDTH * 0.03, paddingRight: SCREEN_WIDTH * 0.16 }}>
                                                                <Text style={styles.NameStyle}>{el.Searchpeopletittle} </Text>
                                                                <Text style={styles.TimeStyle}>{el.Commentpeopletime} </Text>
                                                                <Text style={styles.DescriptionStyle}>{el.CommentpeopleDescription}
                                                                </Text>
                                                                <View style={{ height: 0.5, backgroundColor: '#E5E5E5', marginTop: SCREEN_HEIGHT * 0.02 }} />

                                                                <View style={{ flexDirection: 'row', marginTop: SCREEN_HEIGHT * 0.02 }}>
                                                                    <TouchableOpacity >
                                                                        <View style={{ flexDirection: 'row' }} >
                                                                            <AntDesign name="hearto" size={20} color="#383838"
                                                                                style={{ right: SCREEN_WIDTH * 0.02 }} >
                                                                            </AntDesign>
                                                                            <Text style={{ color: '#444444',
                                                                            //  fontFamily: 'montserrat_medium',
                                                                              fontSize: 13, }}>Like</Text>
                                                                        </View>

                                                                    </TouchableOpacity>

                                                                    <TouchableOpacity style={{ marginLeft: SCREEN_WIDTH * 0.12 }}>
                                                                        <View style={{ flexDirection: 'row' }} >
                                                                            {/* <Image
                                                                style={{ width: SCREEN_WIDTH * 0.076, height: SCREEN_HEIGHT * 0.039 }}
                                                                source={require('../../Assets/Images/Comments/comments.png')}
                                                            /> */}
                                                                            <AntDesign name="message1" size={22} color=""
                                                                                style={{ right: SCREEN_WIDTH * 0.02 }} >
                                                                            </AntDesign>
                                                                            <Text style={{ color: '#444444', 
                                                                            // fontFamily: 'montserrat_medium', 
                                                                            fontSize: 13 }}>Comments</Text>

                                                                        </View>

                                                                    </TouchableOpacity>


                                                                </View>
                                                            </View>

                                                        </View>
                                                    </View>


                                                </>


                                            )
                                        })

                                    }

                                </View>
                            </ScrollView>
                        </View>
                    </View>







                </View>


            </ScrollView>

            <View style={{ position: 'absolute', bottom: 90, alignSelf: 'flex-end', width: SCREEN_WIDTH * 0.9999, height: SCREEN_HEIGHT * 0.1, backgroundColor: "rgba(255,255,255, 0.7)", height: 95, }}>


                {ShowTypeCommentOptions ?

                    <View style={{ position: 'absolute', bottom: 20, alignSelf: 'flex-end', width: SCREEN_WIDTH * 0.9999, height: SCREEN_HEIGHT * 0.1, backgroundColor: "rgba(255,255,255, 0.7)", height: 95, }}>

                        <ButtonWithTextInput
                            ButtonTextStyle={{ color: Colors.White, fontSize: 13, fontFamily: FontFamily.medium, }}
                            ButtonStyle={{
                                backgroundColor: Colors.black,
                                width: SCREEN_WIDTH * 0.9,
                                height: SCREEN_HEIGHT * 0.079,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: SCREEN_HEIGHT * 0.01,
                                borderRadius: 50,
                                flexDirection: 'row',
                                alignSelf: 'flex-end',
                                marginRight: 15
                            }}
                            onSubmitPress={() => setTypeCommentOptions(!ShowTypeCommentOptions)}

                            bottonIcon={<Image style={{ width: SCREEN_WIDTH * 0.08, height: SCREEN_HEIGHT * 0.04 }}
                                source={require('../../Assets/Images/Send/send.png')}>
                            </Image>}
                        />


                    </View>
                    :
                    <ButtonWithIcon
                        ButtonTextStyle={{ color: Colors.White, fontSize: 13, fontFamily: FontFamily.medium, }}
                        ButtonStyle={{
                            backgroundColor: Colors.black,
                            width: SCREEN_WIDTH * 0.46,
                            height: SCREEN_HEIGHT * 0.059,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: SCREEN_HEIGHT * 0.01,
                            borderRadius: 50,
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                            marginRight: 15
                        }}
                        // onSubmitPress={() => setTypeCommentOptions(!ShowTypeCommentOptions)}


                        onSubmitPress={() => setTypeCommentOptions(!ShowTypeCommentOptions)}
                        buttonTitle="Add a Comment"
                        bottonIcon={<Icon name="edit" color={Colors.White} size={17} left={10} style={{ marginLeft: 11 }} />}
                    />

                }

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
        paddingVertical: SCREEN_HEIGHT * 0.03,
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
    ProfileStyle: {
        width: SCREEN_WIDTH * 0.09,
        height: SCREEN_HEIGHT * 0.045,
        borderRadius: 6,
        left: SCREEN_WIDTH * 0.13

    },
    item: {

        borderRadius: 50,


    },

    FlatlistImagecontainer: {
        width: SCREEN_WIDTH * 0.2,
        height: SCREEN_HEIGHT * 0.1,
    },

    NameStyle: {
        flexDirection: 'row',
        fontSize: 13,
        color: Colors.black,
        fontFamily: FontFamily.medium,


    },

    TimeStyle: {
        flexDirection: 'row',
        fontSize: 13,
        color: Colors.black,
        fontFamily: FontFamily.medium,
        marginTop: SCREEN_HEIGHT * 0.003,
        opacity: 0.2



    },
    DescriptionStyle: {
        flexDirection: 'row',
        fontSize: 13,
        color: Colors.black,
        fontFamily: FontFamily.medium,
        opacity: 0.6,
        marginTop: SCREEN_HEIGHT * 0.01

    },



    Flatlistcontainer: {

        padding: SCREEN_HEIGHT * 0.09,
        padding: SCREEN_WIDTH * 0.02,

    },

    ViewItemStyle: {

        marginLeft: SCREEN_WIDTH * 0.02,
        marginRight: SCREEN_WIDTH * 0.02


    },

    Item_Style: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 25,
        color: Colors.LightGrey,
        borderColor: Colors.LightGrey,
        opacity: 1,
        borderWidth: 1,
        marginVertical: SCREEN_HEIGHT * 0.01,
        elevation: 0.4
    },
    textInputStyle: {
        height: SCREEN_HEIGHT * 0.07,
        width: SCREEN_WIDTH * 0.76,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderRadius: 5,
        borderColor: Colors.Grey,
        backgroundColor: Colors.Grey,
    },
}

)