import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/storage';
import * as c from "../storage/Constants";
import React, { useState } from 'react';
import * as imageHelper from "thoughts/app/helper/ImageHelper";
const API_URL = "https://us-central1-thoughts-fe76a.cloudfunctions.net/"
import * as  User  from "thoughts/app/User";
import * as messageRealm from "thoughts/app/storage/Realm/MessageRealm";
import * as userStorage from "thoughts/app/storage/Local/UserStorage";

export function subscribeMessage(){

  // console.log("lasttimestamp is "+lasttimestamp)
//.where("at", ">", 1588872000)
  console.log("last message time "+User.messageLast)
  const subscriber = firestore()
  .collection('messages')
  .where("touid", '==', User.uid)
  .onSnapshot(querySnapshot => {
    if(querySnapshot) {
      console.log("message received")
      querySnapshot.forEach(documentSnapshot => {

        let message =  {
           msgid:  documentSnapshot.id,
           fromusername: documentSnapshot.data().fromusername,
           fromuid : documentSnapshot.data().fromuid,
           tousername : documentSnapshot.data().tousername,
           touid : documentSnapshot.data().touid,
           message : documentSnapshot.data().message,
           thoughtTitle : documentSnapshot.data().thoughtTitle,
           picRef : documentSnapshot.data().picRef,
           audioRef : documentSnapshot.data().audioRef,
           at : documentSnapshot.data().at
         }

         console.log("evaluated message "+JSON.stringify(message))
         console.log("************************")
         messageRealm.addNewChat(message)
        });
      }

});
  return subscriber

}

async function handleMessage(documentSnapshot) {

}
export function unsubscribeMessage() {
  subscriber = null
}
