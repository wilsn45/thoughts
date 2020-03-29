import axios from 'axios';
import auth from '@react-native-firebase/auth';

import * as c from '../constants';
//Google Map API Key : AIzaSyCr65NbaaL4JvLuuvr5-n9QYH_1YxCRT1Q


export async function phoneNumberSignin(number) {
    
  let res = await auth().signInWithPhoneNumber(number).then((res) => {
        console.log("res is "+JSON.stringify(res))
        return
      }).catch(() => {
        console.log("error ="+error)
        throw handler("Something went wrong")
      })
}


