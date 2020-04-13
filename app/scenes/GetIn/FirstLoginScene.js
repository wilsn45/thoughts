import React, { useState, useEffect } from 'react';
import {View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native';
import * as api from "thoughts/app/services/UserGetInServices";
import { useAuth } from "thoughts/app/provider";
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import { PermissionsAndroid } from 'react-native';
var Spinner = require('react-native-spinkit');


let isNewUser;
export default function FirstLogin(props) {


useEffect(() => {
  //getUserStatus();
   test()

});

async function test() {
  try {
    let tokenPromise = userStorage.getUserToken()
   let numberPromise = userStorage.getUserNumber()
   let userToken = await tokenPromise;
   let userNumber = await numberPromise;

   // console.log("first login token "+ userToken)
   // console.log("first login number "+ userNumber)
  }
  catch (err) {
    console.log("error" + err)
  }
  
}
async function updateActiveToken() {
    let activePromise = userStorage.setUserActive()
    await activePromise;
}

 return (

  <View style={styles.container}>
   <TouchableOpacity 
    onPress={() => updateActiveToken()}>
      <Text> Daniya </Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({ 
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

spinner: {
  marginBottom: 50
},

btn: {
  marginTop: 20
},

text: {
  color: "white"
}


});

FirstLogin.navigationOptions = ({}) => {
  return {
    title: ``
  }
};


 ///<Spinner style={styles.spinner}  isVisible={true} size={60} type={"FadingCircleAlt"} color={"#63b1bf"}/>
