import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import HomeScreen from "../scenes/thoughts/Home";
import ChatListScreen  from "../scenes/thoughts/ChatList";
import TalkScreen from "../scenes/thoughts/Talk";



const ThoughtsStack = createStackNavigator(
    {
        Home: HomeScreen,
        ChatList: ChatListScreen,
        Talk: TalkScreen
    },
    { headerMode: 'none' },
    {
        initialRouteName: 'Home',
    }
);

export default ThoughtsStack;