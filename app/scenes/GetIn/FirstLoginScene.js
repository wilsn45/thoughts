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

   console.log("first login token "+ userToken)
   console.log("first login number "+ userNumber)
  }
  catch (err) {
    console.log("error" + err)
  }
  
}

 function getUserStatus () {
     api.getUserStatus()
       .then((response) => {
          isNewUser = response.data.data.isNewUser
          console.log("isNewUser", isNewUser)
       })
       .catch(err => {
        console.log("err", err)
    })
 }

 function pushContactList() {
    if (isNewUser) {
       
    }
 }

 function putAllContacts() {
  
 }

 function getContactListiOS() {
  try {
   Contacts.getAll((err, contacts) => {
     if (err) {
       throw err;
     }
     const phoneNumbersList = contacts.map((contact) => contact.phoneNumbers);
     var phoneNumberArray = []
     for(let i = 0; i < phoneNumbersList.length; i++) {
       phoneNumberArray = [].concat(phoneNumberArray,phoneNumbersList[i].map((number) => number.number))
     }
     
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
   <Spinner style={styles.spinner} isVisible="true" size={40} type="ArcAlt" color="#fb375b"/>
    <TouchableOpacity 
    onPress={() => getContactListiOS()}>
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
