import axios from 'axios';
import auth from '@react-native-firebase/auth';

import * as c from '../constants';
//Google Map API Key : AIzaSyCr65NbaaL4JvLuuvr5-n9QYH_1YxCRT1Q


function getErrorMessage(error) {

}

export async function phoneNumberSignin(number) {
    
  let res = await auth().signInWithPhoneNumber(number).then((res) => {
        console.log("res is "+JSON.stringify(res))
        return
      }).catch(() => {
        console.log("error ="+error)
        throw handler("Something went wrong")
      })
}


export async function register(data){
    try{
        let res = await axios.post(c.REGISTER, data);

        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function GetIn(data){
    try{
        let res = await axios.post(c.GetIn, data);

        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export async function forgotPassword(data) {
    try {
        let res = await axios.post(c.FORGOT_PASSWORD, data);

        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function updateProfile(userId, data){
    try{
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };

        const form_data = new FormData();
        for ( let key in data )
            form_data.append(key, data[key]);

        let res = await axios.put(`${c.UPDATE_PROFILE}/${userId}`, form_data, options);
        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}