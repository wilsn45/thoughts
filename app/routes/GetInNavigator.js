import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import GetStartedScene from "thoughts/app/scenes/GetIn/GetStartedScene";
import FirstLoginScene  from "thoughts/app/scenes/GetIn/FirstLoginScene";
import HomeTabNavigator from "./HomeTabNavigator";



const Auth = createStackNavigator(
    {
        GetStarted: GetStartedScene,
        FirstLogin: FirstLoginScene,
        App: HomeTabNavigator,
    },
    { headerMode: 'none' },
    {
        initialRouteName: 'GetStarted',
    }
);

export default Auth;