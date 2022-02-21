// Splash
import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView } from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'

export function PhotoScreen({ navigation }) {
    return (
        <View style={styles.container}>

            <View style={styles.ImageContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.Imagestyle}
                        source={require('../../Assets/Images/BackImage/BackImage.png')}>
                    </Image>
                </TouchableOpacity>
                <Text style={styles.BackTextStyle}>Photos</Text>
                {/* <View style={styles.IconStyle}>
                    <TouchableOpacity>
                        <Icon name="arrowright" size={25} color="#383838"></Icon>
                    </TouchableOpacity>
                </View> */}
            </View>

\      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White

    },
    ImageContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.lightPink,
        paddingVertical: SCREEN_HEIGHT * 0.03
    },

    Imagestyle: {
        marginTop: SCREEN_HEIGHT * 0.002,
        width: SCREEN_WIDTH * 0.055,
        height: SCREEN_HEIGHT * 0.022,
        marginLeft: SCREEN_WIDTH * 0.03

    },
    BackTextStyle: {
        // marginTop: SCREEN_HEIGHT * 0.001,
        fontSize: 16,
        fontWeight: '400',
        marginLeft: SCREEN_WIDTH * 0.01

    },
    IconStyle: {
        marginLeft: SCREEN_WIDTH * 0.7
    },

    EmailContainer: {
        marginTop: SCREEN_WIDTH * 0.08,
        marginLeft: SCREEN_WIDTH * 0.05,

    },
    EmailTextContainer: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    TextinputContainer: {
        marginTop: SCREEN_WIDTH * 0.04,

    },
    UploadContainer: {
        marginTop: SCREEN_HEIGHT * 0.05,
        marginLeft: SCREEN_WIDTH * 0.05,
        color: Colors.LightGrey

    },
    UploadTextStyle: {
        fontSize: 20,
        fontWeight: '600'
    },
    TakePictureStyle: {
        color: Colors.TextGrey
    },
    CameraImageStyle: {
        width: SCREEN_WIDTH * 0.6,
        height: SCREEN_HEIGHT * 0.27,
        alignSelf: 'center',
        marginVertical: SCREEN_HEIGHT * 0.07

    },
    ButtonContainer: {

    },
    ProfilePhotoContainer: {
        flexDirection: 'row',
        marginTop: SCREEN_HEIGHT * 0.03,
        marginLeft: SCREEN_WIDTH * 0.06

    },
    PhotoTextStyle: {
        fontSize: 16
    },
    ProfileTextStyle: {
        fontSize: 16,
        marginLeft: SCREEN_WIDTH * 0.13
    },
    ProfilePhotoImageContainer: {
        flexDirection: 'row',
        marginTop: SCREEN_HEIGHT * 0.03,
        marginLeft: SCREEN_WIDTH * 0.06

    },
    PhotoImageStyle: {

    },
    ProfileImageStyle: {

        marginLeft: SCREEN_WIDTH * 0.17
    }
});
