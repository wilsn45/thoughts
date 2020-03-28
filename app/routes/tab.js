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
               return <Text style = {{fontSize : 45, marginTop: -15, alignSelf: "center", color : tintColor}} >r</Text>;
            },
            tabBarOptions: {showLabel: false, activeTintColor:'#e50032'}
        },
    },
    Eat: {
        screen: ChatListScreen,
        path: '/',
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name={"maximize"} size={35} color={tintColor} />;
            },
            tabBarOptions: { showLabel: false,activeTintColor:'black'},
        },
    },
    Order: {
        screen: MeScreen,
        path: '/',
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name={"book"} size={35} color={tintColor} />;
            },
            tabBarOptions: { showLabel: false,activeTintColor:'black'}
        },
    }

  });

export default TabNavigator;
