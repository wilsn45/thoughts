import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/storage';
import React, { useState } from 'react';
import * as  User  from "thoughts/app/User";
import * as  Ext  from "./ServiceExt";
import * as realm from "thoughts/app/storage/Realm/ThougtsRealm";


const API_URL = "https://us-central1-thoughts-fe76a.cloudfunctions.net/"
const THOUGHTS = "thoughts"

const storage = firebase.storage()


export async function postThought(thought){
  return new Promise((resolve,reject) => {
      firestore().collection(THOUGHTS).add(thought)
   });
}


export async function postImage(imageUrl){
  try {

     let unixtime = new Date().valueOf()
     let timestamp = Math.floor(unixtime/1000)

      let ext = imageUrl.split('.').pop();
      let imagePath =  User.uid +'_'+timestamp+'.'+ext
      const reference = firebase.storage().ref('thoughts/'+imagePath);
      console.log("putting file "+imagePath)
      await reference.putFile(imageUrl);
    }catch(err) {
        console.log("error is "+err)
    }
}
