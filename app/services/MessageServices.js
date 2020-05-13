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
           image : documentSnapshot.data().image,
           at : documentSnapshot.data().at
         }

         firestore().collection('messages').doc(documentSnapshot.id).update({delivered : true})
          // documentSnapshot.update({read : true})
         console.log("evaluated message "+JSON.stringify(message))
         // console.log("************************")
         messageRealm.addNewMessage(message)
         // messageRealm.clearMSg()
        });
      }

});
  return subscriber

}

export async function sendTextMessage(message){
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

export async function sendImageMessage(username,useruid,imageurll){
  try {

      let unixtime = new Date().valueOf()
      let timestamp = Math.floor(unixtime/1000)
      let messageRef = firestore().collection('messages');

      let realmMessage = {
        msgid:  timestamp.toString(),
        useruid: useruid,
        username : username,
        image : imageurll,
        isReceived : false,
        at : timestamp,
        isMsgArchived : false,
        read : true
      }
      messageRealm.addNewMessage(realmMessage)

      let ext = imageurll.split('.').pop();
      let imagePath =  User.uid +'_'+timestamp+'.'+ext
      const reference = firebase.storage().ref('chat/'+imagePath);

      await reference.putFile(imageurll);

      let downloadUrl = await getImageURL('chat/'+imagePath)
       // console.log("download url is "+downloadUrl)


       messageRealm.updateImageUrl(timestamp.toString(),downloadUrl)

       messageRef.add({
          fromusername : User.username,
          fromuid : User.uid,
          tousername : username,
          touid : useruid,
          image : downloadUrl,
          at : timestamp,
          delivered : false
        })

       console.log("file uploaded ")
    }catch(err) {
        console.log("error is "+err)
    }
}

export async function getMinProfileUrl(token){
  if(!token) {
    token = User.uid
  }
  let resourceName = '/profile_pic_min/'+token+'.jpg'
  const ref = await storage.ref(resourceName)
  return await ref.getDownloadURL();
}

export async function getImageURL(resourceName){
  const ref = await storage.ref(resourceName)
  return await ref.getDownloadURL();
}

export async function sendReceivedImage(image) {
  let unixtime = new Date().valueOf()
  let timestamp = Math.floor(unixtime/1000)

  let senderuid = "AD9jnDWbPKYPOFD4C355b1ja7bF2"

  let ext = image.split('.').pop();
  let imagePath = senderuid +'_'+timestamp+'.'+ext

  console.log("image path "+imagePath)

  const reference = firebase.storage().ref('chat/'+imagePath);
  await reference.putFile(image);

  let downloadUrl = await getImageURL('chat/'+imagePath)
  console.log("download url is "+downloadUrl)


  let messageRef = firestore().collection('messages');
   messageRef.add({
      fromusername : "User A",
      fromuid : senderuid,
      tousername : "Kabir",
      touid : "DD9jnDWbPKYPOFD4C355b1ja7bF2",
      image : downloadUrl,
      at : timestamp,
      delivered : false
    })
}

async function handleMessage(documentSnapshot) {

}
export function unsubscribeMessage() {
  subscriber = null
}


//picRef":{"uri":"file:///Users/wilsonshakya/Library/Developer/CoreSimulator/Devices/FD9BC9A8-9D4D-46A7-A1DB-FE136551835D/data/Containers/Data/Application/7EB226D4-FE89-4194-A08B-B1C55F4E5E4E/Documents/images/0F6DEF3D-16FF-4F7D-A6D6-DB6DFF8A2392.jpg"}
