import React, { useState, useEffect } from 'react';
import {View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard} from 'react-native';

import * as api from "thoughts/app/services/UserGetInServices";
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import * as imageHelper from "thoughts/app/helper/ImageHelper";
import { useAuth } from "thoughts/app/provider";
import Icon from 'react-native-vector-icons/Feather';
import CountryCodeModal from "./CountryCodeModal";
import Modal from 'react-native-modal';
import * as RNLocalize from "react-native-localize";
import {CountryCodeList} from "thoughts/app/storage/Local/CountryCodeList";
var Spinner = require('react-native-spinkit');

    export default function GetStarted(props) {
       const {navigation} = props;
       const {navigate} = navigation;

    //1 - DECLARE VARIABLES
    const [confirmation, setConfirmation] = useState(null);
    const [selectCountryCode, setSelectCountryCode] = useState(false);
    const [otcView, setOtcView] = useState(false);

    const [error, setError] = useState(null);
    const [message, setMessage] = useState("Help us with your phone number");

    const [buttonText, setButtonText] = useState("Get Started");
    const [isLoading, setIsLoading] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [dial_code, setDialCode] = useState("+91");
    const [countryCode, setCountryCode] = useState(null);
    const [otc, setOtc] = useState("");

    useEffect(() => {
        try {
         let country = RNLocalize.getCountry()
         var result = CountryCodeList.find(obj => {
            return obj.code === country
        })
         if (!countryCode) {
            setCountryCode(result.code + " " + result.dial_code)
            setDialCode(result.dial_code)
        }
    }
    catch(err) {
        console.log("error" + err)
    }
});

    function validE164(num) {
       return /^\+?[1-9]\d{1,14}$/.test(num)
   }


   function showError(message="something went wrong.g") {
    setIsLoading(false)
    setError(true);
    setMessage(message)
 }

    function clearError() {
    setError(false);
    if (otcView) {
        setMessage("Your number please")
    } else {
        setMessage("A six digit otp will be sent on your number")
    }
}

function selectCountryCallback (dial_code,code) {
    setCountryCode(code + " " + dial_code)
    setDialCode(dial_code)
    setSelectCountryCode(false)
}

function showOtc() {
    setIsLoading(false)
    setOtcView(true)
    setButtonText("Get In")
    setMessage("We just sent you a code, please let us know that.")
    setError(false)
}

async function sendOtc () {
    setIsLoading(true)
    try {
        // const number = dial_code+phoneNumber;
        // if (!validE164(number)) {
        //     showError("Invalid Phone Number.")
        //     return;
        //
        // }
        // let phoneNumberPromise = api.numberSignIn(number)
        // let confirmation = await phoneNumberPromise
        // setConfirmation(confirmation)
        showOtc()

    } catch (err) {
        if(err.message.includes("[auth/invalid-phone-number]"))
         {
            showError("Invalid Phone Number.")
            return
         }
         console.log("error is " + err)
         showError()
    }
}

async function verifyOtc () {
    setIsLoading(true)
    try {
        if (otc.length < 6) {
           showError("Invalid one time code.")
           return;

       }
       let numberVerifyPromise = api.numberVerify(otc,confirmation)
       let user = await numberVerifyPromise;

        if (!user) {
         showError()
         return
        }

        // let uid =    "DaniyaWIlson"
        // let number =  "+919958565727"
        let uid =    user.uid
        let number =  user.phoneNumber

        console.log("id is " +uid)
        console.log("number is " +number)

        let userStatusPromise = api.getUserData(uid,number)
        let response = await userStatusPromise

        if(!response) {
            console.log("new user")
            await userStorage.setUserData(uid,number)
            navigate('SetUserName');
        }
        else {
           console.log("old user")
            let imageHelperPromise = imageHelper.saveProfileBase64(response.profile_min_url)
            let profileBase64 = await imageHelperPromise
            console.log("login base 64 "+ profileBase64)
            await userStorage.initUser(response,profileBase64)
            navigate('App');
        }
 }
 catch(err) {
        if(err.message.includes("[auth/invalid-verification-code]"))
         {
            showError("Invalid one time code.")
            return
         }
        showError()
        console.log("error is " + err)
    }
}



return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

    <View style = {styles.main} >

    <View style = {styles.center}>

    <Text style={styles.thoughtsText}>Hey</Text>

    { !otcView &&
    <View style = {styles.phone}>
    <View style>
    <TouchableOpacity
      onPress={() => setSelectCountryCode(true)}
      disabled={otcView} >
    <Text style = {styles.countryCodeText} >{countryCode}</Text>
    </TouchableOpacity>
    </View>
    <TextInput style={styles.phoneNumberTextView}
      keyboardType = "phone-pad"
      onChangeText={(value) => { setPhoneNumber(value); clearError()}}
      editable={true}
      maxLength={10}
      autoFocus = {true}
    />
    </View>
    }
    { otcView &&
        <View style = {styles.otc}>
        <View style = {styles.otcIconView}>
        <Icon name={'lock'}  size={30} />
        </View>
        <TextInput style={styles.phoneNumberTextView}
        keyboardType = "phone-pad"
        onChangeText={(value) => {setOtc(value); clearError();}}
        maxLength={6}
        autoFocus = {true}
        />
        </View>
    }
    <View style={styles.messageView}>
      <Text style= { error ? styles.errorText : styles.messageText}>
        {message}
      </Text>
    </View>

    {
        isLoading &&
        <View style = {styles.loadingView}>
        <Spinner style={styles.spinner} isVisible={true} size={40} type="Arc" color="#189afd"/>
        </View>

    }
    {
        !isLoading &&
        <TouchableOpacity
        style={ styles.getButtonView}
        onPress={() => otcView ? verifyOtc() : sendOtc()}
        underlayColor='#fff'
        >
        <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    }



    </View>

    <Modal isVisible={selectCountryCode} swipeArea={50} style = {{width: 200}} >
    <CountryCodeModal  selectCountryCallback = {selectCountryCallback}/>
    </Modal>

    </View>

    </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    main : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
        flexDirection: 'row',
        backgroundColor : "#fff",

    },
    center : {
      flex : 0.9,
      height : '40%',
      alignSelf: 'center',
      flexDirection: 'column',
      alignItems : "center",

  },
  thoughtsText : {
    fontSize: 28,
    fontFamily: "Thonburi",
    fontWeight : "100"
},
phone : {
   marginTop : 50,
   height : 60,
   width : '80%',
   flexDirection: 'row',
   // borderColor: '#F0F0F0',
   // borderBottomWidth : 2,
   borderRadius: 1,
   justifyContent : "center",
   alignItems : "center",
},
countryCodeText : {
    color : 'black',
    fontSize: 24,
    fontWeight : "400"
},
phoneCodeTextView : {
   color : 'black',
   fontSize: 21,
   marginRight: 5,
},
phoneNumberTextView : {
    marginLeft : 10,
    flex: 0.8,
    height : '100%',
    color : 'black',
    fontSize: 24,
},

