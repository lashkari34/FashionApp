import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView } from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Header } from '../../Component/Header';
import { navigate } from '../../../RootNavigation';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'

const DATA = [
  
    {
        cover_img: require('../../Assets/Images/TankTop/TankTop.png'),
        title: 'Tank Top',
        size: 'Size: XXL',
    },
    {
        cover_img: require('../../Assets/Images/CamiTop/CamiTop.png'),
        title: 'Cami Top',
        size: 'Size: XL',
    },
    {
        cover_img: require('../../Assets/Images/TubeTop/TubeTop.png'),
        title: 'Tube Top',
        size: 'Size: XL',
    },
    {
        cover_img: require('../../Assets/Images/TunicTop/TunicTop.png'),
        title: 'Tunic Top',
        size: 'Size: S',
    },
    {
        cover_img: require('../../Assets/Images/LongLineTop/LongLineTop.png'),
        title: 'Maxi/Longline Top',
        size: 'Size: S',
    },
    {
        cover_img: require('../../Assets/Images/Pemplum/Pemplum.png'),
        title: 'Pemplum',
        size: 'Size: M',
    },


];



export function TopsScreen({ onCardPress }) {


    const Item = ({ title, size, img }) => (

        <TouchableOpacity onPress={() => onCardPress()}
            style={styles.item}>

            <Image style={styles.FlatlistImagecontainer}
                source={img} />

            <View style={styles.TitleSizeContainer}>
                <Text style={styles.TitleStyle}>{title}</Text>

                <Text style={styles.SizeStyle}>{size}</Text>
            </View>

        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (

        <Item title={item.title} size={item.size} img={item.cover_img} />
    );

    return (
        <View style={{flex: 1 }}>
            <SafeAreaView style={styles.Flatlistcontainer}>
                <FlatList
                    numColumns={2}
                    data={DATA}
                    showsVerticalScrollIndicator={true}
                    // nestedScrollEnabled={true}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    scrollEnabled={false}
                    onResponderMove={() => console.log('Inner Flatlist')}
                />
            </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({

    item: {
        marginHorizontal: 5,
        marginVertical: 10,
        backgroundColor: Colors.White

    },
    TitleSizeContainer: {
        alignItems: 'flex-start',
        paddingLeft: SCREEN_WIDTH * 0.01
    },

    TitleStyle: {
        fontFamily: FontFamily.bold,

        fontSize: 15,
        // fontWeight: 'bold'
    },
    SizeStyle: {
        fontFamily: FontFamily.medium,

    },
    Flatlistcontainer: {
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center',
        marginTop: SCREEN_HEIGHT * 0.02,
        // marginLeft: SCREEN_WIDTH * 0.04,
    },

})
