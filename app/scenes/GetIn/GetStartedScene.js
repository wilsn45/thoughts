import React, { useState, useEffect } from 'react';
import {View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard} from 'react-native';

import * as api from "thoughts/app/services/GetInServices";
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import * as imageHelper from "thoughts/app/helper/ImageHelper";
import { useAuth } from "thoughts/app/provider";
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import * as RNLocalize from "react-native-localize";
var Spinner = require('react-native-spinkit');
    export default function GetStarted(props) {
       const {navigation} = props;
       const {navigate} = navigation;

    //1 - DECLARE VARIABLES
    const [loginSelected, setLoginSelected] = useState(true);
    const [cred, setCred] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [validpin, setValidPin] = useState(null);
    const [verifyPin, setVerifyPin] = useState("");


    const [credPlaceholder, setCredPlaceholder] = useState("Username or Email");
    const [passwordPlaceholder, setPasswordPlaceholder] = useState("Password");

    const [error, setError] = useState(null);
    const [pinError, setPinError] = useState(null);


    const [buttonText, setButtonText] = useState("Get Started");
    const [isLoading, setIsLoading] = useState(false);

    const [showVerifyPin, setShowVerifyPin] = useState(false);




async function login() {
  setIsLoading(true)

  let resp = await api.login(cred,password)
  if(!resp) {
    setIsLoading(false)
    setError("oops! we are broken")
    return
  }
  if(!resp.userExists) {
    setError("No user found")
    setIsLoading(false)
    return
  }
  console.log("user data "+resp.userInfo)

}

async function signUp() {

  // navigate('SetUserInfo', {email : "skk.wilson@gmail.com", password : "kabir4577"});
  setIsLoading(true)

  let resp = await api.signUp(email)
  if(!resp) {
    setIsLoading(false)
    setError("oops! we are broken")
    return
  }
  if(resp.userExists) {
    setError("An user already exists with this email id.")
    setIsLoading(false)
    return
  }
  let pin = resp.pin
  setValidPin(pin)
  setShowVerifyPin(true)
  setIsLoading(false)
}

async function verifyOtc () {

    setIsLoading(true)
    try {
       //  if (otc.length < 6) {
       //     showError("Thats not the code")
       //     return;
       //
       // }
       Keyboard.dismiss()
       // let numberVerifyPromise = api.numberVerify(code,confirmation)
       // let user = await numberVerifyPromise;
       //
       //  if (!user) {
       //   showError()
       //   return
       //  }

        let uid =    "DD9jnDWbPKYPOFD4C355b1ja7bF2"
        let number =  "+919958565727"
        // let uid =    user.uid
        // let number =  user.phoneNumber

        console.log("id is " +uid)
        console.log("number is " +number)

        let userStatusPromise = api.getUserData(uid,number)
        let response = await userStatusPromise
        if(!response) {
            console.log("new user")
            await userStorage.setUserData(email,password)
            navigate('SetUserInfo');
        }
        else {
           console.log("old user")
            let url = await api.getMinProfileUrl(uid)
            let imageHelperPromise = imageHelper.saveProfileBase64(url)
            let profileBase64 = await imageHelperPromise
            await userStorage.initUser(uid,response,profileBase64)
            navigate('App');
        }
 }
 catch(err) {
        if(err.message.includes("[auth/invalid-verification-code]"))
         {
            showError("Thats not the code")
            return
         }
        showError()
        console.log("error is " + err)
    }
}

function changeOption(value) {
  setLoginSelected(value)
  if(value) {
      setCredPlaceholder("Username or Email")
      setPasswordPlaceholder("Password")
      setButtonText("Get In")
  }else {
    setCredPlaceholder("Email")
    setPasswordPlaceholder("Password")
    setButtonText("Get Started")
  }
}

async function verifyPinCallBack(value) {
  if(verifyPin.length > value.length) {

    if (value.length < 12) {
      value = value.slice(0,value.length-3)
    }
    if(value.length > 12) {
      value = value.slice(0,value.length-1)
    }
    setVerifyPin(value)
    setPinError(null)

  }else {
    if (value.length < 12) {
      setVerifyPin(value + "   ")
      return
    }
    if(value.length > 12) {
      setVerifyPin(value)
    }

    let pin = value.split(" ").join("")
    if(validpin !=pin) {
      setPinError("Invalid Pin")
      return
    }
    setShowVerifyPin(false)
    await userStorage.setUserData(email,password)
    navigate('SetUserInfo', {email : email, password : password});
  }
}

function forgotPassword() {
  navigate('ForgotPassword', {cred : cred})
}

return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

    <View style = {styles.main} >

    <View style = {styles.center}>

    <View style = {{width : '55%',marginTop : 100, flexDirection : 'row', alignItems : "center", justifyContent : 'space-between', borderWidth : 0, borderColor : "red", marginBottom : 30}}>
        <TouchableOpacity
          onPress={() => changeOption(true)}>
          <Text style={loginSelected ? styles.optionSelected : styles.optionUnSelected}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => changeOption(false)}>
          <Text style={!loginSelected ? styles.optionSelected : styles.optionUnSelected}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style = {{flex : 1, marginTop : 50,width : '80%', alignItems : "center", justifyContent : 'center', borderWidth : 0, borderColor : "red",}}>

        <TextInput style={styles.textinput}
          onChangeText={(value) => {setError(null); loginSelected ? setCred(value) : setEmail(value)}}
          autoFocus = {true}
          placeholder = {credPlaceholder}
          placeholderTextColor = "#88898a"
         />

         <TextInput style={styles.textinput}
           onChangeText={(value) => {setError(null);setPassword(value)}}
          secureTextEntry={loginSelected}
          placeholder = {passwordPlaceholder}
          placeholderTextColor = "#88898a"
          />

      </View>
      <View style = {{height : 50, marginTop : 0,borderWidth : 0, borderColor : "red"}}>
      {
        loginSelected &&
        <TouchableOpacity
          onPress={() => forgotPassword()}>
          <Text style = {{fontSize: 18, fontFamily: "Thonburi",fontWeight : "100",color : "#cbcbcb"}}>Forgot password?</Text>
        </TouchableOpacity>
      }
      </View>

      <View style = {{height : 30, width : '100%', alignItems : "center", borderWidth : 0}}>
      {
        error &&
          <Text style= {{fontSize: 17,fontFamily: "Thonburi",color : "red"}}>
            {error}
          </Text>
      }
      </View>

    </View>

    <View style = {styles.bottomView}>
    {
        isLoading &&
        <View style = {styles.loadingView}>
        <Spinner style={styles.spinner} isVisible={true} size={50} type="Arc" color="#189afd"/>
        </View>

    }
    {
        !isLoading &&
        <TouchableOpacity
        style={(email || cred) && password ? styles.getButtonEnabled : styles.getButtonDisabled}
        onPress={() => loginSelected ? login() : signUp()}
        underlayColor='#fff'
        >
        <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    }

    <TouchableOpacity
      onPress={() => forgotPassword()}>
      <Text style = {{marginTop : 20, fontSize: 15, fontFamily: "Thonburi",fontWeight : "100",color : "#32c2ff"}}>Privacy Policy</Text>
    </TouchableOpacity>

    </View>


    <Modal isVisible={showVerifyPin} swipeArea={50} style = {{alignSelf : "center",width : '80%'}} >
      <View style = {{width : '100%', height : 250, backgroundColor : "#fff", justifyContent : "center"}}>

      <Text style= { {alignSelf : "center", marginBottom : 10, fontSize: 20,fontFamily: "Thonburi",fontWeight : "100", color : "#cbcbcb",}}>
        Enter verification pin
      </Text>

      <Text style= { {alignSelf : "center", marginBottom : 30, fontSize: 15,fontFamily: "Thonburi",fontWeight : "100", color : "#cbcbcb",}}>
        We sent on your email id
      </Text>


      <TextInput style={{width :170, borderBottomWidth : 1,alignSelf : "center",paddingLeft : 10, paddingRight : 20, fontSize: 24,fontFamily: "Thonburi",fontWeight : "100", }}
        onChangeText={(value) => verifyPinCallBack(value)}
        maxLength={13}
        value = {verifyPin}
        autoFocus = {true}
      />
      <View style = {{marginTop : 20,height : 50,alignSelf : "center"}}>
      {
        pinError && <View>
          <Text style= {{width : 100,fontSize: 19,fontFamily: "Thonburi",color : "red"}}>
            {pinError}
          </Text>
        </View>
      }
      </View >


      </View>
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
       backgroundColor : "#fff",

    },
    center : {
      flex : 0.5,
      width : '90%',
      alignSelf: 'center',
      justifyContent : "center",
      alignItems : "center",
      borderColor : "red",
      borderWidth : 0,
},
bottomView : {
  flex : 0.3,
  width : '90%',
  alignSelf: 'center',
  justifyContent : "space-between",
  alignItems : "center",
  borderColor : "blue",
  borderWidth : 0,

},
optionUnSelected : {
    fontSize: 28,
    fontFamily: "Thonburi",
    fontWeight : "100",
    color : "#cbcbcb",
    marginBottom : 50,
},
optionSelected : {
  fontSize: 32,
  fontFamily: "Thonburi",
  fontWeight : "100",
  color : "#32c2ff",
  marginBottom : 50,
},
textinput : {
  width : '100%',
  height : '25%',
  color : 'black',
  fontSize: 20,
  textAlign : "auto",
  borderBottomWidth : 1,
  borderColor : "black",
  paddingLeft : 10,
  marginBottom : 70
},
getButtonDisabled: {
    marginTop : 100,
    width : '80%',
    height : 60,
    backgroundColor:'#9ea7b0',
    borderRadius:25,
    justifyContent:  "center",
    alignSelf: "center"
},
getButtonEnabled: {
    marginTop : 100,
    width : '80%',
    height : 60,
    backgroundColor:'#32c2ff',
    borderRadius:25,
    justifyContent:  "center",
    alignSelf: "center"
},
loadingView: {
  marginTop : 100,
  width : '70%',
  height : 60,
  // borderColor : "#189afd",
  // borderWidth : 1,
  // borderRadius:15,
  justifyContent:  "center",
  alignSelf: "center",
  alignItems : "center"
},

buttonText: {
  color:'#fff',
  textAlign:'center',
  fontSize: 23,
  fontFamily: "Thonburi",
  fontWeight : "100",
}


});

GetStarted.navigationOptions = ({}) => {
    return {
        title: ``
    }
};
