import React, { useState,useEffect } from 'react';
import { View,
        StyleSheet,
        Text,
        Image,
        TextInput,
        TouchableOpacity,
        SafeAreaView,
        FlatList,
        KeyboardAvoidingView,
      TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import  * as User  from "thoughts/app/User";
import ConversationCell  from "./ConversationCell";
import * as messageRealm from "thoughts/app/storage/Realm/MessageRealm";
import * as api from "thoughts/app/services/MessageServices";
import * as imageHelper from "thoughts/app/helper/ImageHelper";
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Image',
   storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function ChatScene(props) {
  let id =0
  let flatList
  let textInput
  const { navigate } = useNavigation();
  const[messages, setMessage] = useState([])
  const[newMessage, setNewMesage] = useState("")
  let uid = useNavigationParam('uid');
  let username = useNavigationParam('username');
  const[userProfileImg, setUserProfileImg] = useState();
  const[myProfileImg, setMyProfileImg] = useState();
  const [imagePath, setImagePath] = useState()

  useEffect(() => {
    getMessages()
    getUserPic()
    getMyPic()
    messageRealm.attachListner(getMessages)
    return () => {

    };
  }, []);

  function getMessages() {
    messageRealm.getConversation(uid)
    .then(msgList => {
       // console.log("realm msg is "+JSON.stringify(msgList))
      setMessage(msgList)
    })
  }

  function navigateBack() {
    navigate('conversationList')
  }

  async function getUserPic() {
    let url = await api.getMinProfileUrl(uid)
    let imageHelperPromise = imageHelper.saveProfileBase64(url)
    let profileBase64 = await imageHelperPromise
    setUserProfileImg(profileBase64)
  }

  async function getMyPic() {
    let data = await userStorage.getUserProfileMinBase64()
    setMyProfileImg(data)
  }

  function sendTextMessage() {
    let unixtime = new Date().valueOf()
    let timestamp = Math.floor(unixtime/1000)
    //
    let newMsg = {
      msgid:  timestamp.toString(),
      useruid: uid,
      username : username,
      message : newMessage,
      isReceived : false,
      at : timestamp,
      isMsgArchived : false,
      read : true
    }
    api.sendTextMessage(newMsg)
    textInput.clear()


    // let messageRef = firestore().collection('messages');
    //  messageRef.add({
    //     fromusername : "User A",
    //     fromuid : "AD9jnDWbPKYPOFD4C355b1ja7bF2",
    //     tousername : "Kabir",
    //     touid : "DD9jnDWbPKYPOFD4C355b1ja7bF2",
    //     message : "Message A 4",
    //     picRef : null,
    //     thoughtsTitle : null,
    //     thoughtsRef : 451,
    //     at : timestamp,
    //     delivered : false
    //   })

  }

  function sendImageMessage() {
    ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {

    } else if (response.error) {

    } else if (response.customButton) {

    } else {

         api.sendImageMessage(username,uid,response.uri)

         // api.sendReceivedImage(response.uri)
       }
     });


  }

return (
  <KeyboardAvoidingView
      style={styles.main}
      behavior="padding"
    >
  <View style = {styles.headerView}>

  <TouchableOpacity
    style = {styles.backButtonView}
    onPress={() => navigateBack()}
    underlayColor='#fff'
   >

    <Icon name={'chevron-left'}  style = {styles.messageView} size={40} />
  </TouchableOpacity>

  </View>

  <View style = {styles.chatView}>
    <FlatList
      style =  {{width : '100%'}}
      data={messages}
      renderItem={({ item }) => <ConversationCell message={item}  profilePic={item.isReceived ? userProfileImg: myProfileImg} />}
      keyExtractor={item => item.msgid}
      ref={ref => flatList = ref}
      onContentSizeChange={() => flatList.scrollToEnd({animated: true})}
      onLayout={() => flatList.scrollToEnd({animated: true})}
    />
  </View>

  <View style = {styles.sendView}>
    <TextInput style = {{flex : 0.8, height : 50, marginLeft : 20}}
      placeholder = "Send"
      ref={ref => textInput = ref}
      onChangeText={(value) => setNewMesage(value) }/>
      <TouchableOpacity style = {{flex : 0.2, height : 50}}
      onPress={() => sendImageMessage()}
      >
       <Icon name={'send'}  style = {styles.messageView} size={40} />
      </TouchableOpacity>

  </View>

</KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({

  main : {
      flex : 1,
      alignItems : "center",
      justifyContent : "center",
      backgroundColor : "#fff",
  },
  headerView : {
    flex : 0.07,
    width : '100%',
    marginTop : 40,
    justifyContent : "space-between",
    flexDirection : "row",
  },
  backButtonView : {
    width : 50,
    height : 50,
  },
  chatView : {
    flex : 0.86,
    width : '100%',
    alignItems : "center"
  },
  sendView : {
    marginTop: 5,
    flex : 0.07,
    width : '100%',
    borderColor : "#149cea",
    borderWidth : 2,
    alignItems : "center",
    // borderColor : "black",
    // borderBottomWidth : 1,
    flexDirection : "row"
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },

});

ChatScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};


// <Modal isVisible={showOptions} swipeArea={50} style = {{alignSelf : "flex-end",width : '25%', height : '10%'}} onBackdropPress={() => setShowOptions(false)} >
