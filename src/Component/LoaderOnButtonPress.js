
import { View } from 'native-base';
import React from 'react';
import { Image, StatusBar, StyleSheet, Text, TextInput } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export const LoaderOnButtonPress = (showLoader, LoadingText) => {
        return(
           <View >
                 <Spinner
                visible
                animation="fade"
                color="#ff6600"
                textStyle={{
                    color: "#ff6600",
                }} />
           </View>
       )
}