otc : {
   height : 60,
   marginTop : 50,
   width : '80%',
   flexDirection: 'row',
   // borderColor: '#F0F0F0',
   // borderBottomWidth : 2,
   borderRadius: 15,
},
otcIconView : {
   marginLeft: 30,
   marginRight: 10,
   flex: 0.15,
   justifyContent : "center"
},
otcTextInputView : {
   flex: 0.8,
   height : '100%',
   marginLeft: 10
},
messageView : {
    width : '70%',
    height : 60,
    alignItems : "center",
    justifyContent : "center",
    // borderColor : "red",
    // borderWidth : 1
},
messageText : {
    width : '100%',
    fontSize: 16,
    fontFamily: "Thonburi",
    color : '#189afd',
    marginLeft : 20,
    fontWeight : "100",
    textAlign : "center"
},
errorText : {
    width : 250,
    fontSize: 19,
    fontFamily: "Thonburi",
    color : "red",
},
getButtonView: {
    marginTop : 40,
    width : '70%',
    height : 60,
    backgroundColor:'#189afd',
    borderRadius:15,
    justifyContent:  "center",
    alignSelf: "center"
},
loadingView: {
  marginTop : 40,
  width : '70%',
  height : 60,
  borderColor : "#189afd",
  borderWidth : 1,
  borderRadius:15,
  justifyContent:  "center",
  alignSelf: "center",
  alignItems : "center"
},

buttonText: {
  color:'#fff',
  textAlign:'center',
  fontSize: 23,
  fontFamily: "Thonburi",
  fontWeight : "bold"
}


});

GetStarted.navigationOptions = ({}) => {
    return {
        title: ``
    }
};
