import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

//IMPORT ROUTES
import HomeTabNavigator from "./HomeTabNavigator";
import GetInNavigator from "./GetInNavigator";

import FirstLoginScene  from "thoughts/app/scenes/GetIn/FirstLoginScene";
import AuthLoading from "thoughts/app/scenes/GetIn/AuthLoadingScene";
import AuthProvider from "thoughts/app/provider";

//APP ROUTES STACK
const AppStack = createSwitchNavigator(
    {
        Loading: AuthLoading,
        FirstLoginScene : FirstLoginScene,
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