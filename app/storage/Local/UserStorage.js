
import AsyncStorage from '@react-native-community/async-storage'

const UserTokenKey = "@UserToken"
const UserActiveKey = "@UserActive"
const UserNumberKey = "@UserNumber"
const UserNameKey = "@UserName"
const UserSexKey = "@UserSex"
const UserTagsKey = "@UserTags"
const UserProfileBaseDataKey = "@UserProfileBaseData"
const UserCountryKey = "@UserCountry"
const SelectedShowThoughtOptionKey = "@SelectedShowThoughtOption"
const ShowOnlyKey = "@ShowOnly"
const ShowExceptKey = "@ShowExcept"
const HiddenKey = "@Hidden"
const IsPrivateProfileKey = "@IsPrivateProfile"


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

export async function setUserActive(){
  try {
    let activePromise = AsyncStorage.setItem(UserActiveKey,"true")
    await activePromise
   } catch (err) {
    throw new Error(err.message)
  }
}

export async function getIsUserActive() {
  try {
    let activePromise = AsyncStorage.getItem(UserActiveKey)
    return await activePromise
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function setUserNumber(number){
  try {
    let numberPromise = AsyncStorage.setItem(UserNumberKey,number)
    await numberPromise
   } catch (err) {
    throw new Error(err.message)
  }
}

export async function getUserNumber (){
  try {
    let numberPromise = AsyncStorage.getItem(UserNumberKey)
    return await numberPromise
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
export async function setSelectShowOption (option){
  try {
    let selectedPromise = AsyncStorage.setItem(SelectedShowThoughtOptionKey,option)
    await selectedPromise
   } catch (err) {
    throw new Error(err.message)
  }
}

export async function getSelectShowOption () {
  try {
    let selectedPromise = AsyncStorage.getItem(SelectedShowThoughtOptionKey)
    return await selectedPromise
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function setShowOnly(users) {
  try {
    let showOnlyPromise = AsyncStorage.setItem(ShowOnlyKey,JSON.stringify(users))
    await showOnlyPromise
   } catch (err) {
    throw new Error(err.message)
  }
}

export async function getShowOnly () {
  try {
    let showOnlyPromise = AsyncStorage.getItem(ShowOnlyKey)
    let users = await showOnlyPromise
    if(users) {
      return JSON.parse(users)
    }
    return []
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function setShowExcept(users) {
  try {
    let showExceptPromise = AsyncStorage.setItem(ShowExceptKey,JSON.stringify(users))
    await showExceptPromise
   } catch (err) {
    throw new Error(err.message)
  }
}

export async function getShowExcept () {
  try {
    let showExceptPromise = AsyncStorage.getItem(ShowExceptKey)
    let users = await showExceptPromise
    if(users) {
      return JSON.parse(users)
    }
    return []
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function setHidden(users) {
  try {
    let hiddenPromise = AsyncStorage.setItem(HiddenKey,JSON.stringify(users))
    await hiddenPromise
   } catch (err) {
    throw new Error(err.message)
  }
}

export async function getHidden () {
  try {
    let hiddenPromise = AsyncStorage.getItem(HiddenKey)
    let users = await hiddenPromise
    if(users) {
      return  JSON.parse(users)
    }
    return []
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
    return await isPrivatePromise
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function setUserData(token,number,country)  {
  try {
    await setUserToken(token)
    await setUserNumber(number)
    await setUserCountry(country)
  }
  catch (err) {
    throw handler(err);
  }
}

export async function initUser(uid,response,profileBase64) {
   try {
    await setUserToken(uid)
    await setUserNumber(response.number)
    await setUserName(response.username)
    await setUserSex(response.sex)
    await setTags(response.tags)
    await setUserCountry(response.country)
    await setIsPrivate(response.isPrivate)
    await setUserActive()
    await setUserProfileMinBase64(profileBase64)
  }
   catch (err) {
     throw Error(err);
   }
}
