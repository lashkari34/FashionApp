import React from 'react';
import { Button, Pressable, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { Colors } from '../Helper/Colors.js';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Helper/DeviceDimensions';

export const ButtonWithTextInput = ({ onSubmitPress, disabled, ButtonStyle, bottonIcon }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={ButtonStyle ? ButtonStyle : styles.ButtonContainer}
                onPress={disabled ? () => null : onSubmitPress}>
                <TextInput 
                    placeholder="Type Comment here..."
                    placeholderTextColor = "white"
                    underlineColorAndroid='transparent'
                    underlineColorAndroid = "transparent"
                 
                    style={styles.TextInputStyleClass} />
                {bottonIcon}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
     
        // flex: 1,
        marginTop: SCREEN_HEIGHT * 0.02,

    },
    ButtonContainer: {
        backgroundColor: Colors.White,
        color: Colors.White,
        width: SCREEN_WIDTH * 0.55,
        height: SCREEN_HEIGHT * 0.07,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
      
        borderWidth: 1,

    },
    ButtonText: {


    },
    TextInputStyleClass: {
        color: 'white',
        height: 50,
        width:SCREEN_WIDTH*0.76

    }
});
