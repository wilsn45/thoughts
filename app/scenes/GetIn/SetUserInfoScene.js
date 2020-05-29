import React, { useState, useEffect } from 'react';
import {View,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  TouchableOpacity
} from 'react-native';
import * as api from "thoughts/app/services/GetInServices";
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'
import { useAuth } from "thoughts/app/provider";
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import Icon from 'react-native-vector-icons/Feather';
var Spinner = require('react-native-spinkit');
import Modal from 'react-native-modal';
import {Keyboard} from 'react-native'


let isNewUser;


export default function SetUserInfoScene(props) {
  const {navigation} = props;
  const {navigate} = navigation;
let email = useNavigationParam('email');
let password = useNavigationParam('password');
const[userName, setUserName] = useState(null);
const[timer, setTimer] = useState(null);
const[userNameFound, setUserNameFound] = useState(false);
const[error, setError] = useState(false);
const[isFinding, setIsFinding] = useState(false);

const [isLoading, setIsLoading] = useState(false);

useEffect(() => {

});

function userNameCallBack(value) {
  // console.log("length "+value.length)
  if(!value) {
    console.log("empty")
    setIsFinding(false)
    clearTimeout(timer);
    return
  }
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
if(!value) {
  return
}
  api.isUserNameAvailable(value)
  .then( availale => {
    if(!availale) {
        setError("oops! username not availale")
    }
    else {
      Keyboard.dismiss()
      setUserNameFound(true)
      setUserName(value)

    }
    setIsFinding(false)
  })
  .catch(err => {
     setIsFinding(false)
      console.log("console error "+err)
    })
}

async function setUserInfo(sex) {
  try {
    setIsLoading(true)
    setError(false)
    let resp =  await api.addUser(email,password,userName,sex)
    //console.log("resp is "+JSON.stringify(resp) )
    if(resp.error) {
      setError(true)
    }
    let custRsp = {
      uid : resp.data.token,
      username : userName,
      sex : sex,
      isPrivate : false
    }
    await userStorage.initUser(custRsp)
    await api.getMinProfile(resp.data.token,sex)
    setIsLoading(false)
    navigate('App')

  }catch (err) {
    console.log("erorr is "+err)
    setError(true)
  }
}

return (
  <View style={styles.main}>
   <View style = {styles.middleView}>

   <View style = {styles.usernameView}>
    <View style={styles.middleSubView}>

     <TextInput style={styles.userNameTextView}
       onChangeText={(value) => userNameCallBack(value)}
       placeholder = "Choose a username"
       placeholderColor = {"#cbcbcb"}
        autoFocus = {true}
    />
    {
      isFinding && <Spinner  isVisible={true} size={25} type="Arc" color="#32c2ff"/>
    }
    </View>
    {
      error &&  <Text style = {styles.errorText}> {error} </Text>
    }
   </View>


    { userNameFound &&

      <View style = {styles.sexView}>

      <TouchableOpacity
        style={styles.maleView}
        onPress={() => setUserInfo("Male")}
       >
        <Text  style={styles.maleText}> Male </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.femaleView}
        onPress={() => setUserInfo("Female")}
       >
        <Text  style={ styles.femaleText}> Female </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={ styles.nonBinaryView}
        onPress={() => setUserInfo("NonBinary")}
       >
        <Text  style={styles.nonBinaryText}> Non Binary </Text>
      </TouchableOpacity>

      </View>
    }


    <Modal isVisible={isLoading} swipeArea={50} style = {{alignSelf : "center",width : '80%'}} >
      <View style = {{width : '100%', height : 150, backgroundColor : "#fff", alignItems : "center",justifyContent : "center"}}>

      {
      !error &&
          <Spinner  isVisible={true} size={50} type="Arc" color="#32c2ff"/>
      }
      {
        error &&

        <View style = {{width : '100%',flex : 1, marginLeft : 10,marginTop : 5,alignItems : "flex-start", justifyContent : "flex-start"}}>
          <TouchableOpacity
                 style = {{marginLeft : 5,marginTop : 5, marginBottom : 40,alignSelf : "flex-start"}}
                 onPress={() => setIsLoading(false)}>
                 <Icon name={"x"}  size={28}  color={"gray"}   />
            </TouchableOpacity>

            <Text style= {{width : 300,alignSelf : "center", fontSize: 19,fontFamily: "Thonburi",color : "red"}}>
              Oops!.. We are broken(
            </Text>
        </View>



      }



      </View>
    </Modal>
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
  usernameView : {
    width : '80%',
    flex : 0.2,
    // borderColor : "red",
    // borderWidth : 2

  },
  userNameTextView : {
   width : '75%',
   color : '#32c2ff',
   fontSize: 25,
   marginRight : 25,
  },

  setButtonView: {
      marginTop : 10,
      width : '70%',
      flex : 0.1,
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
  },
  errorText : {
     width : 300,
     fontSize: 19,
     fontFamily: "Thonburi",
     color : "red",
     textAlign:'center',
 },
 sexView : {
   marginTop : 100,
   flex : 0.6,
   width : '100%',
   flexDirection : "row",
   justifyContent: 'space-between',
   // borderWidth : 1
 },
 maleView : {
   width : '30%',
   height : '40%',
   alignItems: 'center',
   justifyContent: 'center',
   borderColor: '#149cea',
   borderWidth : 2,

 },
 maleSelctedView : {
   width : '30%',
   height : '50%',
   alignItems: 'center',
   justifyContent: 'center',
   marginRight : 50,
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
   height : '40%',
   alignItems: 'center',
   justifyContent: 'center',
   borderColor: '#e6007b',
   borderWidth : 2,

 },
 femaleSelctedView : {
   width : '35%',
   height : '50%',
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
   height : '40%',
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



});

SetUserInfoScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};
//




 ///<Spinner style={styles.spinner}  isVisible={true} size={60} type={"FadingCircleAlt"} color={"#63b1bf"}/>
