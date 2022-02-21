/**
 * @format
 */
 import React from 'react'
 import 'react-native-gesture-handler';
 import {AppRegistry} from 'react-native';
 import App from './App';
 import {name as appName} from './app.json';
 import { Provider } from 'react-redux';
 import configuredStore from './src/store';
 
 const store = configuredStore()
 const ReduxComponenet = () => (
 
   <Provider store={store} >
     <App/>
   </Provider>
 )
 
 AppRegistry.registerComponent(appName, () => ReduxComponenet);