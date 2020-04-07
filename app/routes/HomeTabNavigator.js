import React from 'react';
import {View,Text} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';

import HomeStackNavigator from './HomeStackNavigator';
import ChatListScene from "../scenes/Thoughts/ChatListScene";
import MeScene from "../scenes/Thoughts/MeScene";



const TabNavigator = createBottomTabNavigator({

	Restaurant: {
        screen: HomeStackNavigator,
        path: '/',
        navigationOptions: {
           tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name={"cloud"} size={35} color={tintColor} />;
            },
            tabBarOptions: { showLabel: false,activeTintColor:'#63b1bf'}
        },
    },
    Eat: {
        screen: ChatListScene,
        path: '/',
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name={"message-square"} size={35} color={tintColor} />;
            },
            tabBarOptions: { showLabel: false,activeTintColor:'#63b1bf'},
        },
    },
    Order: {
        screen: MeScene,
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
