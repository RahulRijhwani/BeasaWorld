import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import config from '../config';
import Login from '../screens/Login';
import Streamming from '../screens/Streamming';
import Upload from '../screens/Upload';
import Support from '../screens/Support';
const Tab = createBottomTabNavigator();

TabNavigator = () => {
  return (
    <Tab.Navigator
      // screenOptions={({ route }) => ({
      // 	tabBarIcon: ({ focused, color, size }) => {
      // 		let iconName;

      // 		if (route.name === 'Profile') {
      // 			iconName = focused
      // 				? require('../assets/images/userTab.png')
      // 				: require('../assets/images/userTab.png');
      // 		} else if (route.name === 'Menu') {
      // 			iconName = focused
      // 				? require('../assets/images/menuTag.png')
      // 				: require('../assets/images/menuTag.png');
      // 		} else if (route.name === 'Home') {
      // 			iconName = focused
      // 				? require('../assets/images/homeTab.png')
      // 				: require('../assets/images/homeTab.png');
      // 		} else if (route.name === 'Wallet') {
      // 			iconName = focused
      // 				? require('../assets/images/walleteTab.png')
      // 				: require('../assets/images/walleteTab.png');
      // 		} else if (route.name === 'Notes') {
      // 			iconName = focused
      // 				? require('../assets/images/notesTab.png')
      // 				: require('../assets/images/notesTab.png');
      // 		}

      // 		// You can return any component that you like here!
      // 		return <Image resizeMode={'contain'} source={iconName} style={styles.tabImg} />;
      // 	}
      // })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        showLabel: true,
        tabStyle: {
          backgroundColor: config.Constant.COLOR_PRIMARY,
          paddingVertical: 10,
          height: 50,
        },
        labelStyle: {
          fontSize: 18,
        },
      }}>
      <Tab.Screen name="Streaming" component={Streamming} />
      <Tab.Screen name="Upload Photo" component={Upload} />
      <Tab.Screen name="Support" component={Support} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabImg: {
    height: config.Constant.SCREEN_WIDTH * 0.06,
    width: config.Constant.SCREEN_WIDTH * 0.06,
  },
});

export default TabNavigator;
