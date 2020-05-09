import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

//IMPORT ROUTES
import ThoughtStackNavigator from "./ThoughtStackNavigator";
import GetInNavigator from "./GetInNavigator";

import SetUserInfoScene  from "thoughts/app/scenes/GetIn/SetUserInfoScene";
import SelectTagScene  from "thoughts/app/scenes/GetIn/SelectTagScene";
import AuthLoading from "thoughts/app/scenes/GetIn/AuthLoadingScene"; 
import AuthProvider from "thoughts/app/provider";

//APP ROUTES STACK
const AppStack = createSwitchNavigator(
    {
        Loading: AuthLoading,
        SetUserInfo : SetUserInfoScene,
        SelectTag : SelectTagScene,
        Auth: GetInNavigator,
        App: ThoughtStackNavigator
    },
    {initialRouteName: 'Loading'}
);

const Navigator = createAppContainer(AppStack);

export default function Router(props) {
    return (
        <AuthProvider>
            <Navigator/>
        </AuthProvider>
    );
}
