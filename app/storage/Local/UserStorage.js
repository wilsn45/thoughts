
import {AsyncStorage} from 'react-native';

const UserTokenKey = "@UserToken"
const UserNumberKey = "@UserNumber"
const UserNameKey = "@UserName"
const UserSexKey = "@UserSex"



export var setUserToken = function(token) {
   return new Promise(function(resolve,reject) {
   AsyncStorage.setItem(UserTokenKey,token)
   .then( (succss) => {
    resolve(succss)
   })
   .catch(err => reject(err))
   
 });
}

export var getUserToken = function() {
  return new Promise(function(resolve,reject) {
     AsyncStorage.getItem(UserTokenKey)
     .then( token => resolve(token))
     .catch(err => reject(err))
 });
}

export var setUserNumber = function(number) {
   return new Promise(function(resolve,reject) {
   AsyncStorage.setItem(UserNumberKey,number)
   .then( (succss) => {
    resolve(succss)
   })
   .catch(err => reject(err))
   
 });
}

export var getUserNumber = function() {
  return new Promise(function(resolve,reject) {
     AsyncStorage.getItem(UserNumberKey)
     .then( number => resolve(number))
     .catch(err => reject(err))
 });
}


export var setUserName = function(name) {
   return new Promise(function(resolve,reject) {
   AsyncStorage.setItem(UserNameKey,name)
   .then( (succss) => {
    resolve(succss)
   })
   .catch(err => reject(err))
   
 });
}

export var getUserName = function() {
  return new Promise(function(resolve,reject) {
     AsyncStorage.getItem(UserNameKey)
     .then( name => resolve(name))
     .catch(err => reject(err))
 });
}

export var setUserSex = function(sex) {
   return new Promise(function(resolve,reject) {
   AsyncStorage.setItem(UserSexKey,sex)
   .then( (succss) => {
    resolve(succss)
   })
   .catch(err => reject(err))
   
 });
}

export var getUserSex = function() {
  return new Promise(function(resolve,reject) {
     AsyncStorage.getItem(UserSexKey)
     .then( sex => resolve(sex))
     .catch(err => reject(err))
 });
}


