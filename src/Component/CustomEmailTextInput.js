import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Helper/DeviceDimensions';

const CustomEmailTextInput = ({ IconName, IconColor, Input,IconSize, TextInputProps, showReverse, HideIcon ,onSubmitEditing}) => {
    const [isFocused, setIsFocused] = useState(false)


    return (
        <View style={[showReverse ? styles.ReverseContainer : styles.Container,{borderColor: isFocused ?'#FF2B8A': '#EBEBEB'}]}>
            { HideIcon ?
                null
                :
                <MaterialCommunityIcons name={IconName ? IconName : 'email'} color={IconColor ? IconColor : "#FF2B8A"} size={IconSize ? IconSize : 18} />
            }
            <TextInput
                onSubmitEditing={onSubmitEditing}
                ref={Input}
               autoCapitalize='none'
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={HideIcon ? { width: SCREEN_WIDTH * 0.8 } : { width: SCREEN_WIDTH * 0.7 }}
                {...TextInputProps}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        // flex: 1,
        height: 50,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderWidth: 2,
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.9,
        marginLeft: SCREEN_WIDTH * 0.05,

        // fontFamily:'montserrat_medium',

    },
    ReverseContainer: {
        // flex: 1,
        height: 40,
        borderRadius: 5,
        flexDirection: 'row-reverse',
        justifyContent: 'space-evenly',
        borderWidth: 2,
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.9,
        marginLeft: SCREEN_WIDTH * 0.05,



    },

})
export { CustomEmailTextInput };