import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView } from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomHeader } from '../Component/';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Colors } from '../Helper/Colors.js';

const CustomHeader = ({ }) => {

}
<View style={styles.ImageContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image style={styles.Imagestyle}
            source={require('../../Assets/Images/BackImage/BackImage.png')}>
        </Image>
    </TouchableOpacity>
    <Text style={styles.BackTextStyle}>Back</Text>
    <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
        <Icon onSubmitPress={() => navigation.navigate('SearchScreen')}
            style={styles.SearchContainer}
            name="search" color={Colors.black} size={18} />
    </TouchableOpacity>
</View>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightPink
    },
    ImageContainer: {
        flexDirection: 'row',
        marginTop: SCREEN_HEIGHT * 0.02,
        marginLeft: SCREEN_WIDTH * 0.025
    },
    Imagestyle: {
        marginTop: SCREEN_HEIGHT * 0.008,
        width: SCREEN_WIDTH * 0.055,
        height: SCREEN_HEIGHT * 0.022
    },

    BackTextStyle: {
        marginTop: SCREEN_HEIGHT * 0.007,
        fontSize: 16,
        fontWeight: '400',
        marginLeft: SCREEN_WIDTH * 0.01


    },
    SearchContainer: {
        marginLeft: SCREEN_WIDTH * 0.75
    },

});