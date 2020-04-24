import React, { useState,useEffect } from 'react';
import {View,
        Text,
        Image,
        StyleSheet,
        TouchableOpacity} from 'react-native';

export default function UserCell({user}) {

  useEffect(() => {
      console.log("usename is "+user.username)
    }, []);

function navigateToUser() {

}
  return (
    <View style = {styles.container}>
    <View style = {styles.leftView}>
      <TouchableOpacity
        onPress={() => navigateToUser()}
        underlayColor='#fff'
        >

       <Image style={styles.imageView} source={{uri: user.profileURL}}/>
    </TouchableOpacity>

    </View>

    <View style = {styles.rightView}>
    <Text style = {styles.usernameText}> {user.username} </Text>

    <TouchableOpacity
      onPress={() => navigateToUser()}
      underlayColor='#fff'
      >

     <Text style = {styles.followText}> Follow </Text>
  </TouchableOpacity>
    </View>



	</View>
  );
};


const styles = StyleSheet.create ({
 container : {
		flex : 1,
	   width : '100%',
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
    alignItems : 'center',
    justifyContent : 'center',
   //  borderColor : "#149cea",
   // borderWidth : 2,
  },
  usernameText : {
    fontSize: 20,
    fontFamily: "Thonburi",
    fontWeight : "100"
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
