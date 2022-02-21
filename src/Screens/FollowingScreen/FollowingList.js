// Splash
import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView } from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/AntDesign';
import { navigate } from '../../../RootNavigation';
import { Header } from '../../Component/Header';
// import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import { followerList, followingList } from '../../Helper/Services';
import { useSelector } from 'react-redux';
import Loader from '../../Component/Loader';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export function FollowingList( ) {

  const user = useSelector(state => state?.fashion?.userDetails)
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  
  const [followingArray, setfollowingArray] = useState([])
    const [ActiveTab, SetActiveTab] = useState('Friendlist');
    const [isFetching, setisFetching] = useState(true)
    
    React.useEffect(() => {
     fetchFollowingData()
     setTimeout(() => {
         setisFetching(false)
     }, 5000);
    }, [isFocused])

    const fetchFollowingData = async () => {
      followingList(user?._id).then(res => {setfollowingArray(res?.data), setisFetching(false)})
    }

    const Items = ({ title, img, item }) => (
      <TouchableOpacity style={styles.liststyle} onPress={() => navigation.navigate('ProfileClosetScreen', {data: item?.followDetails[0], id: item?.followDetails[0]?._id})} >
          <Image style={styles.Imagescontainer}
              source={{uri: img}} />
          <View style={{
              height: SCREEN_HEIGHT * 0.015, width: SCREEN_WIDTH * 0.03, borderRadius: 20, backgroundColor: item?.followDetails[0]?.active ? Colors.Green : Colors.DarkGrey,
              position: 'absolute', left: SCREEN_WIDTH * 0.12, marginTop: SCREEN_WIDTH * 0.03,borderWidth:2,borderColor:Colors.White
          }}></View>
          <View style={styles.TitleSizeContainer}>
              <Text style={styles.TitleStyle}>{title}</Text>
          </View>
      </TouchableOpacity>
  );

  const render = ({ item, index }) => (
      <Items key={index} title={item?.followDetails[0]?.fullName} img={item?.followDetails[0]?.profilePicture} item={item} />
  );

    return (
        <View style={styles.container}>
        {
            isFetching
                ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Loader/>
            </View>
                :
            <>
            <View >
                <Header
                    onIconPress={() => navigate('SearchFeedScreen')}
                    currentObject={navigation}
                    BackTextName={
                        <Text style={{
                            fontFamily: FontFamily.medium,
                        }}>Elle Fanning</Text>
                    }
                    ImageComponent={
                        <Image style={styles.ProfileStyle}
                            source={require('../../Assets/Images/ProfileImage/Profile.png')}>
                        </Image>
                    }
                    IconComponent={
                        <Icon
                            // style={styles.SearchContainer}
                            name="search1" color={Colors.black} size={18}
                        />
                    }
                />

            </View>
            <View style={{flex: 1}} >
                {
                    followingArray?.length == 0 || followingArray == null   
                        ?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 16, fontFamily: FontFamily.medium }} >You are not following anyone</Text>
                    </View>
                        :
                    <FlatList
                        data={followingArray}
                        renderItem={render}
                        keyExtractor={item => item}
                        showsVerticalScrollIndicator={false}
                    />
                }
            </View>
            </>
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
        // marginTop: SCREEN_HEIGHT * 0.02,
        // marginLeft: SCREEN_WIDTH * 0.025,
        padding: 10,
        alignItems: 'center'
    },
    BackTextStyle: {
        fontFamily: FontFamily.medium,
        // marginTop: SCREEN_HEIGHT * 0.007,
        fontSize: 16,
        // fontWeight: '400',
        marginLeft: SCREEN_WIDTH * 0.01

    },
    LikeTextStyle: {
        fontFamily: FontFamily.medium,
        marginTop: SCREEN_HEIGHT * 0.007,
        fontSize: 16,
        // fontWeight: '400',
        marginLeft: SCREEN_WIDTH * 0.65
    },
    Imagestyle: {
        // marginTop: SCREEN_HEIGHT * 0.008,
        width: SCREEN_WIDTH * 0.055,
        height: SCREEN_HEIGHT * 0.022
    },
    ImageViewStyle: {
        left: SCREEN_WIDTH * 0.47
    },
    ProfileStyle: {
        width: SCREEN_WIDTH * 0.09,
        height: SCREEN_HEIGHT * 0.045,
        borderRadius: 6,
        marginLeft: SCREEN_WIDTH * 0.48,
        right: 10

    },
    SearchImageContainer: {
        left: SCREEN_WIDTH * 0.5,
        // alignSelf: 'center'
    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    item: {
        marginHorizontal: 5,
        marginVertical: 5,
        // backgroundColor: '#fff',
        // borderRadius: 10
    },
    FlatlistImagecontainer: {
        width: SCREEN_WIDTH * 0.14,
        height: SCREEN_HEIGHT * 0.07,
        borderRadius: 100,
        resizeMode: 'contain',

    },
   
    FlatlistTextStyle: {
        // fontFamily: 'montserrat_medium',
        fontSize: 16,
        marginLeft: SCREEN_WIDTH * 0.03
    },
    Flatlistcontainer: {
        marginTop: SCREEN_HEIGHT * 0.01,
        marginLeft: SCREEN_WIDTH * 0.04,
    },
    FriendsContainer: {
        paddingVertical: 20,
        alignContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        backgroundColor: '#E5E5E5',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    FriendTextStyle: {
        fontSize: 16,
        // fontFamily: 'montserrat_medium',
        marginLeft: SCREEN_WIDTH * 0.03

    },
    FollowButtonStyle: {
        // marginLeft: SCREEN_WIDTH * 0.2,
        // alignContent:'center',
        // fontFamily: 'montserrat_bold',
        borderWidth: 1,
        paddingHorizontal: SCREEN_WIDTH * 0.04,
        paddingVertical: SCREEN_HEIGHT * 0.004,
        // width: SCREEN_WIDTH * 0.25,
        // textAlign: 'center',
        backgroundColor: '#FF2B8A',
        color: '#fff',
        borderColor: '#FF2B8A',
        borderRadius: 5,
        right: SCREEN_WIDTH * 0.03

        // marginTop: SCREEN_HEIGHT * 0.03,
        // shadowColor: '#FF2B8A',

        // alignSelf : 'flex-end'

        // position: 'absolute'

    },
    liststyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        flexDirection: 'row',
        // justifyContent: 'space-evenly',
        // flex : 1,
        // marginLeft: SCREEN_WIDTH * 0.04
        alignSelf: 'center',
        width: SCREEN_WIDTH * 0.95,
        paddingVertical: 10
        // marginVertical: 5,
        // paddingBottom: 20

    },
    Imagescontainer: {
        height: SCREEN_HEIGHT * 0.08,
        // resizeMode: 'contain',
        borderRadius: 50,
        width: SCREEN_WIDTH * 0.15,
        backgroundColor: Colors.Grey,
        aspectRatio: 1
        // marginVertical: SCREEN_HEIGHT * 0.01,
        // backgroundColor: '#fff'

    },
    TitleSizeContainer: {

        alignSelf: 'center',
        marginLeft: SCREEN_WIDTH * 0.03,
        // width: SCREEN_WIDTH * 0.4,
        // alignItems: 'flex-start',
        // paddingLeft: SCREEN_WIDTH * 0.02
    },
    TitleStyle: {
        // fontFamily: 'montserrat_medium',
        fontSize: 16,
        fontWeight: '500'
    },

    Flatlist: {
        // flexDirection:'row',
        marginTop: SCREEN_HEIGHT * 0.02,
        // marginLeft: SCREEN_WIDTH * 0.04,
    },

    
});
