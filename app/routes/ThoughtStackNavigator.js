import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import HomeScreen from "thoughts/app/scenes/Thoughts/HomeScene";
import MyProfileScene from "thoughts/app/scenes/Profile/Me/MyProfileScene";
import ProfileScene from "thoughts/app/scenes/Profile/User/ProfileScene";
import SettingsScene from "thoughts/app/scenes/Profile/Me/Settings/SettingsScene";
import ConversationScene from "thoughts/app/scenes/Messages/ConversationScene";
import ConversationListScene from "thoughts/app/scenes/Messages/ConversationListScene";


const ThoughtsStack = createStackNavigator(
    {
        Home: HomeScreen,
        MyProfile : MyProfileScene,
        Profile : ProfileScene,
        Settings : SettingsScene,
        conversationList : ConversationListScene,
        conversation : ConversationScene,

    },
    { headerMode: 'none' },
    {
        initialRouteName: 'Home',
    }
);

export default ThoughtsStack;
