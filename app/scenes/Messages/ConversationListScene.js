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
import * as api from "thoughts/app/services/ProfileServices";
import  * as User  from "thoughts/app/User";
import ConversationListCell  from "./ConversationListCell";
import * as messageRealm from "thoughts/app/storage/Realm/MessageRealm";



export default function ConversationListScene(props) {
  const { navigate } = useNavigation();
  const[messageList, setMessageList] = useState([])
  let uid = useNavigationParam('uid');

  useEffect(() => {
    // messageRealm.clearMSg()
      messageRealm.getConversationList()
      .then(msgList => {
        setMessageList(msgList)
        console.log("messages are "+JSON.stringify(msgList))
      })

      // console.log("i am being called")

      return () => {
        //console.log("i am leaving");
      };
  }, []);

  function navigateToProfile() {
  navigate('Home')
}

 function navigateToConversation(uid,username) {
   navigate('conversation',{uid : uid,username:username} )
}


return (
<View style = {styles.main}>
  <View style = {styles.headerView}>

  <TouchableOpacity
    style = {styles.backButtonView}
    onPress={() => navigateToProfile()}
    underlayColor='#fff'
   >
    <Icon name={'chevron-left'}  style = {styles.messageView} size={40} />
  </TouchableOpacity>

  </View>

  <View style = {styles.listView}>
    <FlatList
      data={messageList}
      renderItem={({ item }) => <ConversationListCell message={item} navigateToConversation = {navigateToConversation} />}
      keyExtractor={item => item.useruid}
    />
  </View>
</View>
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
    flex : 0.05,
    width : '100%',
    marginTop : 40,
    justifyContent : "space-between",
    flexDirection : "row",
  },
  backButtonView : {
    width : 50,
    height : 50,
  },
  listView : {
    flex : 0.95,
    width : '100%',
    // borderColor : "#149cea",
    // borderWidth : 2,
    alignItems : "center"
  },

});

ConversationListScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};


// <Modal isVisible={showOptions} swipeArea={50} style = {{alignSelf : "flex-end",width : '25%', height : '10%'}} onBackdropPress={() => setShowOptions(false)} >
