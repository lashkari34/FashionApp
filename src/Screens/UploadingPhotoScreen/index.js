import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, FlatList, ActivityIndicator, SafeAreaView, ScrollView, View, TextInput } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import RangeSlider from 'rn-range-slider';
import { Radio } from 'native-base';
import Slider from "react-native-slider";
import { Header } from '../../Component/Header';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventBus from 'react-native-event-bus'
import { AddFeed } from '../../Helper/Services';
import { navigate } from '../../../RootNavigation';
import { AllCategoryListing } from '../../Helper/Services';
import DropDownPicker from 'react-native-dropdown-picker';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import Spinner from 'react-native-loading-spinner-overlay';


export function UploadingPhotoScreen({ route, navigation }) {
    const [ShowGenderOptions, setShowGenderOptions] = useState();
    const [SelectedGender, setSelectedGender] = useState('')
    const [CostumeType, setCostumeType] = useState('outfit')
    const [captionType, setcaptionType] = useState();
    const [CategoryType, setCategoryType] = useState();
    const [BrandType, setBrandType] = useState();
    const [ColorType, setColorType] = useState()
    const [UserData, SetUserData] = useState(null);
    const [accessToekn, setAccessToken] = useState("");
    const [ImageCategory, setImageCategory] = useState([]);
    const [renderImage, SetrenderImage] = useState();
    const [loading, setLoading] = useState(false);
    const [Slidertate, setSlidertate] = useState();
    const [Firstpercentage, setFirstpercentage] = useState(false);
    const [Secondpercentage, setSecondpercentage] = useState(false);
    const [Thirdpercentage, setThirdpercentage] = useState(false);
    const [Forthpercentage, setForthpercentage] = useState(false);
    const [Fifthpercentage, setFifthpercentage] = useState(false);
    const [ActiveTab, SetActiveTab] = useState('');
    const inputbrand = useRef(null);
    const inputcolor = useRef(null);

    //CategoryList
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(false);
    const [dataitem, setdataitem] = useState([]);
    const [SelectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        navigation.addListener('focus', () => {
            readData();
        });
    }, [])

    const readData = async () => {
        try {
            const jsonValue = (await AsyncStorage.getItem('key'))
            const token = (await AsyncStorage.getItem('token'))
            setAccessToken(token)

            console.log('Saveddata', route.params);
            SetUserData(JSON.parse(jsonValue)._id)
            setImageCategory(route.params.ImageCategory);
            console.log('_id', JSON.parse(jsonValue)._id);
            let imageprofile = JSON.parse(jsonValue).profilePicture;
            SetrenderImage(imageprofile)
            getCatagoryList(token);

            if (ImageCategory) {
                setSlidertate(0.20)
                setFirstpercentage(true)
                setSecondpercentage(false)
                setThirdpercentage(false)
                setForthpercentage(false)
                setFifthpercentage(false)
            }

        } catch (e) {
            // error reading value
            // console.log('Done')
        }
    }
    const getCatagoryList = async (accessToekn) => {
        console.log(accessToekn);
        await AllCategoryListing(accessToekn).then(async (res) => {
            let response = res;
            console.log("-------ListCategory--------", response.data.data);
            const dataitems = response.data.data;
            const dataSource1 = dataitems.map((a) => { return { label: a.name, value: a.name } })
            console.log('----Category---------------------------', dataSource1)
            setdataitem(dataSource1)

        })
            .catch(err => {
                let error = err
                console.log(error)
            })
    }
    const Item = (img) => (
        <TouchableOpacity
            style={styles.item}>
            <Image style={styles.FlatlistImagecontainer}
                source={{ uri: img }} />
        </TouchableOpacity>
    );

    const render = ({ item }) => (
        <Items title={item.name} />
    );
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}>

            {item.filePath.split('.').reverse()[0] == 'mp4' ?

                <VideoPlayer
                    video={{ uri: item.filePath }}
                    videoWidth={SCREEN_WIDTH * 0.65}
                    videoHeight={SCREEN_HEIGHT * 0.2}
                // thumbnail={expert}
                // paused
                />
                :
                <Image
                    style={{ height: 80, width: 80, margin: 10, borderRadius: 5 }}
                    source={{ uri: item.filePath }} />
            }

        </TouchableOpacity>
    );


    async function onSubmit() {
        if (!BrandType) {
            ToastAndroid.showWithGravity(
                "Please Enter Brand",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        } else if (!ColorType) {
            ToastAndroid.showWithGravity(
                "Please Enter Color",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
        else {
            console.log('---SelectedItem----', SelectedItem);
            await AddFeed(UserData, captionType, SelectedItem, BrandType, ColorType, ActiveTab, ImageCategory, accessToekn).then(async (res) => {
                let response = res;
                console.log(response.data)
                setLoading(true)
                // await AsyncStorage.setItem('SelectedItem', SelectedItem)
                navigate("ProfileDetails", { SelectedItem: SelectedItem })
                console.log(SelectedItem, 'SelectedItem-----Tab')
                setLoading(false)
                ToastAndroid.showWithGravity(
                    'Feed posted Successfully',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );

            })

        }


    }

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
                        }}>Photos</Text>
                    }
                    ImageComponent={
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                            <Image style={styles.ProfileStyle}
                                source={renderImage !== "None" && renderImage ? { uri: renderImage } : require('../../Assets/Images/ImageHolder/profileholder.jpg')}  >
                            </Image>
                        </TouchableOpacity>

                    }

                />

            </View>
            <ScrollView >
                <SafeAreaView style={styles.Flatlistcontainer}>
                    <FlatList
                        horizontal={true}
                        data={ImageCategory}
                        renderItem={(item, index) => renderItem(item)}
                        keyExtractor={item => item}
                        showsHorizontalScrollIndicator={false}
                    />
                </SafeAreaView>

                <View>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            Firstpercentage ?
                                <Text style={{ marginLeft: 80, position: 'absolute' }}>
                                    20%
                                </Text> : null
                        }
                        {/* {
                            Secondpercentage ?
                                <Text style={{ marginLeft: 135, position: 'absolute' }}>
                                    40%
                                </Text> : null
                        } */}

                        {
                            Thirdpercentage ?
                                <Text style={{ marginLeft: 195, position: 'absolute' }}>
                                    60%
                                </Text>
                                : null
                        }
                        {
                            Forthpercentage ?
                                <Text style={{ marginLeft: 255, position: 'absolute' }}>
                                    80%
                                </Text>
                                : null
                        }
                        {
                            Fifthpercentage ?
                                <Text style={{ marginLeft: 300, position: 'absolute' }}>
                                    100%
                                </Text>
                                : null

                        }


                    </View>
                    <Slider
                        disabled
                        value={Slidertate}
                        onValueChange={(value) => {
                            setSlidertate(value);
                        }}

                        minimumTrackTintColor={Colors.Pink}
                        trackStyle={{
                            paddingVertical: SCREEN_HEIGHT * 0.005,
                            borderRadius: 10,
                            backgroundColor: Colors.LightGrey
                        }}
                        // thumbImage={}
                        style={{ width: SCREEN_WIDTH * 0.9, alignSelf: 'center', marginTop: 10 }}
                        thumbStyle={{
                            backgroundColor: Colors.Pink,
                            borderRadius: 100,
                            borderWidth: 4,
                            borderColor: Colors.White,
                            elevation: 10
                        }}
                    //    debugTouchArea={true}
                    // animateTransitions={true}
                    />

                </View>

                <Text style={styles.ProgressStyle}>Uploading Progress</Text>

                <View style={styles.GenderContainer}>
                    <Text style={styles.DetailsTextStyle}>Details</Text>
                    <TouchableOpacity onPress={() => setShowGenderOptions(!ShowGenderOptions)}>
                        <Text style={styles.GenderTextContainer}>Caption Optional</Text>
                    </TouchableOpacity >
                    <Icon style={{ marginTop: SCREEN_HEIGHT * 0.005, left: 2 }} name={ShowGenderOptions ? "chevron-up" : "chevron-down"} color="#979797" />

                </View>

                {ShowGenderOptions ?
                    <View style={styles.GenderOptionContainer}>
                        <TouchableOpacity style={styles.GenderOption}
                            onPress={() => { setSelectedGender('Male'); setShowGenderOptions(!ShowGenderOptions) }}>
                            <Text style={{
                                marginLeft: SCREEN_WIDTH * 0.05, marginVertical: SCREEN_HEIGHT * 0.02, color: Colors.black, fontFamily: FontFamily.medium,
                            }}>Caption</Text>

                            <CustomTextInput
                                autoCapitalize='none'
                                HideIcon
                                TextInputProps={{
                                    placeholder: "Write Caption",
                                    onChangeText: (text) => setcaptionType(text),
                                    value: captionType,
                                }}
                            />

                        </TouchableOpacity>

                    </View>
                    :
                    null
                }
                <View style={styles.RadioContainer}>
                    <View style={styles.PrivateContainer}>
                        <Radio selected={CostumeType == 'outfit' ? true : false} onPress={() => setCostumeType('outfit')} color={Colors.White} selectedColor={Colors.Pink} color={Colors.Pink} />
                        <Text style={styles.PrivateTextContainer}>Outfit</Text>
                    </View>
                    <View style={styles.PublicContainer}>
                        <Radio selected={CostumeType == 'single item' ? true : false} onPress={() => setCostumeType('single item')} color={Colors.White} selectedColor={Colors.Pink} color={Colors.Pink} />
                        <Text style={styles.PublicTextContainer}>Single Item</Text>
                    </View>

                </View>

                <View style={styles.CategoryContainer}>
                    <Text style={{ marginLeft: SCREEN_WIDTH * 0.05, fontFamily: FontFamily.medium }}>
                        Category
                    </Text>

                    <View style={styles.DropDownstyle}>

                    
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={dataitem}
                            setOpen={setOpen}
                            setValue={setValue}
                            placeholder={"Select a category"}
                            style={{
                                borderWidth: 1,
                                borderColor: "#EBEBEB",
                                borderRadius: 6, fontSize: 30,
                            }}
                            textStyle={{
                                fontSize: 15,
                                textTransform: 'capitalize',
                               
                              }}
                            dropDownContainerStyle={{
                                borderColor: "#EBEBEB",
                            }}
                          
                          
                             
                            // placeholderStyle={{
                            //     color: "grey",
                            //     fontWeight: "bold",
                            //     textTransform: 'capitalize',
                            // }}
                            onChangeValue={(value) => {
                                setSelectedItem(value)
                                // setSlidertate(0.40),
                                // setSecondpercentage(true),
                                // setFirstpercentage(false),
                                // setThirdpercentage(false),
                                // setForthpercentage(false),
                                // setFifthpercentage(false)

                            }}
                            // setValue={
                            //     (value) => {
                            //         setSelectedItem(value)
                                    // setSlidertate(0.40),
                                    //     setSecondpercentage(true),
                                    //     setFirstpercentage(false),
                                    //     setThirdpercentage(false),
                                    //     setForthpercentage(false),
                                    //     setFifthpercentage(false)
                            //     }}

                        />

                        <Text style={styles.CategoryStyle}>
                            Brand
                        </Text>
                        <View style={styles.TextInputContainer}>
                            <CustomTextInput
                                autoCapitalize='none'
                                HideIcon
                                extraStyle={{ marginLeft: 0 }}
                                onSubmitEditing={() => inputbrand.current.focus()}

                                TextInputProps={{
                                    placeholder: "Enter  Brand",
                                    returnKeyType: "next",
                                    onChangeText: (text) => {
                                        setBrandType(text),
                                            setSlidertate(0.60),
                                            setFirstpercentage(false)
                                        setSecondpercentage(false)
                                        setThirdpercentage(true)
                                        setForthpercentage(false)
                                        setFifthpercentage(false)

                                    },

                                    value: BrandType,

                                }}
                            />

                        </View>

                        <Text style={styles.CategoryStyle}>
                            Color
                        </Text>

                        <View style={styles.TextInputContainer}>
                            <CustomTextInput
                                autoCapitalize='none'
                                HideIcon
                                extraStyle={{ marginLeft: 0 }}
                                Input={inputbrand}
                                TextInputProps={{
                                    placeholder: "Enter Color",
                                    returnKeyType: 'done',
                                    onChangeText: (text) => {
                                        setColorType(text),
                                            setSlidertate(0.80)
                                        setFirstpercentage(false)
                                        setSecondpercentage(false)
                                        setThirdpercentage(false)
                                        setForthpercentage(true)
                                        setFifthpercentage(false)
                                    },

                                    value: ColorType,


                                }}
                            />
                        </View>

                        <Text style={styles.CategoryStyle}>
                            Size
                        </Text>

                        <View style={styles.TextInputContainer}>
                            <View style={styles.ProfilePhotoImageContainer}>

                                <TouchableOpacity onPress={() => SetActiveTab('S', setSlidertate(0.99),
                                    setFirstpercentage(false),
                                    setSecondpercentage(false),
                                    setThirdpercentage(false),
                                    setForthpercentage(false),
                                    setFifthpercentage(true))}

                                >
                                    <Text
                                        style={{
                                            borderRadius: 5,
                                            borderWidth: 0.5,
                                            padding: 16,
                                            borderColor: Colors.LightGrey,
                                            backgroundColor: ActiveTab == "S" ? Colors.Pink : Colors.White,
                                            color: ActiveTab == "S" ? Colors.White : Colors.Pink
                                        }}>
                                        S
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => SetActiveTab('M', setSlidertate(0.99), setFifthpercentage(true), setFirstpercentage(false),
                                    setSecondpercentage(false),
                                    setThirdpercentage(false),
                                    setForthpercentage(false),
                                    setFifthpercentage(true))}

                                >
                                    <Text
                                        style={{
                                            borderRadius: 5,
                                            borderWidth: 0.5,
                                            padding: 16,
                                            borderColor: Colors.LightGrey,
                                            backgroundColor: ActiveTab == "M" ? Colors.Pink : Colors.White,
                                            color: ActiveTab == "M" ? Colors.White : Colors.Pink
                                        }}>
                                        M
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => SetActiveTab('L', setSlidertate(0.99), setFifthpercentage(true), setFirstpercentage(false),
                                    setSecondpercentage(false),
                                    setThirdpercentage(false),
                                    setForthpercentage(false),
                                    setFifthpercentage(true))}

                                >
                                    <Text
                                        style={{
                                            borderRadius: 5,
                                            borderWidth: 0.5,
                                            padding: 16,
                                            borderColor: Colors.LightGrey,
                                            backgroundColor: ActiveTab == "L" ? Colors.Pink : Colors.White,
                                            color: ActiveTab == "L" ? Colors.White : Colors.Pink
                                        }}>
                                        L
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => SetActiveTab('XL', setSlidertate(0.99), setFifthpercentage(true), setFirstpercentage(false),
                                    setSecondpercentage(false),
                                    setThirdpercentage(false),
                                    setForthpercentage(false),
                                    setFifthpercentage(true))}

                                >
                                    <Text
                                        style={{
                                            borderRadius: 5,
                                            borderWidth: 0.5,
                                            padding: 16,
                                            borderColor: Colors.LightGrey,
                                            backgroundColor: ActiveTab == "XL" ? Colors.Pink : Colors.White,
                                            color: ActiveTab == "XL" ? Colors.White : Colors.Pink
                                        }}>
                                        XL
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => SetActiveTab('XXL', setSlidertate(0.99), setFifthpercentage(true), setFirstpercentage(false),
                                    setSecondpercentage(false),
                                    setThirdpercentage(false),
                                    setForthpercentage(false),
                                    setFifthpercentage(true))}

                                >
                                    <Text
                                        style={{
                                            borderRadius: 5,
                                            borderWidth: 0.5,
                                            padding: 16,
                                            borderColor: Colors.LightGrey,
                                            backgroundColor: ActiveTab == "XXL" ? Colors.Pink : Colors.White,
                                            color: ActiveTab == "XXL" ? Colors.White : Colors.Pink
                                        }}>
                                        XXL
                                    </Text>
                                </TouchableOpacity>



                            </View>
                        </View>
                    </View>
                </View>


                <LoginButton
                    onSubmitPress={onSubmit}

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
                    buttonTitle="Continue" />



            </ScrollView>

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
        // marginTop: SCREEN_HEIGHT * 0.02,
        // marginLeft: SCREEN_WIDTH * 0.025,
        padding: 10
    },
    ProfileImageStyle: {
    },
    ImageView: {
        marginLeft: SCREEN_WIDTH * 0.63
    },
    Imagestyle: {
        width: SCREEN_WIDTH * 0.1,
        height: SCREEN_HEIGHT * 0.05,
        borderRadius: 6

    },
    TextInputContainer: {
        marginTop: SCREEN_HEIGHT * 0.02,
        marginLeft: -SCREEN_WIDTH * 0.05,

    },
    SliderImageStyle: {
        width: SCREEN_WIDTH * 0.06,
        height: SCREEN_HEIGHT * 0.032,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: Colors.White,
        left: SCREEN_WIDTH * 0.03,
        // right:SCREEN_WIDTH*0.03
    },

    BackTextStyle: {
        fontFamily: FontFamily.medium,

        marginTop: SCREEN_HEIGHT * 0.007,
        fontSize: 16,
        // fontWeight: '400',
        marginLeft: SCREEN_WIDTH * 0.01
    },
    DropDownstyle: {
        marginLeft: SCREEN_WIDTH * 0.05,
        marginRight: SCREEN_WIDTH * 0.05,
        marginTop: SCREEN_HEIGHT * 0.02

    },
    item: {
        marginHorizontal: 3,
        // marginVertical: 5,
        borderRadius: 15
    },
    FlatlistImagecontainer: {
        width: SCREEN_WIDTH * 0.2,
        height: SCREEN_HEIGHT * 0.1,
        resizeMode: 'center',
        elevation: 10
    },
    TitleSizeContainer: {
        alignItems: 'flex-start',
        paddingLeft: SCREEN_WIDTH * 0.02
    },
    TitleStyle: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    Flatlistcontainer: {
        marginTop: SCREEN_HEIGHT * 0.02,
        marginLeft: SCREEN_WIDTH * 0.02,
    },
    ProgressStyle: {
        fontFamily: FontFamily.medium,
        marginVertical: SCREEN_HEIGHT * 0.01,
        color: Colors.TextGrey,
        marginLeft: SCREEN_WIDTH * 0.05
    },
    DetailsTextStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 20,
        // marginLeft: SCREEN_WIDTH * 0.03
    },
    ProfileStyle: {
        width: SCREEN_WIDTH * 0.09,
        height: SCREEN_HEIGHT * 0.045,
        borderRadius: 6,
        marginLeft: SCREEN_WIDTH * 0.6


    },
    DetailsContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    CaptionStyle: {
        fontFamily: FontFamily.medium,
        color: Colors.TextGrey,

        marginLeft: SCREEN_WIDTH * 0.5

    },
    RadioContainer: {
        flexDirection: 'row',
        marginVertical: SCREEN_HEIGHT * 0.02

    },
    PrivateContainer: {
        marginLeft: SCREEN_WIDTH * 0.05,
        flexDirection: 'row',

    },
    PublicContainer: {
        marginLeft: SCREEN_WIDTH * 0.2,
        flexDirection: 'row'
    },
    PrivateTextContainer: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        // fontWeight: 'bold'
    },
    PublicTextContainer: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        // fontWeight: 'bold'
    },
    CategoryContainer: {
        marginVertical: SCREEN_HEIGHT * 0.02
    },
    CategoryStyle: {
        fontFamily: FontFamily.medium,
        marginTop: SCREEN_WIDTH * 0.05
    },
    SelectCategoryStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: SCREEN_HEIGHT * 0.005,
        borderWidth: 1,
        paddingVertical: 13,
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center',
        borderColor: Colors.TextGrey,
        borderRadius: 5
    },
    ProfilePhotoImageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',

    },
    SelectCategoryTextStyle: {
        color: Colors.TextGrey,
        left: SCREEN_WIDTH * 0.02
    },
    GenderContainer: {
        flexDirection: 'row',
        marginTop: SCREEN_HEIGHT * 0.03,
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center'

    },
    GenderTextContainer: {
        fontFamily: FontFamily.medium,
        color: Colors.DarkGrey,
        marginLeft: SCREEN_WIDTH * 0.35
    },
    GenderOptionContainer: {
        // borderWidth: 1,
        width: SCREEN_WIDTH * 0.9,
        // alignSelf: 'center',
        // padding: 10,
        marginTop: SCREEN_HEIGHT * 0.01,

    },
    GenderOption: {
        // padding: SCREEN_WIDTH * 0.01
    },
    OptionText: {
        color: Colors.DarkGrey
    },
    SelectedGenderText: {
        color: Colors.Pink
    },
    RangeSliderContainer: {
        marginVertical: SCREEN_HEIGHT * 0.02
    }
});
