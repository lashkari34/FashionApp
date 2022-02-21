
// import { View } from 'native-base';
import React from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Helper/DeviceDimensions';
import {Colors} from '../Helper/Colors.js/index'
export const LoginButton = ({ onSubmitPress, disabled, ButtonStyle, ButtonTextStyle, buttonTitle }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={ButtonStyle ? ButtonStyle : styles.ButtonContainer}
                onPress={disabled ? () => null : onSubmitPress}
            >
                <Text style={ButtonTextStyle ? ButtonTextStyle : styles.ButtonText}>{buttonTitle}</Text>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        // flex: 1,
        marginTop: SCREEN_HEIGHT * 0.02,
       
    },
    ButtonContainer: {
        backgroundColor: Colors.White,
        color: Colors.White,
        width: SCREEN_WIDTH * 0.45,
        height: SCREEN_HEIGHT * 0.07,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
       
    
    },
    ButtonText: {


    }
});