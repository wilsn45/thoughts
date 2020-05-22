import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import GetStartedScene from "thoughts/app/scenes/GetIn/GetStartedScene";
import ForgotPasswordScene from "thoughts/app/scenes/GetIn/ForgotPasswordScene";
import SetUserInfoScene  from "thoughts/app/scenes/GetIn/SetUserInfoScene";
import SelectTagScene  from "thoughts/app/scenes/GetIn/SelectTagScene";



const Auth = createStackNavigator(
    {
        GetStarted: GetStartedScene,
        SetUserInfo: SetUserInfoScene,
        SelectTag : SelectTagScene,
        ForgotPassword : ForgotPasswordScene
    },
    { headerMode: 'none' },
    {
        initialRouteName: 'GetStarted',
    }
);

export default Auth;
