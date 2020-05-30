import React, { useState,useEffect } from 'react';
import {View,
        Text,
        Image,
        StyleSheet,
        TouchableOpacity} from 'react-native';
import * as api from "thoughts/app/services/ProfileServices";
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'

export default function UserCell({cellNavigateCallBack,user}) {
const[profileURL, setProfileURL] = useState();
const { navigate } = useNavigation();

useEffect(() => {
  getURL()
}, []);

async function getURL() {
  let url = await api.getProfileURL(user.uid,false)
  setProfileURL(url)
}
async function navigateToUser() {
  await userStorage.setViewingUserToken()
}
  return (
    <TouchableOpacity
        onPress={() => cellNavigateCallBack(user.uid)}
        underlayColor='#fff'>
    <View style = {styles.container}>
    <View style = {styles.leftView}>
      <Image style={styles.imageView} source={{uri: profileURL}}/>
    </View>


    <View style = {styles.rightView}>
    <Text style = {styles.usernameText}> {user.username} </Text>
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
    width : 60,
    height : 60,
    borderRadius : 30,
    borderWidth : 0.5,
    marginBottom : 20,
  },
  leftView : {
    width : '30%',
    alignItems : 'flex-start',
    justifyContent : 'center',

   //  borderColor : "#149cea",
   // borderWidth : 2,
  },
  rightView : {
    width : '70%',
    alignItems : 'flex-start',
    justifyContent : 'center',

   //  borderColor : "#149cea",
   // borderWidth : 2,
  },
  usernameText : {
    fontSize: 20,
    fontFamily: "Thonburi",
    fontWeight : "100",
    marginBottom : 20,
  },
  followingText : {
    fontSize: 15,
    fontFamily: "Thonburi",
    fontWeight : "100"
  },
  followText : {
    color : "#149cea",
    fontSize: 17,
    fontFamily: "Thonburi",
    fontWeight : "100"
  },

});
