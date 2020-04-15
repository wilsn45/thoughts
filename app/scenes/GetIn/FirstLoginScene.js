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
import * as fileHelper from "thoughts/app/helper/FileHelper";


let isNewUser;
export default function FirstLogin(props) {


useEffect(() => {

});

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
