import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import TabNavigator from './TabNavigator';
const Stack = createStackNavigator();

export default MainNavigator = () => {
  return (
    <NavigationContainer gestureHandlerProps={false}>
      <Stack.Navigator
        gestureHandlerProps={false}
        mode="card"
        headerMode={'none'}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dasboard" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
