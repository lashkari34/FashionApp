import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from '../../Component/Header';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import { navigate } from '../../../RootNavigation';
import EventBus from 'react-native-event-bus'
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { UploadProfilePictures } from '../../Helper/Services';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import Moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';

export function ProfileScreen({ navigation }) {
    const [UserFullName, SetUserFullName] = useState(null);
    const [UserEmail, SetUserEmail] = useState(null);
    const [UserGender, SetUserGender] = useState(null);
    const [UserPhoneNumber, SetUserPhoneNumber] = useState(null);
    const [UserPhoneNumberCountry, SetUserPhoneNumberCountry] = useState(null);
    const [UserProfileType, SetUserProfileType] = useState(null);
    const [UserChangePassword, SetUserChangePassword] = useState(null);
    const [UserBirthDate, SetUserBirthDate] = useState(null);
    const [userpasswordencrept, setuserpasswordencrept] = useState(null);
    const [UserData, SetUserData] = useState(null);
    const [renderImage, SetrenderImage] = useState();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [Profileimagedialog, setProfileimagedialog] = useState(false)
    const [Profileimagedialoglogout, setProfileimagedialoglogout] = useState(true)

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleDelete = () => {
        setVisible(false);
    };
    const UploadClothing = () => {
        setVisible(false);
        setVisible(false);
        setProfileimagedialog(false)
        setProfileimagedialoglogout(true)
        ImagePicker.openPicker({
            width: 300,
            height: 400,
        }).then(async (image) => {
            console.log(image);
            setLoading(true);
            UploadProfilePictures(UserData, image).then(async (res) => {
                setLoading(true);
                let response = res;
                console.log(response)
                AsyncStorage.setItem('key', (JSON.stringify(response.data)))
                EventBus.getInstance().fireEvent("updateData")
                setLoading(false);
                setProfileimagedialog(false)
                setProfileimagedialoglogout(true)
                Toast.show({
                    text1: 'Profile image uploaded successfully.'
                })
            })
                .catch(err => {
                    let error = err
                    console.log(error)
                })


        }).catch(err => {
            alert(err)
        });

    }
    const UploadClothingCamera = () => {
        setVisible(false);
        setProfileimagedialog(false)
        setProfileimagedialoglogout(true)
        ImagePicker.openCamera({
            width: 300,
            height: 400,
        }).then(async (image) => {
            console.log(image);
            UploadProfilePictures(UserData, image).then(async (res) => {
                let response = res;
                console.log(response)
                AsyncStorage.setItem('key', (JSON.stringify(response.data)))
                EventBus.getInstance().fireEvent("updateData")
                setProfileimagedialog(false)
                setProfileimagedialoglogout(true)
                Toast.show({
                    text1: 'Profile image uploaded successfully.'
                })

            })
                .catch(err => {
                    let error = err
                    console.log(error)
                })


        }).catch(err => {
            alert(err)
        });

    }

    useEffect(() => {

        readData()
        EventBus.getInstance().addListener("updateData", (listener) => {
            // handle the event
            readData()
        })

    }, [])

    const readData = async () => {
        try {
            const jsonValue = (await AsyncStorage.getItem('key'))
            let id = JSON.parse(jsonValue)._id;
            console.log('Saveddata', id);
            SetUserData(JSON.parse(jsonValue)._id)
            console.log(jsonValue);

            var FirstName = JSON.parse(jsonValue).firstName;
            var LastName = JSON.parse(jsonValue).lastName;
            var FirstLastName = FirstName.concat(" ", LastName);
            SetUserFullName(FirstLastName)

            SetUserEmail(JSON.parse(jsonValue).email)
            SetUserGender(JSON.parse(jsonValue).gender)
            SetUserPhoneNumber(JSON.parse(jsonValue).phoneNumber)
            SetUserProfileType(JSON.parse(jsonValue).profileType)

            let imageprofile = JSON.parse(jsonValue).profilePicture;
            console.log(imageprofile, 'mvmpmfdmvmfdmv')

            SetrenderImage(imageprofile)
            var BirthDate = JSON.parse(jsonValue).dob;
            var formatebirthDate = Moment(BirthDate).format('DD-MM-YYYY')
            SetUserBirthDate(formatebirthDate)

        } catch (e) {

        }
    }
    const profileclick = async () => {
        setProfileimagedialog(true)
        setProfileimagedialoglogout(true)


    }

    const cancelclick = async () => {
        setProfileimagedialog(false)
        setProfileimagedialoglogout(true)
    }

    async function logout() {
        try {
            await AsyncStorage.removeItem('key');
            await AsyncStorage.removeItem('token');
            navigate("LoginScreen")
            Toast.show({
                text1: 'Logged out successfully'
            })
            console.log('Done')
            return true;
        }
        catch (exception) {
            return false;
        }
    };

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

            <View >
                <Header
                    currentObject={navigation}
                    BackTextName={
                        <Text style={{
                            fontFamily: FontFamily.medium,
                        }}>Profile</Text>
                    }

                />

            </View>
            <View style={styles.ProfileContainer}>

                <TouchableOpacity onPress={profileclick}>

                    <View>
                        <Image style={styles.ProfileImage}
                            source={renderImage !== "None" && renderImage ? { uri: renderImage } : require('../../Assets/Images/ImageHolder/profileholder.jpg')}

                        />
                        <Feather style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            color: Colors.Pink,
                        }} name="edit" color={Colors.black} size={20}></Feather>
                    </View>
                </TouchableOpacity>

                <View style={{ width: ScreenWidth * 0.69, alignSelf: 'flex-start' }}>
                    <Text style={styles.ProfileTextConatiner}>{UserFullName !== null ? UserFullName : ""}</Text>

                    <Text style={styles.UserNameContainer}>{UserEmail !== null ? UserEmail : ""}</Text>

                </View>

                <TouchableOpacity onPress={() => navigation.navigate('NameScreen')}>
                    <Image style={styles.EditButtonContainer}
                        source={require('../../Assets/Images/EditButtonImage/editButton.png')}>
                    </Image>
                </TouchableOpacity>
            </View>
            <View style={{marginLeft:SCREEN_WIDTH*0.05}}>

                <TouchableOpacity onPress={() => navigation.navigate('GenderScreen')}>
                    <View style={styles.GenderContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.GenderImage}
                                source={require('../../Assets/Images/GenderImage/Gender.png')}>
                            </Image>
                            <Text style={styles.GenderText}>Gender</Text>
                        </View>
                        <Text style={styles.GenderName}>{UserGender !== "None" && UserGender ? UserGender : ""}</Text>
                        <Image style={styles.GenderButton}
                            source={require('../../Assets/Images/NextButton/NextButton.png')}>
                        </Image>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('BirthdayScreen')}>
                    <View style={styles.BirthdayContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.BirthdayImage}
                                source={require('../../Assets/Images/BirthdayCalender/BirthdayCalender.png')}>
                            </Image>

                            <Text style={styles.BirthdayText}>BirthDay</Text>
                        </View>
                        <Text style={styles.BirthdayName}>{UserBirthDate !== null ? UserBirthDate : ""}</Text>
                        <Image style={styles.BirthdayButton}
                            source={require('../../Assets/Images/NextButton/NextButton.png')}>
                        </Image>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('EmailScreen')}
                >
                    <View style={styles.EmailContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.EmailImage}
                                source={require('../../Assets/Images/MailImage/MailImage.png')}>
                            </Image>

                            <Text style={styles.EmailText}>Email</Text>

                        </View>

                        <Text style={styles.EmailName}>{UserEmail !== null ? UserEmail : ""}</Text>

                        <Image style={styles.EmailButton}
                            source={require('../../Assets/Images/NextButton/NextButton.png')}>
                        </Image>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('PhoneScreen')}>
                    <View style={styles.PhoneContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.PhoneImage}
                                source={require('../../Assets/Images/PhoneImage/Phone.png')}>
                            </Image>

                            <Text style={styles.PhoneText}>Phone</Text>

                        </View>

                        <Text style={styles.PhoneName}>{UserPhoneNumber !== null ? UserPhoneNumber : ""}</Text>

                        <Image style={styles.PhoneButton}
                            source={require('../../Assets/Images/NextButton/NextButton.png')}>
                        </Image>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ChangePasswordScreen')}>
                    <View style={styles.PasswordContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.PasswordImage}
                                source={require('../../Assets/Images/PasswordImage/Password.png')}>
                            </Image>

                            <Text style={styles.PasswordText}>Password</Text>

                        </View>

                        <Text style={styles.PasswordName}>...........</Text>

                        <Image style={styles.PasswordButton}
                            source={require('../../Assets/Images/NextButton/NextButton.png')}>
                        </Image>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ProfileTypeScreen')}>
                    <View style={styles.ProfileTypeContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.ProfileTypeImage}
                                source={require('../../Assets/Images/ProfileTypeImage/ProfileType.png')}>
                            </Image>

                            <Text style={styles.ProfileTypeText}>Profile Type</Text>
                        </View>

                        <Text style={styles.ProfileTypeName}>{UserProfileType !== null ? UserProfileType : ""}</Text>

                        <Image style={styles.ProfileTypeButton}
                            source={require('../../Assets/Images/NextButton/NextButton.png')}>
                        </Image>
                    </View>
                </TouchableOpacity>
            </View>

            

            {
                Profileimagedialoglogout ?
                    <View style={{ position: "absolute", alignSelf: 'center', bottom: 95 }}>
                        <LoginButton
                            onSubmitPress={logout}
                            ButtonTextStyle={{
                                color: Colors.White, fontSize: 16, fontFamily: FontFamily.bold,
                            }}
                            ButtonStyle={{
                                backgroundColor: Colors.Pink,
                                width: SCREEN_WIDTH * 0.9,
                                height: SCREEN_HEIGHT * 0.07,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 5,
                                elevation: 10,

                            }}
                            buttonTitle="Log Out" />
                    </View>
                    : null

            }
{
                Profileimagedialog ?
                    <View style={styles.modalView}>
                        <View style={{ height: SCREEN_HEIGHT * 0.1, alignSelf: 'center', justifyContent: 'center' }}>
                            <Text>
                                Upload Image
                            </Text>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: SCREEN_WIDTH * 0.9, alignSelf: 'center', height: SCREEN_HEIGHT * 0.17, alignItems: 'center', borderBottomWidth: 0.2, }}>
                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={UploadClothingCamera} >
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
                    null
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },
    ImageContainer: {
        backgroundColor: Colors.lightPink,
        flexDirection: 'row',
        padding: 10
    },
    Imagestyle: {
        width: SCREEN_WIDTH * 0.055,
        height: SCREEN_HEIGHT * 0.022,

    },
    BackTextStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        marginLeft: SCREEN_WIDTH * 0.01


    },
    SearchContainer: {
        marginLeft: SCREEN_WIDTH * 0.75
    },
    ProfileContainer: {
        marginTop: SCREEN_HEIGHT * 0.02,
        flexDirection: 'row',
        marginLeft: SCREEN_WIDTH * 0.04,
        marginRight: SCREEN_WIDTH * 0.02

    },
    ProfileImage: {
        borderRadius: 4,
        width: SCREEN_WIDTH * 0.2,
        height: SCREEN_HEIGHT * 0.1,
    },
    ProfileTextConatiner: {
        fontFamily: FontFamily.medium,
        marginLeft: SCREEN_WIDTH * 0.025,
        marginRight: SCREEN_WIDTH * 0.001,
        fontSize: 18,
        marginTop: SCREEN_HEIGHT * 0.015,
    },
    EditButtonContainer: {
    },
    UserNameContainer: {
        fontFamily: FontFamily.medium,
        marginLeft: SCREEN_WIDTH * 0.03,
        fontSize: 12,
        marginTop: SCREEN_HEIGHT * 0.068,
        position: 'absolute',
        color: Colors.DarkGrey
    },
    GenderContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        marginTop: SCREEN_HEIGHT * 0.05,
        justifyContent: 'space-between',

    },
    GenderImage: {
    },
    GenderText: {
        position: 'absolute',
        fontFamily: FontFamily.medium,
        justifyContent: 'flex-start',
        marginLeft: SCREEN_WIDTH * 0.098,
        fontSize: 16,
    },
    GenderName: {
        position: 'absolute',
        right: SCREEN_WIDTH * 0.13,
        fontFamily: FontFamily.medium,
        fontSize: 16,
        color: Colors.DarkGrey
    },
    GenderButton: {
        position: 'absolute',
        justifyContent: 'flex-end',
        right: SCREEN_WIDTH * 0.04
    },
    BirthdayContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        marginTop: SCREEN_HEIGHT * 0.05,
        justifyContent: 'space-between',
    },
    BirthdayImage: {
        marginLeft: SCREEN_WIDTH * 0.01
    },
    BirthdayText: {
        position: 'absolute',
        fontFamily: FontFamily.medium,
        justifyContent: 'flex-start',
        fontSize: 16,
        marginLeft: SCREEN_WIDTH * 0.098,
    },
    BirthdayName: {
        position: 'absolute',
        right: SCREEN_WIDTH * 0.13,
        fontFamily: FontFamily.medium,
        fontSize: 16,
        color: Colors.DarkGrey
    },
    BirthdayButton: {
        position: 'absolute',
        justifyContent: 'flex-end',
        right: SCREEN_WIDTH * 0.04

    },
    EmailContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        marginTop: SCREEN_HEIGHT * 0.05,
        justifyContent: 'space-between',
    },
    EmailImage: {
        // marginLeft: SCREEN_WIDTH * 0.02,
        marginTop: SCREEN_HEIGHT * 0.001,
        marginLeft: SCREEN_WIDTH * 0.01

    },
    EmailText: {
        position: 'absolute',
        fontFamily: FontFamily.medium,
        justifyContent: 'flex-start',
        fontSize: 16,
        marginLeft: SCREEN_WIDTH * 0.098,
    },
    EmailName: {
        position: 'absolute',
        right: SCREEN_WIDTH * 0.13,
        // justifyContent:'flex-end',
        // left:SCREEN_WIDTH*0.1,
        fontFamily: FontFamily.medium,
        // marginLeft: SCREEN_WIDTH * 0.45,
        fontSize: 16,
        // fontWeight: '600',
        color: Colors.DarkGrey
    },
    EmailButton: {
        position: 'absolute',
        justifyContent: 'flex-end',
        right: SCREEN_WIDTH * 0.04
    },
    PhoneContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        marginTop: SCREEN_HEIGHT * 0.05,
        justifyContent: 'space-between',

    },
    PhoneImage: {
    },
    PhoneText: {
        position: 'absolute',
        fontFamily: FontFamily.medium,
        justifyContent: 'flex-start',
        marginLeft: SCREEN_WIDTH * 0.098,
        fontSize: 16,
    },
    PhoneName: {
        position: 'absolute',
        right: SCREEN_WIDTH * 0.13,
        fontFamily: FontFamily.medium,
        fontSize: 16,
        color: Colors.DarkGrey
    },
    PhoneButton: {
        position: 'absolute',
        justifyContent: 'flex-end',
        right: SCREEN_WIDTH * 0.04

    },
    PasswordContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        marginTop: SCREEN_HEIGHT * 0.05,
        justifyContent: 'space-between',
    },
    PasswordImage: {
        marginLeft: SCREEN_WIDTH * 0.01

    },
    PasswordText: {
        position: 'absolute',
        fontFamily: FontFamily.medium,
        justifyContent: 'flex-start',
        marginLeft: SCREEN_WIDTH * 0.098,
        fontSize: 16,
    },
    PasswordName: {
        position: 'absolute',
        right: SCREEN_WIDTH * 0.13,
        fontFamily: FontFamily.medium,
        fontSize: 16,
        color: Colors.DarkGrey
    },
    PasswordButton: {
        position: 'absolute',
        justifyContent: 'flex-end',
        right: SCREEN_WIDTH * 0.04

    },
    ProfileTypeContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        marginTop: SCREEN_HEIGHT * 0.05,
        justifyContent: 'space-between',
    },
    ProfileTypeImage: {
        marginLeft: SCREEN_WIDTH * 0.01
    },
    ProfileTypeText: {
        position: 'absolute',
        fontFamily: FontFamily.medium,
        justifyContent: 'flex-start',
        marginLeft: SCREEN_WIDTH * 0.098,
                fontSize: 16,
    },
    ProfileTypeName: {
        position: 'absolute',
        right: SCREEN_WIDTH * 0.13,
        fontFamily: FontFamily.medium,
        fontSize: 16,
        color: Colors.DarkGrey,
    },
    ProfileTypeButton: {
        position: 'absolute',
        justifyContent: 'flex-end',
        right: SCREEN_WIDTH * 0.04

    },

    modalView: {
        margin: 10,
        backgroundColor: Colors.White,
        borderRadius: 20,
        height: SCREEN_HEIGHT * 0.35,
        width: SCREEN_WIDTH * 0.95,
        alignSelf: "center",
        bottom: SCREEN_HEIGHT * 0.35,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
    },

});
