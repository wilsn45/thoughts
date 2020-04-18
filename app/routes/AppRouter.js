import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

//IMPORT ROUTES
import HomeTabNavigator from "./HomeTabNavigator";
import GetInNavigator from "./GetInNavigator";

import SetUserNameScene  from "thoughts/app/scenes/GetIn/SetUserNameScene";
import AuthLoading from "thoughts/app/scenes/GetIn/AuthLoadingScene";
import AuthProvider from "thoughts/app/provider";

//APP ROUTES STACK
const AppStack = createSwitchNavigator(
    {
        Loading: AuthLoading,
        SetUserName : SetUserNameScene,
        Auth: GetInNavigator,
        App: HomeTabNavigator
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
