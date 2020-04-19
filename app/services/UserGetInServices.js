import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as c from "../storage/Constants";
import React, { useState } from 'react';
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import * as contactListHelper from "thoughts/app/helper/ContactListtHelper";
//Google Map API Key : AIzaSyCr65NbaaL4JvLuuvr5-n9QYH_1YxCRT1Q


const API_URL = "https://us-central1-thoughts-fe76a.cloudfunctions.net/"

const usersCollection = firestore().collection('Users');
const thought_peopleCollection = firestore().collection('thought_people');
let confirmation  = null



 export async function numberSignIn(number) {
    return new Promise((resolve,reject) => {
     auth().signInWithPhoneNumber(number).then ( (confirmation) =>{
        resolve (confirmation)
     }).catch (err => {
       reject(err)
     })
    });
 }


 export async function numberVerify(otc,confirmation) {
   return new Promise((resolve,reject) => {
     confirmation.confirm(otc).then( (user) =>{
         resolve(user)
     }).catch(function (err) {
        reject(err)
    })
  });
}


export async function getUserData(uid){
 return new Promise((resolve,reject) => {
  const userRef = firestore().collection('user').doc(uid);
    userRef.get()
    .then(snapshot => {
      if(snapshot.exists) {
       resolve(snapshot.data())
      }else {
        resolve(null)
      }
        return
    })
    .catch(err => {
        reject(err)
      });
    });
 }

 export async function isUserNameAvailable(username){
   return new Promise((resolve,reject) => {
      const userRef = firestore().collection('user');
      userRef.where("username", "==", username).get()
  	  .then(snapshot => {
  			if(snapshot.empty) {
  			 console.log("available")
         resolve(true)
  		  }else {
  				console.log("not available")
          resolve(false)
  			}
  			return
  		})
  	 .catch(err => {
  			 reject(err)
   		});
    });
}

export async function getMostPopularTags(){
  return new Promise((resolve,reject) => {
     const userRef = firestore().collection('tags');
     let tags = []
     userRef.orderBy('impression', 'desc').limit(10).get()
     .then(snapshot => {
       if(snapshot.empty) {
        reject(new Error("Oops, could'not fetch tags"))
       }
       snapshot.forEach(doc => {
         tags.push(doc.id)
         resolve(tags)
       });
       return
     })
    .catch(err => {
        reject(err)
     });
   });
}

export async function isNewContactAdded() {
   let contactList = contactListHelper.getUserContactList()
   console.log(contactList)

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
