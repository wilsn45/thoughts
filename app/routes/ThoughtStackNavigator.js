import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import HomeScreen from "thoughts/app/scenes/Thoughts/HomeScene";
import ChatListScreen  from "thoughts/app/scenes/Thoughts/ChatListScene";
import TalkScreen from "thoughts/app/scenes/Thoughts/TalkScene";
import MyProfileScene from "thoughts/app/scenes/Profile/MyProfileScene";
import ProfileScene from "thoughts/app/scenes/Profile/ProfileScene";
import SettingsScene from "thoughts/app/scenes/Profile/SettingsScene";

const ThoughtsStack = createStackNavigator(
    {
        Home: HomeScreen,
        ChatList: ChatListScreen,
        Talk: TalkScreen,
        MyProfile : MyProfileScene,
        Profile : ProfileScene,
        Settings : SettingsScene
    },
    { headerMode: 'none' },
    {
        initialRouteName: 'Home',
    }
);

export default ThoughtsStack;
