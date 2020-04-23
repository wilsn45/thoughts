import React, { useState,useEffect } from 'react';
import {View, Text,Image, StyleSheet} from 'react-native';

export default function UserCell({user}) {

  useEffect(() => {
      console.log("usename is "+user.username)
    }, []);

  return (
    <View style = {styles.container}>
    <View style = {styles.leftView}>
       <Image style={styles.imageView} source={{uri: user.profileURL}}/>
    </View>

    <View style = {styles.rightView}>
    </View>

		   <Text style = {styles.text}> {user.username} </Text>

	</View>
  );
};


const styles = StyleSheet.create ({
 container : {
		flex : 1,
	   width : '100%',
     flexDirection : 'row',
      borderColor : "#149cea",
     borderWidth : 2,
	},
  imageView : {
    width : 60,
    height : 60,
    borderRadius : 30,
    borderWidth : 2,
    marginBottom : 20,
  },
  leftView : {
    width : '30%',
    alignItems : 'center',
    justifyContent : 'center',
    borderColor : "#149cea",
   borderWidth : 2,
  },

  text : {
		fontSize : 15,
		textAlign : "center"
	}
});
