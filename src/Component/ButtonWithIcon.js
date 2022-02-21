// ButtonWithIcon

import React from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Colors } from '../Helper/Colors.js';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Helper/DeviceDimensions';



export const ButtonWithIcon = ({ onSubmitPress, disabled, ButtonStyle, ButtonTextStyle, buttonTitle, bottonIcon }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={ButtonStyle ? ButtonStyle : styles.ButtonContainer}
                onPress={disabled ? () => null : onSubmitPress}
            >
                <Text style={ButtonTextStyle ? ButtonTextStyle : styles.ButtonText}>{buttonTitle}</Text>
                {bottonIcon}
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
        width: SCREEN_WIDTH * 0.55,
        height: SCREEN_HEIGHT * 0.07,
        borderRadius: 10,
        flexDirection : "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderWidth: 1,
    
    },
    ButtonText: {


    }
});