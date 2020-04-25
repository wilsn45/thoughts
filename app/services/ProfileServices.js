import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/storage';
import * as c from "../storage/Constants";
import React, { useState } from 'react';
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import * as contactListHelper from "thoughts/app/helper/ContactListtHelper";
import * as imageHelper from "thoughts/app/helper/ImageHelper";

//Google Map API Key : AIzaSyCr65NbaaL4JvLuuvr5-n9QYH_1YxCRT1Q

const usersCollection = firestore().collection('Users');
const storage = firebase.storage()
let confirmation  = null


export async function getProfileOverView(uid){
  return new Promise((resolve,reject) => {
    const userRef = firestore().collection('user').doc(uid);
     userRef.get()
     .then(snapshot => {
       if(!snapshot.exists) {
        reject(new Error("Oops, could'not fetch user details"))
       }
       resolve(snapshot)

       return
     })
    .catch(err => {
      console.log("error is "+err)
          reject(err)
      })
   });
}

export async function getUserList(uid,showFollowing){
  return new Promise((resolve,reject) => {
    const userRef = firestore().collection('followers').doc(uid);
     userRef.get()
     .then(snapshot => {
       if(!snapshot.exists) {
        reject(new Error("Oops, could'not fetch user list"))
       }
       if (showFollowing) {
         resolve(snapshot.get('followings'))
      }else {
         resolve(snapshot.get('followers'))
       }
      return
     })
    .catch(err => {
        reject(err)
     });
   });
}
export async function getMaxProfileUrl(token){
  let resourceName = '/profile_pic_max/'+token+'.jpg'
  const ref = await storage.ref(resourceName)
  return await ref.getDownloadURL();
}

export async function getMinProfileUrl(token){
  let resourceName = '/profile_pic_min/'+token+'.jpg'
  const ref = await storage.ref(resourceName)
  return await ref.getDownloadURL();
}
