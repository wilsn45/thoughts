import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import HomeScreen from "../scenes/Thoughts/HomeScene";
import ChatListScreen  from "../scenes/Thoughts/ChatListScene";
import TalkScreen from "../scenes/Thoughts/TalkScene";



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