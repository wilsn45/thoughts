import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import GetInScreen from "../scenes/auth/GetIn";


import {headerStyle, headerTitleStyle} from '../theme'

//Create Routes
const AuthStack = createStackNavigator(
    {
        //Register: RegisterScreen,
        GetIn: GetInScreen,
        // Username: UsernameScreen,
        // ForgotPassword: ForgotPasswordScreen
    },
    {
        initialRouteName: 'GetIn',
        defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
    }
);

export default AuthStack;