import React, { useState,useEffect } from 'react';
import { View,
        StyleSheet,
        Text,
        Image,
        TextInput,
        TouchableOpacity,
        SafeAreaView,
        FlatList,
      TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import BlockedListModal  from "./BlockedListModal";
import * as api from "thoughts/app/services/ProfileServices";
import  * as User  from "thoughts/app/User";


export default function SettingsScene(props) {
  const { navigate } = useNavigation();
  let uid = useNavigationParam('uid');
  const[showThought, setShowThought] = useState(false);
  const[selectedOption, setSelectedOption] = useState();
  const[selectionOption, setSelectionOption] = useState();
  const[showSelectModal, setShowSelectModal] = useState(false);
  const[showBlockedList, setShowBlockedList] = useState(false);
  const[privateState, setPrivateState] = useState();

  useEffect(() => {
      loadValues()
  }, []);

 async function loadValues() {
    let isPrivate = User.isPrivate
    setPrivateState(isPrivate)
}
  async function navigateToProfile() {
     User.isPrivate = privateState
     api.setPrivate(privateState)
     console.log("saving private state "+privateState)
     await userStorage.setIsPrivate(privateState)
     navigate('MyProfile')
  }

  function showBlockedUser() {
    setShowBlockedList(true)
  }

  function modalBlockCloseCallBack() {
    setShowBlockedList(false)
  }


  async function setPrivate() {
      let newState = !privateState
      setPrivateState(newState)
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

  <View style = {styles.optionsViews}>

   <View style = {styles.blocked}>
    <TouchableOpacity
      style = {styles.privacyOptionView}
      onPress={() => showBlockedUser()}
      underlayColor='#fff'
      >
      <Text style = {styles.optionText}> Blocked </Text>

    </TouchableOpacity>
    </View>

    <View style = {styles.isPrivate}>
    <TouchableOpacity
      style = {styles.privacyOptionView}
      onPress={() => setPrivate()}
      underlayColor='#fff'
      >
      <Text style = {styles.optionText}> Private </Text>
      <View style={privateState == "1" ? styles.privateSelected : styles.privateUnselected}/>
    </TouchableOpacity>
    </View>


  </View>


  <Modal isVisible={showBlockedList} swipeArea={50} style = {{alignSelf : "center",width : '85%'}} >
    <BlockedListModal  closeCallBackBlock = {modalBlockCloseCallBack} />
 </Modal>
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
  superView : {
      flex : 1,
      width : '100%',
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
  optionsViews : {
    flex : 0.93,
    width : '100%',
    // borderColor : "#149cea",
    // borderWidth : 2,
    alignItems : "center"
  },
  blocked : {
    width : '100%',
    alignItems : 'center',
    marginBottom : 10,
  },
  isPrivate : {
    width : '100%',
    alignItems : 'center',
    marginBottom : 10,
  },
  privacyOptionView : {
   height : 60,
    width : '90%',
    borderColor : "#C0C0C0",
    borderWidth : 1,
    borderRadius : 10,
    justifyContent : "space-between",
    alignItems : "center",
    paddingLeft : 10,
    paddingRight : 10,
    flexDirection : 'row'
  },
  optionText : {
    fontSize: 20,
    fontFamily: "Thonburi",
    fontWeight : "100",
  },
  showThoughtView : {
    flex : 0.06,
    width : '87%',
    borderColor : "#C0C0C0",
    borderWidth : 1,
    alignItems : "center",
    justifyContent : "space-between",
    paddingLeft : 10,
    paddingRight : 10,
    marginBottom : 10,
    flexDirection : 'row'
  },
  privateUnselected: {
    width : 20,
    height : 20,
    borderRadius : 10,
    borderWidth : 1
  },
  privateSelected : {
    width : 20,
    height : 20,
    borderRadius : 10,
    backgroundColor : "#149cea"
  }

});

SettingsScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};


// <Modal isVisible={showOptions} swipeArea={50} style = {{alignSelf : "flex-end",width : '25%', height : '10%'}} onBackdropPress={() => setShowOptions(false)} >
