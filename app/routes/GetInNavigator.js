import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import GetStartedScene from "thoughts/app/scenes/GetIn/GetStartedScene";
import SetUserNameScene  from "thoughts/app/scenes/GetIn/SetUserNameScene";
import SetProfileScreen  from "thoughts/app/scenes/GetIn/SetProfileScreen";
import HomeTabNavigator from "./HomeTabNavigator";



const Auth = createStackNavigator(
    {
        GetStarted: GetStartedScene,
        SetUserName: SetUserNameScene,
        SetProfile : SetProfileScreen,
        App: HomeTabNavigator,
    },
    { headerMode: 'none' },
    {
        initialRouteName: 'GetStarted',
    }
);

export default Auth;
