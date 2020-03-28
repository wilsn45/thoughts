import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

//IMPORT ROUTES
import ThoughtsStack from "./routes/thoughts";
import Tab from "./routes/tab";
import GetStarted from "./scenes/auth/GetStarted";

import AuthLoading from "./scenes/auth/AuthLoading";
import AuthProvider from "./provider";

//APP ROUTES STACK
const AppStack = createSwitchNavigator(
    {
        Loading: AuthLoading,
        Auth: GetStarted,
        App: Tab
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