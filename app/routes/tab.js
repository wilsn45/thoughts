import React from 'react';
import {View,Text} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';

import Thoughts from './thoughts';
import ChatListScreen from "../scenes/thoughts/ChatList";
import MeScreen from "../scenes/thoughts/Me";



const TabNavigator = createBottomTabNavigator({

	Restaurant: {
        screen: Thoughts,
        path: '/',
        navigationOptions: {
           tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name={"cloud"} size={35} color={tintColor} />;
            },
            tabBarOptions: { showLabel: false,activeTintColor:'#63b1bf'}
        },
    },
    Eat: {
        screen: ChatListScreen,
        path: '/',
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name={"message-square"} size={35} color={tintColor} />;
            },
            tabBarOptions: { showLabel: false,activeTintColor:'#63b1bf'},
        },
    },
    Order: {
        screen: MeScreen,
        path: '/',
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name={"smile"} size={35} color={tintColor} />;
            },
            tabBarOptions: { showLabel: false,activeTintColor:'#63b1bf'}
        },
    }

  });

export default TabNavigator;
