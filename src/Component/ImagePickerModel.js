import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, StatusBar, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
export const CustomImagePicker = ({View,  Text,Modal ,pickerMode = 'image' || 'video', showImagePicker, onPressOut, CaptureImage, CaptureVideo, UploadImage, UploadVideo, UploadImageFromFacebook, UploadVideoFromFacebook,pickerTitle}) => {
        return(
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showImagePicker}
                >
                    <TouchableOpacity 
                        style={styles.centeredView}
                        activeOpacity={1} 
                        onPressOut={() =>onPressOut()}
                    >
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <View style={{height : 40, alignSelf : 'center', justifyContent : 'center'}}>
                                    <Text>{pickerTitle}</Text>
                                </View>
                                <View style={{flexDirection : 'row', justifyContent : 'space-around', width : 100, alignSelf : 'center', height : 50, alignItems : 'center', borderBottomWidth : 0.2,}}>
                                    <TouchableOpacity style={{alignItems : 'center'}} onPress={pickerMode === 'image' ? ()=>CaptureImage() : ()=>CaptureVideo()}>
                                        <Icon name={pickerMode === 'image' ? "camera" : "video-camera"}  color="#ff6600" size={20} />
                                        <Text style={{marginTop : 20}}>Camera</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{alignItems : 'center'}} onPress={pickerMode === 'image' ? ()=>UploadImage() : ()=>UploadVideo()}>
                                        <Icon name="image" color="#33bbff" size={20} />
                                        <Text style={{marginTop : 20}}>Gallery</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{alignItems : 'center'}} onPress={pickerMode === 'image' ? ()=>UploadImageFromFacebook() : ()=>UploadVideoFromFacebook()}>
                                        <Icon name="facebook" color="#3385ff" size={20} />
                                        <Text style={{marginTop : 20}}>Facebook</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={{width : 50, alignSelf : 'center', height : 20, alignItems : 'center', justifyContent : 'center'}} onPress={()=>onPressOut()}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        // alignItems: "center",
        // marginTop: deviceDimesions.Height*0.01,
        backgroundColor: "rgba(0,0,0,0.2)",
      },
      modalView: {
        margin: 10,
        backgroundColor: "rgba(255,255,255,1)",
        // justifyContent : "center",
        borderRadius: 20,
        height : 35,
        width : 95,
        // padding: 20,
        alignSelf: "center",
        elevation : 4,
        bottom : 10,
        // borderRadius : 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
      },
});