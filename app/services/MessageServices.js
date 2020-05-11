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
const storage = firebase.storage()

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

export async function sendMessage(message){
  return new Promise((resolve,reject) => {
    try {
      let messageRef = firestore().collection('messages');
       messageRef.add({
          fromusername : User.username,
          fromuid : User.uid,
          tousername : message.username,
          touid : message.useruid,
          message : message.message,
          at : message.at,
          delivered : false
        })
        messageRealm.addNewMessage(message)
        resolve(true)
    }catch(err) {
        reject(err)
        console.log("error is "+err)
    }
  });
}

export async function getMinProfileUrl(token){
  if(!token) {
    token = User.uid
  }
  let resourceName = '/profile_pic_min/'+token+'.jpg'
  const ref = await storage.ref(resourceName)
  return await ref.getDownloadURL();
}

async function handleMessage(documentSnapshot) {

}
export function unsubscribeMessage() {
  subscriber = null
}
