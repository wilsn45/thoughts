import React, { useState,useEffect } from 'react';
import {View,
        Text,
        Image,
        StyleSheet,
        TouchableOpacity} from 'react-native';
import * as api from "thoughts/app/services/ProfileServices";
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'
import * as realm from "thoughts/app/storage/Realm/ProfileRealm";

export default function UserSelectCell({cellCallback,user,selectionOption}) {
const[profileURL, setProfileURL] = useState();
const[isSelected, setIsSelected] = useState(user.isSelected);

useEffect(() => {
  getURL()
}, []);

async function getURL() {
  let url = await api.getMinProfileUrl(user.uid)
  setProfileURL(url)
}

 async function cellClick() {
   let state = !isSelected
   await setIsSelected(!isSelected)
   cellCallback(user.uid,state)
 }

  return (
    <View style = {styles.container}>
    <View style = {styles.leftView}>

      <Image style={styles.imageView} source={{uri: profileURL}}/>

    </View>


    <View style = {styles.rightView}>
    <Text style = {styles.usernameText}> {user.username} </Text>
    <TouchableOpacity
      style={isSelected ? styles.selected : styles.unselected}
      onPress={() => cellClick()}
      underlayColor='#fff'
      />
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

   //  borderColor : "#149cea",
   // borderWidth : 2,
  },
  rightView : {
    width : '60%',
    alignItems : 'center',
    justifyContent : 'space-between',
    flexDirection : 'row',

   //  borderColor : "#149cea",
   // borderWidth : 2,
  },
  usernameText : {
    fontSize: 20,
    fontFamily: "Thonburi",
    fontWeight : "100",
    marginBottom : 20,
  },
  unselected: {
    width : 20,
    height : 20,
    borderRadius : 10,
    borderWidth : 1
  },
  selected : {
    width : 20,
    height : 20,
    borderRadius : 10,
    backgroundColor : "#149cea"
  }

});
