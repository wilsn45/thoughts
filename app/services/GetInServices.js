import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import * as imageHelper from "thoughts/app/helper/ImageHelper";
import { firebase } from '@react-native-firebase/storage';
import * as  User  from "thoughts/app/User";
import * as  Ext  from "./ServiceExt";

//Google Map API Key : AIzaSyCr65NbaaL4JvLuuvr5-n9QYH_1YxCRT1Q
const BoyProfileMinURL = "https://firebasestorage.googleapis.com/v0/b/thoughts-fe76a.appspot.com/o/profile%2Fmin%2FBoy.jpg?alt=media&token=027441a9-1cc8-4a16-950a-47173c04687b"
const GirlProfileMinURL = "https://firebasestorage.googleapis.com/v0/b/thoughts-fe76a.appspot.com/o/profile%2Fmin%2FGirl.jpg?alt=media&token=40a5f04d-390a-4562-a21f-f581056aeada"
const API_URL = "https://us-central1-thoughts-fe76a.cloudfunctions.net/"

const usersCollection = firestore().collection('Users');
const thought_peopleCollection = firestore().collection('thought_people');
const storage = firebase.storage()



export async function signUp(email){
  try{
    let url = API_URL+"signUp?email="+email
      console.log("url is "+url)
      let res = await axios.get(url);
      return Ext.responseBuilderAPI(res)

  }catch (e) {
      console.log("api follow is "+e)
      return Ext.responseBuilderAPI(null)
  }
}

export async function login(cred,password){
  try{
     let url = API_URL+"login?cred="+cred+"&&password="+password
      console.log("url is "+url)
      let res = await axios.get(url);
      return Ext.responseBuilderAPI(res)
  }catch (e) {
      console.log("api login is "+e)
      return Ext.responseBuilderAPI(null)
  }
}

export async function addUser(email,password,username,sex){
  try{
    //email=skk.wilson@gmail.com&&password=9210456121&&username=wilson&&sex="male"
    let url = API_URL+"addNewUser?email="+email+"&&password="+password+"&&username="+username+"&&sex="+sex
    console.log("url is "+url)
    let res = await axios.get(url);
    return Ext.responseBuilderAPI(res)
  }catch (e) {
      console.log("api addUser is "+e)
      return Ext.responseBuilderAPI(null)
  }
}


export async function forgotPassword(cred){
  try{
    let url = API_URL+"forgotPassword?cred="+cred
      console.log("url is "+url)
      let res = await axios.get(url);
      return Ext.responseBuilderAPI(res)
  }catch (e) {
      console.log("api forgotPassword is "+e)
      return Ext.responseBuilderAPI(null)
  }
}

export async function setPassword(email,password){
  try{
     let url = API_URL+"setPassword?email="+email+"&&password="+password
      console.log("url is "+url)
      let res = await axios.get(url);
      return Ext.responseBuilderAPI(res)
  }catch (e) {
      console.log("api login is "+e)
      return Ext.responseBuilderAPI(null)
  }
}


export async function getMinProfile(token,sex){
  let url
  try {
    url = await getMinProfileUrl(token)
    console.log("url in try "+url)
  }
  catch(err) {
    if (sex == "Male") {
      url = BoyProfileMinURL
    }else {
      url = GirlProfileMinURL
    }
    console.log("url in catch "+url)
  }
  let imageHelperPromise = imageHelper.saveProfileBase64(url)
  let profileBase64 = await imageHelperPromise
  userStorage.setUserProfileMinBase64(profileBase64)
  return
}

 export async function isUserNameAvailable(username){
   return new Promise((resolve,reject) => {
      const userRef = firestore().collection('user');
      userRef.where("username", "==", username).get()
  	  .then(snapshot => {
  			if(snapshot.empty) {
  			 console.log("available")
         resolve(true)
         return
  		  }
        console.log("not available")
        resolve(false)
  			return
  		})
  	 .catch(err => {
  			 reject(err)
   		});
    });
}

export async function getMinProfileUrl(token){
  let resourceName = '/profile/min/'+token+'.jpg'
  const ref = await storage.ref(resourceName)
  return await ref.getDownloadURL();
}


// export async function getMostPopularTags(){
//   return new Promise((resolve,reject) => {
//      const userRef = firestore().collection('tags');
//      let tags = []
//      userRef.orderBy('impression', 'desc').limit(10).get()
//      .then(snapshot => {
//        if(snapshot.empty) {
//         reject(new Error("Oops, could'not fetch tags"))
//        }
//        snapshot.forEach(doc => {
//          tags.push(doc.id)
//          resolve(tags)
//        });
//        return
//      })
//     .catch(err => {
//         reject(err)
//      });
//    });
// }
