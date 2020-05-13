import React, { useState,useEffect } from 'react';
import {View,
        Text,
        Image,
        StyleSheet,
        TouchableOpacity} from 'react-native';
import * as api from "thoughts/app/services/ProfileServices";
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'

export default function ConversationListCell({message,navigateToConversation}) {
const[profileURL, setProfileURL] = useState();
const[msg, setMsg] = useState();
const { navigate } = useNavigation();

useEffect(() => {
  getURL()
  //console.log("message is " +JSON.stringify(message))
  if(message.image) {
    setMsg("image")
    return
  }
  if(message.message.length > 20) {
    let trimedMsg = message.message.substring(1, 19) + "..";
    setMsg(trimedMsg)
  } else {
    setMsg(message.message)
  }
}, []);

function textStyle() {

  return {  fontSize: 18,
  fontFamily: "Thonburi",
  fontWeight : "bold",
  marginBottom : 20,
  fontStyle: 'italic'
  }
  // if(message.image) {
  //   console.log("is image")
  //   return {  fontSize: 18,
  //   fontFamily: "Thonburi",
  //   fontWeight : "bold",
  //   marginBottom : 20,
  //   fontStyle: 'italic'
  //   }
  // } else {
  //   if(message.read) {
  //    return {  fontSize: 18,
  //    fontFamily: "Thonburi",
  //    fontWeight : "100",
  //    marginBottom : 20,
  //    }
  //  }
  //  else  {
  //    return {
  //      fontSize: 18,
  //      fontFamily: "Thonburi",
  //      fontWeight : "bold",
  //      marginBottom : 20,
  //    }
  //  }
  // }

}

async function getURL() {
  let url = await api.getMinProfileUrl(message.useruid)
  setProfileURL(url)
}

return (
    <TouchableOpacity onPress={() => navigateToConversation(message.useruid,message.username)}>
    <View style = {styles.container}>
    <View style = {styles.leftView}>

        <Image style={styles.imageView} source={{uri: profileURL}}/>

    </View>

    <View style = {styles.rightView}>
    <Text style = {styles.usernameText}> {message.username} </Text>
    <Text style = {textStyle()}> {msg} </Text>
    </View>

    </View>
    </TouchableOpacity>

  );
};


const styles = StyleSheet.create ({
 container : {
		flex : 1,
	   width : '90%',
     alignSelf : "center",
    flexDirection : 'row',
    borderColor : "grey",
    borderBottomWidth : 0.5,
    marginBottom : 10,
    marginRight : 10
	},
  imageView : {
    width : 50,
    height : 50,
    borderRadius : 25,
    borderWidth : 0.5,
    marginBottom : 20,
  },
  leftView : {
    width : '30%',
    alignItems : 'flex-start',
    justifyContent : 'center',
  },
  rightView : {
    width : '70%',
    alignItems : 'flex-start',
    justifyContent : 'center',

   //  borderColor : "#149cea",
   // borderWidth : 2,
  },
  usernameText : {
    fontSize: 15,
    fontFamily: "Thonburi",
    fontWeight : "100",
    marginBottom : 15,
  },

});
