import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/storage';
import * as c from "../storage/Constants";
import React, { useState } from 'react';
import * as imageHelper from "thoughts/app/helper/ImageHelper";
const API_URL = "https://us-central1-thoughts-fe76a.cloudfunctions.net/"
import * as  User  from "thoughts/app/User";


export function subscribeMessage(){
   const subscriber = firestore()
  .collection('messages')
  .where("touid", '==', User.uid)
  .onSnapshot(querySnapshot => {
    const users = [];

    querySnapshot.forEach(documentSnapshot => {
       console.log("touid is "+documentSnapshot.data().touid)
       console.log("senderuid is "+documentSnapshot.data().senderuid)
       console.log("message is "+documentSnapshot.data().message)
       console.log("************************")
    });
  });
  return subscriber

}

export function unsubscribeMessage() {
  subscriber = null
}
