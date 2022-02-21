// Splash
import React, { useState, useEffect, useRef } from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity, Button, FlatList, SafeAreaView, ToastAndroid } from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import ImagePicker from 'react-native-image-crop-picker';
import { Header } from '../../Component/Header';
import { navigate } from '../../../RootNavigation';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import { UploadFeedPictures } from '../../Helper/Services';
import { UploadFeedCamera } from '../../Helper/Services';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import VideoPlayer from 'react-native-video-player';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from "react-native-dialog";
import { color } from 'react-native-elements/dist/helpers';
import Toast from 'react-native-toast-message';

let pause = false;
export function UploadScreen({ navigation }) {

    const [renderImage, SetrenderImage] = useState(require('../../Assets/Images/CameraImage/newimages.png'));
    const [ActiveTab, SetActiveTab] = useState('');
    const [ActiveTabButton, setActiveTabButton] = useState('');

    const [ImageCategory, setImageCategory] = useState([]);
    const [ImageCategoryShow, setImageCategoryShow] = useState([]);

    const [ShowImageList, setShowImageList] = useState();
    const [loading, setLoading] = useState(false);
    const [dataprofilephoto, setdataprofilephoto] = useState(true);

    const [refresh, setRefresh] = useState(true);
    const [dialogVisible, setdialogVisible] = useState(false);

    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [paused, setPaused] = useState(true);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
    const [screenType, setScreenType] = useState('content');
    const [dialogshow, setdialogshow] = useState(true);
    const [dialogshowimage, setdialogshowimage] = useState(true);



    const [showModal, setShowModal] = useState(true);

    const [visible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleDelete = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        setVisible(false);
    };

    const onSeek = (seek) => {
        //Handler for change in seekbar
        videoPlayer.current.seek(seek);
    };

    const onPaused = (playerState) => {
        //Handler for Video Pause
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onReplay = () => {
        //Handler for Replay
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer.current.seek(0);
    };

    const onProgress = (data) => {
        // Video Player will continue progress even if the video already ended
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        // setDuration(data.duration);
        setIsLoading(false);
        pause = true
        setRefresh(!refresh)

    };

    const onLoadStart = (data) => { setIsLoading(false), setTimeout(() => { pause = true, setRefresh(!refresh) }, 10) }

    const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

    const onError = () => alert('Oh! ', error);

    const exitFullScreen = () => {
        alert('Exit full screen');
    };

    const enterFullScreen = () => { };

    const onFullScreen = () => {
        setIsFullScreen(isFullScreen);
        if (screenType == 'content') setScreenType('cover');
        else setScreenType('content');
    };

    const setdialogshowimages = async () => {
        setdialogshow(true)
        setdialogshowimage(true)

    }

    const onSeeking = (currentTime) => setCurrentTime(currentTime);
    const cancelclick = async () => {
        setdialogshowimage(false)
        setdialogshow(false)

    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            setShowImageList(false)
            setImageCategory(false)
            setImageCategoryShow(false)
            setActiveTabButton(false)
            SetActiveTab(false)
            setdialogshowimage(false)
            setdialogshow(false)

        });
    }, [])

    const Continue = () => {

        if (!ImageCategory) {
        
            Toast.show({
                text1: 'Please Select Images!'
              })

        } else {
            !ActiveTab ? TouchableOpacity : navigation.navigate('UploadingPhotoScreen', { ImageCategory: ImageCategory })

        }
    }

    const UploadClothingCamera = () => {
        setVisible(false);
        setdialogshowimage(false)
        setdialogshow(false)
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            multiple: true,
            cropping: false,
            storageOptions: {
                skipBackup: true,
                path: 'image'
            }

        }).then(async (image) => {
            console.log('data', image);
            setTimeout(() => {
                setLoading(true);
            }, 1000)
            setShowImageList(true);
            setdialogshowimage(false)
            setdialogshow(false)

            UploadFeedCamera(image).then(async (res) => {
                let response = res;
            
                if (response.data.status == 200) {
                    // setLoading(true)
                    setImageCategoryShow(response.data.data)
                    setImageCategory(response.data.data)

                }

            })

                .catch(err => {
                    let error = err
                    console.log(error)
                    // setLoading(false);
                })

        }).catch(err => {
            // alert(err)
        });
    }

    useEffect(() => {
        console.log("Loader off.......................")
        setTimeout(() => {

            setdialogshow(false)
            setdialogshowimage(false)
            setLoading(false);
        }, 6000)
        // do something when value changes
    }, [ImageCategoryShow]);

    const UploadClothing = () => {
        setVisible(false);
        setdialogshowimage(false)
        setdialogshow(false)
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            multiple: true,
            cropping: false,

        }).then(async (image) => {
            console.log('data', image);
            setShowImageList(true);
            // setdialogshow(false)
            // setLoading(true);
            setTimeout(() => {
                setLoading(true);
            }, 1000)
            setdialogshowimage(false)
            setdialogshow(false)
            await UploadFeedPictures(image).then(async (res) => {
                let response = res;
                if (response.data.status == 200) {
                    setImageCategoryShow(response.data.data)
                    setImageCategory(response.data.data)
                    setActiveTabButton(true)
                    // setTimeout(() => {

                    //     setLoading(false);
                    // }, 6000)
                    // console.log(response.data.data, 'Hello');

                }

            })
                .catch(err => {
                    let error = err
                    console.log(error)
                    // setLoading(false);
                })

        }).catch(err => {
            // alert(err)
        });

    }
    const renderItem = ({ item }) => (
        <TouchableOpacity
        >
            {

                item.filePath.split('.').reverse()[0] == 'mp4' ?

                    <View style={{
                        marginLeft: SCREEN_WIDTH * 0.23, marginTop: SCREEN_HEIGHT * 0.05,
                    }}>
                       
                        <VideoPlayer
                            video={{ uri: item?.filePath }}
                            videoWidth={SCREEN_WIDTH * 0.10}
                            videoHeight={SCREEN_HEIGHT * 0.05}
                            ></VideoPlayer>

                    </View>
                    :
                    <Image
                        style={{
                           
                            width: SCREEN_WIDTH,
                            height: 550,
                        }}
                        source={{ uri: item.filePath }} />
    }
        </TouchableOpacity>
    );
    
    return (

        <View style={styles.container}>
            {
                loading ?
                    <Spinner
                        visible
                        animation="fade"
                        color={Colors.Pink}
                    />
                    : null
            }
            <View showsVerticalScrollIndicator={false} >

                <View >
                    <Header
                        onIconPress={() => navigate('CommonNotificationScreen')}
                        currentObject={navigation}
                        BackTextName={
                            <Text style={{
                                fontFamily: FontFamily.medium,
                            }}>New Post</Text>
                        }
                        IconComponent={
                            <AntDesign
                                name="arrowright" color={Colors.black} size={18}
                            />
                        }
                    />

                </View>

                <View style={{ backgroundColor: Colors.Grey }}>
                    <View style={styles.UploadContainer}>
                        <View style={styles.UploadingPohtoTextStyle}>
                            <Text style={styles.UploadTextStyle}>Upload Photos and Videos</Text>
                            <Text style={styles.TakePictureStyle}>Take picture or choose from your library</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={setdialogshowimages}>

                        {ShowImageList ? (
                            <SafeAreaView style={styles.Flatlistcontainer}>

                                <FlatList
                                    horizontal={true}
                                    data={ImageCategoryShow}
                                    extraData={refresh}
                                    renderItem={(item, index) => renderItem(item)}
                                    keyExtractor={item => item}
                                    showsHorizontalScrollIndicator={false}
                                />

                            </SafeAreaView>

                        ) : (
                            <>

                                <View>

                                    <Image style={styles.CameraImageStyle}
                                        source={renderImage}>
                                    </Image>


                                </View>


                            </>
                        )}

                    </TouchableOpacity>


                    <View >

                        {

                            dialogshowimage ?

                                <View style={styles.modalView}>
                                    <View style={{ height: SCREEN_HEIGHT * 0.1, alignSelf: 'center', justifyContent: 'center' }}>
                                        <Text>
                                            Upload Image
                                        </Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: SCREEN_WIDTH * 0.9, alignSelf: 'center', height: SCREEN_HEIGHT * 0.17, alignItems: 'center', borderBottomWidth: 0.2, }}>
                                        <TouchableOpacity style={{ alignItems: 'center', }} onPress={UploadClothingCamera}>
                                            <Icon name="camera" color="#FF2B8A" size={20} />
                                            <Text style={{ marginTop: SCREEN_HEIGHT * 0.02 }}>Camera</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={UploadClothing} >
                                            <Icon name="image" color="#FF2B8A" size={20} />
                                            <Text style={{ marginTop: SCREEN_HEIGHT * 0.02 }}>Gallery</Text>
                                        </TouchableOpacity>

                                    </View>
                                    <View
                                        style={{
                                            borderBottomColor: Colors.LightGrey,
                                            borderBottomWidth: 1,
                                            marginLeft: 20,
                                            marginRight: 20
                                        }}
                                    />
                                    <TouchableOpacity style={{ width: SCREEN_WIDTH * 0.9, alignSelf: 'center', height: SCREEN_HEIGHT * 0.08, alignItems: 'center', justifyContent: 'center' }} onPress={cancelclick}>
                                        <Text>Cancel</Text>
                                    </TouchableOpacity>
                                </View>

                                :
                                <View style={styles.ButtonContainer}>

                                    <LoginButton
                                        onSubmitPress={() => Continue()}
                                        ButtonTextStyle={{
                                            color: Colors.White, fontSize: 16, fontFamily: FontFamily.bold
                                        }}
                                        ButtonStyle={{
                                            backgroundColor: !ActiveTabButton ? Colors.shinpink : Colors.Pink,
                                            width: SCREEN_WIDTH * 0.9,
                                            height: SCREEN_HEIGHT * 0.07,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: 5,
                                            elevation: 10,
                                        }}
                                        buttonTitle="Continue" />
                                </View>
                        }



                    </View>

                </View>

                <View >
                    <View style={{ marginTop: 20 }}>
                        {
                            dialogshow ?
                                null
                                :

                                <View style={{ flexDirection: 'row' }}>

                                    <View style={styles.ProfilePhotoContainer}>

                                        <Text style={styles.PhotoTextStyle}>Photos</Text>
                                        <TouchableOpacity onPress={() => SetActiveTab('Photos')}
                                        >
                                            <View style={{
                                                borderRadius: 5,
                                                borderWidth: 0.5,
                                                height: SCREEN_HEIGHT * 0.1,
                                                width: SCREEN_WIDTH * 0.2,
                                                borderColor: Colors.LightGrey,

                                                backgroundColor: ActiveTab == "Photos" ? Colors.Pink : Colors.White,
                                            }}>
                                                <EvilIcons
                                                    style={{ alignSelf: 'center', marginTop: SCREEN_HEIGHT * 0.0, marginTop: SCREEN_HEIGHT * 0.03, position: 'absolute' }}
                                                    name="camera" size={40} color={ActiveTab == "Photos" ? Colors.White : Colors.Pink}
                                                >
                                                </EvilIcons>
                                            </View>

                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.ProfilePhotoImageContainer}>

                                        <Text style={styles.ProfileTextStyle}>Profile</Text>

                                        <TouchableOpacity onPress={() => SetActiveTab('Profile')}
                                        >
                                            <View style={{
                                                borderRadius: 5,
                                                borderWidth: 0.5,
                                                height: SCREEN_HEIGHT * 0.1,
                                                width: SCREEN_WIDTH * 0.2,

                                                borderColor: Colors.LightGrey,
                                                backgroundColor: ActiveTab == "Profile" ? Colors.Pink : Colors.White,
                                                // marginLeft: SCREEN_WIDTH * 0.1,
                                            }}>

                                                <AntDesign
                                                    style={{ alignSelf: 'center', marginTop: SCREEN_HEIGHT * 0.03, position: 'absolute' }}
                                                    name="user" size={30} color={ActiveTab == "Profile" ? Colors.White : Colors.Pink}
                                                >

                                                </AntDesign>
                                            </View>

                                        </TouchableOpacity>
                                    </View>
                                </View>

                        }</View>
                </View>
                <View >

                </View>


            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },
    Dialogcontainer: {
        width: 50
    },
    ImageContainer: {
        backgroundColor: Colors.lightPink,
        flexDirection: 'row',
        // marginTop: SCREEN_HEIGHT * 0.02,
        // marginLeft: SCREEN_WIDTH * 0.025,
        padding: 10
    },

    Imagestyle: {
        // marginTop: SCREEN_HEIGHT * 0.002,
        width: SCREEN_WIDTH * 0.057,
        height: SCREEN_HEIGHT * 0.022,
        // marginLeft: SCREEN_WIDTH * 0.03

    },
    BackTextStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        // fontWeight: '400',
        marginLeft: SCREEN_WIDTH * 0.01

    },
    IconStyle: {
        marginLeft: SCREEN_WIDTH * 0.65
    },

    EmailContainer: {
        marginTop: SCREEN_WIDTH * 0.08,
        marginLeft: SCREEN_WIDTH * 0.05,

    },
    EmailTextContainer: {
        fontSize: 16,

    },
    TextinputContainer: {
        marginTop: SCREEN_WIDTH * 0.04,

    },
    modalView: {
        margin: 10,
        backgroundColor: "rgba(255,255,255,1)",
        // justifyContent : "center",
        borderRadius: 20,
        height: SCREEN_HEIGHT * 0.35,
        width: SCREEN_WIDTH * 0.95,
        // padding: 20,
        alignSelf: "center",

        bottom: SCREEN_HEIGHT * 0.05,
        // borderRadius : 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        zIndex: 999
    },
    Flatlistcontainer: {
        marginTop: SCREEN_HEIGHT * 0.5
    },
    Flatlistcontainer: {

        width: SCREEN_WIDTH * 0.999,
        height: SCREEN_HEIGHT * 0.35,
        marginVertical: 17

    },
    UploadContainer: {
        marginTop: SCREEN_HEIGHT * 0.02,
        // marginLeft: SCREEN_WIDTH * 0.05,
        color: Colors.Grey

    },
    UploadingPohtoTextStyle: {
        marginLeft: SCREEN_WIDTH * 0.05,

    },
    UploadTextStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 17,
        // fontWeight: '600',


    },
    TakePictureStyle: {
        fontFamily: FontFamily.medium,
        color: Colors.TextGrey,
        marginVertical: 5,
        fontSize: 13,


    },
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        justifyContent: 'center',
    },
    CameraImageStyle: {
        width: SCREEN_WIDTH * 0.75,
        height: SCREEN_HEIGHT * 0.3,
        alignSelf: 'center',
        marginVertical: SCREEN_HEIGHT * 0.03

    },

    ButtonContainer: {

        marginBottom: SCREEN_HEIGHT * 0.03

    },
    ProfilePhotoContainer: {
        flexDirection: 'column',
        marginLeft: SCREEN_WIDTH * 0.05

    },
    PhotoTextStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        bottom: SCREEN_HEIGHT * 0.01,

    },
    ProfileTextStyle: {
        fontFamily: FontFamily.medium,
        bottom: SCREEN_HEIGHT * 0.01,

        fontSize: 16,
    },
    ProfilePhotoImageContainer: {
        flexDirection: 'column',
        marginHorizontal: SCREEN_WIDTH * 0.2,
        justifyContent: 'space-evenly',
        right: SCREEN_WIDTH * 0.25,
        marginLeft: SCREEN_WIDTH * 0.31,
        alignContent: 'center',
    },



    ProfileImageStyle: {


    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        justifyContent: 'center',
    },

});

