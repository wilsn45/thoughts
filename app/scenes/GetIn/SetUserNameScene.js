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


export default function SetUserNameScene(props) {
  const {navigation} = props;
  const {navigate} = navigation;
const[userName, setUserName] = useState(null);
const[timer, setTimer] = useState(null);
const[userNameFound, setUserNameFound] = useState(false);
const[error, setError] = useState();
const[isFinding, setIsFinding] = useState(false);
const WAIT_INTERVAL = 1000;

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

return (
  <View style={styles.main}>

  <View style = {styles.topView}>
    <Text style = {styles.yourProfileTextStyle}>Lets choose a user name for you</Text>
  </View>

   <View style = {styles.middleView}>
   <View style={styles.middleSubView}>
    <TextInput style={styles.userNameTextView}
       keyboardType = "phone-pad"
        onChangeText={(value) => userNameCallBack(value)}
        placeholder = "Username"
    />
    {
      isFinding && <Spinner  isVisible={true} size={25} type="Arc" color="#189afd"/>
    }
    </View>
    {
      error &&  <Text style = {styles.errorText}> {error} </Text>
    }

    { userNameFound &&
      <View style={styles.buttomView}>
       <TouchableOpacity
         style={ styles.setBottomView}
         onPress={() => saveUserName()}
        >
         <Icon name={'chevron-right'} color = "white" size={50} style = {{alignSelf : "center"}} />
       </TouchableOpacity>
         </View>
     }


    </View>
   <View style = {styles.bottomView}>
   </View>
</View>

  );
};

const styles = StyleSheet.create({

  main : {
      flex : 1,
      width : '100%',
      alignSelf: 'center',
      borderColor : "green",
      backgroundColor : "#fff",
  },
  topView : {
    flex : 0.3,
    marginRight: 5,
    marginTop : 80,
    width : '80%',
    alignSelf : "flex-start",
  },
  settingUpTextStyle : {
    color : '#fb375b',
    fontSize: 40,
    marginLeft : 20,
    marginBottom : 10
  },
  yourProfileTextStyle : {
    color : '#189afd',
    fontSize: 30,
    marginLeft : 20,
    marginTop : 20
  },
  middleView : {
    flex : 0.7,
    marginRight: 5,
    width : '80%',
    alignSelf : "center",
    justifyContent : "flex-start",
    borderColor: 'red',
  },
  middleSubView : {
    height : 100,
    flexDirection : "row",
    alignItems : "flex-end",
    justifyContent : "center",
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
  userNameTextView : {
   width : '75%',
   color : 'black',
   fontSize: 25,
   borderColor: '#F0F0F0',
   borderBottomWidth : 2,
   marginRight : 25,
  },
  bottomView : {
    marginTop : 40,
    width : '25%',
    height : 10,
    backgroundColor : '#fb375b'
 },
 errorText : {
     marginTop : 30,
     width : 300,
     fontSize: 19,
     fontFamily: "Thonburi",
     color : "red",
     alignSelf : "center"
 }
});

SetUserNameScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};
//




 ///<Spinner style={styles.spinner}  isVisible={true} size={60} type={"FadingCircleAlt"} color={"#63b1bf"}/>
