import React, { useState, useEffect } from 'react';
import {View,
    StyleSheet,
    Text,
    Platform,
    TouchableOpacity
    } from 'react-native';
import * as api from "../../services/user";
import { useAuth } from "../../provider";
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native';
var Spinner = require('react-native-spinkit');



export default function FirstLogin(props) {
     
   useEffect(() => {
     try {
        if (Platform.OS == 'ios') {
         console.log('ios Platform')
         getContactListiOS()
      }else {
         console.log('android Platform')
         getContactListAndroid()
      }
     }
      catch (error) {
        console.log(error)
      }

   });

    function getContactListiOS() {
      try {
         Contacts.getAll((err, contacts) => {
       if (err) {
         throw err;
       }
         for ()
         console.log(contacts)
      })
      }catch (error) {
        console.log(error)
      }
    }

    function getContactListAndroid() {

      PermissionsAndroid.request(
       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
         'title': 'Contacts',
          'message': 'This app would like to view your contacts.',
          'buttonPositive': 'Please accept bare mortal'
      }
    ).then(() => {
         Contacts.getAll((err, contacts) => {
           if (err === 'denied'){
             // error
          } else {
          console.log(contacts)
      }
  })
})
 
    }
    


   return (

      <View style={styles.container}>
         
           <TouchableOpacity onPress={() => getContactListiOS()}>
              <Text> Get contact </Text>
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
