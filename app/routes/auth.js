import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import GetStartedScreen from "../scenes/auth/GetStarted";
import FirstLoginScreen  from "../scenes/auth/FirstLogin";




const Auth = createStackNavigator(
    {
        GetStarted: GetStartedScreen,
        FirstLogin: FirstLoginScreen,
    },
    { headerMode: 'none' },
    {
        initialRouteName: 'GetStarted',
    }
);

export default Auth;