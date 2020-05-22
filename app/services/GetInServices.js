import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as c from "../storage/Constants";
import React, { useState } from 'react';
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import * as contactListHelper from "thoughts/app/helper/ContactListtHelper";
import * as imageHelper from "thoughts/app/helper/ImageHelper";
import { firebase } from '@react-native-firebase/storage';
import * as  User  from "thoughts/app/User";
//Google Map API Key : AIzaSyCr65NbaaL4JvLuuvr5-n9QYH_1YxCRT1Q
const BoyProfileMinURL = "https://firebasestorage.googleapis.com/v0/b/thoughts-fe76a.appspot.com/o/profile_pic_min%2FBoyPlaceholderMin.jpg?alt=media&token=bc2cbc39-23b7-4c6e-995c-a93bc33a270e"
const GirlProfileMinURL = "https://firebasestorage.googleapis.com/v0/b/thoughts-fe76a.appspot.com/o/profile_pic_min%2FGirlPlaceholderMin.jpg?alt=media&token=281c8637-cb10-4e0c-83ae-8980c7d723da"
const API_URL = "https://us-central1-thoughts-fe76a.cloudfunctions.net/"

const usersCollection = firestore().collection('Users');
const thought_peopleCollection = firestore().collection('thought_people');
let confirmation  = null
const storage = firebase.storage()



export async function signUp(email){
  try{
    let url = API_URL+"signUp?email="+email
      console.log("url is "+url)
      let res = await axios.get(url);
      if(res.status==200) {
        return res.data
     }
      return null
  }catch (e) {
      console.log("api follow is "+e)
      return null
  }
}

export async function login(cred,password){
  try{
     let url = API_URL+"login?cred="+cred+"&&password="+password
      console.log("url is "+url)
      let res = await axios.get(url);
      // console.log("resp  "+JSON.stringify(res))
      if(res.status==200) {
        return res.data
      }
      return null
  }catch (e) {
      console.log("api login is "+e)
      return null
  }
}

export async function addUser(email,password,username,sex){
  try{
    //email=skk.wilson@gmail.com&&password=9210456121&&username=wilson&&sex="male"
    let url = API_URL+"addNewUser?email="+email+"&&password="+password+"&&username="+username+"&&sex="+sex
    console.log("url is "+url)
    let res = await axios.get(url);
    if(res.status==200) {
        let custResp =  {
          uid : res.data.token,
          username : username,
          sex : sex,
          isPrivate : false
        }
        return custResp
     }
    return false
  }catch (e) {
      console.log("api addUser is "+e)
      return false
  }
}


export async function forgotPassword(cred){
  try{
    let url = API_URL+"forgotPassword?cred="+cred
      console.log("url is "+url)
      let res = await axios.get(url);
      if(res.status==200) {
        return res.data
     }
      return null
  }catch (e) {
      console.log("api forgotPassword is "+e)
      return null
  }
}


export async function updatePassword(email,password){
  return new Promise((resolve,reject) => {
    console.log("email is "+email)
    console.log("password is "+password)
     const userRef = firestore().collection('secret');
     userRef.where("email", "==", email).get()
     .then(snapshot => {
       if(snapshot.empty) {
        resolve(false)
        return
       }
       snapshot.forEach(doc => {
         userRef.doc(doc.id).update({password:password});
         resolve(true)
       });
      return
     })
    .catch(err => {
        reject(err)
     });
   });
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
  // console.log("profile base 64 "+profileBase64)
  return
}


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

export async function _addNewUser(){
  try {
    let token = await userStorage.getUserToken()
    let number = await userStorage.getUserNumber()
    let username = await userStorage.getUserName()
    let country = await userStorage.getUserCountry()
    let sex = await userStorage.getUserSex()
    let tags = await userStorage.getTags()
    User.uid = token
    User.username = username
    User.sex = sex
    User.isPrivate = false

    let imageHelperPromise = imageHelper.saveProfileBase64(profileMinUrl)
    if (sex == "Male") {
      imageHelperPromise = imageHelper.saveProfileBase64(BoyProfileMinURL)
    }else {
      imageHelperPromise = imageHelper.saveProfileBase64(GirlProfileMinURL)
    }

    let profileBase64 = await imageHelperPromise
    userStorage.setUserProfileMinBase64(profileBase64)
    return new Promise((resolve,reject) => {

    let newUserDocument = {
     number : number,
     username : username,
     tags : tags,
     sex : sex,
     country : country,
     isPrivate : false
   }
   firestore().collection('user').doc(token).set(newUserDocument).
    then(resp => {
      resolve(true)
    })
    .catch(err => {
      reject(new Error("Something went wrong"))
    })
   });
  }catch(err) {
    throw new Error(err)
    console.log("error is "+err)
  }

}
export async function getMinProfileUrl(token){
  let resourceName = '/profile_pic_min/'+token+'.jpg'
  const ref = await storage.ref(resourceName)
  return await ref.getDownloadURL();
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
