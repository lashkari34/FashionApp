import * as React from 'react';
// import './'
import { View, Text, AppState } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Splash } from './src/Screens/Splash/index';
import { enableScreens } from 'react-native-screens';
import { LoginScreen } from './src/Screens/LoginScreen';
import { RegisterScreen } from './src/Screens/RegisterScreen';
import { ProfileClosetScreen } from './src/Screens/ProfileClosetScreen';
import { FeedScreen } from './src/Screens/FeedScreen';
import { SearchScreen } from './src/Screens/SearchScreen';
import TabNavigator from './src/TabNavigator/TabNavigator';
import { ProfileScreen } from './src/Screens/ProfileScreen';
import { EmailScreen } from './src/Screens/EmailScreen';
import { BirthdayScreen } from './src/Screens/BirthdayScreen';
import { PhoneScreen } from './src/Screens/PhoneScreen';
import { ChangePasswordScreen } from './src/Screens/ChangePasswordScreen';
import { NameScreen } from './src/Screens/NameScreen';
import { GenderScreen } from './src/Screens/GenderScreen';
import { ProfileTypeScreen } from './src/Screens/ProfileTypeScreen';
import { LikeScreen } from './src/Screens/LikeScreen';
import { UploadScreen } from './src/Screens/UploadScreen';
import { PhotoScreen } from './src/Screens/PhotoScreen';
import IntroScreen from './src/Screens/IntroScreen';
import { UploadingPhotoScreen } from './src/Screens/UploadingPhotoScreen';
import { UploadingProfilePhoto } from './src/Screens/UploadingProfilePhoto';
import { FriendListScreen } from './src/Screens/FriendListScreen';
import { ChatScreen } from './src/Screens/ChatScreen';
import { UserWallScreen } from './src/Screens/UserWallScreen';
import { SearchFeedScreen } from './src/Screens/SearchFeedScreen';
import FriendRequestScreen from './src/Screens/FriendRequestScreen';
import ChatSettingScreen from './src/Screens/ChatSettingScreen';
import ChatSettingBlockScreen from './src/Screens/ChatSettingBlockScreen';
import SearchPeopleScreen from './src/Screens/SearchPeopleScreen';
import UsersCommentScreen from './src/Screens/UsersCommentScreen';
import NotificationScreen from './src/Screens/NotificationScreen';
import { UserWallCommentsScreen } from './src/Screens/UserWallCommentsScreen';
import CommonNotificationScreen from './src/Screens/CommonNotificationScreen';
import NewFriendScreen from './src/Screens/NewFriendScreen';
import { navigationRef } from './RootNavigation.js';
import { ProfileCloset } from './src/Screens/ProfileCloset';
import { ProfileDetails } from './src/Screens/ProfileDeatils';
import { ForgotPasswordScreen } from './src/Screens/ForgotPasswordScreen';
import { SafeAreaView } from 'react-native';
import { FollowingList } from './src/Screens/FollowingScreen/FollowingList';
import { AccountVerification } from './src/Screens/AccountVerification'
import FollowRequest from './src/Screens/FollowRequest/FollowRequest'
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { saveFCMToken } from './src/redux/actions/action';
import { UserFeedScreen } from './src/Screens/UserFeedScreen';
enableScreens()
const Stack = createStackNavigator();

