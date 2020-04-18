import React, { useState, useEffect } from 'react';
import {View,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  TouchableOpacity
} from 'react-native';
import * as api from "thoughts/app/services/UserGetInServices";
import { useAuth } from "thoughts/app/provider";
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import Icon from 'react-native-vector-icons/Feather';
var Spinner = require('react-native-spinkit');


let isNewUser;


export default function SetUserInfoScene(props) {
  const {navigation} = props;
  const {navigate} = navigation;
const[userName, setUserName] = useState(null);
const[timer, setTimer] = useState(null);
const[userNameFound, setUserNameFound] = useState(false);
const[error, setError] = useState();
const[isFinding, setIsFinding] = useState(false);

const[male, setMale] = useState(false);
const[female, setFemale] = useState(false);
const[nonBinary, setNonBinary] = useState(false);
const[sex, setSex] = useState(null);

useEffect(() => {

});

async function updateActiveToken() {
    let activePromise = userStorage.setUserActive()
    await activePromise;
}

function userNameCallBack(value) {
  setError(null)
  setUserNameFound(false)
  clearTimeout(timer);
  setIsFinding(true)
  let newTimer = setTimeout( () => {
    isUsernameAvailable(value);
  },2000);
  setTimer (newTimer)

}

function isUsernameAvailable(value) {
  setUserName(value)
  api.isUserNameAvailable(value)
  .then( availale => {
    if(!availale) {
        setError("oops! username not availale")
    }
    else {
      setUserNameFound(true)
    }
    setIsFinding(false)
  })
  .catch(err => {
     setIsFinding(false)
      console.log("console.error() "+err)

  })
}

async function saveUserName() {
  let userNamePromise =  userStorage.setUserName(userName)
  await userNamePromise;
  navigate('SetProfile');
}

async function setUserInfo() {
  let userNamePromise =  userStorage.setUserName(userName)
  let userSexPromise =  userStorage.setUserSex(sex)
  await userNamePromise;
  await userSexPromise;
  console.log("saved")
  //navigate('SetProfile');
}

return (
  <View style={styles.main}>
   <View style = {styles.middleView}>
   <Text style={styles.thoughtsText}>Choose a username</Text>
   <View style={styles.middleSubView}>
    <TextInput style={styles.userNameTextView}
       onChangeText={(value) => userNameCallBack(value)}
        autoFocus = {true}
    />
    {
      isFinding && <Spinner  isVisible={true} size={25} type="Arc" color="#189afd"/>
    }
    </View>
    {
      error &&  <Text style = {styles.errorText}> {error} </Text>
    }

    { userNameFound &&

      <View style = {styles.sexView}>

      <TouchableOpacity
        style={ male ? styles.maleSelctedView : styles.maleView}
        onPress={() => {setMale(true); setSex("Male"); setFemale(false); setNonBinary(false) }}
       >
        <Text  style={ male ? styles.maleSelctedText : styles.maleText}> Male </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={ female ? styles.femaleSelctedView : styles.femaleView}
        onPress={() => {setFemale(true); setSex("Female"); setMale(false); setNonBinary(false)}}
       >
        <Text  style={ female ? styles.femaleSelctedText : styles.femaleText}> Female </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={ nonBinary ? styles.nonBinarySelctedView : styles.nonBinaryView}
        onPress={() => {setNonBinary(true); setSex("nonbinary"); setFemale(false); setMale(false)}}
       >
        <Text  style={ nonBinary ? styles.nonBinarySelctedText : styles.nonBinaryText}> Non Binary </Text>
      </TouchableOpacity>

      </View>
    }

      { sex &&
          <TouchableOpacity
          style={ styles.setButtonView}
          onPress={() => setUserInfo()}
          underlayColor='#fff'>
          <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
      }

    </View>
</View>

  );
};

const styles = StyleSheet.create({

  main : {
      flex : 1,
      width : '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor : "green",
      backgroundColor : "#fff",
  },
 middleView : {
    flex : 0.7,
    width : '90%',
    alignItems: 'center',
    justifyContent : 'center',
    borderColor: 'red',
    // borderWidth : 2
  },
  thoughtsText : {
    fontSize: 22,
    fontFamily: "Thonburi",
    fontWeight : "100",
    textAlign : "auto",
    marginBottom : 30
  },
  middleSubView : {
    marginTop : 30,
    height : 60,
    flexDirection : "row",
    alignSelf : "center",
    alignItems : "flex-start",
    justifyContent : "center",
    borderColor: 'red',
    // borderWidth : 2
  },
  userNameTextView : {
   width : '50%',
   color : '#189afd',
   fontSize: 25,
   marginRight : 25,
   textAlign:'center',
  },
  buttomView : {
    marginTop : 80,
    width : 80,
    height : 80,
    borderRadius : 40,
    alignItems : "center",
    justifyContent : "center",
    backgroundColor : '#189afd',
    alignSelf : "flex-end"

  },
  errorText : {
     width : 300,
     fontSize: 19,
     fontFamily: "Thonburi",
     color : "red",
     textAlign:'center',
 },
 sexView : {
   flex : 0.4,
   width : '95%',
   flexDirection : "row",
   justifyContent: 'space-between'
 },
 maleView : {
   width : '30%',
   height : '60%',
   alignItems: 'center',
   justifyContent: 'center',
   borderColor: '#149cea',
   borderWidth : 2,

 },
 maleSelctedView : {
   width : '30%',
   height : '60%',
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: '#149cea',
 },
 maleText : {
   fontSize: 19,
   fontFamily: "Thonburi",
   color : '#149cea',
 },
 maleSelctedText : {
   fontSize: 19,
   fontFamily: "Thonburi",
   color : '#fff',
 },

 femaleView : {
   width : '30%',
   height : '60%',
   alignItems: 'center',
   justifyContent: 'center',
   borderColor: '#e6007b',
   borderWidth : 2,

 },
 femaleSelctedView : {
   width : '30%',
   height : '60%',
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: '#e6007b',
 },
 femaleText : {
   fontSize: 19,
   fontFamily: "Thonburi",
   color : '#e6007b',
 },
 femaleSelctedText : {
   fontSize: 19,
   fontFamily: "Thonburi",
   color : '#fff',
 },

 nonBinaryView : {
   width : '30%',
   height : '60%',
   alignItems: 'center',
   justifyContent: 'center',
   borderColor: '#bcc1bf',
   borderWidth : 2,

 },
 nonBinarySelctedView : {
   width : '30%',
   height : '60%',
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: '#bcc1bf',
 },
 nonBinaryText : {
   fontSize: 19,
   fontFamily: "Thonburi",
   color : '#bcc1bf',
 },
 nonBinarySelctedText : {
   fontSize: 19,
   fontFamily: "Thonburi",
   color : '#fff',
 },

 setButtonView: {
     marginTop : 40,
     width : '70%',
     height : 60,
     backgroundColor:'#189afd',
     borderRadius:25,
     justifyContent:  "center",
     alignSelf: "center"
 },
 buttonText: {
   color:'#fff',
   textAlign:'center',
   fontSize: 23,
   fontFamily: "Thonburi",
   fontWeight : "100",
 }

});

SetUserInfoScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};
//




 ///<Spinner style={styles.spinner}  isVisible={true} size={60} type={"FadingCircleAlt"} color={"#63b1bf"}/>
