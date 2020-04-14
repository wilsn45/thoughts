
import AsyncStorage from '@react-native-community/async-storage'

const UserTokenKey = "@UserToken"
const UserActiveKey = "@UserActive"
const UserNumberKey = "@UserNumber"
const UserNameKey = "@UserName"
const UserSexKey = "@UserSex"
const UserCategoriesKey = "@UserCategories"
const UserProfileURLKey = "@UserProfileURL"
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

export var setUserActive = () => {
   return new Promise((resolve,reject) => {
   AsyncStorage.setItem(UserActiveKey,"true")
   .then( (success) => {
    resolve(success)
   })
   .catch(err => reject(err))
   
 });
}

export var getIsUserActive = () =>{
  return new Promise((resolve,reject) =>{
     AsyncStorage.getItem(UserActiveKey)
     .then( value => resolve(value))
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

export var setUserCategories = (categories) => {
   return new Promise((resolve,reject) => {
   AsyncStorage.setItem(UserCategoriesKey,JSON.stringify(categories))
   .then( (success) => {
    resolve(success)
   })
   .catch(err => reject(err))
   
 });
}

export var getUserCategories = () => {
  return new Promise((resolve,reject) =>{
     AsyncStorage.getItem(UserCategoriesKey)
     .then( categories => resolve(JSON.parse(categories)))
     .catch(err => reject(err))
 });
}

export var setUserProfileURL = (url) => {
   return new Promise((resolve,reject) => {
   AsyncStorage.setItem(UserProfileURLKey,url)
   .then( (success) => {
    resolve(success)
   })
   .catch(err => reject(err))
   
 });
}

export var getUserProfileURL = () => {
  return new Promise((resolve,reject) =>{
     AsyncStorage.getItem(UserProfileURLKey)
     .then( url => resolve(url))
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

export async function setUserData(token,number)  {
  try {
    let tokenPromise =  setUserToken(token)
    let numberPromise = setUserNumber(number)
    let userToken = await tokenPromise;
    let userNumber = await numberPromise;
  }
  catch (err) {
    throw handler(err); 
  }
    
}

export async function initUser(response) {
   try {

    let sex = response.sex
    let userName = response.user_name
    let categories = response.categories
    let profile_url = response.profile_pic

    console.log("sex is " + sex)
    console.log("username is " + userName)
    console.log("categories is " + categories)
    console.log("profile is " + profile_url)


    let userNamePromise =  setUserName(userName)
    let userSexPromise = setUserSex(sex)
    let UserCategoriesPromise = setUserCategories(categories)
    let userProfileURLPromise = setUserProfileURL(profile_url)
    let activePromise    =      setUserActive()
    
    await userNamePromise;
    await userSexPromise;
    await UserCategoriesPromise;
    await userProfileURLPromise;
    await activePromise;
  }
   catch (err) {

    throw Error(err); 
   }
}


// export async function test() {
//    console.log("**************TESTING*************")
//     let userNamePromise =  getUserName()
//     let userSexPromise = getUserSex()
//     let UserCategoriesPromise = getUserCategories()
//     let userProfileURLPromise = getUserProfileURL()

//    let userName =  await userNamePromise;
//    let sex =  await userSexPromise;
//    let categories = await UserCategoriesPromise;
//    let profile_pic = await userProfileURLPromise;

//     console.log("username is " + userName)
//     console.log("sex is " + sex)
//     console.log("categories is " + categories)
//     console.log("profile is " + profile_pic)
   
// }

