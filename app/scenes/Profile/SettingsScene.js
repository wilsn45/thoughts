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

import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import * as api from "thoughts/app/services/ProfileServices";
import UserListModal from "./UserListModal";
var Spinner = require('react-native-spinkit');

import { firebase } from '@react-native-firebase/storage';


export default function SettingsScene(props) {
  const { navigate } = useNavigation();
  let uid = useNavigationParam('uid');


  useEffect(() => {

  }, []);









return (
  <View style = {styles.main}>
  <View style = {styles.headerView}>

  <TouchableOpacity
    style = {styles.backButtonView}
    onPress={() => navigateToHome()}
    underlayColor='#fff'
   >

    <Icon name={'chevron-left'}  style = {styles.messageView} size={40} />
  </TouchableOpacity>

  </View>

  <View style = {styles.optionsViews}>
    <TouchableOpacity
      style = {styles.privacyOptionView}
      onPress={() => navigateToHome()}
      underlayColor='#fff'
      >
        <Text style = {styles.optionText}> Show thoughts </Text>
      </TouchableOpacity>
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
  privacyOptionView : {
    flex : 0.07,
    width : '90%',
    borderColor : "#C0C0C0",
    borderWidth : 1,
    borderRadius : 10,
    justifyContent : "center",
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingLeft : 10
  },
  optionText : {
    fontSize: 20,
    fontFamily: "Thonburi",
    fontWeight : "100",
  }

});

SettingsScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};


// <Modal isVisible={showOptions} swipeArea={50} style = {{alignSelf : "flex-end",width : '25%', height : '10%'}} onBackdropPress={() => setShowOptions(false)} >
