import React, { useState } from 'react';
import {View,
    StyleSheet,
    Text,
    } from 'react-native';
import * as api from "../../services/user";
import { useAuth } from "../../provider";
var Spinner = require('react-native-spinkit');



export default function FirstLogin(props) {
     
   

   async function onClick() {
     //showLoading()
     try {
         if (isFirstStep) {
               const number = countryCode+phoneNumber;
                if (!validE164(number)) {
                  showError("Please enter valid phone number")
                  return;
                }
               await api.phoneNumberSignin(number);
               showOtCView()
               hideLoading()
          }
        else {
           // await api.phoneNumberSignin(otc);
             navigate('App');
        }
     }
     catch (error){
        // showError("res is "+JSON.stringify(error))
         console.log("res is "+JSON.stringify(error))
     }
          
    }


    return (

      <View style={styles.container}>
         <Spinner style={styles.spinner}  isVisible={true} size={60} type={"FadingCircleAlt"} color={"#63b1bf"}/>
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