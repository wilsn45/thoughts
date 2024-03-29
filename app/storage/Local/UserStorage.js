import AsyncStorage from '@react-native-community/async-storage'
import * as  User  from "thoughts/app/User";

const UserTokenKey = "@UserToken"
const UserNameKey = "@UserName"
const UserSexKey = "@UserSex"
const UserTagsKey = "@UserTags"
const UserProfileBaseDataKey = "@UserProfileBaseData"
const UserCountryKey = "@UserCountry"
const IsPrivateProfileKey = "@IsPrivateProfile"
const FavoriteConversationKey = "@FavoriteConversation"


export async function setUserToken (token){
  try {
    let tokenPromise = AsyncStorage.setItem(UserTokenKey,token)
    await tokenPromise
   } catch (err) {
    throw new Error(err.message)
  }
}

export async function getUserToken () {
  try {
    let tokenPromise = AsyncStorage.getItem(UserTokenKey)
    return await tokenPromise
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function setUserCountry(country){
  try {
    let countryPromise = AsyncStorage.setItem(UserCountryKey,country)
    await countryPromise
   } catch (err) {
    throw new Error(err.message)
  }
}

export async function getUserCountry (){
  try {
    let countryPromise = AsyncStorage.getItem(UserCountryKey)
    return await countryPromise
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function setUserName(name){
  try {
    let namePromise = AsyncStorage.setItem(UserNameKey,name)
    await namePromise
   } catch (err) {
    throw new Error(err.message)
  }
}

export async function getUserName () {
  try {
    let namePromise = AsyncStorage.getItem(UserNameKey)
    return await namePromise
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function setUserSex(sex) {
  try {
    let sexPromise = AsyncStorage.setItem(UserSexKey,sex)
    await sexPromise
   } catch (err) {
    throw new Error(err.message)
  }
}

export async function getUserSex () {
  try {
    let sexPromise = AsyncStorage.getItem(UserSexKey)
    return await sexPromise
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function setTags(tags) {
  try {
    let tagsPromise = AsyncStorage.setItem(UserTagsKey,JSON.stringify(tags))
    await tagsPromise
   } catch (err) {
    throw new Error(err.message)
  }
}

export async function getTags () {
  try {
    let tagsPromise = AsyncStorage.getItem(UserTagsKey)
    let tags = await tagsPromise
    return JSON.parse(tags)
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function setUserProfileMinBase64 (data){
  try {
    let base64Promise = AsyncStorage.setItem(UserProfileBaseDataKey,data)
    await base64Promise
   } catch (err) {
    throw new Error(err.message)
  }
}

export async function getUserProfileMinBase64(){
  try {
    let base64Promise = AsyncStorage.getItem(UserProfileBaseDataKey)
    return await base64Promise
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function setIsPrivate(state) {
  try {
    let isPrivatePromise = AsyncStorage.setItem(IsPrivateProfileKey,JSON.stringify(state))
    await isPrivatePromise
   } catch (err) {
    throw new Error(err.message)
  }
}

export async function getIsPrivate () {
  try {
    let isPrivatePromise = AsyncStorage.getItem(IsPrivateProfileKey)
    let state = await isPrivatePromise
    return  JSON.parse(state)
  } catch (err) {
    throw new Error(err.message)
  }
}

// export async function setFavouriteConversatin(uid) {
//   try {
//     let favCon = await getFavoriteConversation()
//     favCon.push(uid)
//     let hiddenPromise = AsyncStorage.setItem(FavoriteConversationKey,JSON.stringify(favCon))
//     await hiddenPromise
//    } catch (err) {
//     throw new Error(err.message)
//   }
// }
//
// export async function removeFavoriteConversation(uid) {
//   try {
//     let favCon = await getFavoriteConversation()
//
//     const index = array.indexOf(uid);
//       if (index > -1) {
//         favCon.splice(index, 1);
//      }
//     favCon.push(uid)
//     let hiddenPromise = AsyncStorage.setItem(FavoriteConversationKey,JSON.stringify(favCon))
//     await hiddenPromise
//    } catch (err) {
//     throw new Error(err.message)
//   }
// }
// export async function getFavoriteConversation () {
//   try {
//     let hiddenPromise = AsyncStorage.getItem(FavoriteConversationKey)
//     let users = await hiddenPromise
//     if(users) {
//       return  JSON.parse(users)
//     }
//     return []
//   } catch (err) {
//     throw new Error(err.message)
//   }
// }


export async function initUser(resp) {
   try {
    await setUserToken(resp.uid)
    await setUserName(resp.username)
    await setUserSex(resp.sex)
    await setIsPrivate(resp.isPrivate)

    User.uid = resp.uid
    User.username = resp.username
    User.sex = resp.sex
    User.isPrivate = resp.isPrivate

    console.log("uid  "+User.uid)
    console.log("isprivate  "+User.isPrivate)

}
   catch (err) {
     throw Error(err);
   }
}
