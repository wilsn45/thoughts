import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as c from "../storage/constants";
import React, { useState } from 'react';

//Google Map API Key : AIzaSyCr65NbaaL4JvLuuvr5-n9QYH_1YxCRT1Q


const API_URL = "https://us-central1-thoughts-fe76a.cloudfunctions.net/"

const usersCollection = firestore().collection('Users');
const thought_peopleCollection = firestore().collection('thought_people');
let confirmation  = null



 export async function numberSignIn(number) {
    console.log("phone number is " +number);
    await auth().signInWithPhoneNumber(number).then ( (confirmationResult) =>{
        console.log("confirmation " +confirmationResult)
        return confirmationResult
     }).catch (err => {
       throw handler("something went wrong");
     });
 }


 export async function numberVerify(otc,confirmation) {
    await confirmation.confirm(otc).then( (result) =>{
      return result.user;
  }).catch(function (error) {
        throw handler("something went wrong");
    });
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