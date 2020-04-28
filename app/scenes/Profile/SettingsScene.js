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
import SelectViewerModal from "./SelectViewerModal";
import * as realm from "thoughts/app/storage/Realm/Realm";

import { firebase } from '@react-native-firebase/storage';


export default function SettingsScene(props) {
  const { navigate } = useNavigation();
  let uid = useNavigationParam('uid');
  const[showThought, setShowThought] = useState(false);
  const[selectedOption, setSelectedOption] = useState();
  const[selectionOption, setSelectionOption] = useState();
  const[showSelectModal, setShowSelectModal] = useState(false);

  useEffect(() => {
      loadValues()
  }, []);

 async function loadValues() {
    let option = await userStorage.getSelectShowOption()
    setSelectedOption(option)
 }
  function navigateToProfile() {
    navigate('MyProfile')
  }

  function showThoughtOptions() {
    setShowThought(!showThought)
  }

  async function selectShowAll() {
     await userStorage.setSelectShowOption("1")
  }

  function selectShowOnly() {
    setShowSelectModal(true)
    setSelectionOption("Only")
  }
  function selectShowExcept() {
    setShowSelectModal(true)
    setSelectionOption("Except")
  }

  function modalCloseCallBack() {
      setShowSelectModal(false)
  }

  async function modalDoneCallBack(list) {
      setShowSelectModal(false)
      if(selectionOption == "Only") {
        console.log("selection option was only")
        await userStorage.setShowOnly(list)
      }
      else if(selectionOption == "Except") {
        console.log("selection option was except")
        await userStorage.setShowExcept(list)
      }else {
        console.log("selection option was hide")
        await userStorage.setHidden(list)
      }
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
    <TouchableOpacity
      style = {styles.privacyOptionView}
      onPress={() => showThoughtOptions()}
      underlayColor='#fff'
      >
        <Text style = {styles.optionText}> Show thoughts to </Text>
          <Icon name={showThought ? 'chevron-up':'chevron-down'}  style = {styles.messageView} size={40} />
    </TouchableOpacity>

    {
      showThought &&
       <View style = {styles.thoughtsOptionSuperView}>
       <TouchableOpacity
         style = {styles.showThoughtView}
         onPress={() => selectShowAll()}
         disabled = {selectedOption == "1"}
         underlayColor='#fff'
         >
           <Text style = {styles.optionText}> All </Text>
           <View style={selectedOption == 1 ? styles.selected : styles.unselected}/>
       </TouchableOpacity>
       <TouchableOpacity
         style = {styles.showThoughtView}
         onPress={() => selectShowExcept()}
         underlayColor='#fff'
         >
           <Text style = {styles.optionText}> All except.. </Text>
           <View style={selectedOption == 2 ? styles.selected : styles.unselected}/>

       </TouchableOpacity>
       <TouchableOpacity
         style = {styles.showThoughtView}
         onPress={() => selectShowOnly()}
         underlayColor='#fff'
         >
           <Text style = {styles.optionText}> Only </Text>
           <View style={selectedOption == 3 ? styles.selected : styles.unselected}/>
       </TouchableOpacity>

      </View>
    }
    <TouchableOpacity
      style = {styles.privacyOptionView}
      onPress={() => hideFrom()}
      underlayColor='#fff'
      >
        <Text style = {styles.optionText}> Hide </Text>
          <Icon name={showThought ? 'chevron-up':'chevron-down'}  style = {styles.messageView} size={40} />
    </TouchableOpacity>

  </View>
   <Modal isVisible={showSelectModal} swipeArea={50} style = {{alignSelf : "center",width : '85%'}} >
     <SelectViewerModal  closeCallBack = {modalCloseCallBack} modalDoneCallBack = {modalDoneCallBack}  selectionOption = {selectionOption}/>
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
    borderColor : "#149cea",
    borderWidth : 2,
    alignItems : "center"
  },
  privacyOptionView : {
   height : 60,
    width : '90%',
    borderColor : "#C0C0C0",
    borderWidth : 1,
    borderRadius : 10,
    justifyContent : "space-between",
    paddingLeft : 10,
    paddingRight : 10,
    paddingTop: 10,
    marginBottom : 5,
    flexDirection : 'row'
  },
  optionText : {
    fontSize: 20,
    fontFamily: "Thonburi",
    fontWeight : "100",
  },
  thoughtsOptionSuperView : {
    width : '95%',
    height : 800,
    alignItems : "center"
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
  unselected: {
    width : 15,
    height : 15,
    borderRadius : 7,
    borderWidth : 1
  },
  selected : {
    width : 15,
    height : 15,
    borderRadius : 7,
    backgroundColor : "#149cea"
  }

});

SettingsScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};


// <Modal isVisible={showOptions} swipeArea={50} style = {{alignSelf : "flex-end",width : '25%', height : '10%'}} onBackdropPress={() => setShowOptions(false)} >
