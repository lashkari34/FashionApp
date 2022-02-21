// Splash
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, SafeAreaView, ToastAndroid } from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Feather from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Header } from '../../Component/Header';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import CalendarPicker from 'react-native-calendar-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { navigate } from '../../../RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateBirthDate } from '../../Helper/Services';
import EventBus from 'react-native-event-bus'
import Moment from 'moment';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}



export function BirthdayScreen({ navigation }) {

    const [SelectedDate, SetSelectedDate] = useState(formatDate(new Date()));
    const [UserData, SetUserData] = useState(null);
    const [OnPopUphow, SetOnPopUphow] = useState(false);
    // const [OnPopUpBirth, SetOnPopUpBirth] = useState(true);

    const [accessToekn, setAccessToken] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const [isIconFocused, setisIconFocused] = useState(false)


    const [date, setDate] = useState();

    const onChangeDate = async (value) => {
        console.log('value---50', value)
        var formatebirthDate = Moment(value).format('YYYY-MM-DD')
        setDate(formatebirthDate)
    }

    useEffect(() => {
        readData()
    }, [])

    const readData = async () => {
        try {
            const jsonValue = (await AsyncStorage.getItem('key'))
            await setAccessToken(await AsyncStorage.getItem('token'))

            let parsed = JSON.parse(jsonValue);
            let dob = parsed.dob;
            var formatebirthDate = Moment(dob).format('YYYY-MM-DD')
            setDate(formatebirthDate)
            console.log('Saveddata', 'Successful');
            SetUserData(JSON.parse(jsonValue)._id)
            console.log(JSON.parse(jsonValue)._id)
        } catch {

        }
    }

    async function onSubmit() {
        console.log(date)
        if (!date) {
            ToastAndroid.showWithGravity(
                "Please Select BirthDate",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
        else {
            await UpdateBirthDate(UserData, date, accessToekn).then(async (res) => {
                let response = res;
                console.log(response.data)

                if (response.data.status === 200) {
                    const jsonValue = JSON.stringify(response.data.data)
                    console.log(jsonValue)
                    const temp = JSON.parse.jsonValue;
                    await AsyncStorage.setItem('key', jsonValue);
                    console.log('Saved', 'Successful');
                    EventBus.getInstance().fireEvent("updateData")
                    navigate("User")
                    ToastAndroid.showWithGravity(
                        "Birthday Date updated successfully",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }
                else {
                    ToastAndroid.showWithGravity(
                        response.data.msg,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    );
                }

            })
                .catch(err => {
                    let error = err
                    console.log(error)
                })

        }

    }

    return (
        <View style={styles.container}>

            <View >
                <Header
                    currentObject={navigation}
                    BackTextName={
                        <Text style={{
                            // fontFamily: "montserrat_medium",
                        }}>Birthday</Text>
                    }

                />

            </View>
            <View style={styles.CalendarContainer}>
                <Text style={styles.CalendarTextContainer}>Your Birthday</Text>
            </View>


            <View style={styles.BirthdayTextinputContainer}>
                <TouchableOpacity onPress={() => SetOnPopUphow(!OnPopUphow ,setIsFocused(true),setisIconFocused(true)) }>
                    <View>
                        <View 
                        
                        style={{
                            borderColor: isFocused ? '#FF2B8A' : '#EBEBEB', height: 45,
                            borderRadius: 5,
                            flexDirection: 'row-reverse',
                            justifyContent: 'space-evenly',
                            borderWidth: 2,
                            alignItems: 'center',
                            width: SCREEN_WIDTH * 0.9,
                            flexDirection:'row',
                            padding:10
                        }}>

<Text 
                                style={{ width: SCREEN_WIDTH * 0.7 , alignItems: 'flex-start' }}>
                                {date}
                            </Text>
                          
                            <View>
                            <Icon style={{width: SCREEN_WIDTH * 0.05 , alignItems: 'flex-start'}} name={'calendar-o'} color={isIconFocused ? "#FF2B8A" : "#979797"} size={19} />
                            </View>
                           
                        </View>

                    </View>

                </TouchableOpacity>

            </View>

            {
                OnPopUphow ?
                    <View style={{
                        // borderRadius: 8, borderColor: Colors.Grey,
                        // borderWidth: 1, marginLeft: 17, marginRight: 17, marginTop: 8
                    }}>
                        <CalendarPicker
                            weekdays={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
                            //   borderWidth={400}
                            previousComponent={<Ionicons name="chevron-back-outline" size={22} color={Colors.black} />}
                            nextComponent={<Feather name="chevron-right" size={22} color={Colors.black} />}
                            startFromMonday={true}
                            //   allowRangeSelection={true}
                            date={date} // Initial date from state
                            mode="date" // The enum of date, datetime and time
                            onDateChange={(date) => {
                                onChangeDate(date);
                                // console.log(date)
                            }}
                            todayBackgroundColor="#E5E5E5"
                            selectedDayColor="#FF2B8A"
                            selectedDayTextColor="#FFFFFF"
                            //   selectedStartDate={selectedStartDate}
                            //   selectedEndDate={selectedEndDate}
                            borderColor="red"
                            dayShape='square'
                            // selectedDates={customDatesStyles} 
                            //  SelectedDate={date}
                            textStyle={{ fontSize: 14, color: Colors.black, fontWeight: "700", paddingTop: 10, paddingBottom: 10 }}
                        />

                    </View>
                    :
                    null

            }


            <View style={{ position: "absolute", alignSelf: 'center', bottom: 20 }}>
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
                    buttonTitle="Save" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    ImageContainer: {
        // backgroundColor: '#FBF0EF',
        flexDirection: 'row',
        // marginTop: SCREEN_HEIGHT * 0.02,
        // marginLeft: SCREEN_WIDTH * 0.025,
        padding: 10
    },
    Imagestyle: {
        // width: SCREEN_WIDTH * 0.15,
        // height: SCREEN_HEIGHT * 0.022
        // marginTop: SCREEN_HEIGHT * 0.008,
        width: SCREEN_WIDTH * 0.053,
        height: SCREEN_HEIGHT * 0.022,
        // marginLeft: SCREEN_WIDTH * 0.01

    },

    BackTextStyle: {
        fontFamily: FontFamily.bold,
        // marginTop: SCREEN_HEIGHT * 0.007,
        fontSize: 16,
        // fontWeight: '400',
        marginLeft: SCREEN_WIDTH * 0.01


    },
    BirthdayTextinputContainer: {
        marginTop: SCREEN_WIDTH * 0.03,
        marginLeft: SCREEN_WIDTH * 0.05,
      

    },
    CalendarTextContainer: {
        fontFamily: FontFamily.bold,
        fontSize: 16,
        
        // fontWeight: 'bold',
    },
    CalendarContainer: {
        marginTop: SCREEN_WIDTH * 0.04,
        marginLeft: SCREEN_WIDTH * 0.05
        },
    CalenderStyle: {
        marginTop: SCREEN_HEIGHT * 0.02,

    }
});
