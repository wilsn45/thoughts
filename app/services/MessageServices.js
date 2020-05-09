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

export function subscribeMessage(){

  const subscriber = firestore()
  .collection('messages')
  .where("touid", '==', User.uid)
  .where("delivered", '==', false)
  .onSnapshot(querySnapshot => {
    if(querySnapshot) {
      querySnapshot.forEach(documentSnapshot => {

        let message =  {
           msgid:  documentSnapshot.id,
           username: documentSnapshot.data().fromusername,
           useruid : documentSnapshot.data().fromuid,
           isReceived : true,
           message : documentSnapshot.data().message,
           thoughtTitle : documentSnapshot.data().thoughtTitle,
           picRef : documentSnapshot.data().picRef,
           audioRef : documentSnapshot.data().audioRef,
           at : documentSnapshot.data().at
         }

         firestore().collection('messages').doc(documentSnapshot.id).update({delivered : true})
          // documentSnapshot.update({read : true})
         // console.log("evaluated message "+JSON.stringify(message))
         // console.log("************************")
         messageRealm.addNewMessage(message)
         // messageRealm.clearMSg()
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
