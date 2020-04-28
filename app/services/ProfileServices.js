import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/storage';
import * as c from "../storage/Constants";
import React, { useState } from 'react';
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import * as contactListHelper from "thoughts/app/helper/ContactListtHelper";
import * as imageHelper from "thoughts/app/helper/ImageHelper";
const API_URL = "https://us-central1-thoughts-fe76a.cloudfunctions.net/"
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
      console.log("getProfileOverView error is "+err)
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
        console.log("getUserList is "+err)
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

export async function getUserProfileOverView(useruid){
    try{
        let myuid = await userStorage.getUserToken()
        let url = API_URL+"getUserProfileOverView?useruid="+useruid+"&&myuid="+myuid
        let res = await axios.get(url);
        console.log("response is "+JSON.stringify(res.data))
        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export async function follow(useruid,followingname){
  try{
      let myuid = await userStorage.getUserToken()
      let followername = await userStorage.getUserName()
      let url = API_URL+"follow?followingusername="+followingname+"&&followerusername="+followername
      console.log("url is "+url)
      const headers = {
        myuid: myuid,
        useruid :useruid
      }
      let res = await axios.get(url, {headers});
      if(res.status==200) {
        return true
      }
      return false
  }catch (e) {
      console.log("api follow is "+e)
      throw new Error(e);
  }
}

export async function unfollow(useruid){
  try{
      let myuid = await userStorage.getUserToken()
      let url = API_URL+"unfollow"
      const headers = {
        myuid: myuid,
        useruid :useruid
      }
      let res = await axios.get(url, {headers});
      if(res.status==200) {
        return true
      }else
        return false
  }catch (e) {
      console.log("api unfollow is "+e)
      throw new Error(e);
  }
}

export async function cancelRequest(useruid){
  try{
      let myuid = await userStorage.getUserToken()
      let url = API_URL+"cancelRequest"
      const headers = {
        myuid: myuid,
        useruid :useruid
      }
      let res = await axios.get(url, {headers});
      if(res.status==200) {
        return true
      }
      return false
  }catch (e) {
      console.log("api cancelRequest is "+e)
      throw new Error(e);
  }
}

export async function block(useruid,blockingusername){
  try{
      let myuid = await userStorage.getUserToken()
      let url = API_URL+"block?blockingusername="+blockingusername
      const headers = {
        myuid: myuid,
        useruid :useruid
      }
      let res = await axios.get(url, {headers});
      if(res.status==200) {
        return true
      }else
        return false
  }catch (e) {
      console.log("api unfollow is "+e)
      throw new Error(e);
  }
}

export async function unblock(useruid){
  try{
      let myuid = await userStorage.getUserToken()
      let url = API_URL+"unblock"
      const headers = {
        myuid: myuid,
        useruid :useruid
      }
      let res = await axios.get(url, {headers});
      if(res.status==200) {
        return true
      }else
        return false
  }catch (e) {
      console.log("api unfollow is "+e)
      throw new Error(e);
  }
}
