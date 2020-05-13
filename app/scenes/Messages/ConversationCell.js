import React, { useState,useEffect } from 'react';
import {View,
        Text,
        Image,
        StyleSheet,
        TouchableOpacity} from 'react-native';
import * as api from "thoughts/app/services/MessageServices";
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'

export default function ConversationCell({message,profilePic,navigateToUser}) {
const { navigate } = useNavigation();
const[image, setImage] = useState(null)
let source
useEffect(() => {
  if(message.image) {
    getImageURL()
  }
  console.log("message is "+message)
}, []);

async function getImageURL() {
  if(!message.isMsgArchived) {
    console.log("url is image "+message.image)
    setImage(message.image)
    return
  }
  let downloadUrl = await api.getChatImage(message.image)
  console.log("download url is "+JSON.stringify(downloadUrl))
  setImage(downloadUrl)
}

return (
    <TouchableOpacity onPress={() => navigateToConversation(message.useruid)}>
    <View style = {styles.container}>


   <View style = {message.isReceived ? styles.receivedMsg : styles.sendMsg}>
      <View style = {message.isReceived ? styles.leftViewReceived : styles.leftView}>
       {message.isReceived &&   <Image style={styles.profileView} source={{uri: profilePic}}/> }
        </View>
        <View style =  {message.isReceived ? styles.rightViewReceived : styles.rightView}>
        { !image && <Text style = {styles.messageText} > {message.message} </Text> }
        { image &&  <Image style = {styles.imageView} source = {{uri :image}} />  }
        </View>
      </View>
    </View>
  </TouchableOpacity>

  );
};


const styles = StyleSheet.create ({
 container : {
    width : '95%',
    marginBottom : 10,
    alignSelf : "center"
  },
  receivedMsg : {
    width : '60%',
    justifyContent : "flex-start",
    flexDirection : 'row',
  },
  sendMsg : {
    width : '60%',
    alignSelf : "flex-end",

    // borderColor: "orange",
    // borderWidth : 2,
    flexDirection : 'row-reverse',
    paddingLeft : 10,
    paddingTop : 10
  },
  profileView : {
    width : 30,
    height : 30,
    borderRadius : 15,
    borderWidth : 0.5,
    marginBottom : 20,
  },

  leftViewReceived : {
    width : '10%',
    alignItems : 'flex-start',
    justifyContent : 'flex-start',
  },
  rightViewReceived : {
    marginLeft : 20,
    width : '90%',
    alignItems : 'flex-start',
    justifyContent : 'center',
    backgroundColor : "#ebebeb",

  },

  leftViewSend : {
    width : '10%',
    alignItems : 'flex-start',
    justifyContent : 'flex-start',
  },
  rightViewSend : {
    width : '90%',
    alignItems : 'flex-end',
    justifyContent : 'flex-start',
  },
  usernameText : {
    fontSize: 15,
    fontFamily: "Thonburi",
    fontWeight : "100",
    marginBottom : 15,
  },
  messageText : {
    fontSize: 18,
    fontFamily: "Thonburi",
    fontWeight : "100",
    marginBottom : 20,
  },
  messageTextUnread : {
    fontSize: 18,
    fontFamily: "Thonburi",
    fontWeight : "bold",
    marginBottom : 20,
  },
  imageView : {
    width : 100,
    height : 100
  }

});
// { !image && <Text style = {styles.messageText} > {message.message} </Text> }
// { image &&  <Image style = {styles.imageView} source = {{uri :image}} />  }
