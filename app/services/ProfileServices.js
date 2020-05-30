import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/storage';
import * as c from "../storage/Constants";
import React, { useState } from 'react';
import * as  User  from "thoughts/app/User";
import * as  Ext  from "./ServiceExt";
import * as realm from "thoughts/app/storage/Realm/ProfileRealm";


const API_URL = "https://us-central1-thoughts-fe76a.cloudfunctions.net/"
const BoyProfileMinURL = "https://firebasestorage.googleapis.com/v0/b/thoughts-fe76a.appspot.com/o/profile%2Fmin%2FBoy.jpg?alt=media&token=027441a9-1cc8-4a16-950a-47173c04687b"
const GirlProfileMinURL = "https://firebasestorage.googleapis.com/v0/b/thoughts-fe76a.appspot.com/o/profile%2Fmin%2FGirl.jpg?alt=media&token=40a5f04d-390a-4562-a21f-f581056aeada"

const BoyProfileMaxURL = "https://firebasestorage.googleapis.com/v0/b/thoughts-fe76a.appspot.com/o/profile%2Fmax%2FBoy.jpg?alt=media&token=7e641d75-7fc4-41ec-9005-51ee7c8f292a"
const GirlProfileMaxURL = "https://firebasestorage.googleapis.com/v0/b/thoughts-fe76a.appspot.com/o/profile%2Fmax%2FGirl.jpg?alt=media&token=53c5e7b7-8d57-412a-8ba8-f16d177a5b31"
const PEOPLE = "people"

const storage = firebase.storage()


export async function getMyProfile(){
  return new Promise((resolve,reject) => {
    const userRef = firestore().collection(PEOPLE).doc(User.uid);
     userRef.get()
     .then(snapshot => {
       if(!snapshot.exists) {
        reject(new Error("Oops, could'not fetch user list"))
       }
       let data = {
         followers : snapshot.get('followers'),
         followings : snapshot.get('followings'),
         pendings : snapshot.get('pendings'),
         blocked : snapshot.get('blocked'),
         isPrivate : snapshot.get('isPrivate')
       }
       console.log("updating profile data")
       realm.updateProfileData(data)
       resolve(Ext.responseBuilderFirestore(true,data))
      return
     })
    .catch(err => {
        console.log("getUserList is "+err)
        reject(Ext.responseBuilderFirestore(false))
     });
   });
}

export async function setPrivate(state){
  return new Promise((resolve,reject) => {
    const userRef = firestore().collection(PEOPLE).doc(User.uid);
     userRef.get()
     .then(snapshot => {
       if(!snapshot.exists) {
        reject(new Error("Oops, could'not fetch user details"))
       }
       userRef.update({isPrivate:state});
       resolve(Ext.responseBuilderFirestore(true))
       return
     })
    .catch(err => {
      console.log("setPrivate error is "+err)
      reject(Ext.responseBuilderFirestore(false))
      })
   });
}

export async function getProfileURL(token,max){
 try {
    let resourceName
    if(max) {
      resourceName = '/profile/max/'+token+'.jpg'
    }
    else {
      resourceName = '/profile/min/'+token+'.jpg'
    }
    const ref = await storage.ref(resourceName)
    return await ref.getDownloadURL();
  }
  catch(err) {
    if (User.sex == "Male") {
      return max ? BoyProfileMaxURL : BoyProfileMinURL
    }else {
      return max ? GirlProfileMaxURL : GirlProfileMinURL
    }
  }
}


export async function getUserProfileOverView(useruid){
    try{
        let url = API_URL+"getUserProfileOverView?useruid="+useruid+"&&myuid="+User.uid
        let res = await axios.get(url);
        return Ext.responseBuilderAPI(res);
    }catch (e) {
        return Ext.responseBuilderAPI(null)
    }
}

export async function follow(useruid,followingname){
  try{
      let followername = User.username
      let url = API_URL+"follow?followingusername="+followingname+"&&followerusername="+followername
      console.log("url is "+url)
      const headers = {
        myuid: User.uid,
        useruid :useruid
      }
      let res = await axios.get(url, {headers});
      return Ext.responseBuilderAPI(res)
  }catch (e) {
      console.log("api follow is "+e)
      return Ext.responseBuilderAPI(null)
  }
}

export async function unfollow(useruid){
  try{
      let url = API_URL+"unfollow"
      const headers = {
        myuid: User.uid,
        useruid :useruid
      }
      let res = await axios.get(url, {headers});
      return Ext.responseBuilderAPI(res)
  }catch (e) {
      console.log("api unfollow is "+e)
      return Ext.responseBuilderAPI(null)
  }
}

export async function acceptRequest(useruid,followerusername){
  try{
      let followingusername = User.username
      let url = API_URL+"acceptRequest?followingusername="+followingusername+"&&followerusername="+followerusername
      const headers = {
        myuid: User.uid,
        useruid :useruid
      }
      let res = await axios.get(url, {headers});
      return Ext.responseBuilderAPI(res)
  }catch (e) {
      console.log("api acceptRequest is "+e)
      return Ext.responseBuilderAPI(null)
  }
}

export async function cancelRequest(from,of){
  try{
      let url = API_URL+"cancelRequest"
      const headers = {
        from: from,
        of :of
      }
      let res = await axios.get(url, {headers});
      return Ext.responseBuilderAPI(res)
  }catch (e) {
      console.log("api cancelRequest is "+e)
      return Ext.responseBuilderAPI(null)
    }
}

export async function block(useruid,blockingusername){
  try{
      let url = API_URL+"block?blockingusername="+blockingusername
      const headers = {
        myuid: User.uid,
        useruid :useruid
      }
      let res = await axios.get(url, {headers});
      return Ext.responseBuilderAPI(res)
    }catch (e) {
      console.log("api block is "+e)
      return Ext.responseBuilderAPI(null)
    }
}

export async function unblock(useruid){
  try{
      let url = API_URL+"unblock"
      const headers = {
        myuid: User.uid,
        useruid :useruid
      }
      let res = await axios.get(url, {headers});
      return Ext.responseBuilderAPI(res)
    }catch (e) {
      console.log("api unblock is "+e)
      return Ext.responseBuilderAPI(null)
    }
}
