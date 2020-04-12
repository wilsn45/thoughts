
import {AsyncStorage} from 'react-native';

const UserTokenKey = "@UserToken"
const UserNumberKey = "@UserNumber"
const UserNameKey = "@UserName"
const UserSexKey = "@UserSex"
const UserContactListKey = "@UserContactList"



export var setUserToken = (token) => {
   return new Promise((resolve,reject) => {
   AsyncStorage.setItem(UserTokenKey,token)
   .then( (success) => {
    resolve(success)
   })
   .catch(err => reject(err))
   
 });
}

export var getUserToken = () =>{
  return new Promise((resolve,reject) =>{
     AsyncStorage.getItem(UserTokenKey)
     .then( token => resolve(token))
     .catch(err => reject(err))
 });
}

export var setUserNumber = (number) => {
   return new Promise((resolve,reject) =>{
   AsyncStorage.setItem(UserNumberKey,number)
   .then( (success) => {
    resolve(success)
   })
   .catch(err => reject(err))
   
 });
}

export var getUserNumber = () => {
  return new Promise((resolve,reject) => {
     AsyncStorage.getItem(UserNumberKey)
     .then( number => resolve(number))
     .catch(err => reject(err))
 });
}


export var setUserName = (name)  =>{
   return new Promise((resolve,reject) => {
   AsyncStorage.setItem(UserNameKey,name)
   .then( (success) => {
    resolve(success)
   })
   .catch(err => reject(err))
   
 });
}

export var getUserName = ()  => {
  return new Promise((resolve,reject) => {
     AsyncStorage.getItem(UserNameKey)
     .then( name => resolve(name))
     .catch(err => reject(err))
 });
}

export var setUserSex = (sex) => {
   return new Promise((resolve,reject) => {
   AsyncStorage.setItem(UserSexKey,sex)
   .then( (success) => {
    resolve(success)
   })
   .catch(err => reject(err))
   
 });
}

export var getUserSex = () => {
  return new Promise((resolve,reject) =>{
     AsyncStorage.getItem(UserSexKey)
     .then( sex => resolve(sex))
     .catch(err => reject(err))
 });
}

export var setUserContactListEmpty = () => {
   return new Promise((resolve,reject) => {
   AsyncStorage.setItem(UserContactListKey,JSON.stringify([]))
   .then( (success) => {
    resolve(success)
   })
   .catch(err => reject(err))
   
 });
}

export var setUserContactList = (contactList) => {
   return new Promise((resolve,reject) => {
   AsyncStorage.setItem(UserContactListKey,JSON.stringify(contactList))
   .then( (success) => {
    resolve(success)
   })
   .catch(err => reject(err))
   
 });
}

export var getUserContactList = () => {
   return new Promise((resolve,reject) => {
   AsyncStorage.getItem(UserContactListKey)
   .then(contactList => JSON.parse(contactList))
   .then(array => resolve(array))
   .catch(err => reject(err));
   
 });
}

