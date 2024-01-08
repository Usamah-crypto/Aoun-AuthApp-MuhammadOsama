import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native';

import HomeScreen from '../../screens/homeScreen';
import ProfileScreen from '../../screens/profileScreen';

const Tab = createBottomTabNavigator();

export const BottomTabsHome = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarItemStyle: {
          backgroundColor: 'black',
        },
        tabBarStyle: {
          borderColor: 'white',
        },
        tabBarLabelStyle: {
          color: 'white',
        },
        tabBarActiveTintColor: '#FF6961',
        tabBarInactiveTintColor: 'white',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => {
            return (
              <Image
                style={{height: size, width: size}}
                source={
                  focused
                    ? require('../../assets/images/homeActive.png')
                    : require('../../assets/images/home.png')
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => {
            return (
              <Image
                style={{height: size, width: size}}
                source={
                  focused
                    ? require('../../assets/images/userActive.png')
                    : require('../../assets/images/user.png')
                }
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
