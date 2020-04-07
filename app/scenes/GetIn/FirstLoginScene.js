import React, { useState, useEffect } from 'react';
import {View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native';
import * as api from "../../services/UserGetInServices";
import { useAuth } from "../../provider";
import * as userStorage from "../../storage/Local/UserStorage";
import { PermissionsAndroid } from 'react-native';
var Spinner = require('react-native-spinkit');



export default function FirstLogin(props) {

  const [token, setToken] = useState("") 


 useEffect(() => {
   try {
       userStorage.getUserToken().then (token => {
        setToken(token)
       })
       .catch (err => {
          console.log("error is +", err)
       })
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
  
  <TouchableOpacity onPress={() => getContactListiOS()}>
  <Text> {token} </Text>
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
