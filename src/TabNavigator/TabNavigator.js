// TabNavigator
import * as React from 'react';
import { Text, View ,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProfileClosetScreen } from '../Screens/ProfileClosetScreen';
import { ProfileScreen } from '../Screens/ProfileScreen';
import { LikeScreen } from '../Screens/LikeScreen';
import { UploadScreen } from '../Screens/UploadScreen';
import { UserWallScreen } from '../Screens/UserWallScreen';
import { ProfileCloset } from '../Screens/ProfileCloset';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Tab = createBottomTabNavigator();
function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            // tabBarOptions={{
            //     activeTintColor: '#e91e63',
            // }}
            
            tabBarOptions= {{
                activeTintColor: '#e91e63',
                inactiveTintColor:'#383838',
                
                labelStyle: {
                  fontSize: 12,
                  marginBottom:10
                },
                style: {
                  backgroundColor: '#FFFFFF',height:60 ,position:'absolute',borderTopLeftRadius:20,borderTopRightRadius:20,elevation: 4,
                  shadowColor: "#000",
                  shadowOffset: {
                      width: 0,
                      height: 2
                  },
                  
                },
              }}
            >
            <Tab.Screen 
           
                name="Feed"
                component={ProfileCloset}
                options={{
                    tabBarLabel: 'Home',
                    
                    
                    tabBarIcon: ({ color, size, }) => (
                        // <Image 
                        // style={{height:22,width:32,tintColor:color ? '#e91e63' : '#383838'}}
                        // source={require('../../src/Assets/Images/Hanger/hangericon.png')}>
                        // </Image>


                        <MaterialCommunityIcons name="hanger" color={color} size={28}  />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={UploadScreen}
                options={{
                    tabBarLabel: 'Plus',
                   
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="cloud-up" color={color} size={28} style={{marginTop:10}} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={LikeScreen}
                options={{
                    tabBarLabel: 'Like',
                    tabBarIcon: ({ color, size }) => (
                       
                        // <Image 
                        // style={{height:22,width:25,color: color ? '#e91e63' : '#383838'}}
                        // source={require('../../src/Assets/Images/Likebottom/like.png')}>
                        // </Image>
                        <Icon name="heart-o" color={color} size={28} />
                    ),
                }}
            />

            <Tab.Screen
                name="User"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        //  <Image 
                        //  style={{height:22,width:23}}
                        //  source={require('../../src/Assets/Images/userbottom/Vector.png')}>
                        // </Image>
                        <AntIcon name="user" color={color} size={size} />
                    ),
                }}
            />  
        </Tab.Navigator>
    );
}

export default function TabNavigator() {
    return (
        
            <MyTabs />
        
    );
}




