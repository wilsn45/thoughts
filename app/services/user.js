import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as c from '../constants';
import React, { useState } from 'react';
//Google Map API Key : AIzaSyCr65NbaaL4JvLuuvr5-n9QYH_1YxCRT1Q



const usersCollection = firestore().collection('Users');
const thought_peopleCollection = firestore().collection('thought_people');
let confirmation  = null



 export async function phoneNumberSignin(number) {
    console.log("phone number is " +number);
     confirmation = await auth().signInWithPhoneNumber(number);
}


 export async function phoneNumberVerify(otc) {
     console.log("code is " +otc);
   try {
      await confirmation.confirm(otc);
    } catch (error) {
      console.log(error);
    }
  }

 export async function getUserId(otc) {
   
 } 


// export function isUserExists(number) {
//     var userRef = firestore().collection('user').doc(number);
//     var getDoc = userRef.get()
//                  .then(doc => {
//               if (!doc.exists) {
//                    console.log('No such document!');
//               } else {
//                    console.log('Document exists'); 
//                 }
//           })
//     .catch(err => {
//       console.log('Error getting document', err);
//     })
    
// }

// export async function GetIn(data){
//     try{
//         let res = await axios.post(c.GetIn, data);

//         return res.data;
//     }catch (e) {
//         throw handler(e);
//     }
// }

// export async function forgotPassword(data) {
//     try {
//         let res = await axios.post(c.FORGOT_PASSWORD, data);

//         return res.data;
//     } catch (e) {
//         throw handler(e);
//     }
// }

// export async function updateProfile(userId, data){
//     try{
//         const options = {
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "multipart/form-data"
//             }
//         };

//         const form_data = new FormData();
//         for ( let key in data )
//             form_data.append(key, data[key]);

//         let res = await axios.put(`${c.UPDATE_PROFILE}/${userId}`, form_data, options);
//         return res.data;
//     }catch (e) {
//         throw handler(e);
//     }
// }

// export function handler(err) {
//     let error = err;

//     if (err.response && err.response.data.hasOwnProperty("message"))
//         error = err.response.data;
//     else if (!err.hasOwnProperty("message")) error = err.toJSON();

//     return new Error(error.message);
// }