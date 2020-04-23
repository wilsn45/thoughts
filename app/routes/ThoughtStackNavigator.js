import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import HomeScreen from "thoughts/app/scenes/Thoughts/HomeScene";
import ChatListScreen  from "thoughts/app/scenes/Thoughts/ChatListScene";
import TalkScreen from "thoughts/app/scenes/Thoughts/TalkScene";
import ProfileScene from "thoughts/app/scenes/Profile/ProfileScene";



const ThoughtsStack = createStackNavigator(
    {
        Home: HomeScreen,
        ChatList: ChatListScreen,
        Talk: TalkScreen,
        Profile : ProfileScene
    },
    { headerMode: 'none' },
    {
        initialRouteName: 'Home',
    }
);

export default ThoughtsStack;