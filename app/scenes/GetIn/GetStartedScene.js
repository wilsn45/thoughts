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
import Modal from 'react-native-modal';
import * as RNLocalize from "react-native-localize";
var Spinner = require('react-native-spinkit');
    export default function GetStarted(props) {
       const {navigation} = props;
       const {navigate} = navigation;

    //1 - DECLARE VARIABLES
    const [loginSelected, setLoginSelected] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [usernamePlaceholder, setUsernamePlaceholder] = useState("Username or Email");
    const [passwordPlaceholder, setPasswordPlaceholder] = useState("Password");

    const [error, setError] = useState(null);


    const [buttonText, setButtonText] = useState("Get Started");
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        try {

    }
    catch(err) {
        console.log("error" + err)
    }
  });

   function showError(message="Oops..we are broken.") {
    setIsLoading(false)
    setError(true);
    setMessage(message)
 }

function clearError() {
    setError(false);
    if (!otcView) {
        setMessage("We will keep it safe.")
    } else {
        setMessage("We just sent you a code, please let us know that")
    }
}

async function login() {
  setIsLoading(!isLoading)
}

async function signUp() {
  setIsLoading(true)
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
            await userStorage.setUserData(uid,number,country)
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
      setUsernamePlaceholder("Username or Email")
      setPasswordPlaceholder("Password")
      setButtonText("Get In")
  }else {
    setUsernamePlaceholder("Choose username")
    setPasswordPlaceholder("Password")
    setButtonText("Get Started")
  }
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
          onChangeText={(value) => setUsername(value)}
          autoFocus = {true}
          placeholder = {usernamePlaceholder}
          placeholderTextColor = "#88898a"
         />

         <TextInput style={styles.textinput}
           onChangeText={(value) => setPassword(value)}
          autoFocus = {true}
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


      {
        error && <View>
          <Text style= { error ? styles.errorText : styles.errorText}>
            {error}
          </Text>
        </View>
      }

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
        style={username && password ? styles.getButtonEnabled : styles.getButtonDisabled}
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
errorText : {
    width : '100%',
    fontSize: 16,
    alignSelf : 'center',
    fontFamily: "Thonburi",
    color : '#189afd',
    fontWeight : "100",
    textAlign : "center"
},
errorText : {
    width : 250,
    fontSize: 19,
    fontFamily: "Thonburi",
    color : "red",
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
