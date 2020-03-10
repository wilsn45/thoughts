// // * Description: App Entry Point
// import React, {Component} from 'react';

// import Router from './app/router'

// export default class App extends Component {
//     render() {
//         return <Router/>;
//     }
// }

import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import GetIn from  "./app/scenes/GetIn";
import AppNavigator from  "./app/routes/AppNavigator";

 
export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
 
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
 
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
 
  if (initializing) return null;
 
  if (!user) {
    return (
       <GetIn/>
    );
  }
 
  return (
   <AppNavigator /> 
  );
};