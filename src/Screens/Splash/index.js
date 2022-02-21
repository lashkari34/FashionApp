// Splash
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useEffect } from 'react';
import { View, Text, ImageBackground } from "react-native"
import { useDispatch } from 'react-redux';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { saveUserDetail, saveUserToken } from '../../redux/actions/action';

export function Splash({ navigation }) {

    const dispatch = useDispatch()
    useEffect(() => {
        
        setTimeout(() => {
            checkIfAlreadySignedIn()
        }, 2500);
    }, [])


    const checkIfAlreadySignedIn = async _ => {
        const value = await AsyncStorage.getItem('key')
        const token = await AsyncStorage.getItem('token')

        if(value != null && token != null) { dispatch(saveUserDetail(JSON.parse(value))), dispatch(saveUserToken(token)), navigation.replace("TabNavigationScreen") }
        else { navigation.replace('IntroScreen') }
    }

    return (
        <ImageBackground style={{ flex: 1, height: SCREEN_HEIGHT, width: SCREEN_WIDTH }} source={require('../../Assets/Images/Splash/splash.png')}>

        </ImageBackground>
    )
}