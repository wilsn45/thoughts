import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as c from "../storage/Constants";
import React, { useState } from 'react';
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import * as contactListHelper from "thoughts/app/helper/ContactListtHelper";
import * as imageHelper from "thoughts/app/helper/ImageHelper";
//Google Map API Key : AIzaSyCr65NbaaL4JvLuuvr5-n9QYH_1YxCRT1Q

const usersCollection = firestore().collection('Users');

let confirmation  = null



export async function getProfileOverView(uid){
  let token;
  if(!uid) {
    token = await userStorage.getUserToken()
  }
  else {
    token = uid
  }
  console.log("uid is "+token)
  return new Promise((resolve,reject) => {
    const userRef = firestore().collection('user').doc(token);
     userRef.get()
     .then(snapshot => {
       if(!snapshot.exists) {
        reject(new Error("Oops, could'not fetch userdetail"))
       }
        console.log("response is "+snapshot.data())
       let data = {
         username : snapshot.get('username'),
         followerCount : snapshot.get('followerCount'),
         followingCount : snapshot.get('followingCount'),
         profileURL : snapshot.get('profileMaxUrl')
       }
       resolve(data)

       return
     })
    .catch(err => {
        reject(err)
     });
   });
}
