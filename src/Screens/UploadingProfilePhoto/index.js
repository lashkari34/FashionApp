// Splash
import React, { useState, useCallback } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView, View, TextInput } from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import RangeSlider from 'rn-range-slider';
import { Radio } from 'native-base';
import Slider from "react-native-slider";
import { Header } from '../../Component/Header';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'


export function UploadingProfilePhoto({ navigation }) {
    const [ShowGenderOptions, setShowGenderOptions] = useState();
    const [SelectedGender, setSelectedGender] = useState('')
    const [CostumeType, setCostumeType] = useState('outfit')
  
    return (
        <View style={styles.container}>
            <View >
                <Header
                    currentObject={navigation}
                    BackTextName={
                        <Text style={{
                            fontFamily: FontFamily.medium,
                        }}>Profile Photos</Text>
                    }
                    ImageComponent={
                        <Image style={styles.ProfileStyle}
                            source={require('../../Assets/Images/ProfileImage/Profile.png')}>
                        </Image>
                    }

                />

            </View>


            <View style={styles.ImageViewContainer}>
                <View style={styles.ProfileContainer}>
                    <Image style={styles.ProfileImage}
                        source={require('../../Assets/Images/ProfileImage/Profile.png')}>
                    </Image>

                    <Text style={styles.ProfileTextConatiner}>Elle Fanning</Text>

                    <Text style={styles.UserNameContainer}>@ellefanning</Text>
                </View>
            </View>


            <View>
                <Slider
                    // trackStyle={customStyles4.track}
                    // thumbStyle={customStyles4.thumb}
                    minimumTrackTintColor={Colors.Pink}
                    trackStyle={{
                        paddingVertical: SCREEN_HEIGHT * 0.005, borderRadius: 10, backgroundColor
                            : 'lightgrey'
                    }}
                    // thumbImage={}
                    style={{ width: SCREEN_WIDTH * 0.9, alignSelf: 'center', }}
                    thumbStyle={{
                        backgroundColor: Colors.Pink,
                        borderRadius: 100,
                        borderWidth: 4,
                        borderColor: '#fff'
                    }}
                //    debugTouchArea={true}
                // animateTransitions={true}
                />

            </View>

            <Text style={styles.ProgressStyle}>Uploading Progress</Text>

            <ScrollView>
                <View style={styles.GenderContainer}>
                    <Text style={styles.DetailsTextStyle}>Details</Text>
                    <TouchableOpacity onPress={() => setShowGenderOptions(!ShowGenderOptions)}>
                        <Text style={styles.GenderTextContainer}>Caption Optional</Text>
                    </TouchableOpacity >
                    <Icon style={{ marginTop: SCREEN_HEIGHT * 0.005, left: 4 }} name={ShowGenderOptions ? "chevron-up" : "chevron-down"} color={Colors.DarkGrey} />

                </View>

                {ShowGenderOptions ?
                    <View style={styles.GenderOptionContainer}>
                        <TouchableOpacity style={styles.GenderOption}
                            onPress={() => { setSelectedGender('Male'); setShowGenderOptions(!ShowGenderOptions) }}>
                            <Text style={{
                                marginLeft: SCREEN_WIDTH * 0.05, marginVertical: SCREEN_HEIGHT * 0.02, color: Colors.black, fontFamily: FontFamily.medium,
                            }}>Caption</Text>
                            <CustomTextInput
                                HideIcon
                                TextInputProps={{
                                    placeholder: "Write Caption"
                                }}

                            />
                        </TouchableOpacity>

                    </View>
                    :
                    null
                }
                <View style={styles.RadioContainer}>
                    <View style={styles.PrivateContainer}>
                        <Radio selected={CostumeType == 'outfit' ? true : false} onPress={() => setCostumeType('outfit')} color={Colors.White} selectedColor={Colors.Pink} color = {Colors.Pink} />
                        <Text style={styles.PrivateTextContainer}>Outfit</Text>
                    </View>
                    <View style={styles.PublicContainer}>
                        <Radio selected={CostumeType == 'single item' ? true : false} onPress={() => setCostumeType('single item')} color={Colors.White} selectedColor={Colors.Pink} color = {Colors.Pink} />
                        <Text style={styles.PublicTextContainer}>Single Item</Text>
                    </View>

                </View>

                <View style={styles.CategoryContainer}>
                    <Text style={styles.CategoryStyle}>
                        Category
                </Text>
                    <TouchableOpacity style={styles.SelectCategoryStyle}>
                        <Text style={styles.SelectCategoryTextStyle}>Select Category</Text>
                        <Icon name="chevron-down" size={17} color={Colors.TextGrey}
                            style={{ right: SCREEN_WIDTH * 0.02 }} >
                        </Icon>
                    </TouchableOpacity>
                </View>

                <View style={styles.CategoryContainer}>
                    <Text style={styles.CategoryStyle}>
                        Brand
                </Text>
                    <TouchableOpacity style={styles.SelectCategoryStyle}>
                        <Text style={styles.SelectCategoryTextStyle}>Select Brand</Text>
                        <Icon name="chevron-down" size={17} color={Colors.TextGrey}
                            style={{ right: SCREEN_WIDTH * 0.02 }} >
                        </Icon>
                    </TouchableOpacity>
                </View>

                <View style={styles.CategoryContainer}>
                    <Text style={styles.CategoryStyle}>
                        Color
                </Text>
                    <TouchableOpacity style={styles.SelectCategoryStyle}>
                        <Text style={styles.SelectCategoryTextStyle}>Select Color</Text>
                        <Icon name="chevron-down" size={17} color={Colors.TextGrey}
                            style={{ right: SCREEN_WIDTH * 0.02 }} >
                        </Icon>
                    </TouchableOpacity>
                </View>

                <LoginButton
                    // onSubmitPress={() => navigation.navigate('TabNavigationScreen')}
                    ButtonTextStyle={{
                        color: Colors.White, fontSize: 16, fontFamily: FontFamily.bold,
                    }}
                    ButtonStyle={{
                        backgroundColor: Colors.Pink,
                        width: SCREEN_WIDTH * 0.9,
                        height: SCREEN_HEIGHT * 0.07,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        elevation: 10,
                    }}
                    buttonTitle="Continue" />
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
    ProfileImageStyle: {
    },
    ImageViewContainer: {
        marginVertical: SCREEN_HEIGHT * 0.02,
        left: SCREEN_WIDTH * 0.04,

    },
    ImageContainerstyle: {
        width: SCREEN_WIDTH * 0.3,
        height: SCREEN_HEIGHT * 0.17,
        borderRadius: 5
    },
    ImageView: {
        marginLeft: SCREEN_WIDTH * 0.45
    },
    Imagestyle: {
        width: SCREEN_WIDTH * 0.1,
        height: SCREEN_HEIGHT * 0.05,
        borderRadius: 6

    },

    BackTextStyle: {
        fontFamily: FontFamily.medium,
        marginTop: SCREEN_HEIGHT * 0.007,
        fontSize: 16,
        // fontWeight: '400',
        marginLeft: SCREEN_WIDTH * 0.01
    },
    ProfileStyle: {
        width: SCREEN_WIDTH * 0.09,
        height: SCREEN_HEIGHT * 0.045,
        borderRadius: 6,
        marginLeft: SCREEN_WIDTH * 0.5


    },
    item: {
        marginHorizontal: 3,
        // marginVertical: 5,
        borderRadius: 15
    },
    FlatlistImagecontainer: {
        width: SCREEN_WIDTH * 0.2,
        height: SCREEN_HEIGHT * 0.1,
        resizeMode: 'center'
    },
    TitleSizeContainer: {
        alignItems: 'flex-start',
        paddingLeft: SCREEN_WIDTH * 0.02
    },
    TitleStyle: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    Flatlistcontainer: {
        marginTop: SCREEN_HEIGHT * 0.02,
        marginLeft: SCREEN_WIDTH * 0.02,
    },
    ProgressStyle: {
        fontFamily: FontFamily.medium,
        marginVertical: SCREEN_HEIGHT * 0.01,
        color: Colors.TextGrey,
        marginLeft: SCREEN_WIDTH * 0.05
    },
    DetailsTextStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 20,
        // marginLeft: SCREEN_WIDTH * 0.03
    },
    DetailsContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    CaptionStyle: {
        color: Colors.TextGrey,

        marginLeft: SCREEN_WIDTH * 0.5

    },
    RadioContainer: {
        flexDirection: 'row',
        marginVertical: SCREEN_HEIGHT * 0.02

    },
    PrivateContainer: {
        marginLeft: SCREEN_WIDTH * 0.05,
        flexDirection: 'row',

    },
    PublicContainer: {
        marginLeft: SCREEN_WIDTH * 0.2,
        flexDirection: 'row'
    },
    PrivateTextContainer: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        // fontWeight: 'bold'
    },
    PublicTextContainer: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        // fontWeight: 'bold'
    },
    CategoryContainer: {
        marginVertical: SCREEN_HEIGHT * 0.02
    },
    CategoryStyle: {
        fontFamily: FontFamily.medium,
        marginLeft: SCREEN_WIDTH * 0.05
    },
    SelectCategoryStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: SCREEN_HEIGHT * 0.005,
        borderWidth: 1,
        paddingVertical: 13,
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center',
        borderColor: Colors.TextGrey,
        borderRadius: 5
    },
    SelectCategoryTextStyle: {
        color: Colors.TextGrey,
        left: SCREEN_WIDTH * 0.02
    },
    GenderContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        marginTop: SCREEN_HEIGHT * 0.03,
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center'

    },
    GenderTextContainer: {
        fontFamily: FontFamily.medium,
        color: Colors.DarkGrey,
        marginLeft: SCREEN_WIDTH * 0.39

    },
    GenderOptionContainer: {
        // borderWidth: 1,
        width: SCREEN_WIDTH * 0.9,
        // alignSelf: 'center',
        // padding: 10,
        marginTop: SCREEN_HEIGHT * 0.01,

    },
    GenderOption: {
        // padding: SCREEN_WIDTH * 0.02
    },
    OptionText: {
        color: Colors.DarkGrey
    },
    SelectedGenderText: {
        color: Colors.Pink
    },
    ProfileContainer: {
        // marginTop: SCREEN_HEIGHT * 0.02,
        flexDirection: 'row'
    },


    ProfileImage: {
        width: SCREEN_WIDTH * 0.3,
        height: SCREEN_HEIGHT * 0.16,
        borderRadius: 6,
        elevation: 10
        // marginLeft: SCREEN_WIDTH * 0.025,
        // marginVertical: SCREEN_HEIGHT * 0.02,

    },
    ProfileTextConatiner: {
        fontFamily: FontFamily.medium,
        marginLeft: SCREEN_WIDTH * 0.025,
        fontSize: 18,
        // fontWeight: '600',
        // marginTop: SCREEN_HEIGHT * 0.015,
    },
    UserNameContainer: {
        fontFamily: FontFamily.medium,
        marginLeft: SCREEN_WIDTH * 0.33,
        fontSize: 12,
        marginTop: SCREEN_HEIGHT * 0.04,
        position: 'absolute',
        color: Colors.Grey
    },
    SliderImageStyle: {
        width: SCREEN_WIDTH * 0.06,
        height: SCREEN_HEIGHT * 0.032,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: Colors.White,
        left: SCREEN_WIDTH * 0.03,
    },
    RangeSliderContainer: {
        marginVertical: SCREEN_HEIGHT * 0.01
    }
});


