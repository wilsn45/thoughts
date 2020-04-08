
import {AsyncStorage} from 'react-native';

const UserTokenKey = "@UserToken"
const UserNumberKey = "@UserNumber"
const UserNameKey = "@UserName"
const UserSexKey = "@UserSex"



export var setUserToken = (token) => {
   return new Promise((resolve,reject) => {
   AsyncStorage.setItem(UserTokenKey,token)
   .then( (succss) => {
    resolve(succss)
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
   .then( (succss) => {
    resolve(succss)
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
   .then( (succss) => {
    resolve(succss)
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
   .then( (succss) => {
    resolve(succss)
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


