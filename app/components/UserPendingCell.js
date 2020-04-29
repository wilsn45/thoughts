import React, { useState,useEffect } from 'react';
import {View,
        Text,
        Image,
        StyleSheet,
        TouchableOpacity} from 'react-native';
import * as api from "thoughts/app/services/ProfileServices";
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'

export default function UserPendingCell({user,acceptCallBack,rejectCallBack}) {
const[profileURL, setProfileURL] = useState();
const[isAccepting, setIsAccepting] = useState(false);

useEffect(() => {
  getURL()
}, []);

async function getURL() {
  let url = await api.getMinProfileUrl(user.uid)
  setProfileURL(url)
}


 async function acceptRequest() {
   setIsAccepting(!isAccepting)
   acceptCallBack(user.uid,user.username)
 }

 async function rejectRequest() {
   rejectCallBack(user.uid)
 }

  return (
    <View style = {styles.container}>
    <View style = {styles.leftView}>

      <Image style={styles.imageView} source={{uri: profileURL}}/>

    </View>


    <View style = {styles.rightView}>
     <View style ={styles.usernameView}>
          <Text style = {styles.usernameText}> {user.username} </Text>
     </View>

     <View style ={styles.pendingView}>
     <TouchableOpacity
       style={ isAccepting ? styles.setButtonAcceptingView : styles.setButtonView}
       onPress={() => acceptRequest()}
       underlayColor='#fff'>
       <Text style={isAccepting ? styles.buttonAcceptingText : styles.buttonText}>Accept</Text>
    </TouchableOpacity>
    <TouchableOpacity
             onPress={() => rejectRequest()}>
             <Icon name={"x"}  size={20}  color={"black"}   />
        </TouchableOpacity>
     </View>

    </View>

	</View>
  );
};


const styles = StyleSheet.create ({
 container : {
		flex : 1,
	   width : '100%',
     alignSelf : "center",
    flexDirection : 'row',
    borderColor : "grey",
    borderBottomWidth : 0.5,
	},
  imageView : {
    width : 60,
    height : 60,
    borderRadius : 30,
    borderWidth : 0.5,
  },
  leftView : {
    width : '30%',
    height : 90,
    alignItems : 'center',
    justifyContent : 'center',
   //
   //  borderColor : "#149cea",
   // borderWidth : 2,
  },
  rightView : {
    width : '70%',
    justifyContent : "space-between",
    flexDirection : 'row',
    // borderColor : "#149cea",
    // borderWidth : 2,
  },
  usernameView : {
    width : '40%',
    height : '100%',
    justifyContent : 'center',
    alignItems : 'flex-start',
  },
  pendingView : {
    width : '60%',
    height : '100%',
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : "center",
    // borderColsmhcdvyhjcfuscfdth : 2,

  },
  usernameText : {
    fontSize: 20,
    fontFamily: "Thonburi",
    fontWeight : "100",
  },
  setButtonView: {
    flex : 0.9,
    height : '50%',
    borderColor:'#189afd',
    borderWidth : 1,
    borderRadius:10,
    justifyContent:  "center",
    alignItems: "center",
    marginRight : 10
  },
  setButtonAcceptingView: {
    flex : 0.3,
    width : '100%',
    borderColor:'#C0C0C0',
    borderWidth : 1,
    borderRadius:10,
    justifyContent:  "center",
    alignItems: "center",
  },
  buttonText: {
    color:'#189afd',
    textAlign:'center',
    fontSize: 17,
    fontFamily: "Thonburi",
    fontWeight : "100",
  },
  buttonAcceptingText: {
    color:'#C0C0C0',
    textAlign:'center',
    fontSize: 17,
    fontFamily: "Thonburi",
    fontWeight : "100",
  },

});
