import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navigate } from '../../RootNavigation';
import { Colors } from '../Helper/Colors.js';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Helper/DeviceDimensions';
import { FontFamily } from '../Helper/FontFamily';


export const ChatHeader = ({ onIconPress, IconComponent, currentObject, BackTextName, ImageComponent, SecondIcon }) => {
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                paddingVertical: SCREEN_HEIGHT * 0.02,
                alignItems: 'center',
                
            }}>
                <TouchableOpacity onPress={() => currentObject.goBack(null)} style={styles.backButtonContainer}>
                    <Image
                        style={{}}
                        source={require('../../src/Assets/Images/BackImage/BackImage.png')}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    {ImageComponent}
                </TouchableOpacity>
                <Text style={styles.BackText}>{BackTextName}</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity >
                    {IconComponent}
                </TouchableOpacity>
                <TouchableOpacity onPress={onIconPress}>
                    {SecondIcon}
                </TouchableOpacity>
            </View>

            {/* <TouchableOpacity
                style={styles.HederContainer}
                onPress={disabled ? () => null : onSubmitPress}>
                <Text style={HederTextStyle ? HederTextStyle : styles.HederText}>{HederText}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity>
                        
                    </TouchableOpacity>
                    <Text>Back</Text>
                </View>

            </TouchableOpacity> */}
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT * 0.08,
        alignContent: 'center',
        backgroundColor: "rgba(252, 234, 232, 0.85)",
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: SCREEN_WIDTH * 0.04
    },
    backButtonContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        // paddingVertical: SCREEN_HEIGHT * 0.01
    },
    ImageComponent: {
        // left: SCREEN_WIDTH * 0.02
    },
    BackText: {
        marginHorizontal: SCREEN_WIDTH * 0.02,
        fontFamily: FontFamily.medium,


    },

    HederContainer: {


        // height: 80,
        // alignItems:'center'
        // alignContent:'center'
    },
    HederText: {
        color:Colors.black, fontSize: 16, fontFamily: FontFamily.medium, textAlign: 'center',

    },
});