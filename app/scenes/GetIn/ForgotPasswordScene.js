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
 export default function ForgotPassword(props) {
       const {navigation} = props;
       const {navigate} = navigation;

    //1 - DECLARE VARIABLES
    const [input, setInput] = useState(null);
    const [email, setEmail] = useState(null);
    const [validpin, setValidPin] = useState(null);
    const [verifyPin, setVerifyPin] = useState("");
    let cred = useNavigationParam('cred');

    const [inputPlaceholder, setInputPlaceholder] = useState("Username or Email");


    const [error, setError] = useState(null);
    const [pinError, setPinError] = useState(null);


    const [buttonText, setButtonText] = useState("Verify");
    const [isLoading, setIsLoading] = useState(false);
    const [verifed, setVerifed] = useState(false);

    const [showVerifyPin, setShowVerifyPin] = useState(false);


useEffect(() => {
  if(cred) {
        setInput(cred)
      }
}, []);

async function verify() {
  // navigate('SetUserInfo', {email : "skk.wilson@gmail.com", password : "kabir4577"});
  setIsLoading(true)

  let resp = await api.forgotPassword(input)
  if(!resp) {
    setIsLoading(false)
    setError("oops! we are broken")
    return
  }
  if(!resp.userExists) {
    setError("No user exists with given email/username")
    setIsLoading(false)
    return
  }
  let pin = resp.pin
  console.log("Pin is "+pin)
  console.log("email is "+resp.email)
  setEmail(resp.email)
  setValidPin(pin)
  setShowVerifyPin(true)
  setIsLoading(false)
}

async function setPassword() {
  setIsLoading(true)
  let resp = await api.updatePassword(email,input)
  setIsLoading(false)
  if(resp) {
    console.log("Going for login")
  //  let resp = await api.login(username,input)
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
    setInput(null)
    setShowVerifyPin(false)
    setVerifed(true)
    setInputPlaceholder("New Password")
    setButtonText("Update Password")
  }
}

function navigateBack() {
  navigate('GetStarted')
}

return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

    <View style = {styles.main} >

    <TouchableOpacity
      style = {{marginTop : 30}}
      onPress={() => navigateBack()}
      underlayColor='#fff'
     >

      <Icon name={'chevron-left'}  style = {{}} size={40} />
    </TouchableOpacity>

    <View style = {styles.center}>

    <TextInput style={styles.textinput}
          onChangeText={(value) => {setError(null);setInput(value)}}
          autoFocus = {true}
          value = {input}
          placeholder = {inputPlaceholder}
          placeholderTextColor = "#88898a"
     />



      <View style = {{height : 30, width : '100%',marginTop : 50, alignItems : "center", borderWidth : 0}}>
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
        style={input ? styles.getButtonEnabled : styles.getButtonDisabled}
        onPress={() => {verifed ? setPassword() : verify()}}
        underlayColor='#fff'
        >
        <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    }

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
        alignItems : "flex-start",
        justifyContent : "flex-start",
       backgroundColor : "#fff",

    },
    center : {
      flex : 0.7,
      width : '90%',
      alignSelf : "center",
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
  width : '80%',
  color : 'black',
  fontSize: 20,
  textAlign : "auto",
  borderBottomWidth : 1,
  borderColor : "black",
  paddingLeft : 10,
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

ForgotPassword.navigationOptions = ({}) => {
    return {
        title: ``
    }
};
