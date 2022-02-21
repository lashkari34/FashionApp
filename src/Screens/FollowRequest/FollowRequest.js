// Splash
import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView } from "react-native"
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { navigate } from '../../../RootNavigation';
import { Header } from '../../Component/Header';
// import { CustomTextInput } from '../../Component/CutomTextInput';
import { LoginButton } from '../../Component/LoginButton';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Helper/DeviceDimensions';
import Modal from 'react-native-modal'
import { Colors } from '../../Helper/Colors.js/index'
import { FontFamily } from '../../Helper/FontFamily/index'
import { acceptRejectService, followRequestListService } from '../../Helper/Services';
import { useSelector } from 'react-redux';
import Loader from '../../Component/Loader';
import Toast from 'react-native-toast-message';

export default function FollowRequest({ navigation }) {

  const user = useSelector(state => state?.fashion?.userDetails)
  const token = useSelector(state => state?.fashion?.userToken)
  const [ActiveTab, SetActiveTab] = useState('Friendlist');
  const [followingArray, setfollowingArray] = useState([])
  const [isFetching, setisFetching] = useState(true)
  const [modalData, setmodalData] = useState('')
  const [modalVisible, setmodalVisible] = useState(false)
  const [followFlag, setfollowFlag] = useState(Boolean)
  const [userName, setuserName] = useState('')
    
  
    React.useEffect(() => {
     fetchRequestData()
    }, [])

    const fetchRequestData = async () => {
      followRequestListService(user?._id, token).then(res => filterViewedRequest(res?.res))
    }

    const filterViewedRequest = list => {
      let finalList = []
      list?.map(item => {
        item?.is_Viewed
          ?
        null
          :
        finalList.push(item)
      })
      
      setfollowingArray(finalList)
      setisFetching(false)
    }

    const AcceptReject = ({text, iconName, onPress, extraStyle}) => (
      <TouchableOpacity 
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 14 }} 
        onPress={onPress}
        >
        <View style={[{ height: '34%', aspectRatio: 1, borderRadius: 100 }, extraStyle]} >
          <Entypo
            name={iconName}
            style={{ justifyContent: 'center', alignSelf: 'center', marginTop: '24%'}}
            size={14}
            color={Colors.White}
            />
        </View>
        <Text style={[styles.acceptRejectStyle, {marginTop: 2}]}>{text}</Text>
      </TouchableOpacity>
    )

    const acceptRejectRequest = (id, bool) => {
      acceptRejectService(id, bool).then(res => {Toast.show({
        text1: res?.msg
      })
      fetchRequestData()}
      )
    }

    const Items = ({ title, img, item }) => (
      <View style={styles.liststyle}>
          <Image style={styles.Imagescontainer}
              source={img} />
          <View style={{
              height: SCREEN_HEIGHT * 0.015, width: SCREEN_WIDTH * 0.03, borderRadius: 20, backgroundColor: item?.senderUserData[0]?.active ? Colors.Green : Colors.DarkGrey,
              position: 'absolute', left: SCREEN_WIDTH * 0.12, marginTop: SCREEN_WIDTH * 0.03,borderWidth:2,borderColor:Colors.White
          }}></View>
          <View style={styles.TitleSizeContainer}>
              <Text style={styles.TitleStyle}>{title}</Text>
          </View>
          <View style={styles.acceptRejectBox}>
            <AcceptReject 
              text={'Accept'} 
              iconName={'check'} 
              extraStyle={{ backgroundColor: Colors.accept }} 
              onPress={() => {setmodalData(item), setfollowFlag(true), setuserName(item?.senderUserData[0]?.firstName+' '+item?.senderUserData[0]?.lastName), setmodalVisible(true)}}
              />
            <AcceptReject 
              text={'Reject'} 
              iconName={'cross'} 
              extraStyle={{ backgroundColor: Colors.reject }} 
              onPress={() => {setmodalData(item), setfollowFlag(false), setuserName(item?.senderUserData[0]?.firstName+' '+item?.senderUserData[0]?.lastName),setmodalVisible(true)}}
              />
          </View>
      </View>
  );

  const render = ({ item, index }) => (
    <Items key={index} title={item?.senderUserData[0]?.firstName+' '+item?.senderUserData[0]?.lastName } img={item?.senderUserData[0]?.profilePicture} item={item} /> 
  );

    return (
        <View style={styles.container}>


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
                isFetching
                  ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                  <Loader/>
                </View>
                  :
                  followingArray?.length == 0 || followingArray == null
                    ?
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontSize: 16, fontFamily: FontFamily.medium }} >You have no requests for now</Text>
                  </View> 
                    :
                  <FlatList
                    data={followingArray}
                    renderItem={render}
                    keyExtractor={item => item?._id}
                    showsVerticalScrollIndicator={false}
                    />
              }

              <Modal 
                isVisible={modalVisible}
                >
                <View style={styles.modalDesign} > 
                  <View style={{}} >
                    {
                      followFlag
                        ?
                      <Text style={{ fontFamily: FontFamily.light, fontSize: 16 }} >
                        Are you Sure to Accept <Text style={{ fontFamily: FontFamily.bold }} >{userName}</Text> Request?
                      </Text>
                        :
                      <Text style={{ fontFamily: FontFamily.light, fontSize: 16 }} >
                        Are you Sure to Reject <Text style={{ fontFamily: FontFamily.bold }} >{userName}</Text> Request?
                      </Text>
                    }
                    <View style={{ marginTop: '5%', flexDirection: 'row', justifyContent: 'center' }} >
                      <TouchableOpacity 
                        style={[styles.yesNoBtn, {backgroundColor: Colors.Pink}]} 
                        onPress={() => {acceptRejectRequest(modalData?._id, followFlag), setmodalVisible(false)}}
                        >
                        <Text style={{ fontSize: 18, fontFamily: FontFamily.bold, color: Colors.White }} >Yes</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.yesNoBtn, {backgroundColor: Colors.accept, marginLeft: 12}]} 
                        onPress={() => {setmodalVisible(false)}}
                        >
                        <Text style={{ fontSize: 18, fontFamily: FontFamily.bold, color: Colors.White }} >No</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    ImageContainer: {
        backgroundColor: Colors.lightPink,
        flexDirection: 'row',
        // marginTop: SCREEN_HEIGHT * 0.02,
        // marginLeft: SCREEN_WIDTH * 0.025,
        padding: 10,
        alignItems: 'center'
    },

    yesNoBtn: { 
      height: 30, 
      width: 80, 
      justifyContent: 'center',
      alignItems: 'center', 
      borderRadius: 6
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
        // marginVertical: SCREEN_HEIGHT * 0.01,
        backgroundColor: 'grey',
        aspectRatio: 1

    },
    TitleSizeContainer: {

        alignSelf: 'center',
        marginLeft: SCREEN_WIDTH * 0.03,
        // width: SCREEN_WIDTH * 0.4,
        // alignItems: 'flex-start',
        // paddingLeft: SCREEN_WIDTH * 0.02
    },
    TitleStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 16,
        fontWeight: '500'
    },

    acceptRejectStyle: {
        fontFamily: FontFamily.medium,
        fontSize: 12,
        fontWeight: '500',
        opacity: 0.8
    },

    Flatlist: {
        // flexDirection:'row',
        marginTop: SCREEN_HEIGHT * 0.02,
        // marginLeft: SCREEN_WIDTH * 0.04,
    },

    acceptRejectBox: { 
      justifyContent: 'center', 
      position: 'absolute', 
      height: '134%', 
      flexDirection: 'row',
      right: 10,
    },

    modalDesign: { 
      height: '16%', 
      backgroundColor: Colors.lightPink,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    }
    
});