export default function App() {

  const toastConfig = {
    success: ({ text1, props, ...rest }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'pink', marginTop: 20 }}>
        <Text>{text1}</Text>
        <Text>{props.guid}</Text>
      </View>
    ),
    error: () => { },
    info: () => { },
    any_custom_type: () => { }
  };

  const dispatch = useDispatch()

  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(appState.current);


  React.useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    messaging().onMessage(async remoteMessage => {
      alert(JSON.stringify(remoteMessage));
    });

    checkToken()

  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log("AppState", appState.current);
  };

  const checkToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    fcmToken == null ? getNewToken() : dispatchToken(fcmToken)
  }

  const getNewToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken)
      dispatchToken(fcmToken)
    }
  }

  const dispatchToken = token => dispatch(saveFCMToken(token))

  return (
    <SafeAreaView style={{ flex: 1, }} >
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          {/* Splash Screen */}
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          {/* Intro Screen */}
          <Stack.Screen name="IntroScreen" component={IntroScreen} options={{ headerShown: false }} />
          {/* Login Screen */}
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          {/* Login Screen */}
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
          {/* Profile Screen */}
          <Stack.Screen name="ProfileClosetScreen" component={ProfileClosetScreen} options={{ headerShown: false }} />
          {/* Feed Screen */}
          <Stack.Screen name="FeedScreen" component={FeedScreen} options={{ headerShown: false }} />
          {/* Search Screen */}
          <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
          {/* Tab navigation */}
          <Stack.Screen name="TabNavigationScreen" component={TabNavigator} options={{ headerShown: false }} />
          {/* Profile Screen */}
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
          {/* Email Screen */}
          <Stack.Screen name="EmailScreen" component={EmailScreen} options={{ headerShown: false }} />
          {/* Birthday Screen */}
          <Stack.Screen name="BirthdayScreen" component={BirthdayScreen} options={{ headerShown: false }} />
          {/* Phone Screen */}
          <Stack.Screen name="PhoneScreen" component={PhoneScreen} options={{ headerShown: false }} />
          {/* ChangePasswordScreen Screen */}
          <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ headerShown: false }} />
          {/* Name Screen */}
          <Stack.Screen name="NameScreen" component={NameScreen} options={{ headerShown: false }} />
          {/* Gender Screen */}
          <Stack.Screen name="GenderScreen" component={GenderScreen} options={{ headerShown: false }} />
          {/* ProfileType Screen */}
          <Stack.Screen name="ProfileTypeScreen" component={ProfileTypeScreen} options={{ headerShown: false }} />
          {/* Like Screen */}
          <Stack.Screen name="LikeScreen" component={LikeScreen} options={{ headerShown: false }} />
          {/* Upload Screen */}
          <Stack.Screen name="UploadScreen" component={UploadScreen} options={{ headerShown: false }} />
          {/* Photo Screen */}
          <Stack.Screen name="PhotoScreen" component={PhotoScreen} options={{ headerShown: false }} />
          {/* UploadPhoto Screen */}
          <Stack.Screen name="UploadingPhotoScreen" component={UploadingPhotoScreen} options={{ headerShown: false }} />
          {/* UploadProfilePhoto Screen */}
          <Stack.Screen name="UploadingProfilePhoto" component={UploadingProfilePhoto} options={{ headerShown: false }} />
          {/* FriendList Screen */}
          <Stack.Screen name="FriendListScreen" component={FriendListScreen} options={{ headerShown: false }} />
          {/* Chat Screen */}
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
          {/*UserWall Screen*/}
          <Stack.Screen name="UserWallScreen" component={UserWallScreen} options={{ headerShown: false }} />
          {/*SearchFeed Screen*/}
          <Stack.Screen name="SearchFeedScreen" component={SearchFeedScreen} options={{ headerShown: false }} />
          {/* NotificationScreen Screen*/}
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
          {/* FriendRequestScreen Screen*/}
          <Stack.Screen name="FriendRequestScreen" component={FriendRequestScreen} options={{ headerShown: false }} />
          {/* ChatSettingScreen Screen*/}
          <Stack.Screen name="ChatSettingScreen" component={ChatSettingScreen} options={{ headerShown: false }} />
          {/* ChatSettingBlockScreen Screen*/}
          <Stack.Screen name="ChatSettingBlockScreen" component={ChatSettingBlockScreen} options={{ headerShown: false }} />
          {/* SearchPeopleScreen Screen*/}
          <Stack.Screen name="SearchPeopleScreen" component={SearchPeopleScreen} options={{ headerShown: false }} />
          {/* UsersCommentScreen Screen*/}
          <Stack.Screen name="UsersCommentScreen" component={UsersCommentScreen} options={{ headerShown: false }} />
          {/* UserWallComments Screen */}
          <Stack.Screen name="UserWallCommentsScreen" component={UserWallCommentsScreen} options={{ headerShown: false }} />
          {/*  CommonNotification Screen */}
          <Stack.Screen name="CommonNotificationScreen" component={CommonNotificationScreen} options={{ headerShown: false }} />
          {/*  CommonNotification Screen */}
          <Stack.Screen name="ProfileCloset" component={ProfileCloset} options={{ headerShown: false }} />
          {/*  CommonNotification Screen */}
          <Stack.Screen name="UserFeedScreen" component={UserFeedScreen} options={{ headerShown: false }} />
          {/* NewFriend Screen */}
          <Stack.Screen name="NewFriendScreen" component={NewFriendScreen} options={{ headerShown: false }} />
          <Stack.Screen name="FollowingList" component={FollowingList} options={{ headerShown: false }} />
          <Stack.Screen name="AccountVerification" component={AccountVerification} options={{ headerShown: false }} />
          <Stack.Screen name="FollowRequest" component={FollowRequest} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileDetails" component={ProfileDetails} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  )
}