import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView } from "react-native"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { LoginButton } from '../../Component/LoginButton';
import { Header } from '../../Component/Header';
import { Colors } from '../../Helper/Colors.js/index'
import {FontFamily} from '../../Helper/FontFamily/index'



export default function ChatSettingBlockScreen({ navigation }) {
    const [ShowTypeUnBlock, setShowTypeUnBlock] = useState(false);
    

    return (

        <View >

            <View >

                <View style={{ flexDirection: 'column', alignItems: 'flex-start', }}>

                <View >
                <Header
                    currentObject={navigation}
                    BackTextName={
                        <Text style={{
                            fontFamily: FontFamily.medium,
                        }}>Details</Text>
                    }

                />

            </View>
                  
                    <View style={{ width: SCREEN_WIDTH * 0.9, alignSelf: 'center' }}>
                        <View style={styles.Item_Style}>
                            <Image
                                style={{ resizeMode: 'contain', width: SCREEN_WIDTH * 0.19, height: SCREEN_HEIGHT * 0.1 }}
                                source={require('../../Assets/Images/DemoImage/demoiamge.png')}
                            />
                            <View >
                                <Text style={styles.TitleStyle}>Tiana Gouse</Text>
                                <Text style={styles.TitleLightStyle}>Letraset sheets containing Lorem</Text>
                            </View>


                            <View style={styles.Item_Style}>

                                <Text style={{
                                    marginLeft: SCREEN_WIDTH * 0.04,
                                    fontSize: 12,
                                    color: Colors.Pink,
                                    fontFamily: FontFamily.medium,
                                }}>Blocked</Text>

                            </View>

                        </View>
                        <View style={{ height: 0.5, backgroundColor: Colors.Grey, marginTop: SCREEN_HEIGHT * 0.02, marginTop: SCREEN_HEIGHT * 0.03 }} />

                        <TouchableOpacity onPress={() => setShowTypeUnBlock(!ShowTypeUnBlock)}>
                            <View >
                                <Text style={{
                                    fontFamily: FontFamily.medium,
                                    fontSize: 16, paddingTop: SCREEN_HEIGHT * 0.03, paddingBottom: SCREEN_HEIGHT * 0.03
                                }}>Unblock</Text>

                            </View>

                        </TouchableOpacity>
                        {ShowTypeUnBlock ?

                            <View style={styles.ItemBackgroundStyle}>


                                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                    <Text style={styles.BlockDalogText}>Are you sure to Unblock</Text>
                                    <Text style={styles.DialogLigihtNewText}>Tiana Cousee</Text>
                                </View>
                                <Text style={{ textAlign: 'center' }}>Request?</Text>

                                <View style={styles.ButtonContainer}>

                                    <LoginButton
                                        ButtonTextStyle={{ color: Colors.White, fontSize: 16, fontFamily: FontFamily.bold }}
                                        ButtonStyle={{
                                            backgroundColor: Colors.Pink,
                                            width: SCREEN_WIDTH * 0.22,
                                            height: SCREEN_HEIGHT * 0.05,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: SCREEN_HEIGHT * 0.01,
                                            borderRadius: 8,
                                        }}
                                        buttonTitle="Yes" />

                                    <LoginButton

                                        ButtonTextStyle={{
                                            color: Colors.White, fontSize: 16, fontFamily: FontFamily.bold,
                                        }}
                                        ButtonStyle={{
                                            backgroundColor: Colors.black,
                                            width: SCREEN_WIDTH * 0.22,
                                            height: SCREEN_HEIGHT * 0.05,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: SCREEN_HEIGHT * 0.01,
                                            borderRadius: 8,

                                        }}
                                        buttonTitle="No" />
                                </View>

                            </View>
                            :
                            null
                        }


                        <View style={{ height: 0.5, backgroundColor: Colors.Grey, marginTop: SCREEN_HEIGHT * 0.02 }} />

                    </View>


                    <View>









                    </View>

                </View>

            </View>


            <View >




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
        // backgroundColor: '#FCEAE8',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: SCREEN_WIDTH,
        justifyContent: 'space-between',
        paddingVertical: SCREEN_HEIGHT * 0.04,
        paddingHorizontal: SCREEN_WIDTH * 0.04,

    },
    DialogLigihtNewText: {
        fontFamily:FontFamily.bold,
        fontSize: 14,
        paddingLeft: SCREEN_WIDTH * 0.02,
        paddingRight: SCREEN_WIDTH * 0.02


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

    FlatlistImagecontainer: {
        width: SCREEN_WIDTH * 0.2,
        height: SCREEN_HEIGHT * 0.1,
    },

    TitleStyle: {
        marginLeft: SCREEN_WIDTH * 0.02,
        fontSize: 15,
        color: Colors.black
    },

    TitleLightStyle: {
        marginLeft: SCREEN_WIDTH * 0.02,
        fontSize: 13,
        color: Colors.TextGrey,
        paddingTop: SCREEN_WIDTH * 0.02
    },


    Flatlistcontainer: {

        padding: SCREEN_HEIGHT * 0.09,
        padding: SCREEN_WIDTH * 0.02,

    },
    Item_Style: {
        flexDirection: 'row',
        alignItems: 'center',
        color: Colors.black,
    },
    ButtonContainer: {
        width: SCREEN_WIDTH * 0.6,
        alignSelf: 'center',
        flexDirection: 'row',
        // alignItems: 'center',
        // alignSelf: 'center',
        // paddingHorizontal :SCREEN_HEIGHT * 0.1,
        justifyContent: 'space-evenly'
    },
    ItemBackgroundStyle: {
        paddingVertical: SCREEN_HEIGHT * 0.03,
        backgroundColor: Colors.lightPink,
        // left : SCREEN_WIDTH * 0.06,
        borderRadius: 10

    },
}

)