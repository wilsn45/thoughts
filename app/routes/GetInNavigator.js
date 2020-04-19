import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import GetStartedScene from "thoughts/app/scenes/GetIn/GetStartedScene";
import SetUserInfoScene  from "thoughts/app/scenes/GetIn/SetUserInfoScene";
import SelectTagScene  from "thoughts/app/scenes/GetIn/SelectTagScene";
import HomeTabNavigator from "./HomeTabNavigator";



const Auth = createStackNavigator(
    {
        GetStarted: GetStartedScene,
        SetUserInfo: SetUserInfoScene,
        SelectTag : SelectTagScene,
        App: HomeTabNavigator,
    },
    { headerMode: 'none' },
    {
        initialRouteName: 'GetStarted',
    }
);

export default Auth;
